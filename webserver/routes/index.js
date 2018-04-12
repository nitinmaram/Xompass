var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.send("Hello index");
});

module.exports = router;
