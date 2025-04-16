const express = require("express");
const router = express.Router();

// Authentication middleware
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

// Doctor dashboard route
router.get("/dashboard", isLoggedIn, (req, res) => {
  if (req.user.userType !== "Doctor") {
    return res.redirect(`/${req.user.userType.toLowerCase()}/dashboard`);
  }
  res.render("pages/doctor/dashboard.ejs", { user: req.user });
});

// Add other doctor routes here

module.exports = router;
