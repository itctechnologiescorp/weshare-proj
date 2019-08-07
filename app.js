
var express = require('express')
var app = express();
var Router       = require('router')
var cors = require('cors')
var router = Router();
var bodyParser   = require('body-parser');
var stringify = require('json-stringify-safe');

app.use(cors());
// adding middlewear - bodyparser
//app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );

app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});


//creating routes
app.use('/create', router);
app.get('/about',function(req,res){
  console.log("Value");
});
app.post('/create',function(req,res){
  //res.send(req.body.Key);
  var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  accessKeyId: 'AKIAJ4EY6RI2ZVHTYGMA',
  secretAccessKey: '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',
  endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Profiledetails";

var params = {
    TableName : table,
    Item : {
      "Key": 100004,
      "Region": req.body.Region,
      "Lang": req.body.Lang,
      "Name": req.body.Name,
      "isProvider": req.body.isProvider,
      "isCar": req.body.isCar,
      "Addr1": req.body.Addr1,
      "Addr2": req.body.Addr2,
      "City": req.body.City,
      "Country": req.body.Country,
      "EmailId": req.body.EmailId,
      "Employer": req.body.Employer,
      "Gender": req.body.Gender,
      "Idproof": req.body.Idproof,
      "Make": req.body.Make,
      "Mileage": req.body.Mileage,
      "Model": req.body.Model,
      "PhoneNo": req.body.PhoneNo,
      "RCBookCopy": req.body.RCBookCopy,
      "RegNo": req.body.RegNo,
      "State": req.body.State,
      "Zip": req.body.Zip,
      "isPetrol": req.body.isPetrol
    }
};

docClient.put(params, function(err, data) {
    if (err) {
        res.send({status: 400});
    } else {
      res.send({status: 200});
    }
});


});

app.listen(3000,function(){
  console.log("Started on PORT 3000");
})
