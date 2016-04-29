// TODO: make a new router for the tigers resource
// and make some REST routes for it, exactly like for lions
// make a middleware that just logs the word 'tiger' to the console
// when a request comes in to the server
var tigerRouter = require('express').Router();
var _ = require('lodash');

var tigers = [];
var id = 0;

var updateId = function(req, res, next) {
  if (!req.body.id) {
    req.body.id = '' + id++;
  }
  next();
};

tigerRouter.use('/', function(req, res, next) {
  console.log('tiger');
  next();
});

tigerRouter.param('id', function(req, res, next, tigerId) {
  var tiger = _.find(tigers, {id: tigerId});

  if (tiger) {
    req.tiger = tiger;
    next();
  } else {
    res.status(500).send('tiger not found');
  }
});

tigerRouter.get('/', function(req, res) {
  res.json(tigers);
});

tigerRouter.get('/:id', function(req, res) {
  res.json(req.tiger);
});

tigerRouter.post('/', updateId, function(req, res) {
  var tiger = req.body;
  tigers.push(tiger);
  res.json(tiger);
});

tigerRouter.put('/:id', function(req, res) {
  var update = req.body;

  if (update.id) {
    delete update.id;
  }

  var updatedTiger = _.assign(req.tiger, update);
  res.json(updatedTiger);
});

module.exports = tigerRouter;