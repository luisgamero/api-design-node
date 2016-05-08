var app = require('./server');
var request = require('supertest');
var expect = require('chai').expect;

// TODO: make tests for the other CRUD routes
// DELETE, UPDATE, PUT, GET ONE
// to run the test type mocha server/specs.js

describe('[LIONS]', function(){
  //pre-populating with lion
  beforeEach(function(done) {
    var testLion = {name: 'TEST', pride: 'TEST', age: 99, gender: 'male'};
    request(app)
      .post('/lions')
      .set('Accept', 'application/json')
      .send(testLion)
      .end(function(err, resp) {
        if (err) {
          console.log('Error posting testLion:', err);
        }
        done();
      });
  });

  //cleaning up any lions
  afterEach(function(done) {
    request(app)
      .del('/lions/0')
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        if (err) {
          console.log('Error deleting testLion:', err);
        }
        done();
      });
  });

  //testing
  it('should get all lions', function(done) {
    request(app)
      .get('/lions')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('array');
        done();
      });
  });

  it('should get a single lion', function(done) {
    request(app)
      .get('/lions/0')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('object');
        done();
      });
  });

  if('should create a new lion and return it', function(done) {
    var newLion = {name: 'newlion', pride: 'new', age: 1, gender: 'male'};
    request(app)
      .post('/lions')
      .set('Accept', 'application/json')
      .send(newLion)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('object');
        done();
      });
  });

  it('should delete a lion and return it', function(done) {
    request(app)
      .del('/lions/0')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('object');
        done();
      });
  });

  it('should update lion and return updated lion', function(done) {
    var update = {name: 'updated name'};
    request(app)
      .put('/lions/0')
      .set('Accept', 'application/json')
      .send(update)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.equal('updated name');
        done();
      });
  });

});


