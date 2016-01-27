var expect = require('chai').expect;
var sinon = require('sinon');
var MongoBook = require('../../lib/models/mongo-book');
var mongoskin = require('mongoskin');

var db = mongoskin.db('mongodb://@localhost:27017/express-lab-test',{safe:true});

// Example books
var seed = [{
    title: 'Gödel, Escher, Bach: an Eternal Golden Braid',
    author: 'Douglas Hofstadter'
},
{
    title: 'The Beginning of Infinity, Explanations That Transform the World',
    author: 'David Deutsch'
},
{
    title: 'Zen and the Art of Motorcycle Maintenance',
    author: 'Robert Pirsig'
},
{
    title: 'Fooled by Randomness',
    author: 'Nicholas Taleb'
}];

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
  
    });

});
