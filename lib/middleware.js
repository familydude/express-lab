function corsMiddleware(req,res,next){
  debugger;
  res.header('Access-Control-Allow-Origin','\*');
  next();
}

module.exports=corsMiddleware;
