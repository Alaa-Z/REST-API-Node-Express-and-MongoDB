const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// for image upload
const multer = require('multer');

// import film module
const Film = require("../models/film.js")

// make storage for images
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname )
  }
})

// to filter the image type 
const fileFilter = function (req, file, cb) {
  // reject file
  if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/png'){
  cb(null, true)
  } else {
    cb(null, false)
  }
}
var upload = multer({ storage: storage, fileFilter : fileFilter});


/********************************************* 
 * Initialize database and connection
 *********************************************/

// mongoose.connect('mongodb://127.0.0.1:27017/filmDB', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.Promise = global.Promise; // Global use of mongoose
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));

//Connections to MongoDB, Atlas with Mongoose
const url = 'mongodb+srv://alaa:passwordAlaa@mern.a6mnzuw.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(url, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

//Hantering vid anslutning
const db = mongoose.connection;
db.once('open', function (callback) { // Add the listener for db events 
  console.log("Connected to db");

  /** -------------------------Add new film ------------------------- **/
  router.post('/',upload.single('filmImage'),(req, res, next) => {
    // console.log(req.file)
    const film = new Film({
      _id: req.body._id, 
      title: req.body.title, 
      beenWatched: req.body.beenWatched,
      description: req.body.description,
      filmLength:req.body.filmLength,
      filmImage:req.file.path
    });
    film
    .save()
    .then(result => {
      console.log(result)
      res.status(201).json({
        message: "Handeling post request to / films",
        createdFilm : {
          title: result.title,
          beenWatched: result.beenWatched,
          description :result.description,
          filmLength: result.filmLength,
          _id: result._id,          
          filmImage:result.filmImage,
          request : {
            type: "POST",
            url: "http://localhost:5000/films/"+result._id
          }
        }
     });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error : err
      })
    });
  });

  /** ------------------------- Get All films  ------------------------- **/
  router.get('/', (req, res, next) => {
    Film.find()
    .select("title beenWatched description _id filmLength filmImage")
    .exec()
    .then(docs =>{
      console.log(docs);
      const response = {
        count : docs.length,
        films: docs.map(doc =>{
          return{
            title: doc.title,
            beenWatched: doc.beenWatched,
            description :doc.description,
            filmLength: doc.filmLength,
            filmImage: doc.filmImage,
            _id: doc._id, 
            request : {
              type: "GET",
              url: "http://localhost:5000/films/"+doc._id
            }
          }
        })
      }
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
      error: err
      });
    });
  })

  /** -------------------------Get unique film by id ------------------------- **/
  router.get('/:filmId', (req, res, next) =>{
    const id = req.params.filmId
    Film.findById(id)
    .select("title beenWatched  description _id filmLength filmImage")
    .exec()
    .then(doc => {
      console.log(doc)
      if(doc){
        res.status(200).json({
          film: doc,
          request : {
            type: "GET",
            url: "http://localhost:5000/films/"+doc._id
          }
          
        });
      } else {
        res.status(404).json({
          "message": "No data found for the provided id"
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error : err})
    })
  })

  /** -------------------------Delete film ------------------------- **/
  router.delete('/:filmId', (req, res, next) => {
    const id = req.params.filmId
    Film.remove({_id: id})
    .exec()
    .then(result=>{
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error : err})
    })
  })


  /** -------------------------uppdate film ------------------------- **/
  router.put('/:id', upload.single('filmImage'), (req, res) => {
    const id = req.params.id;
    const body = req.body;

    const title = body.title;
    const description = body.description;
    const beenWatched = body.beenWatched;
    const filmLength = body.filmLength
    const updates = {
        title,
        description,
        beenWatched,
        filmLength,
        // filmId
    };

    if (req.file) {
        const filmImage = req.file.path;
        updates.filmImage = filmImage;
    }

    Film.findOneAndUpdate({_id: id}, {
            $set: updates
        }, {
            new: true
        }).then(result => {
              res.status(200).json({
                  message: 'Film Updated',
                  updatedFilm : {
                    title: result.title,
                    beenWatched: result.beenWatched,
                    description :result.description,
                    filmLength: result.filmLength,
                    filmImage:result.filmImage,
                    request : {
                      type: "POST",
                      url: "http://localhost:5000/films/"+result._id
                    }
                  }
              });
          })
});

});
module.exports = router;


