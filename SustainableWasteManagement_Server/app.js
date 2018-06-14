
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , cors = require('cors')
  , alert= require('alert-node')
  , path = require('path');

  var Connection = require('tedious').Connection;
    var config = {
        userName:'chandan' ,
        password: <Your Password>,
        server: 'caphackathon.database.windows.net',
        // If you are on Microsoft Azure, you need this:
        options: {encrypt: true, database: 'capHack18'}
    };
    var connection = new Connection(config);
    var Request = require('tedious').Request;
    var TYPES = require('tedious').TYPES;

    connection.on('connect', function(err) {
    // If no error, then good to proceed.

        console.log("Connected");
        if(!err){
          console.log("BEFORE EXEC STMT");
          executeStatement1();
          console.log("AFTER STMT");
        }
        else{
          console.log(err);
        }
    });




    function executeStatement() {
        //request = new Request("CREATE TABLE MARKET (binId int,recycle int,compost int, landfill int, area varchar(255),City varchar(255));", function(err) {
        request = new Request("Insert into Market values (1,4,2,6,'Zone 1','San Francisco')", function(err) {
      //  request = new Request("select * from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='Persons'", function(err) {


        if (err) {
            console.log(err);}
        });
        var result = "";
        request.on('done', function(rowCount, more) {
        console.log("zala");
        });
        connection.execSql(request);
    }


    function executeStatement1() {
        request = new Request("SELECT * from Market;", function(err) {
        if (err) {
            console.log(err);}
        });
        var result = "";
        request.on('row', function(columns) {
            columns.forEach(function(column) {
              if (column.value === null) {
                console.log('NULL');
              } else {
                result+= column.value + " ";
              }
            });
            console.log(result);
            result ="";
        });

        request.on('done', function(rowCount, more) {
        console.log(rowCount + ' rows returned');
        });
        connection.execSql(request);
    }


var app = express();
var AWS = require('aws-sdk');
var uuid = require('uuid');

// Create unique bucket name
var bucketName = 'node-sdk-sample-' + uuid.v4();
// Create name for uploaded object key
var keyName = 'hello_world.txt';

// Create a promise on S3 service object
// Create a promise on S3 service object
var bucketPromise = new AWS.S3({apiVersion: '2006-03-01'}).createBucket({Bucket: bucketName}).promise();

var corsOptions = {
    origin: 'http://localhost:3001',
    credentials: true,
     optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
/*
bucketPromise.then(
  function(data) {
    // Create params for putObject call
    var objectParams = {Bucket: bucketName, Key: keyName, Body: 'Hello World!'};
    // Create object upload promise
    var uploadPromise = new AWS.S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise();
    uploadPromise.then(
      function(data) {
        console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
      });
}).catch(
  function(err) {
    console.error(err, err.stack);
});
*/

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', routes.index);
//app.get('/users', user.list);


app.get('/testingRekognition',function(req,res){

})

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

app.post('/sendFile',function(req,res){

  console.log(req.body);
  console.log("ALA SENDFILE");
  res.send({1:1,2:2});
})


var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
var fs = require('fs');

var visualRecognition = new VisualRecognitionV3({
	url: 'https://gateway.watsonplatform.net/visual-recognition/api',
	version: '2018-03-19',
	iam_apikey: 'DtD7VypRs1zrUuSFvffKOil7Tvd7yp8hW44qDI0K0iBI'
});


var recyclable=["Coca cola","soft drink","beverage","food hamper","handbasket","food","greenishness color","machine","equipment","alcoholic beverage","beverage","bottle green color","fruit"];
var compostable=["dish","pale yellow color","salad nicoise","salad","dish","nutrition","chef's salad","tossed salad","potpourri","perfume","toiletry","chestnut color","taco","dish","nutrition","beige color","camouflage","sandwich","dish","nutrition","fungus","sage green color","insect","animal","alabaster color"
,"cereal box","box","print media","electrical device","jade green color","paprika","food seasoning","food ingredient","food product","vegetable","bottled water","drinking water"];




app.post('/img', function(req, res) {
  console.log(req.body);
  alert(req.body.filepath);
  var filepath="/Users/chandanparanjape/Downloads/"+req.body.filepath;
  var images_file = fs.createReadStream(filepath);
  console.log(images_file)
  var classifier_ids = ["default"];
  var threshold = 0.6;

  var params = {
    images_file: images_file,
    classifier_ids: classifier_ids,
    threshold: threshold
  };

  visualRecognition.classify(params, function(err, response) {
    if (err) {
      console.log(err);
      return res.status(200).json(err,null,2);
    } else {
      code = response.images[0].classifiers[0].classes;
    }
  //  alert(code[0].class);
  //  return res.status(200).json(code, null, 2);
    for(var i=0;i<code.length;i++){
      for(var j=0;j<compostable.length;j++){
        if(compostable[j]===code[i].class){
          return res.status(200).json(2, null, 2);
        }
      }
    }
    for(var i=0;i<code.length;i++){
      for(var j=0;j<recyclable.length;j++){
        if(recyclable[j]===code[i].class){
          return res.status(200).json(1, null, 2);
        }
      }
    }

    return res.status(200).json(3, null, 2)
  });
})
