const mongoose = require("mongoose");

// Define the schema
let userdata = new mongoose.Schema({
  firstname: { type: String, required: true }, // Use lowercase 'type' and 'required'
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  file: {type:String,require:true},
  filepath: {type:String,require:true},

});

// Create and export the model
module.exports = mongoose.model("User", userdata);
