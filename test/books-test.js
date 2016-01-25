var request = require('supertest');
var expect = require('chai').expect;
var sinon = require('sinon');
var express = require('express');
var routes = require('../../lib/routes/books');

var app = express();
app.use('/books', routes);

describe('GET /books', function() {
    before(function() {
        // sinon.spy(Model, 'generate');
    });

    it('get all books', function(done) {
        request(app)
            .get('/books')
           // .expect('Content-Type', 'json')
            .expect(200)
            .end(function(err, res){
                if (err) throw err;
                expect(res.body).to.have.length(4);
		expect(res.body).to.be.a('array');
		expect(res.body[0]).to.be.a('object');
		expect(res.body[0].id).to.equal('geb');
                done();
            });
    });

    it('get book by id', function(done){
	request(app).get('/books/fbr')
	//.expect('Content-Type', 'json')
	.expect(200)
	.end(function(err,res){
		if (err) throw err;
		expect(res.body).to.be.a('object');
		expect(res.body.author).to.equal('Nicholas Taleb');
		done();
		});
	});
    it('get filtered book', function(done){
    request(app).get('/books?filter=Douglas')
	.expect(200)
	.end(function(err,res){
		if (err)throw err;
		expect (res.body).to.be.length(1);
		done();
	})
    });
 it('get 2 filtered books', function(done){
    request(app).get('/books?filter=the')
        .expect(200)
        .end(function(err,res){
                if (err)throw err;
                expect (res.body).to.be.length(2);
                done();
        })
    });
  it('delete book',function(done){
    request(app).delete('/books/geb')
    .expect(200)
    .end(function(err,res){
       if (err) throw err;
       expect(res.body).to.be.length(3);
       done();
     });
  });
    after(function() {
        // Model.generate.restore();
    });
});

