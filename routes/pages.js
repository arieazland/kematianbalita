const Express = require("express");
const axios = require('axios');
const Router = Express.Router();
const Moment = require("moment");
const nodemailer = require('nodemailer');
const Dotenv = require("dotenv");
Dotenv.config({ path: './.env' });
useragent = require('express-useragent');
// process.env.MAIN_URL

require("moment/locale/id");  // without this line it didn't work
Moment.locale('id');

/** Route for Login */
Router.get('/login', (req, res) => {
    if(req.session.loggedIn){
        res.redirect('/');
    } else {
        res.render("login");
    }
});

/** Route for Home */
Router.get('/', (req, res) => {
    if(req.session.loggedIn){
        idu = req.session.iduser
        username = req.session.username
        nama = req.session.nama
        tipe = req.session.type
        if(tipe === 'admin'){
            /** login page di arhkan ke page admin */
            res.render("index",{
                username, nama, idu, tipe,
            });
        } else if(tipe === 'user'){
            /** login page di arhkan ke page psikolog */
            res.render("index",{
                username, nama, idu, tipe,
            });
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
        idu = req.session.iduser
        username = req.session.username
        nama = req.session.nama
        tipe = req.session.type
        res.render("tambahdatakematian",{
            username, nama, idu, tipe,
        });
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