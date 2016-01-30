var expect = require('chai').expect;
var sinon = require('sinon');
var book = require('../../lib/models/book');
describe('findbyid', function(){ 
    it('finding a book by id', function(done) {
 
        book.findById('geb', function(err,data){
           expect(data).to.be.a('Object');
           expect(data.author).to.equal('Douglas Hofstadter');
           done();
        });
    });
   it('finding filtered book', function(done){
       book.find('Douglas', function(err,data){
        expect(data).to.be.a('Array');
        expect(data[0]).to.be.a('Object');
        expect(data[0].id).to.equal('geb');
        done();
        });
    });

});
