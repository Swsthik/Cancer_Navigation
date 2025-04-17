const express = require("express");
const router = express.Router();

// Authentication middleware
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

// Navigator dashboard route
router.get("/dashboard", isLoggedIn, (req, res) => {
  if (req.user.userType !== "Patient-Navigator") {
    return res.redirect(`/${req.user.userType.toLowerCase()}/dashboard`);
  }
  res.render("pages/navigator/dashboard.ejs", { 
    user: req.user,
    activePage: "dashboard"
  });
});


router.get("/appointment-management", isLoggedIn, (req, res) => {
  if (req.user.userType !== "Patient-Navigator") {
    return res.redirect(`/${req.user.userType.toLowerCase()}/appointment-management`);
  }
  res.render("pages/navigator/appointment-management.ejs", {
    user: req.user,
    activePage: "appointment-management",
  });
});

router.get("/care-plan", isLoggedIn, (req, res) => {
  if (req.user.userType !== "Patient-Navigator") {
    return res.redirect(`/${req.user.userType.toLowerCase()}/care-plan`);
  }
  res.render("pages/navigator/care-plan.ejs", {
    user: req.user,
    activePage: "care-plan",
  });
});

router.get("/learning", isLoggedIn, (req, res) => {
  if (req.user.userType !== "Patient-Navigator") {
    return res.redirect(`/${req.user.userType.toLowerCase()}/learning`);
  }
  res.render("pages/navigator/learning.ejs", {
    user: req.user,
    activePage: "learning",
  });
});

router.get("/nav-signup", isLoggedIn, (req, res) => {
  if (req.user.userType !== "Patient-Navigator") {
    return res.redirect(`/${req.user.userType.toLowerCase()}/nav-signup`);
  }
  res.render("pages/navigator/nav-signup.ejs", {
    user: req.user,
    activePage: "nav-signup",
  });
});

router.get("/patient-management", isLoggedIn, (req, res) => {
  if (req.user.userType !== "Patient-Navigator") {
    return res.redirect(`/${req.user.userType.toLowerCase()}/patient-management`);
  }
  res.render("pages/navigator/patient-management.ejs", {
    user: req.user,
    activePage: "patient-management",
  });
});


router.get("/progress-tracking", isLoggedIn, (req, res) => {
  if (req.user.userType !== "Patient-Navigator") {
    return res.redirect(`/${req.user.userType.toLowerCase()}/progress-tracking`);
  }
  res.render("pages/navigator/progress-tracking.ejs", {
    user: req.user,
    activePage: "progress-tracking",
  });
});

router.get("/resources", isLoggedIn, (req, res) => {
  if (req.user.userType !== "Patient-Navigator") {
    return res.redirect(`/${req.user.userType.toLowerCase()}/resources`);
  }
  res.render("pages/navigator/resources.ejs", {
    user: req.user,
    activePage: "resources",
  });
});


// Add other navigator routes here

module.exports = router;
