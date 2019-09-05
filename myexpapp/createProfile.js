//function createProfile(req, res) {

//app.post('/create', function (req, res) {
    //res.send(req.body.Key);
    var AWS = require("aws-sdk");

    AWS.config.update({
        "region": "ap-south-1",
        "endpoint": "http://dynamodb.ap-south-1.amazonaws.com",
        "accessKeyId": "AKIAXAF64E6SGYS5QX64",
        "secretAccessKey": "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"
    });

    var dynamodb = new AWS.DynamoDB();

    var docClient = new AWS.DynamoDB.DocumentClient();

    var table = "Secretq";

    var params = {
        TableName: table,
        Item: {
            "Seq. no":1,
            "SecretQ":"First Car Name"
        }
    };

    docClient.put(params, function (err, data) {
        if (err) { console.log('no'+err)
            //res.send({ status: 400 });
        } else { console.log('yes')
            //res.send({ status: 200 });
        }
    });
//}

//});
