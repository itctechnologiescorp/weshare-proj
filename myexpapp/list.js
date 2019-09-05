
/**
 * Copyright 2010-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * This file is licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License. A copy of
 * the License is located at
 *
 * http://aws.amazon.com/apache2.0/
 *
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/
var AWS = require("aws-sdk");

AWS.config.update({
    "region": "ap-south-1",
    "endpoint": "http://dynamodb.ap-south-1.amazonaws.com",
    "accessKeyId": "AKIAXAF64E6SGYS5QX64",
    "secretAccessKey": "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"
});


var dynamodb = new AWS.DynamoDB();

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Profiledetails";

var params = {
    TableName: "Profiledetails"
    //Limit: 1,
    //ScanIndexForward: false,
    /*,
    FilterExpression: "#name = facebook",
    ExpressionAttributeNames: {
        "#name": "name",
    },
    ExpressionAttributeValues: { }*/

};

docClient.scan(params, onScan);
var count = 0;

function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {        
        console.log("Scan succeeded." + JSON.stringify(data));
        data.Items.forEach(function(itemdata) {
           console.log("Item :", ++count,JSON.stringify(itemdata));
        });

        // continue scanning if we have more items
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        }
    }
}

