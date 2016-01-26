var books =[{
  id: 'geb',
  title: 'Gödel, Escher, Bach: an Eternal Golden Braid',
  author: 'Douglas Hofstadter'
},
{
  id: 'bof',
  title: 'The Beginning of Infinity, Explanations That Transform the World',
  author: 'David Deutsch'
},
{
  id: 'zam',
  title: 'Zen and the Art of Motorcycle Maintenance',
  author: 'Robert Pirsig'
},
{
  id: 'fbr',
  title: 'Fooled by Randomness',
  author: 'Nicholas Taleb'
}];


function find(filter, callback){
  debugger;
  if (typeof filter=='undefined'){process.nextTick(callback.bind(null,null,books));return;};
  var returnlist =[];
  for (var i=0;i<books.length;i++){
    if (books[i].author.indexOf(filter)>-1 || books[i].title.indexOf(filter)>-1){
      returnlist.push(books[i]);
    }
  }
  process.nextTick(callback.bind(null, null, returnlist));
}

function getIndex(id){
   for (var i=0;i<books.length;i++){
        if (books[i].id ===id){return i;}
   };
   return -1
}
function findById(id,callback){
  i = getIndex(id);
  if (i>-1){process.nextTick(callback.bind(null,null, books[i]));return;}
  else{
    process.nextTick(callback.bind(null, null, []));   
  }
}

function deleteById(id,callback){
  i = getIndex(id);
  if (i>-1){
      books.splice(i,1);
      };
  process.nextTick(callback.bind(null, null,books));	
}
function generateId(tit){
  var newid= "";
  var arr = tit.split(" ");
  for (var i=0;i<arr.length;i++){
    newid += arr[i][0];
  }
  return newid 
}
function addBook(book,callback){
   if (typeof book.id==='undefined'){
     book.id = generateId(book.title);
   }
   books.push(book);
   process.nextTick(callback.bind(null,null,books));
}
module.exports={
	find:find,
    findById:findById,
   deleteById:deleteById,
   addBook:addBook
};

