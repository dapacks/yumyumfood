const express = require('express');
const router = express.Router();
const mongoDB=require("./db")
mongoDB();
/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/api',require("./createUser")) 

router.use('/api',require("./DisplayData")) 

router.use('/api',require("./orderData"))

module.exports = router;
