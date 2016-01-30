'use strict';
var debug = require('debug')('express-lab:mongo-book');

function MongoBook(db, seed){
  this.db = db;
  this.books = db.collection('books');
  this.seed = seed;
};
function generateId(tit){
  var newid= "";
  var arr = tit.split(" ");
  for (var i=0;i<arr.length;i++){
    newid += arr[i][0];
  }
  return newid 
}
MongoBook.prototype.find = function(filter, callback){
  var query = {
    $or:[
      {author:{$regex:filter, $options:'i'}},
      {title:{$regex:filter, $options:'i'}}
    ]
  };
  if (!filter) query={};
  this.books.find(query).toArray(function(err,books){
    callback(err,books);
  });     
}
MongoBook.prototype.findById=function(searchid,callback){
     
    var query={
        id:searchid
    };
    if(!searchid) query={};
    this.books.find(query).toArray(function(err,books){
       callback(err,books); 
    });
}
MongoBook.prototype.deleteById= function(searchid, callback){
    var query ={id:searchid}
    if (!searchid) query={};
    var writeResult= this.books.remove(query, function(err,result){
        callback(err,result);
    });
   
     
}
MongoBook.prototype.add= function(book,callback){
   if (typeof book.id==='undefined'){
     book.id = generateId(book.title);
   }
    this.books.insert(book, function(err,books){
       callback(err,books); 
    });
}

MongoBook.prototype.reset = function(callback){
  var books = this.books;
  var seed = this.seed;
  books.drop(function(err,data){
    books.insert(seed, function(err,data){
      callback(err);
    });
  });
}
module.exports = MongoBook;
