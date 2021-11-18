const Express = require("express");
const axios = require('axios');
const Router = Express.Router();
const Moment = require("moment");
const nodemailer = require('nodemailer');
const Dotenv = require("dotenv");
Dotenv.config({ path: './.env' });
useragent = require('express-useragent');

const Path = require("path");
const Mysql = require("mysql");
const Connection = require ("../DBconnection");
// process.env.MAIN_URL

require("moment/locale/id");  // without this line it didn't work
Moment.locale('id');

/** Route for / */
Router.get('/', async (req, res) => {
    if(req.session.loggedIn){
        idu = req.session.id_akun
        email = req.session.email
        nama = req.session.nama
        tipe = req.session.type
        if(tipe === 'admin' || tipe === 'user'){
            /** login page di arhkan ke page home */
            var tanggal = Moment().format("YYYY-MM-DD");
            const tanggal_awal = tanggal;
            const tanggal_akhir = tanggal;
            try{
                /** get data kematian balita*/
                const get_data = await new Promise((resolve, reject) => {
                    Connection.query("SELECT h.*, ac.nama AS nama_user FROM kb_header h, kb_account ac WHERE h.id_user = ac.id AND h.date_created BETWEEN ? AND ?", [tanggal_awal, tanggal_akhir], (error, results) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve(results)
                        }
                    })

                })
                if(get_data.length >= 0){
                    res.render("index",{
                        email, nama, idu, tipe, tanggal_awal, tanggal_akhir, get_data
                    });
                } else {
                    /** pengambilan data gagal */
                    throw new Error("Pengambilan data gagal");
                }
            } catch(e) {
                req.session.sessionFlash = {
                    type: 'error',
                    message: e.message
                }
                res.render("index",{
                    email, nama, idu, tipe,
                });
            }
            
        } else {
            res.redirect('/login');    
        }
    } else {
        res.redirect('/login');
    }
});

/** Route for Login */
Router.get('/login', (req, res) => {
    if(req.session.loggedIn){
        res.redirect('/home');
    } else {
        res.render("login");
    }
});

/** Route for Home */
Router.get('/home', async (req, res) => {
    if(req.session.loggedIn){
        idu = req.session.id_akun
        email = req.session.email
        nama = req.session.nama
        tipe = req.session.type
        if(tipe === 'admin' || tipe === 'user'){
            /** login page di arhkan ke page home */
            var tanggal = Moment().format("YYYY-MM-DD");
            const tanggal_awal = tanggal;
            const tanggal_akhir = tanggal;
            try{
                /** get data kematian balita*/
                const get_data = await new Promise((resolve, reject) => {
                    Connection.query("SELECT h.*, ac.nama AS nama_user FROM kb_header h, kb_account ac WHERE h.id_user = ac.id AND h.date_created BETWEEN ? AND ?", [tanggal_awal, tanggal_akhir], (error, results) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve(results)
                        }
                    })

                })
                if(get_data.length >= 0){
                    res.render("index",{
                        email, nama, idu, tipe, tanggal_awal, tanggal_akhir, get_data
                    });
                } else {
                    /** pengambilan data gagal */
                    throw new Error("Pengambilan data gagal");
                }
            } catch(e) {
                req.session.sessionFlash = {
                    type: 'error',
                    message: e.message
                }
                res.render("index",{
                    email, nama, idu, tipe,
                });
            }
            
        } else {
            res.redirect('/login');    
        }
    } else {
        res.redirect('/login');
    }
});

Router.post('/home', async (req, res) => {
    const { tanggal_awal, tanggal_akhir } =req.body;
    if(req.session.loggedIn){
        idu = req.session.id_akun
        email = req.session.email
        nama = req.session.nama
        tipe = req.session.type
        if(tipe === 'admin' || tipe === 'user'){
            /** login page di arhkan ke page home */
            try{
                /** get data kematian balita*/
                const get_data = await new Promise((resolve, reject) => {
                    Connection.query("SELECT h.*, ac.nama AS nama_user FROM kb_header h, kb_account ac WHERE h.id_user = ac.id AND h.date_created BETWEEN ? AND ?", [tanggal_awal, tanggal_akhir], (error, results) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve(results)
                        }
                    })
                })
                if(get_data.length >= 0){
                    res.render("index",{
                        email, nama, idu, tipe, tanggal_awal, tanggal_akhir, get_data
                    });
                } else {
                    /** pengambilan data gagal */
                    throw new Error("Pengambilan data gagal");
                }
            } catch(e) {
                req.session.sessionFlash = {
                    type: 'error',
                    message: e.message
                }
                res.render("index",{
                    email, nama, idu, tipe,
                });
            }
            
        } else {
            res.redirect('/login');    
        }
    } else {
        res.redirect('/login');
    }
});

