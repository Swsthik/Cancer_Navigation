const express = require("express");
const router = express.Router();

// Authentication middleware
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

// Caregiver authorization middleware
const isCaregiverUser = (req, res, next) => {
  if (req.user.userType !== "Caregiver") {
    return res.redirect(`/${req.user.userType.toLowerCase()}/dashboard`);
  }
  next();
};

// Apply both middlewares to all caregiver routes
router.use(isLoggedIn, isCaregiverUser);

// Caregiver dashboard route
router.get("/dashboard", (req, res) => {
  res.render("pages/caregiver/dashboard", { 
    user: req.user,
    currentPage: 'dashboard'
  });
});

// Patients route
router.get("/patients", (req, res) => {
  res.render("pages/caregiver/patients", {
    user: req.user,
    currentPage: 'patients'
  });
});

// Appointments route
router.get("/appointments", (req, res) => {
  res.render("pages/caregiver/appointments", {
    user: req.user,
    currentPage: 'appointments'
  });
});

// Medications route
router.get("/medications", (req, res) => {
  res.render("pages/caregiver/medications", {
    user: req.user,
    currentPage: 'medications'
  });
});

// Care Notes route
router.get("/care-notes", (req, res) => {
  res.render("pages/caregiver/care-notes", {
    user: req.user,
    currentPage: 'care-notes'
  });
});

// Tasks route
router.get("/tasks", (req, res) => {
  res.render("pages/caregiver/tasks", {
    user: req.user,
    currentPage: 'tasks'
  });
});

// Profile route
router.get("/profile", (req, res) => {
  res.render("pages/caregiver/profile", {
    user: req.user,
    currentPage: 'profile'
  });
});

module.exports = router;
