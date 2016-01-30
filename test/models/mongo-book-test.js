var expect = require('chai').expect;
var sinon = require('sinon');
var MongoBook = require('../../lib/models/mongo-book');
var mongoskin = require('mongoskin');

var db = mongoskin.db('mongodb://@192.168.99.100:27017/express-lab-test',{safe:true});

// Example books
var seed = [{
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
var testbook={title:'aspergers from the inside', author:'Christian Stenevi'};
var testbook2 ={title:'Rorelsen', author:"john ajvide lindqvist", id:'ror'};
var book = new MongoBook(db,seed);

describe('mongo-book', function(){ 
    before(function(done){
       book.reset(done);
    });
    describe ('#find', function(){
      it('finds 2 matching books', function(done) {
        book.find('the', function(err,books){
          expect(books.length).to.equal(2);
          expect(books[0].title).to.match(/the/);
          done();
        });
      });
      it('finds book by id', function(done){
          book.findById('geb', function(err, books){
             expect(books).to.be.an('Array');
             //expect(books.length).to.equal(0);
             expect(books[0]).to.be.an('Object');
             expect(books[0].author).to.equal('Douglas Hofstadter');
             done(); 
          });
      })
    });
    
    describe('#delete',function(){
        it('deletes a book by id',function(done){
            book.deleteById('geb', function(err, result){
               expect(result.result.n).to.equal(1);
               done();
            });
        });
        it('see if book is gone',function(done){
            book.findById('geb',function(err, book){
                expect(book).to.be.an('array');
                expect(book.length).to.equal(0);
                done();
            });   
        });
    })
    describe('#add', function(){
        it('adds a book with id', function(done){
            book.add(testbook2, function(err,result){
                expect(result.result.n).to.equal(1);
                done();
            })
        });
        it('see how many should be 4', function(done){
           book.find(null, function(err, books){
               if (err) throw err;
               expect(books.length).to.equal(4);
               done();
           }); 
        });
        it ('adds a book without id',function(done){
            book.add(testbook, function(err, result){
                expect(result.result.n).to.equal(1);
                done();
            })
        });
        it('see how many, should be 5', function(done){
           book.find(null, function(err, books){
               if (err) throw err;
               expect(books.length).to.equal(5);
               done();
           }); 
        });
    })
});
