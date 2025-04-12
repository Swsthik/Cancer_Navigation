// models/Patient.js (Updated Schema)
const mongoose = require('mongoose');
const arrayValidator = (min, max) => ({
    validator: (value) => value.length >= min && value.length <= max,
    message: `Must have between ${min} and ${max} items`
  });

const IdentifierSchema = new mongoose.Schema({
  system: { type: String, required: true },
  value: { type: String, required: true }
});

const HumanNameSchema = new mongoose.Schema({
  use: String,
  family: { type: String, required: true },
  given: [String],
  prefix: [String],
  suffix: [String]
});

const AddressSchema = new mongoose.Schema({
  use: String,
  type: String,
  line: [String],
  city: String,
  district: String,
  state: String,
  postalCode: String,
  country: String,
  period: {
    start: Date,
    end: Date
  }
});

const ContactPointSchema = new mongoose.Schema({
  system: { type: String, enum: ['phone', 'fax', 'email', 'pager', 'url', 'sms', 'other'] },
  value: String,
  use: { type: String, enum: ['home', 'work', 'temp', 'old', 'mobile'] },
  rank: Number,
  period: {
    start: Date,
    end: Date
  }
});

const ExtensionSchema = new mongoose.Schema({
  url: { type: String, required: true },
  valueCodeableConcept: {
    coding: [{
      system: String,
      code: String,
      display: String
    }]
  },
  valueCode: String
});

const PatientSchema = new mongoose.Schema({
  meta: {
    profile: {
      type: [String],
      default: ['http://hl7.org/fhir/us/mcode/StructureDefinition/mcode-cancer-patient'],
      required: true
    }
  },
  identifier: {
    type: [IdentifierSchema],
    validate: arrayValidator(1, 5)
  },
  name: {
    type: [HumanNameSchema],
    validate: arrayValidator(1, 3) // At least 1 name, max 3
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other', 'unknown'],
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  deceasedBoolean: Boolean,
  deceasedDateTime: Date,
  address: [AddressSchema],
  telecom: [ContactPointSchema],
  extension: {
    type: [ExtensionSchema],
    validate: {
      validator: function(extensions) {
        const requiredUrls = [
          'http://hl7.org/fhir/us/core/StructureDefinition/us-core-race',
          'http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity',
          'http://hl7.org/fhir/us/core/StructureDefinition/us-core-birthsex',
          'http://hl7.org/fhir/us/core/StructureDefinition/us-core-genderIdentity'
        ];
        return requiredUrls.every(url => 
          extensions.some(ext => ext.url === url)
        );
      },
      message: 'Missing required extensions'
    }
  }
});

function arrayLimit(min, max) {
  return {
    validator: function(value) {
      return value.length >= (min || 0) && (!max || value.length <= max);
    },
    message: `Array must contain between ${min} and ${max} items`
  };
}

module.exports = mongoose.model('Patient', PatientSchema);