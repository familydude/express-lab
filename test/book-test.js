var expect = require('chai').expect;
var sinon = require('sinon');
var book = require('../../lib/models/book');
describe('findbyid', function() {
    it('finding a book by id', function() {
        expect(book.findById('geb')).to.be.a('Object');
	expect(book.findById('geb').author).to.equal('Douglas Hofstadter');
    });
    it('finding filtered book', function(){
        expect(book.find('Douglas')).to.be.a('Array');
        expect(book.find('Douglas')[0]).to.be.a('Object');
        expect(book.find('Douglas')[0].id).to.equal('geb');
    });

});
