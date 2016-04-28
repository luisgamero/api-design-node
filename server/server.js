// TODO: use app.param to find the lion using the id
// and then attach the lion to the req object and call next. Then in
// '/lion/:id' just send back req.lion

// create a middleware function to catch and handle errors, register it
// as the last middleware on app

// create a route middleware for POST /lions that will increment and
// add an id to the incoming new lion object on req.body

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');
var morgan = require('morgan');

var lions = [];
var id = 0;

var updateId = function(req, res, next) {
  // fill this out. this is the route middleware for the ids
  req.body.id = '' + id++;
  next();
};

app.use(morgan('dev'));
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.param('id', function(req, res, next, id) {
  // fill this out to find the lion based off the id
  // and attach it to req.lion. Rember to call next()
  var lion = _.find(lions, {'id': id});

  if (lion) {
    req.lion = lion;
    next();
  } else {
    res.status(500).send('lion not found');
  }
});

app.get('/lions', function(req, res){
  res.json(lions);
});

app.get('/lions/:id', function(req, res){
  // use req.lion
  res.json(req.lion || {});
});

app.post('/lions', updateId, function(req, res) {
  var lion = req.body;

  lions.push(lion);

  res.json(lion);
});

app.put('/lions/:id', function(req, res) {
  var update = req.body;
  if (update.id) {
    delete update.id;
  }

  var lion = _.findIndex(lions, {id: req.params.id});
  if (!lions[lion]) {
    res.send();
  } else {
    var updatedLion = _.assign(lions[lion], update);
    res.json(updatedLion);
  }
});

//NOTE: errors should be "funneled" to this error middleware by taking err object and passing it into the next function, as in: next(err). This directs the error to skip all subsequent middleware/routes and jump to the error handling middleware placed at the end (in this case, just a single error handling middleware)
//basically, control moves to an error handling middleware ONLY if error is passed in next(err). Moving between subsequent error handling middleware MUST include next(err) (or it just ends)
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('something broke!');
});

app.listen(3000);
console.log('on port 3000');
