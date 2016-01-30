var request = require('supertest');
var expect = require('chai').expect;
var sinon = require('sinon');
var express = require('express');
var routes = require('../../lib/routes/books');
var bodyParser = require('body-parser');
var app = express();
var MongoBook = require('../../lib/models/mongo-book');
var mongoskin = require('mongoskin');
var db = mongoskin.db('mongodb://@192.168.99.100:27017/express-lab-test',{safe:true});

 
var seed =  [{
    title: 'Gödel, Escher, Bach: an Eternal Golden Braid',
    author: 'Douglas Hofstadter',
    id:'geb'
},
{
    title: 'The Beginning of Infinity, Explanations That Transform the World',
    author: 'David Deutsch',
    id:'tbi'
},
{
    title: 'Zen and the Art of Motorcycle Maintenance',
    author: 'Robert Pirsig',
    id:'zamm'
},
{
    title: 'Fooled by Randomness',
    author: 'Nicholas Taleb',
    id:'fbr'
}];
var mb = new MongoBook(db,seed);
app.use(bodyParser.json());
app.use('/books', routes);

describe('GET /books', function() {
    before(function(done) {
        mb.reset(done); 
        
        // sinon.spy(Model, 'generate');
    });

    it('get all books - ASYNC', function(done) {
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

    it('get book by id (ASYNC)', function(done){
	request(app).get('/books/fbr')
	//.expect('Content-Type', 'json')
	.expect(200)
	.end(function(err,res){
		if (err) throw err;
		expect(res.body).to.be.a('array');
		expect(res.body[0].author).to.equal('Nicholas Taleb');
		done();
		});
	});
    it('get filtered book (ASYNC)', function(done){
    request(app).get('/books?filter=Taleb')
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
       expect(res.body.n).to.equal(1);
       done();
     });
  });
    after(function() {
        // Model.generate.restore();
    });

  it ('add book-PUT', function(done){
     request(app).put('/books/af')
     .set('Content-Type', 'application/json')
     .send('{"title":"Anti Fragile","author":"Nassim Taleb"}')
     .expect(200)
     .end(function(err,res){
          if (err) throw err;
         expect(res.body.insertedCount).to.equal(1);
          done();
      });
  });

  it('add book - POST',function(done){
  request(app).post('/books')
  .set('Content-Type', 'application/json')
  .send({author:'christian stenevi', title:'the tao of elearning'})
  .expect(200)
  .end(function(err, res){
    if (err) throw err;
    expect(res.body.insertedCount).to.equal(1);
    done();
    });
  });

});

