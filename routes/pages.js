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
// Router.get('/', (req, res) => {
//     if(req.session.loggedIn){
//         idu = req.session.id_akun
//         email = req.session.email
//         nama = req.session.nama
//         tipe = req.session.type
//         if(tipe === 'admin'){
//             /** login page di arhkan ke page admin */
//             res.render("index",{
//                 email, nama, idu, tipe,
//             });
//         } else if(tipe === 'user'){
//             /** login page di arhkan ke page psikolog */
//             res.render("index",{
//                 email, nama, idu, tipe,
//             });
//         } else {
//             res.redirect('/login');    
//         }
//     } else {
//         res.redirect('/login');
//     }
// });

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
                    Connection.query("SELECT * FROM kb_header WHERE date_created BETWEEN ? AND ?", [tanggal_awal, tanggal_akhir], (error, results) => {
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
                    Connection.query("SELECT * FROM kb_header WHERE date_created BETWEEN ? AND ?", [tanggal_awal, tanggal_akhir], (error, results) => {
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
        res.render("tambahdatakematian",{
            email, nama, idu, tipe,
        });
    } else {
        res.redirect('/login');
    }
});

/** Route for tambah data kematian */
Router.get('/detail/:kode_registrasi', (req, res) => {
    if(req.session.loggedIn){
        var idregistrasi = req.params.kode_registrasi;
        idu = req.session.id_akun
        email = req.session.email
        nama = req.session.nama
        tipe = req.session.type
        // res.render("detail",{
        //     email, nama, idu, tipe,
        // });
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