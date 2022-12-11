// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let passport = require('passport');

let reportsController = require("../controllers/reports");
// define the report model
let report = require("../models/reports");

//Function for gurad pages
function requireAuth(req, res, next)
{
    //check if the user is logged in 
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

//let reportsController = require("../controllers/reports");

/* GET incident_reports List page. READ */
router.get("/", requireAuth, reportsController.displayReports);

//  GET the report Details page in order to add a new report
router.get("/add", requireAuth, reportsController.displayAddPage);

// POST process the report Details page and create a new report - CREATE
router.post("/add", requireAuth, reportsController.processAddPage);

// GET the report Details page in order to edit an existing report
router.get("/edit/:id",requireAuth, reportsController.displayEditPage);

// POST - process the information passed from the details form and update the document
router.post("/edit/:id",requireAuth, reportsController.processEditPage);

// GET - process the delete
router.get("/delete/:id", requireAuth, reportsController.performDelete);

	// GET - change status to in progress
    router.get("/inprogress/:id", requireAuth, reportsController.performInprogress);

    // GET - change status to dispatched
    router.get("/dispatched/:id", requireAuth, reportsController.performinDiapatched);
    
    // GET - change status to closed
    router.get("/closed/:id",requireAuth, reportsController.performinClosed);

module.exports = router;