/** Route for tambah data kematian */
Router.get('/tambahdatakematian', (req, res) => {
    if(req.session.loggedIn){
        idu = req.session.id_akun
        email = req.session.email
        nama = req.session.nama
        tipe = req.session.type
        if(tipe === 'admin' || tipe === 'user'){
            res.render("tambahdatakematian",{
                email, nama, idu, tipe,
            });
        } else {
            res.redirect('/login');    
        }
    } else {
        res.redirect('/login');
    }
});

/** Route for tambah data kematian */
Router.get('/detail/:kode_registrasi', async (req, res) => {
    if(req.session.loggedIn){
        const idregistrasi = req.params.kode_registrasi;
        idu = req.session.id_akun
        email = req.session.email
        nama = req.session.nama
        tipe = req.session.type
        var tanggalSekarang = Moment().format("YYYY-MM-DD");
        if(tipe === 'admin' || tipe === 'user'){
            try{
                /** get data kematian balita*/
                const get_data_header = await new Promise((resolve, reject) => {
                    Connection.query("SELECT h.*, ac.* FROM kb_header h, kb_account ac WHERE h.id_user = ac.id AND h.kode_registrasi = ?", [idregistrasi], (error, results) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve(results)
                        }
                    })
                })
                const get_data_d1 = await new Promise((resolve, reject) => {
                    Connection.query("SELECT * FROM kb_detail_1 WHERE kb_detail_1.kode_registrasi = ?", [idregistrasi], (error, results) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve(results)
                        }
                    })
                })
                const get_data_d2 = await new Promise((resolve, reject) => {
                    Connection.query("SELECT * FROM kb_detail_2 WHERE kb_detail_2.kode_registrasi = ?", [idregistrasi], (error, results) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve(results)
                        }
                    })
                })
                const get_data_d3 = await new Promise((resolve, reject) => {
                    Connection.query("SELECT * FROM kb_detail_3 WHERE kb_detail_3.kode_registrasi = ?", [idregistrasi], (error, results) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve(results)
                        }
                    })
                })
                const get_data_d4 = await new Promise((resolve, reject) => {
                    Connection.query("SELECT * FROM kb_detail_4 WHERE kb_detail_4.kode_registrasi = ?", [idregistrasi], (error, results) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve(results)
                        }
                    })
                })
                const get_data_d5 = await new Promise((resolve, reject) => {
                    Connection.query("SELECT * FROM kb_detail_5 WHERE kb_detail_5.kode_registrasi = ?", [idregistrasi], (error, results) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve(results)
                        }
                    })
                })
                const get_data_d6 = await new Promise((resolve, reject) => {
                    Connection.query("SELECT * FROM kb_detail_6 WHERE kb_detail_6.kode_registrasi = ?", [idregistrasi], (error, results) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve(results)
                        }
                    })
                })
                const get_data_d7 = await new Promise((resolve, reject) => {
                    Connection.query("SELECT * FROM kb_detail_7 WHERE kb_detail_7.kode_registrasi = ?", [idregistrasi], (error, results) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve(results)
                        }
                    })
                })
                if(get_data_header.length >= 0 && get_data_d1.length >= 0 && get_data_d2.length >= 0 && get_data_d3.length >= 0 && get_data_d4.length >= 0 && get_data_d5.length >= 0 && get_data_d6.length >= 0 && get_data_d7.length >= 0){
                    res.render("detail",{
                        email, nama, idu, tipe, tanggalSekarang,
                        get_data_header, 
                        get_data_d1, 
                        get_data_d2, 
                        get_data_d3, 
                        get_data_d4,
                        get_data_d5,
                        get_data_d6,
                        get_data_d7
                    });
                } else {
                    /** pengambilan data gagal */
                    throw new Error("Pengambilan data gagal");
                }
            } catch(e) {
                req.session.sessionFlash = {
                    type: 'error',
                    message: e.message
                }
                res.redirect("/home")
            }
            // res.render("detail",{
            //     email, nama, idu, tipe,
            // });
        } else {
            res.redirect('/login');    
        }
    } else {
        res.redirect('/login');
    }
});

/** Router for logout */
Router.get('/logout', (req, res) =>{
    req.session.destroy((err) => {
        res.redirect("/login");
    })
})

module.exports = Router;