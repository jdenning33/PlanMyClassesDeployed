//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
var CourseSchema = new Schema({
  courseIDs: [mongoose.schema.Types.ObjectId],        // Intermediate Programming
  scheduleIDs: [mongoose.Schema.Types.ObjectId]  // [ 1200001231312, 010233231123 ]
});

//export our module to use in server.js
module.exports = mongoose.model('Course', CourseSchema);
