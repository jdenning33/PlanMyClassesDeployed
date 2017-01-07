//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
var SubjectSchema = new Schema({
  name: String,     //Electrical and Computer Engineering
  code: String,     //ECE
  courseIDs: [ mongoose.Schema.Types.ObjectId ]
});

//export our module to use in server.js
module.exports = mongoose.model('Subject', SubjectSchema);
