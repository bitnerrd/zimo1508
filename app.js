require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const cors = require("cors");
app.use(cors());
//connection to database
const db = require("./auth/keys").mongoURI;
mongoose.set("strictQuery", false);
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("Database Connected . . .");
  })
  .catch((err) => console.log(err));

// body-parser
app.use(express.urlencoded({ extended: true }));

// view engine
// app.use(expressLayouts);
app.set("view engine", "ejs");

// static files
app.use(express.static(__dirname + "/public"));

// session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// connect-flash
app.use(flash());

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// routes
app.use("/user", require("./routes/users"));
app.use("/", require("./routes/index"));

const port = process.env.PORT;
app.listen(port, console.log(`Server is up on ${port}`));
