var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');




//this is the way to customize the route
var exampleRoute = require('./routes/api/v1/example');
var userRoute = require('./routes/api/v1/user');
var matchRoute = require('./routes/api/v1/match');
var scoreRoute = require('./routes/api/v1/score');
var aimodelRoute = require('./routes/api/v1/aimodel');
var cors = require('cors');

var app = express();
app.use(cors());
 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//here we can link our custom route to the project
app.use('/v1/', exampleRoute);
app.use('/v1/user', userRoute);
app.use('/v1/match', matchRoute);
app.use('/v1/score', scoreRoute);
app.use('/v1/aimodel', aimodelRoute);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

module.exports = app;
