let mongoose = require("mongoose");

// create a model class
let Report = mongoose.Schema(
  {
    caseID: String,
    date: String,
    name: String,
    details: String,
    Status: String,
    Narrative: String,
    Resolution: String
  },
  {
    collection: "reports",
  }
);

module.exports = mongoose.model("Report", Report);
