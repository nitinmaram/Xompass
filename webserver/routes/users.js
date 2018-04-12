var express = require('express');
var router = express.Router();

/* GET users listing. */
var reqest = require("request")
console.log("before req")
let inputObj = {"Inputs": {
               "input1":
               [
                   {
                           "Location": "Laguna Verde",
                           "Month": "Dec",
                           "Date Time": "2017-12-15T16:09:00Z",
                           "Temperature": "38.99",
                           "Humidity": "23.62",
                           "Wind Velocity(km/h)": "15",
                           "Rain(mm)": "1.52",
                           "Risk": "High"
                   }
               ]
       }
       }
router.get('/', function(req, res, next) {
  reqest.post({
  headers: {'content-type' : 'application/json',
"Authorization": "Bearer uFxlfR25UwQbK/CeBgWVHAC+Xo1o7Xd4UG/vkqP62v2q08T2s5oUZPZx+K/g8El9oNyJ8uCXNc0BGKO1pFpShQ=="
},
  url:     'https://ussouthcentral.services.azureml.net/workspaces/9d7ab6472efc493794d4355e21dc62b2/services/e90e85f3cbef42b7a635f70db21f07e6/execute?api-version=2.0&format=swagger',
  body:    JSON.stringify(inputObj)
}, function(error, response, body){
  console.log(body,"body");
  res.send(body);

	 console.log(error,"error");
});

});

module.exports = router;
