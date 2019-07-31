var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var addRouter = require('./routes/add');
var deleteRouter = require('./routes/delete');
var updateRouter = require('./routes/update');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myDB', { useNewUrlParser: true });
let db = mongoose.connection;

db.on('error', function(err) {
    console.log(err);
});

db.once('open', function() {
    console.log("connected to MongoDB");
});

var app = express();

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/add', addRouter);
app.use('/delete', deleteRouter);
app.use('/update', updateRouter);

module.exports = app;
