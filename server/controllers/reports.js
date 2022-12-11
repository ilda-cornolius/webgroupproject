let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");

//create a reference to the model
let report = require("../models/reports");

let userModel = require("../models/user");
let User = userModel.User;

module.exports.displayReports = (req, res, next) => {
    // find all incident_reports in the incident_reports collection
    report.find((err, incident_reports) => {
      if (err) {
        return console.error(err);
      } else {
        res.render("reports/index",  {
          title: "incident_reports",
          incident_reports: incident_reports,
          displayName: req.user ? req.user.displayName : ''
        });
      }
    });
  }

  module.exports.displayAddPage = (req, res, next) => {
    res.render("reports/add",
    { title: 'Add',
    displayName: req.user ? req.user.displayName : ''})
  }

  module.exports.processAddPage = (req, res, next) => {
  
    let newReport = report({
      
      caseID: req.body.caseID,
      date: req.body.date,
      name: req.body.name,
      details: req.body.details
    });
    report.create(newReport, (err, report) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        // refresh the report list
        res.redirect("/reports");
      }
    });
  }

  module.exports.displayEditPage = (req, res, next) => {

    let id = req.params.id; //id of actual object

      report.findById(id, (err, itemtoedit) => {
        if (err) {
          console.log(err);
          res.end(err);
        } else {
          if (itemtoedit.Status=="Closed") {
            res.redirect("/reports");
            
           } else {
            //show the edit view
            res.render("reports/edit", {
              title: "Edit Incident Report",
              incident_reports: itemtoedit,
              displayName: req.user ? req.user.displayName : ''
            });
          }
        }
      });
    }
  
  

  module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;
  
    let updatereport = report({
      _id: id,
      caseID: req.body.caseID,
      date: req.body.date,
      name: req.body.name,
      details: req.body.details,
    });
  
    report.updateOne({_id: id}, updatereport, (err) => {
      
        // refresh the report list
        res.redirect("/reports");
      
    });
  }

module.exports.performDelete = (req, res, next) => {
  
    let id = req.params.id;
    report.remove({ _id: id }, (err) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        //refresh report list
        res.redirect("/reports");
      }
    });
}
  
module.exports.performInprogress = (req, res, next) => {
  let id = req.params.id;
  
    let updatereport = report({
      _id: id,
      Status:"In progress",
      
    });

    report.updateOne({_id: id}, updatereport, (err) => {
      
        // refresh the report list
        res.redirect("/reports");
      
    });
}

module.exports.performinDiapatched = (req, res, next) => {
  let id = req.params.id;
  
    let updatereport = report({
      _id: id,
      Status:"Diapatched",
      
    });

    report.updateOne({_id: id}, updatereport, (err) => {
      
        // refresh the report list
        res.redirect("/reports");
      
    });
}

module.exports.performinClosed = (req, res, next) => {
  let id = req.params.id;
  
    let updatereport = report({
      _id: id,
      Status:"Closed",
      
    });

    report.updateOne({_id: id}, updatereport, (err) => {
      
        // refresh the report list
        res.redirect("/reports");
      
    });
}