var mongoose = require('mongoose')
var Room = require('./Room')

var User = mongoose.Schema({
  username: {
    type: String,
    required: false
  }
})

User.methods.getRooms = function (cb) {
  return Room.find({
    'users.user_id': this._id
  }, cb)
  
}

module.exports = mongoose.model('user', User)