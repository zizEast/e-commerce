var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {engine}=require('express-handlebars')


//connection mongoose
const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://alberto:mongo-123@cluster0.lvmqn.mongodb.net/shoppingCart?retryWrites=true&w=majority',(err) => {
  if(err) return console.log(err);
  console.log('siamo connessi a mongodb');
},({useUnifiedTopology:true}))

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.engine('.hbs',engine({defaultLayout:'layout',extname:'.hbs'}))
app.set('view engine', '.hbs');

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
