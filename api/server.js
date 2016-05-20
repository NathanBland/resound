var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var routes = require('./routes/')
var jwt = require('jwt-simple')
var socketioJwt = require('socketio-jwt')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)

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
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization")
  next();
});
app.use(routes(app, express))
io.use(function (socket, next) {
  var handshakeData = socket.request._query.token
  var tokenSecret = process.env.tokenSecret || 'a really awful secret'
  if (handshakeData) {
    try {
    var decoded = jwt.decode(handshakeData, tokenSecret)
    // console.log('got data:', decoded)
    socket.authenticated = true
    socket.user = decoded 
    } catch (err) {
      console.log('err:', err)
    }
  }
  next()
})

io.on('connection', function (socket) {
    // console.log(socket.handshake.decoded_token.username,', connected')
    require('./socketHandle')(socket, io)
  })
require('./socketHandle')
server.listen(app.get('port'), app.get('ip'), function () {
  console.log('resound api has started...')
})