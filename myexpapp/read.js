// JavaScript source code

const AWS = require("aws-sdk");

let awsconfig = {
    "region": "ap-south-1",
    "endpoint": "http://dynamodb.ap-south-1.amazonaws.com",
    "accessKeyId": "AKIAXAF64E6SGYS5QX64",
    "secretAccessKey": "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"
}

AWS.config.update(awsconfig);

var dynamodb = new AWS.DynamoDB();
var param = {}
dynamodb.listTables(param, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data);           // successful response
});
