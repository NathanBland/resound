var Room = require('../../models/Room')
var User = require('../../models/User')

module.exports = function (app, express) {
  var router = express.Router()
  router.route('/:room/')
  .get(function (req, res, next) {
    if (!req.params.room) {
      return next('No room specified.')
    } else {
      Room.findOne({alias: req.params.room}, function (err, room) {
        if (err) {
          return next('Invalid Room specified')
        }
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
    Room.findByIdAndUpdate(
      {'alias': req.params.room},
      {$push: 
        {"messages": {
          message: req.body.message, 
          user_id: req.user._id || ''
        }
      }},
      {safe: true, new : true},
      function(err, room) {
       if (err) {
         next(err)
       }
       return res.status(201).json(room)
      }
    )
  })
  router.route('/')
  .post(function (req, res, next) {
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
            'error': 'That room already exists'
          })
        } else {
          var newRoom = Room()
          newRoom.users = [req.user_id || ''],
          newRoom.title = req.params.title
          newRoom.alias = alias
          newRoom.messages = []
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