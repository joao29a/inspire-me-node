var supertest = require('supertest');
var assert    = require('assert');
var app       = require('../app');
var Quote     = require('../database/schemas/Quote');

describe('Saving quotes on database', function(){
  afterEach(function() {
    Quote.remove({}, function(err) {});
  });

  it('/quotes/save -- saving a quote', function(done) {
    supertest(app)
    .post('/quotes/save')
    .send({
      text: 'testing',
      author: 'john'
    })
    .expect(200)
    .end(function(err, res) {
      assert.deepEqual(res.body, {status: 0});
      done();
    });
  });

  it('/quotes/save -- reject quote, empty text and author', function(done) {
    supertest(app)
    .post('/quotes/save')
    .send({
      text: '',
      author: ''
    })
    .expect(200)
    .end(function(err, res) {
      assert.deepEqual(res.body, {status: 1});
      done();
    });
  });

  it('/quotes/save -- reject quote, empty text', function(done) {
    supertest(app)
    .post('/quotes/save')
    .send({
      text: '',
      author: 'john'
    })
    .expect(200)
    .end(function(err, res) {
      assert.deepEqual(res.body, {status: 1});
      done();
    });
  });

  it('/quotes/save -- reject quote, empty author', function(done) {
    supertest(app)
    .post('/quotes/save')
    .send({
      text: 'a',
      author: ''
    })
    .expect(200)
    .end(function(err, res) {
      assert.deepEqual(res.body, {status: 1});
      done();
    });
  });

});

describe('Get a random quote', function() {
  beforeEach(function() {
    var quotes = [
      {text: 'test', author: 'john'},
      {text: 'test1', author: 'john1'},
      {text: 'test2', author: 'john2'},
      {text: 'test3', author: 'john3'},
    ]
    for (var i in quotes) {
      Quote.create(quotes[i], function(err, inserted) {});
    }
  });

  afterEach(function() {
    Quote.remove({}, function(err) {});
  });

  it('/quotes -- get a random quote', function(done) {
    supertest(app)
    .get('/quotes')
    .expect(200)
    .end(function(err, res) {
      assert.equal(res.body.status, 0);
      done();
    });
  });
});
