var Room = require('./models/Room')
var User = require('./models/User')

module.exports = function (client, io) {
  let connectedClient = io.sockets.connected[client.id]
  client
    .on('join', function (data) {
      if (!client.authenticated) {
        connectedClient.emit('reject')
        connectedClient.disconnect()
      } else {
        client.join(data.room)
        client.room = data.room
        connectedClient.emit('authenticated')
        console.log(connectedClient.user, 'joined:', data)
        client.broadcast.to(client.room).emit('message', {
          user: 'Server Bot', 
          msg: connectedClient.user.username+ ' has joined.'})
        Room.findOne({'alias': data.room})
        .populate('messages.user_id')
        .populate('users.user_id')
        .exec(function (err, room) {
          if (err) {
            console.log('Invalid Room specified')
          } else {
            if (!room) {
              console.log('No room found')
            } else {
              console.log('room:', room)
              connectedClient.emit('joined', room)
            }
          }
        })
        /* Room.findOneAndUpdate(
          {'alias': data.room},
          {$set: 
            {users: {
              user: {
                online: true,
                user_id: connectedClient.user.id
              }
              //user_id: req.user || ''
            }
          }},
          {safe: true, new : true},
          function(err, room) {
            if (err) {
              console.log('err:', err)
              // return connectedClient.emit('error', 'Something went wrong, sorry.', err)
            } else {
              return connectedClient.emit('joined', room)
            }
          }
        ) */
      }
    })
    .on('message', function (data) {
      console.log('got message data:', data)
      console.log('client room?', client.room)
      Room.findOneAndUpdate(
        {'alias': client.room},
        {$push: 
          {messages: {
            message: data,
            user_id: connectedClient.user.id
          }
        }},
        {safe: true, upsert: true, new : true},
        function(err, room) {
        if (err) {
          return console.log('(PUT) message:', err)
          // next(err)
        }
        client.broadcast.to(client.room).emit('message', {user: connectedClient.user.username, msg: data})
        // return res.status(201).json(room)
        }
      )
    })
  return client
}