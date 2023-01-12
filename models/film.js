var mongoose = require('mongoose');

var filmSchema = mongoose.Schema({
    _Id: String,
    title: String,
    beenWatched: Boolean,
    description: String,
    filmLength: String,
    filmImage : String
  },{versionKey: false}); // to  disable the version key when each document is created by Mongoose


  module.exports = mongoose.model("Film", filmSchema );