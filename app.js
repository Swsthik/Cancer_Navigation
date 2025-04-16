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
const MongoStore = require("connect-mongo");
const User = require("./models/user");

// Import routes
const authRoutes = require("./routes/auth");
const patientRoutes = require("./routes/patient");
const navigatorRoutes = require("./routes/navigator");
const caregiverRoutes = require("./routes/caregiver");
const doctorRoutes = require("./routes/doctor");

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

// Configure session with improved persistence
app.use(
  session({
    secret: process.env.SESSION_SECRET || "our little secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      secure: process.env.NODE_ENV === "production", // secure in production only
    },
    store: MongoStore.create({
      mongoUrl: ATLASDB_URL,
      touchAfter: 24 * 3600, // time period in seconds to refresh session (1 day)
    }),
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport-Local Strategy
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Use route files
app.use("/", authRoutes);
app.use("/patient", patientRoutes);
app.use("/navigator", navigatorRoutes);
app.use("/caregiver", caregiverRoutes);
app.use("/doctor", doctorRoutes);

// Catch-all route - should be last
app.get("*", (req, res) => {
  res.redirect("/login");
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on: http://localhost:${process.env.PORT}`);
});

module.exports = app;
