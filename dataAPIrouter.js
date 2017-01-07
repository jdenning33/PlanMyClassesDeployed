var subjectModel     = require('./models/dataModels/subjectModel'   );
var courseModel      = require('./models/dataModels/courseModel'    );
var sectionModel     = require('./models/dataModels/sectionModel'   );
var instructorModel  = require('./models/dataModels/instructorModel');

const dataURL = 'http://localhost:3001/api';
var COLLECTIONS_ENUM = {
  SUBJECTS:     { key:1, url:`${dataURL}/subjects`  , name:'subjects'   },
  COURSES:      { key:2, url:`${dataURL}/courses`   , name:'courses'    },
  SECTIONS:     { key:3, url:`${dataURL}/sections`  , name:'sections'   },
  INSTRUCTORS:  { key:4, url:`${dataURL}/instructors`, name:'instructors'}
}

// gets the mongoose model based on the collection name
// the name is passed in the link i.e. api/<collection.name>
const getModel = ( name ) => {
  switch (name) {
    case COLLECTIONS_ENUM.SUBJECTS.name:
      return subjectModel;
    case COLLECTIONS_ENUM.COURSES.name:
      return courseModel;
    case COLLECTIONS_ENUM.SECTIONS.name:
      return sectionModel;
    case COLLECTIONS_ENUM.INSTRUCTORS.name:
      return instructorModel;
    default:
      return;
  }
}

var dataAPIrouter = {
  addToRouter: (router) => {
    router.route('/:collection')

      .get(function(req, res) {
        let model = getModel(req.params.collection);

        model.find(function(err, data) {
          if (err)
            res.send(err);
          res.json(data)
        });

      })

      .delete(function(req,res) {
        let model = getModel(req.params.collection);
        model.remove( {}, function(err, data) {
          if (err)
            res.send(err);
          res.json( { message: 'cookies and cream puffs!' } );
        })
      })

      //post new data to the specified collection
      .post(function(req, res) {
        let model = getModel(req.params.collection);
        var data = new model();

        // _id and _v are the final two fields, err if we try to set them
        for(let key in data.schema.paths){
          if( key === '_id' || key === '__v' ) continue;
          data[key] = req.body[key];
        };

        data.save(function(err, savedData) {
          if (err)
            res.send(err);
          res.json( savedData );
        });
      });

    router.route('/:collection/:data_id')
      .get(function(req, res) {
        let model = getModel(req.params.collection);
        model.findById(req.params.data_id, function(err, data) {
          if (err)
            res.send(err);
          //responds with a json object of our database data.
          res.json(data)
        });
      })

      .put(function(req, res) {
        let model = getModel(req.params.collection);
        model.findById(req.params.data_id, function(err, data) {
          if (err)
            res.send(err);

          if (!data) res.json('error: no data found');

          // iterate through each field of the model, and update it if requested
          // _id and _v are the final two fields, err if we try to set them
          for(let key in data.schema.paths){
            if( key === '_id' || key === '__v' ) continue;
            (req.body[key]) ? data[key] = req.body[key] : null;
          };

          // save it to mongo
          data.save(function(err, savedData) {
            if (err)
              res.send(err);
            res.json( savedData );
          });
        });
      })

      //removes a single item from our db
      .delete(function(req, res) {
        //selects the data by its ID, then removes it.
        let model = getModel(req.params.collection);
        model.remove({ _id: req.params.data_id }, function(err, data) {
          if (err)
            res.send(err);
          res.json({ message: 'a '+req.params.collection+' item has been deleted' })
        })
      });

  }
};

module.exports = dataAPIrouter;
