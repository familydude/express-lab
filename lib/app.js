'use strict';

var express = require('express');
var statusRoute = require('./routes/status');
var booksRoute = require('./routes/books');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
 

// Middleware and routes are added with use

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/books', booksRoute);
app.use('/status', statusRoute);

app.get('/', function(req, res) {
    res.send('Up and running :). Check <a href="/status">status</a>');
});

module.exports = app;
