var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// var db = require("./config/db");
var exports = module.exports = {};


var index = require('./routes/index');
var products = require('./routes/products');
var test = require('./routes/test');

//DB 설정
require("./config/db");

// mongoose.Promise = global.Promise;
//
// // connect to MongoDB
// mongoose.connect('mongodb://localhost/test')
//     .then(() => console.log('connection succesful'))
// .catch((err) => console.error(err));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// app.use(express.bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
  console.log("client requested");
  next();
})

app.use('/', index);
app.use('/products', products);
app.use('/test', test);

app.get("/error_test", function (req, res, next) {
  var err = new Error("Test Error");
  err.status = 500;
  next(err);
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.error = err;

  // render the error page
  res.status(err.status || 500);
  res.render('error', {error : err});
});

var server = app.listen(8080, function () {
  console.log("server started(port : 8080)");
})

exports.closeServer = function(){
  server.close();
};
