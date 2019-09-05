var express = require('express');
var router = express.Router();
var bcrypt = require("bcryptjs");
var AWS = require("aws-sdk");
const jwt = require('jsonwebtoken');

AWS.config.update({
    "region": "ap-south-1",
    "endpoint": "http://dynamodb.ap-south-1.amazonaws.com",
    "accessKeyId": "AKIAXAF64E6SGYS5QX64",
    "secretAccessKey": "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"
});

//var dynamodb = new AWS.DynamoDB();
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var docClient = new AWS.DynamoDB.DocumentClient();
/* GET home page. */
router.get('/getLastUserId', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  var params = {
    TableName: "Profiledetails",
    //Limit: 1,
    ScanIndexForward: false,
};

docClient.scan(params, onScan);
var profileKey;  
function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
           
        if(data.Items.length > 0) {
          data.Items.forEach(function(profile, index) {
               
            profileKey = profile.Key;
     
         });
          res.send({ status: 200, data: profileKey });
        } else {
          res.send({ status: 400 });
        }
    }
}


});

router.post('/updatePwd', function(req, res, next) {
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync(req.body.PWD, salt);
var table = "Profiledetails";

var Key = req.body.Key;
var params = {
    TableName:table,
    Key:{
        "Key": Key
    },
    UpdateExpression: "set SecretQ1 = :s, SecretAns=:a, PWD=:p",
    ExpressionAttributeValues:{
        ":s":req.body.SecretQ1,
        ":a":req.body.SecretAns,
        ":p":hash
    },
    ReturnValues:"UPDATED_NEW"
};

docClient.update(params, function(err, data) {
  if (err) {
    res.send({ status: 400, error: err });
  } else {
    res.send({ status: 200 });
  }
});
});

router.post('/login', function(req, res, next) {
var table = "Profiledetails";
var EmailId = req.body.email;
var param = {
  TableName: "Profiledetails",
  FilterExpression: "#email = :email",
  ExpressionAttributeValues: {
    ":email": EmailId
  },
  ExpressionAttributeNames: {
    "#email": "EmailId"
  }
};  
docClient.scan(param, function (err, data) {
    if (err) {
             
         } else {
                data.Items.forEach(function(item) {
                 let passwordCheck = bcrypt.compareSync(req.body.password, item.PWD);
                if (passwordCheck) { 
                  console.log('token', item.Token)
                  res.send({ status: 200, token: item.Token});
                } else {
                  res.send({ status: 400 });
                }
             });
         }
  });
});

router.post('/create', function (req, res) {
  var table = "Profiledetails";
  var getToken = '';
  // Mock user
  const user = {
    id: req.body.Key, 
    username: req.body.Name,
    email: req.body.EmailId
  }

  getToken = jwt.sign({user}, 'secretkey');
  console.log('token1', getToken)

  var params = {
      TableName: table,
      Item: {
          "Key": req.body.Key,
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
          "isPetrol": req.body.isPetrol,
          "Token": getToken
      }
  };

  docClient.put(params, function (err, data) {
      if (err) {
          res.send({ status: 400, error: err });
      } else {
          res.send({ status: 200 });
      }
  });
});

router.post('/emailExists', function(req, res, next) {
  var table = "Profiledetails";
  var EmailId = req.body.email;
  var param = {
    TableName: "Profiledetails",
    FilterExpression: "#email = :email",
    ExpressionAttributeValues: {
      ":email": EmailId
    },
    ExpressionAttributeNames: {
      "#email": "EmailId"
    }
  };  
  docClient.scan(param, function (err, data) {
      if (err) {
        res.send({ status: 400 });
      } else {
          if(data.Items.length > 0) {
            res.send({ status: 200});
          } else {
            res.send({ status: 400});
          }
        }
    });
  });

module.exports = router;
