// moddules for node and express
let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");

//modules for authentication
let passport = require("passport");
let session = require("express-session");
let passportLocal = require("passport-local");
let localStrategy = passportLocal.Strategy;
let flash = require("connect-flash");

// import "mongoose" - required for DB Access
let mongoose = require("mongoose");
// URI
let DB = require("./db");

mongoose.connect(process.env.URI || DB.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let mongoDB = mongoose.connection;
mongoDB.on("error", console.error.bind(console, "Connection Error:"));
mongoDB.once("open", () => {
  console.log("Fine Team Database Connected. Project Part 4- final release");
});

// define routers
let index = require("../routes/index"); // top level routes
let reports = require("../routes/reports"); // routes for products

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /client
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../client")));
// app.use(express.static(path.join(__dirname, "../../node_modules")));




//setup express session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

//initialize flash
app.use(flash());

// Initializing Passport
app.use(passport.initialize());
  
// Starting the session
app.use(passport.session());

//passport user configuration





//create a User Model Instance
let userModel = require("../models/user");
let User = userModel.User;

//implement a user authentication strategy
passport.use(User.createStrategy());

//serialize and deserialize the User Info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// route redirects
app.use("/", index);
app.use("/reports", reports);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
