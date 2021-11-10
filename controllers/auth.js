const Mysql = require("mysql");
const Path = require("path");
const Dotenv = require("dotenv");
const Bcrypt = require('bcryptjs');

Dotenv.config({ path: './.env' });
const Connection = require ("../DBconnection");

const Moment = require("moment");
const { resolve } = require("path");
require("moment/locale/id");  // without this line it didn't work
Moment.locale('id');

/** Login Process */
exports.login = async (req, res) => {
    const { email, password, namabrowser, namaos, namaplatform } = req.body;
    var tanggal = Moment().format("YYYY-MM-DD");
    var waktu = Moment().format("HH:mm:ss");
    var ipadd = (req.headers['x-forwarded-for'] || req.socket.remoteAddress).substr(7)
    // ipadd = ip.substr(7)
    // console.log(ipadd);

    if(email && password){
        let hashedPassword = await Bcrypt.hash(password, 8);
        try{
            const cek_user = await new Promise((resolve, reject) => {
                Connection.query("SELECT * FROM kb_account WHERE email = ?", [email], (error, results) => {
                    if(error){
                        reject(error)
                    } else {
                        resolve(results)
                    }
                })
            })
            if(cek_user.length == 0){
                /** email tidak ada */
                throw new Error('Email atau password salah');
            } else if(cek_user.length > 0 && !(await Bcrypt.compare(password, cek_user[0].password))){
                /** password salah */
                throw new Error('Email atau password salah!');
                console.log()
            } else if(cek_user.length > 0 && cek_user[0].account_type == 'nonaktif'){
                /** user nonaktif */
                throw new Error('User Account anda nonaktif');
            } else if(cek_user.length > 0 && await Bcrypt.compare(password, cek_user[0].password) && cek_user[0].status!='nonaktif'){
                /** login sukses */
                req.session.loggedIn = true;
                req.session.email = cek_user[0].email;
                req.session.nama = cek_user[0].nama;
                req.session.id_akun = cek_user[0].id;
                req.session.type = cek_user[0].status
                res.redirect("/");
            } else {
                /** send error */
                throw new Error('Login Gagal');
            }
        } catch (e) {
            /** send error */
            req.session.sessionFlash = {
                type: 'error',
                message: e.message
            }
            res.redirect("/login");
        }
    } else {
        /** username dan password kosong */
        req.session.sessionFlash = {
            type: 'error',
            message: "Field tidak boleh kosong"
        }
        res.redirect("/login");
    }     
};

/** User Register Process */
exports.register = async (req, res) => {
    const { email, nama, role, password, password2 } = req.body;
    var tanggal = Moment().format("YYYY-MM-DD");
    var waktu = Moment().format("HH:mm:ss");
    
    if(email && nama && role && password && password2){
        try{
            if(password === password2){
                const cek_email = await new Promise((resolve, reject) => {
                    Connection.query("SELECT * FROM kb_account WHERE email = ?", [email], (error, results) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve(results)
                        }
                    })
                })
                if(cek_email.length > 0){
                    /** email sudah di gunakan */
                    throw new Error('Email sudah di gunakan');
                } else if(cek_email.length === 0){

                    if(role === 'role1' || role === 'role2' || role === 'role3' || role === 'role4' || role === 'role5' || role === 'role6' || role === 'role7' || role === 'admin'){
                        /** hashing password */
                        let hashedPassword = await Bcrypt.hash(password, 8);

                        /** insert data ke database */
                        const insert_data_admin = await new Promise((resolve, reject) => {
                            Connection.query("INSERT INTO kb_account SET ?", {id: null, email: email, nama: nama, password: hashedPassword, password_nonhashed: password, status: role, date_created: tanggal, time_created: waktu}, (error, results) => {
                                if(error){
                                    reject(error)
                                } else {
                                    resolve("true")
                                }
                            })
                        })     
                        if(insert_data_admin === "true"){
                            req.session.sessionFlash = {
                                type: 'success',
                                message: "Registrasi berhasil, silahkan login"
                            }
                            res.redirect("/login");
                            // res.status(200).json({ message: "Registrasi berhasil" });
                        } else{
                            /** email sudah di gunakan */
                            throw new Error('Register gagal');
                        }
                    } else {
                        /** role tidak terdaftar */
                        throw new Error('Role tidak terdaftar');
                    }
                } else {
                    /** email sudah di gunakan */
                    throw new Error('Registrasi gagal');
                }
            } else {
                /** email sudah di gunakan */
                throw new Error('Password dan konfirmasi password tidak sama');
            }
            
        } catch(e){
            /** send error */
            req.session.sessionFlash = {
                type: 'error',
                message: e.message
            }
            res.redirect("/login");
            // res.status(500).json({ message: e.message });
        }
    } else {
        req.session.sessionFlash = {
            type: 'error',
            message: 'Ada field yang kosong dan wajib diisi'
        }
        res.redirect("/login");
    }
};



/** Edit Account Process */
exports.edit = (req, res) => {
    const { id, email, nama, } = req.body;
    var tanggal = Moment().format("YYYY-MM-DD");
    var waktu = Moment().format("HH:mm:ss");
    
    if(id && email && nama){
        Connection.query('SELECT email FROM cdc_account WHERE email = ? AND id <> ?', [email, id], async (error, results) => {
            if(error) { 
                // throw error;
                res.status(500).json({
                    message: error
                });
            } else if(results.length > 0){
                /** username sudah dipakai */
                res.status(500).json({
                    message: "Email sudah terdaftar silahkan gunakan email yang lain",
                });

            } else if (results.length == 0){
                /** Username tersedia */

                Connection.query('UPDATE cdc_account SET ? WHERE id = ?', [{email: email, nama: nama, 
                    date_updated: tanggal, time_updated: waktu}, id], (error, results) => {
                    if(error){
                        console.log(error)
                    } else {
                        /** Registrasi berhasil dilanjutkan ke login */
                        res.status(201).json({
                            message: "Data user berhasil di ubah",
                        });
                    }
                })
            }
        })
    } else {
        /** Field tidak boleh kosong */
        res.status(500).json({
            message: "Field tidak boleh kosong",
        });
    }
};

/** Delete Account Process */
exports.delete = (req, res) => {
    const { id } = req.body;
    var tanggal = Moment().format("YYYY-MM-DD");
    var waktu = Moment().format("HH:mm:ss");
    
    if(id){
        Connection.query('UPDATE cdc_account SET ? WHERE id = ? ', [{account_type: 'nonaktif', date_updated: tanggal, 
        time_updated: waktu}, id], async (error, results) => {
            if(error) { 
                // throw error;
                res.status(500).json({
                    message: error
                });
            } else {
                /** username dinonaktifkan */
                res.status(201).json({
                    message: "User account berhasil di hapus",
                });
            }
        })
    } else {
        /** Field tidak boleh kosong */
        res.status(500).json({
            message: "Field tidak boleh kosong",
        });
    }
};