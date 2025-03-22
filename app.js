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

app.post("/login", (req, res, next) => {
  const { username, password, userType } = req.body;

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "An error occurred during login",
      });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    // Check if selected user type matches the registered user type
    if (user.userType !== userType) {
      return res.status(401).json({
        success: false,
        message: `You are registered as a ${user.userType}. Please select the correct user type.`,
      });
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "An error occurred during login",
        });
      }

      // Redirect based on user type
      switch (user.userType) {
        case "Patient":
          return res.status(200).json({
            success: true,
            redirect: "/patient/dashboard",
          });
        case "Patient-Navigator":
          return res.status(200).json({
            success: true,
            redirect: "/navigator/dashboard",
          });
        case "Caregiver":
          return res.status(200).json({
            success: true,
            redirect: "/caregiver/dashboard",
          });
        default:
          return res.status(401).json({
            success: false,
            message: "Invalid user type",
          });
      }
    });
  })(req, res, next);
});

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

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          existingUser.username === username
            ? "Username already exists"
            : "Email already registered",
      });
    }

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

    // Log the user in after registration
    passport.authenticate("local")(req, res, function () {
      res.status(200).json({
        success: true,
        message: "Account created successfully!",
        redirect: `/${userType.toLowerCase()}/dashboard`,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred during registration",
    });
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

app.get("/patient/dashboard", isLoggedIn, (req, res) => {
  if (req.user.userType !== "Patient") {
    return res.redirect(`/${req.user.userType.toLowerCase()}/dashboard`);
  }
  res.render("pages/patient/dashboard.ejs", { user: req.user });
});

app.get("/navigator/dashboard", isLoggedIn, (req, res) => {
  if (req.user.userType !== "Patient-Navigator") {
    return res.redirect(`/${req.user.userType.toLowerCase()}/dashboard`);
  }
  res.render("pages/navigator/dashboard.ejs", { user: req.user });
});

app.get("/caregiver/dashboard", isLoggedIn, (req, res) => {
  if (req.user.userType !== "Caregiver") {
    return res.redirect(`/${req.user.userType.toLowerCase()}/dashboard`);
  }
  res.render("pages/caregiver/dashboard.ejs", { user: req.user });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on: http://localhost:${process.env.PORT}`);
});

app.get("*", (req, res) => {
  res.redirect("/login");
});

module.exports = app;
