var express = require('express');
var router = express.Router();
var book = require('../models/book');

router.get('/',function(req,res){
	var x = req.query.filter;
	res.send(book.find(x));
	});
router.get('/:bookid',function(req,res){
	var x = req.params.bookid;
	res.send(book.findById(x));
});
router.get('/filter',function(req,res){
    var x = req.query.filter;
    res.send(book.find(x));
});
router.delete('/:bookid', function (req,res){
    var x = req.params.bookid;
    res.send(book.deleteById(x));
});
router.put('/:bookid', function(req,res){
   var bookid =req.params.bookid;
   res.send(bookm.addBook(req.body));
});
router.post('/', function(req,res){
  var tit = req.query.title;
  var au = req.query.author;
  res.send(bookm.addBook(req.body));
});
module.exports= 
   router;
