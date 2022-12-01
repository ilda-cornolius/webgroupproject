// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let indexController = require("../controllers/index");

// define the model
let report = require("../models/reports");

/* GET home page. wildcard */
router.get("/", indexController.displayHomePage);


/* GET home page. wildcard */
router.get("/home", indexController.displayHomePage);

/* GET About page. wildcard */
router.get("/about", indexController.displayAboutPage);

/* GET Route for displaying the Login Page*/
router.get("/login", indexController.displayLoginPage);

/* GET Route for processing the Login Page*/
router.post("/login", indexController.processLoginPage);

/* GET Route for displaying the Register Page*/
router.get("/register", indexController.displayRegisterPage);

/* GET Route for processing the Register Page*/
router.post("/register", indexController.processRegisterPage);

/* Get to perform UserLogout */
router.get('/logout', indexController.performLogout);

module.exports = router;
