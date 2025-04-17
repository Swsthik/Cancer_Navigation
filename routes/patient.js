const express = require("express");
const router = express.Router();

// Authentication middleware
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

// Patient dashboard route
router.get("/dashboard", isLoggedIn, (req, res) => {
  if (req.user.userType !== "Patient") {
    return res.redirect(`/${req.user.userType.toLowerCase()}/dashboard`);
  }
  const currentUser = {
    fullName: req.user.fullName,
    email: req.user.email,
    id: req.user.id,
  };
  res.render("pages/patient/dashboard.ejs", {
    currentUser: currentUser,
    activePage: "dashboard",
  });
});

router.get("/appointments", isLoggedIn, (req, res) => {
  if (req.user.userType !== "Patient") {
    return res.redirect(`/${req.user.userType.toLowerCase()}/appointments`);
  }
  const currentUser = {
    fullName: req.user.fullName,
    email: req.user.email,
    id: req.user.id,
  };
  res.render("pages/patient/appointments.ejs", {
    currentUser: currentUser,
    activePage: "appointments",
  });
});

router.get("/care-plan", isLoggedIn, (req, res) => {
  if (req.user.userType !== "Patient") {
    return res.redirect(`/${req.user.userType.toLowerCase()}/care-plan`);
  }
  const currentUser = {
    fullName: req.user.fullName,
    email: req.user.email,
    id: req.user.id,
  };
  res.render("pages/patient/care-plan.ejs", {
    currentUser: currentUser,
    activePage: "care-plan",
  });
});

router.get("/complete-registration", isLoggedIn, (req, res) => {
  if (req.user.userType !== "Patient") {
    return res.redirect(
      `/${req.user.userType.toLowerCase()}/complete-registration`
    );
  }
  const currentUser = {
    fullName: req.user.fullName,
    email: req.user.email,
    id: req.user.id,
  };
  res.render("pages/patient/complete-registration.ejs", {
    currentUser: currentUser,
    activePage: "complete-registration",
  });
});

router.get("/initial-registration", isLoggedIn, (req, res) => {
  if (req.user.userType !== "Patient") {
    return res.redirect(
      `/${req.user.userType.toLowerCase()}/initial-registration`
    );
  }
  const currentUser = {
    fullName: req.user.fullName,
    email: req.user.email,
    id: req.user.id,
  };
  res.render("pages/patient/initial-registration.ejs", {
    currentUser: currentUser,
    activePage: "initial-registration",
  });
});

router.get("/feedback", isLoggedIn, (req, res) => {
  if (req.user.userType !== "Patient") {
    return res.redirect(`/${req.user.userType.toLowerCase()}/feedback`);
  }
  const currentUser = {
    fullName: req.user.fullName,
    email: req.user.email,
    id: req.user.id,
  };
  res.render("pages/patient/feedback.ejs", {
    currentUser: currentUser,
    activePage: "feedback",
  });
});

router.get("/initial-registration", isLoggedIn, (req, res) => {
  if (req.user.userType !== "Patient") {
    return res.redirect(
      `/${req.user.userType.toLowerCase()}/initial-registration`
    );
  }
  const currentUser = {
    fullName: req.user.fullName,
    email: req.user.email,
    id: req.user.id,
  };
  res.render("pages/patient/initial-registration.ejs", {
    currentUser: currentUser,
    activePage: "initial-registration",
  });
});

router.get("/patient-profile", isLoggedIn, (req, res) => {
  if (req.user.userType !== "Patient") {
    return res.redirect(`/${req.user.userType.toLowerCase()}/patient-profile`);
  }
  const currentUser = {
    fullName: req.user.fullName,
    email: req.user.email,
    id: req.user.id,
  };
  res.render("pages/patient/patient-profile.ejs", {
    currentUser: currentUser,
    activePage: "patient-profile",
  });
});

router.get("/profile", isLoggedIn, (req, res) => {
  if (req.user.userType !== "Patient") {
    return res.redirect(`/${req.user.userType.toLowerCase()}/profile`);
  }
  const currentUser = {
    fullName: req.user.fullName,
    email: req.user.email,
    id: req.user.id,
  };
  res.render("pages/patient/profile.ejs", {
    currentUser: currentUser,
    activePage: "profile",
  });
});

router.get("/reports", isLoggedIn, (req, res) => {
  if (req.user.userType !== "Patient") {
    return res.redirect(`/${req.user.userType.toLowerCase()}/reports`);
  }
  const currentUser = {
    fullName: req.user.fullName,
    email: req.user.email,
    id: req.user.id,
  };
  res.render("pages/patient/reports.ejs", {
    currentUser: currentUser,
    activePage: "reports",
  });
});

router.get("/cancer-details", isLoggedIn, (req, res) => {
  if (req.user.userType !== "Patient") {
    return res.redirect(`/${req.user.userType.toLowerCase()}/cancer-details`);
  }
  const currentUser = {
    fullName: req.user.fullName,
    email: req.user.email,
    id: req.user.id,
  };
  res.render("pages/patient/cancer-details.ejs", {
    currentUser: currentUser,
    activePage: "cancer-details",
  });
});

// Add other patient routes here

module.exports = router;
