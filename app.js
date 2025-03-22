if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const User = require("./models/user");

var app = express();

const ATLASDB_URL = process.env.ATLASDB_URL;

// Connect to MongoDB
mongoose
  .connect(ATLASDB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Configure middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Configure session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "our little secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport-Local Strategy
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Authentication middleware
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

app.get("/login", (req, res) => {
  res.render("pages/auth/login.ejs");
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/navigator/dashboard",
    failureRedirect: "/login",
  })
);

app.get("/signup", (req, res) => {
  res.render("pages/auth/signup.ejs");
});

app.post("/signup", async (req, res) => {
  try {
    const {
      username,
      password,
      fullName,
      email,
      age,
      phone,
      sex,
      address,
      userType,
    } = req.body;
    const user = new User({
      username,
      fullName,
      email,
      age,
      phone,
      sex,
      address,
      userType,
    });
    await User.register(user, password);
    passport.authenticate("local")(req, res, function () {
      res.redirect("/navigator/dashboard");
    });
  } catch (error) {
    console.error(error);
    res.redirect("/signup");
  }
});

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

app.get("/navigator/dashboard", isLoggedIn, (req, res) => {
  res.render("pages/navigator/dashboard.ejs");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on: http://localhost:${process.env.PORT}`);
});

app.get("*", (req, res) => {
  res.redirect("/login");
});

module.exports = app;
