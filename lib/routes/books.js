var express = require('express');
var router = express.Router();
var mongoskin = require('mongoskin');
var db = mongoskin.db('mongodb://@192.168.99.100:27017/express-lab-test',{safe:true});
var MongoBook = require('../models/mongo-book');
var book = new MongoBook(db);

router.get('/',function(req,res){
	var f = req.query.filter;
	book.find(f, function(err,data){
                if (err) done(err);
        	res.send(data);
        });
});

router.get('/:bookid',function(req,res){
	var f = req.params.bookid;
	book.findById(f,function(err,data){
		res.send(data)
        });
});
router.get('/filter',function(req,res){
    var f = req.query.filter;
    book.find(f, function(err, data){
    res.send(data);
    });
});
router.delete('/:bookid', function (req,res){
    var x = req.params.bookid;
    book.deleteById(x, function(err, data){
       res.send(data);
    });
});
router.put('/:bookid', function(req,res){
   var bookid =req.params.bookid;
   if (!typeof bookid==='undefined'){
      req.body.id = bookid;
   }
   book.add(req.body,function(err, data){
       res.send(data);
   });
});
router.post('/', function(req,res){
  var tit = req.query.title;
  var au = req.query.author;
  book.add(req.body, function(err,data){
     res.send(data);
  });
});

module.exports= 
   router;
