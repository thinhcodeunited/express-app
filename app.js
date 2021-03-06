const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const postRouter = require('./routes/post');
const weatherRouter = require('./routes/weather');
const covidRouter = require('./routes/covid');
const frontRouter = require('./routes/public/front');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap-css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist/')));

// Use the session middleware
app.use(session({
  secret : 'auth session',
  resave : false,
  saveUninitialized : false,
  cookie : {
    maxAge : 24 * 60 * 60 * 1000
  }
}));
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/weather', weatherRouter);
app.use('/covid', covidRouter);
app.use('/public', frontRouter);

app.use('/dangnhap', (req, res) => {
  check 
});
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
