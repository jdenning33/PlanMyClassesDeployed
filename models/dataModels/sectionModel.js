//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
var SectionSchema = new Schema({
  courseID: mongoose.Schema.Types.ObjectId,           // ECE 131 -> 001923412
  number: String,               // 004
  crn:    Number,
  semester: String,
  campus: String,
  instructors:  [ { name:   { first : String,
                              last  : String
                            },
                    email : String
                  }
                ],
  times:        [ { days  : [String],
                    start : Number,
                    end   : Number,
                    date  : { start : String,
                              end   : String
                    }
                  }
                ]
  /* [ {days:[M,W,F], start:0900, end:0950},
        {days:[R], start:1015, end:1230} ] */
});

SectionSchema.virtual('code').get(function () {
  // return this.subject + ' ' + this.number;
});

//export our module to use in server.js
module.exports = mongoose.model('Section', SectionSchema);
