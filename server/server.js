// TODO: make this work.
// if you go to localhost:3000 the app
// there is expected crud to be working here
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');

// express.static will serve everything
// with in client as a static resource
// also, it will server the index.html on the
// root of that directory on a GET to '/'
app.use(express.static('client'));

// body parser makes it possible to post JSON to the server
// we can accss data we post on as req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

var lions = [];
var id = 0;

// TODO: make the REST routes to perform CRUD on lions
app.get('/lions', function(req, res) {
  console.log('getting all lions...');
  res.json(lions);
});

app.get('/lions/:id', function(req, res) {
  console.log('getting one lion...');
  var lion = _.find(lions, {'id': +req.params.id});
  if (lion === undefined) {
    return res.status(404).send('<h1>ERROR: lion not found!</h1>');
  }
  res.json(lion);
});

app.post('/lions', function(req, res) {
  console.log('creating lion...');
  var lion = req.body;
  lion.id = id++;
  lions.push(lion);
  res.json(lion);
});

app.put('/lions/:id', function(req, res) {
  console.log('updating lion...');
  var lion = _.find(lions, {'id': +req.params.id});
  var update = req.body;
  if (lion === undefined) {
    return res.status(404).send('<h1>ERROR: lion not found!</h1>');
  }
  //not allowed to update lion id (ids must be unique)
  if (update.id) {
    delete update.id;
  }
  _.assign(lion, req.body);
  res.json(lion);
});

app.delete('/lions/:id', function(req, res) {
  console.log('deleting lion...');
  var lionIndex = _.findIndex(lions, {'id': +req.params.id});
  if (lionIndex === -1) {
    return res.status(404).send('<h1>ERROR: lion not found!</h1>');
  }
  var deletedLion = _.remove(lions, {'id': +req.params.id})[0];
  res.json(deletedLion);
});

app.listen(port, function() {
  console.log('listening on port:', port);
});
