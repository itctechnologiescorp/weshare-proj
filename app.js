
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
app.use(bodyParser.urlencoded({extended : true}));

// static files
//app.use(express.static(path.join(__dirname, 'public')));

//creating routes
app.use('/create', router);
app.get('/about',function(req,res){
  console.log("Value");
});
app.post('/create',function(req,res){
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
    Item : req
};

console.log("Adding a new item...");
docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err,
                null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});


});

app.listen(3000,function(){
  console.log("Started on PORT 3000");
})
