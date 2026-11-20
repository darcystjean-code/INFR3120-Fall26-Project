var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { loadEnvFile } = require('node:process');
loadEnvFile('.env');

//defines indexrouter
var indexRouter = require('./routes/index');

var app = express();

var mongoose = require('mongoose');

if (process.env.MONGODB_URI) {
  mongoose.connection.once('open', function() {
    console.log('MongoDB connected'); 
  });

  mongoose.connect(process.env.MONGODB_URI).catch(function(error) {
    console.error('MongoDB connection failed:', error.name, error.code ?? '');
  });
}
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
