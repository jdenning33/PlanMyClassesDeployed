//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
var CourseSchema = new Schema({
  title: String,        // Intermediate Programming
  subjectID: mongoose.Schema.Types.ObjectId,      // ECE
  number: String,         // 206L
  description: String,  // An introductory course into ...
  credits: [ Number ],      // [ 3 , 4 ]
  semesters: [ String ],
  campusi: [ String ],
  sectionIDs: [ mongoose.Schema.Types.ObjectId ]  // [ 1200001231312, 010233231123 ]
});

CourseSchema.virtual('code').get(function () {
  // return this.subject + ' ' + this.number;
});

//export our module to use in server.js
module.exports = mongoose.model('Course', CourseSchema);
