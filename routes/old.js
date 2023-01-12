// var express = require('express');
// var router = express.Router();

// // const multer = require("multer");
// // var fs = require('fs');
// // var path = require('path');

// const Film = require("../models/film.js")
// var mongoose = require('mongoose');

// // const bodyParser = require('body-parser');
// // router.use(
// //     bodyParser.urlencoded({
// //       extended: true
// //     })
// // )
// // router.use(bodyParser.json());




// /********************************************* 
//  * Initialize database and connection
//  *********************************************/
// mongoose.connect('mongodb://127.0.0.1:27017/filmDB', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.Promise = global.Promise; // Global use of mongoose

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function (callback) { // Add the listener for db events 
//     console.log("Connected to db");

//     // // Create Database scheme 
//     // var filmSchema = mongoose.Schema({
//     //   _Id: String,
//     //   tilte: String,
//     //   image: {
//     //       data: Buffer,
//     //       contentType: String
//     //   },
//     //   beenWatched : Boolean,
//     //   cast: Array,
//     //   description: String,
//     //   length:String
//     // },{versionKey: false}); // to  disable the version key when each document is created by Mongoose

//   // Create scheme model
//   // var Film = mongoose.model('film', filmSchema )

//   // module.exports = new mongoose.model('Film', filmSchema);


//   var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now())
//     }
//   })
//   var upload = multer({ storage: storage })


//   router.get('/', (req, res) => {
//     Film.find({}, (err, films) => {
//         if (err) {
//             console.log(err);
//             res.status(500).send('An error occurred', err);
//         }
//         else {
//           var jsonObj = JSON.stringify(films);
//           res.contentType('application/json');
//           res.send(jsonObj);
//         }
//     });
// });

// //   router.post('/', upload.single('film'), (req, res, next) => {
// //     var obj = {
// //       id: req.body._Id, 
// //       title: req.body.tilte, 
// //       beenWatched: req.body.beenWatched,
// //       cast: req.body.cast, 
// //       description: req.body.description,
// //       length:req.body.length,
// //       img: {
// //         data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
// //         contentType: 'image/png'
// //       }
// //     }
// //     // obj.create(obj, (err, film) => {
// //     //     if (err) {
// //     //         console.log(err);
// //     //     }
// //     //     else {
// //     //       film.save();
// //     //         res.redirect('/');
// //     //     }
// //     // });

// //     obj.save();

// //     // obj.save(function(err) {
// //     //   if(err) return console.error(err);
// //     // });
// // });



// router.post('/', upload.single('film'),function(req, res, next) {
//   var film = {
//     id: req.body._Id, 
//     title: req.body.tilte, 
//     beenWatched: req.body.beenWatched,
//     cast: req.body.cast, 
//     description: req.body.description,
//     length:req.body.length,
//     img: {
//       data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
//       contentType: 'image/png'
//     }
//   }

//   // Save  to db
//   film.save(function(err) {
//       if(err) return console.error(err);
//   });

//   // var jsonObj = JSON.stringify(film);
//   // res.contentType('application/json');
//   // res.send(jsonObj);

// });

// });
// module.exports = router;


