var express = require('express');

var router = express.Router();


const bodyParser = require("body-parser")


router.use(bodyParser.urlencoded({ extended: true }));

// to change port to 5000 
const dotenv = require('dotenv')
dotenv.config()

// to deal with react 
var cors = require('cors')
router.use(cors())


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

router.use(
  express.urlencoded({ extended: true })
);
  


