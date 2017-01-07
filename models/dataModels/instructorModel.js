//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
var InstructorSchema = new Schema({
  name      : { first: String, last: String },
  email     : String,
  rmpID     : String, //rateMyProfessor
  courseIDs : [ mongoose.Schema.Types.ObjectId ]  //courses they teach
});

//export our module to use in server.js
module.exports = mongoose.model('Instructor', InstructorSchema);
