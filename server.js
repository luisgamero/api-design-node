// TODO: create a basic server with express
// that will send back the index.html file on a GET request to '/'
// it should then send back jsonData on a GET to /data
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var morgan = require('morgan');
var fs = require('fs');

var jsonData = { count: 12, message: 'hey' };

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  //using fs module
  fs.readFile('index.html', function(err, buffer) {
    if (err) {
      res.status(500).send(err);
    }

    var html = '' + buffer;
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  });

  // res.sendFile(path.join(__dirname, 'index.html'), function(err) {
  //   if (err) {
  //     res.status(500).send(err);
  //   }
  // });
});

app.get('/data', function(req, res) {
  res.json(jsonData);
});

var port = process.env.PORT || 6969;

app.listen(port, function() {
  console.log('listening on port:', port);
});
