const mongoose = require('mongoose');
// Initialize mongoose first
mongoose.Schema.Types = mongoose.Schema.Types || mongoose.Types;

// Now require schema-jsonschema
const schemaToJson = require('mongoose-schema-jsonschema');
schemaToJson(mongoose);

// Import your schema - make sure patientSchema is actually a mongoose schema object
const patientSchema = require('./patientProfile.js');

// Now you can convert the schema to JSON
const jsonSchema = patientSchema.jsonSchema();
console.log(jsonSchema);