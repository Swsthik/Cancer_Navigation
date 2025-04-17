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

  // Mock data for demonstration - replace with actual database queries
  const dashboardData = {
    todayAppointments: 8,
    pendingRequests: 5,
    feedbackCount: 12,
    highRiskPatients: 4,
    recentAppointments: [
      {
        id: 1,
        patientName: "John Doe",
        time: "10:30 AM",
        status: "Completed"
      },
      {
        id: 2,
        patientName: "Jane Smith",
        time: "11:45 AM",
        status: "Pending"
      },
      {
        id: 3,
        patientName: "Robert Johnson",
        time: "2:15 PM",
        status: "Pending"
      }
    ],
    patientStats: {
      newPatients: 15,
      regularPatients: 45,
      highRisk: 8
    }
  };

  res.render("pages/doctor/dashboard.ejs", { 
    title: "Dashboard",
    page: "dashboard",
    doctor: {
      fullName: req.user.fullName,
      specialization: req.user.specialization
    },
    ...dashboardData
  });
});

// Appointment Management route
router.get("/appointment-management", isLoggedIn, (req, res) => {
  if (req.user.userType !== "Doctor") {
    return res.redirect(`/${req.user.userType.toLowerCase()}/dashboard`);
  }
  res.render("pages/doctor/appointment-management.ejs", {
    title: "Appointment Management",
    page: "appointment-management",
    doctor: {
      fullName: req.user.fullName,
      specialization: req.user.specialization
    }
  });
});

// Patient Info route
router.get("/patient-info", isLoggedIn, (req, res) => {
  if (req.user.userType !== "Doctor") {
    return res.redirect(`/${req.user.userType.toLowerCase()}/dashboard`);
  }
  res.render("pages/doctor/patient-info.ejs", {
    title: "Patient Information",
    page: "patient-info",
    doctor: {
      fullName: req.user.fullName,
      specialization: req.user.specialization
    }
  });
});

// Progress Reports route
router.get("/progress-reports", isLoggedIn, (req, res) => {
  if (req.user.userType !== "Doctor") {
    return res.redirect(`/${req.user.userType.toLowerCase()}/dashboard`);
  }

  // Mock data for patients and reports
  const patients = [
    { _id: '1', name: 'John Doe' },
    { _id: '2', name: 'Jane Smith' },
    { _id: '3', name: 'Robert Johnson' }
  ];

  const reports = [
    {
      _id: '1',
      patientName: 'John Doe',
      status: 'improving',
      date: new Date('2024-04-15'),
      summary: 'Patient showing significant improvement in mobility and pain management.',
      progressPercentage: 75
    },
    {
      _id: '2',
      patientName: 'Jane Smith',
      status: 'stable',
      date: new Date('2024-04-14'),
      summary: 'Condition remains stable. Continuing current treatment plan.',
      progressPercentage: 60
    },
    {
      _id: '3',
      patientName: 'Robert Johnson',
      status: 'improving',
      date: new Date('2024-04-13'),
      summary: 'Notable improvement in treatment response. Adjusting medication dosage.',
      progressPercentage: 85
    }
  ];

  res.render("pages/doctor/progress-reports.ejs", {
    title: "Progress Reports",
    page: "progress-reports",
    doctor: {
      fullName: req.user.fullName,
      specialization: req.user.specialization
    },
    patients: patients,
    reports: reports
  });
});

// Feedback Management route
router.get("/feedback-management", isLoggedIn, (req, res) => {
  if (req.user.userType !== "Doctor") {
    return res.redirect(`/${req.user.userType.toLowerCase()}/dashboard`);
  }

  // Mock feedback data - replace with actual database queries
  const feedbacks = [
    {
      _id: '1',
      patientName: 'John Doe',
      rating: 5,
      date: new Date('2024-04-15'),
      comment: 'Excellent care and attention to detail.'
    },
    {
      _id: '2',
      patientName: 'Jane Smith',
      rating: 4,
      date: new Date('2024-04-14'),
      comment: 'Very professional and helpful.'
    },
    {
      _id: '3',
      patientName: 'Robert Johnson',
      rating: 5,
      date: new Date('2024-04-13'),
      comment: 'Great experience, very thorough explanation.'
    }
  ];

  res.render("pages/doctor/feedback-management.ejs", {
    title: "Feedback Management",
    page: "feedback-management",
    doctor: {
      fullName: req.user.fullName,
      specialization: req.user.specialization
    },
    feedbacks: feedbacks
  });
});

// Resources route
router.get("/resources", isLoggedIn, (req, res) => {
  if (req.user.userType !== "Doctor") {
    return res.redirect(`/${req.user.userType.toLowerCase()}/dashboard`);
  }
  res.render("pages/doctor/resources.ejs", {
    title: "Resources",
    page: "resources",
    doctor: {
      fullName: req.user.fullName,
      specialization: req.user.specialization
    }
  });
});

// Profile route
router.get("/profile", isLoggedIn, (req, res) => {
  if (req.user.userType !== "Doctor") {
    return res.redirect(`/${req.user.userType.toLowerCase()}/dashboard`);
  }

  // Mock doctor data - replace with actual database query
  const doctorData = {
    fullName: req.user.fullName,
    specialization: req.user.specialization,
    email: req.user.email || 'doctor@example.com',
    experience: req.user.experience || 5,
    phone: req.user.phone || '(555) 123-4567',
    hospital: req.user.hospital || 'Main City Hospital',
    address: req.user.address || '123 Medical Center Drive',
    profileImage: req.user.profileImage || '/images/default-doctor.png'
  };

  res.render("pages/doctor/profile.ejs", {
    title: "Profile",
    page: "profile",
    doctor: doctorData
  });
});

// Settings route
router.get("/settings", isLoggedIn, (req, res) => {
  if (req.user.userType !== "Doctor") {
    return res.redirect(`/${req.user.userType.toLowerCase()}/dashboard`);
  }
  res.render("pages/doctor/settings.ejs", {
    title: "Settings",
    page: "settings",
    doctor: {
      fullName: req.user.fullName,
      specialization: req.user.specialization
    }
  });
});

// Cancer Details route
router.get("/cancer-details", isLoggedIn, (req, res) => {
  if (req.user.userType !== "Doctor") {
    return res.redirect(`/${req.user.userType.toLowerCase()}/dashboard`);
  }

  // Mock data for patients - replace with actual database query
  const patients = [
    { id: '1', fullName: 'John Doe' },
    { id: '2', fullName: 'Jane Smith' },
    { id: '3', fullName: 'Robert Johnson' }
  ];

  res.render("pages/doctor/cancer-details.ejs", {
    title: "Cancer Details",
    page: "cancer-details",
    doctor: {
      fullName: req.user.fullName,
      specialization: req.user.specialization
    },
    patients: patients
  });
});

module.exports = router;
