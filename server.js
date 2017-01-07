//first we import our dependencies...
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var dataAPIrouter = require('./dataAPIrouter');
var DB_LINK = 'mongodb://jdenning33:qBert002@ds145138.mlab.com:45138/planmyclasses';

//and create our instances
var app = express();
var router = express.Router();

//set our port to either a predetermined port number if you have set it up, or 3001
app.set('port', (process.env.API_PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

//db config
// mongoose.Promise = global.Promise;
// mongoose.connect(DB_LINK);

//now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//now  we can set the route path & initialize the API
// router.get('/', function(req, res) {
//   res.json({ message: 'API Initialized!'});
// });


// dataAPIrouter.addToRouter(router);

//Use our router configuration when we call /api
// app.use('/api', router);

//starts the server and listens for requests
app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
