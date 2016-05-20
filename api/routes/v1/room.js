var Room = require('../../models/Room')
var User = require('../../models/User')
var passport = require('passport')

module.exports = function (app, express) {
  var router = express.Router()
  router.use('/', passport.authenticate('bearer', { session: false }))
  router.route('/:room/')
  .get(function (req, res, next) {
    if (!req.params.room) {
      return next('No room specified.')
    } else {
      Room.findOne({alias: req.params.room})
      .populate('messages.user_id')
      .populate('users.user_id')
      .exec(function (err, room) {
        if (err) {
          return next('Invalid Room specified')
        }
        if (!room) {
          return next('No room found')
        }
        // console.log('(room found) room:', room)
        return res.status(200).json(room)
      })
    }
  })
  .put(function (req, res, next) {
    if (!req.params.room) {
      return next('No room specified!')
    }
    if (!req.body.message) {
      return next('Cannot send empty message!')
    }
    Room.findOneAndUpdate(
      {'alias': req.params.room},
      {$push: 
        {messages: {
          message: req.body.message
          //user_id: req.user || ''
        }
      }},
      {safe: true, upsert: true, new : true},
      function(err, room) {
       if (err) {
         // console.log('(PUT) message:', err)
         next(err)
       }
       return res.status(201).json(room)
      }
    )
  })
  router.route('/')
  .post(function (req, res, next) {
    // console.log('[room](POST) trying to make new room.')
    var alias = ''
    if (req.body.title) {
      alias = req.body.title.toLowerCase().replace(/ /g, '-')
    } else {
      alias = new Date().toISOString()
    }
    Room.findOne({
      alias: alias
    })
      .exec(function (err, oldRoom) {
        if (err) {
          console.warn('err:', err)
          return res.status(500).json(err)
        }
        if (oldRoom) {
          console.log('room already exists')
          return res.status(400).json({
            'error': 'That room already exists',
            'room' : oldRoom
          })
        } else {
          var newRoom = Room()
          // console.log('request body:', req.body.title)
          // console.log('user:', req.user)
          newRoom.users = [{user_id: req.user._id} || ''],
          newRoom.title = req.body.title || 'Chat on: ' +alias
          newRoom.alias = alias
          newRoom.messages = []
          // console.log('(new Room) :', newRoom)
          newRoom.save(function (err) {
            if (err) {
              return next(err)
            } else {
              return res.status(201).json(newRoom)
            }
          })
        }
      })
  })
  

  return router
}