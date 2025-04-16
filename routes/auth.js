const express = require("express");
const passport = require("passport");
const User = require("../models/user");
const router = express.Router();

// Login page
router.get("/login", (req, res) => {
  res.render("pages/auth/login.ejs");
});

// Login post route
router.post("/login", (req, res, next) => {
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
        case "Doctor":
          return res.status(200).json({
            success: true,
            redirect: "/doctor/dashboard",
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

// Signup page
router.get("/signup", (req, res) => {
  res.render("pages/auth/signup.ejs");
});

// Signup post route
router.post("/signup", async (req, res) => {
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

// Logout route
router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

module.exports = router;
