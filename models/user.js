const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["Patient", "Patient-Navigator", "Caregiver", "Doctor"],
    required: true,
  },
  // Doctor-specific fields
  specialization: {
    type: String,
    required: function() {
      return this.userType === "Doctor";
    }
  },
  experience: {
    type: Number,
    required: function() {
      return this.userType === "Doctor";
    }
  },
  hospital: {
    type: String,
    required: function() {
      return this.userType === "Doctor";
    }
  },
  profileImage: {
    type: String,
    default: "/images/default-doctor.png"
  },
  licenseNumber: {
    type: String,
    required: function() {
      return this.userType === "Doctor";
    }
  }
});

// Add username, hash and salt field to schema
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
