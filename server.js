const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const sqlite = require('sql.js');
const filebuffer = fs.readFileSync('db/usda-nnd.sqlite3');
var bodyParser = require('body-parser');
var dataAPIrouter = require('./dataAPIrouter');

const DB_LINK = 'mongodb://heroku_rp2hk3f2:i5kqtfdb4quirgi5bh0maletp4@ds157298.mlab.com:57298/heroku_rp2hk3f2';

const app = express();

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
var uristring =
  process.env.MONGODB_URI ||
  DB_LINK;

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});

//new
//now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});
//new


// const COLUMNS = [
//   'carbohydrate_g',
//   'protein_g',
//   'fa_sat_g',
//   'fa_mono_g',
//   'fa_poly_g',
//   'kcal',
//   'description',
// ];
// app.get('/api/food', (req, res) => {
//   const param = req.query.q;
//
//   if (!param) {
//     res.json({
//       error: 'Missing required parameter `q`',
//     });
//     return;
//   }
//
//   // WARNING: Not for production use! The following statement
//   // is not protected against SQL injections.
//   const r = db.exec(`
//     select ${COLUMNS.join(', ')} from entries
//     where description like '%${param}%'
//     limit 100
//   `);
//
//   if (r[0]) {
//     res.json(
//       r[0].values.map((entry) => {
//         const e = {};
//         COLUMNS.forEach((c, idx) => {
//           // combine fat columns
//           if (c.match(/^fa_/)) {
//             e.fat_g = e.fat_g || 0.0;
//             e.fat_g = (
//               parseFloat(e.fat_g, 10) + parseFloat(entry[idx], 10)
//             ).toFixed(2);
//           } else {
//             e[c] = entry[idx];
//           }
//         });
//         return e;
//       })
//     );
//   } else {
//     res.json([]);
//   }
// });

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
