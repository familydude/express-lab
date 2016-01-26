var request = require('supertest');
var expect = require('chai').expect;
var sinon = require('sinon');
var express = require('express');
var middleware = require('../lib/middleware');
var booksRoute=require('../lib/routes/books');
var app = express();
app.use(middleware);
app.use('/books',booksRoute);

describe('CORS HEADER test', function() {
  it('trying to get books and test header',function(done){
    request(app)
    .get('/books')
    .expect(200)
    .end(function(err, res){
      if (err) {done(err);return;}
      expect(res.get('Access-Control-Allow-Origin')).to.equal('\*');
      done();
    });
  });
});
