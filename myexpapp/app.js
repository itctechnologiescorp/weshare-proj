var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var profileRouter = require('./routes/profile');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
// adding middlewear - bodyparser
//app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/profile', profileRouter);
// app.post('/profile/create', function (req, res) {
//     //var createProfileRouter = require('./createProfile');
//     //createProfileRouter.createProfile(req, res);
//     //res.send('request'+req);
//     var AWS = require("aws-sdk");

//     AWS.config.update({
//         "region": "ap-south-1",
//         "endpoint": "http://dynamodb.ap-south-1.amazonaws.com",
//         "accessKeyId": "AKIAXAF64E6SGYS5QX64",
//         "secretAccessKey": "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"
//     });

//     var dynamodb = new AWS.DynamoDB();

//     var docClient = new AWS.DynamoDB.DocumentClient();

//     var table = "Profiledetails";

//     var params = {
//         TableName: table,
//         Item: {
//             "Key": req.body.Key,
//             "Region": req.body.Region,
//             "Lang": req.body.Lang,
//             "Name": req.body.Name,
//             "isProvider": req.body.isProvider,
//             "isCar": req.body.isCar,
//             "Addr1": req.body.Addr1,
//             "Addr2": req.body.Addr2,
//             "City": req.body.City,
//             "Country": req.body.Country,
//             "EmailId": req.body.EmailId,
//             "Employer": req.body.Employer,
//             "Gender": req.body.Gender,
//             "Idproof": req.body.Idproof,
//             "Make": req.body.Make,
//             "Mileage": req.body.Mileage,
//             "Model": req.body.Model,
//             "PhoneNo": req.body.PhoneNo,
//             "RCBookCopy": req.body.RCBookCopy,
//             "RegNo": req.body.RegNo,
//             "State": req.body.State,
//             "Zip": req.body.Zip,
//             "isPetrol": req.body.isPetrol
//         }
//     };

//     docClient.put(params, function (err, data) {
//         if (err) {
//             res.send({ status: 400, error: err });
//         } else {
//             res.send({ status: 200 });
//         }
//     });
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
