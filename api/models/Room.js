var mongoose = require('mongoose')

var message = mongoose.Schema({
  message: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    index: true
  },
  date: {type: Date, default: Date.now}
})
var users = mongoose.Schema({
  online: Boolean, 
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    index: true
  }
})

var Room = mongoose.Schema({
  title: String,
  messages: [message],
  alias: String,
  created: {type: Date, default: Date.now},
  updated: {type: Date, default: Date.now},
  users: [users]
})

module.exports = mongoose.model('room', Room)