const Express = require("express");
const Router = Express.Router();
const jawabController = require("../controllers/jawab");

/** Router */
Router.post('/reg', jawabController.registrasi);

module.exports = Router;