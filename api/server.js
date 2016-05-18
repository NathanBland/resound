var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var routes = require('./routes/')

var app = express()

app.set('dbhost', process.env.dbHost || '127.0.0.1')
app.set('dbname', process.env.dbName || 'resound')

mongoose.connect('mongodb://' + app.get('dbhost') + '/' + app.get('dbname'))

app.set('port', process.env.port || 8081)
app.set('ip', process.env.host || '0.0.0.0')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(routes(app, express))
var server = app.listen(app.get('port'), app.get('ip'), function () {
  console.log('resound api has started...')
})