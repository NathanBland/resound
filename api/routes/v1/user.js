var User = require('../../models/User')
var passport = require('passport')

module.exports = function (app, express) {
  var router = express.Router()
  router.use('/', passport.authenticate('bearer', { session: false }))
  router.route('/')
  .get(function (req, res, next) {
    User.find({}, '-_id')
      .limit(10)
      .sort({
        _id: -1
      })
      .select({
        username: 1
      })
      .exec(function (err, users) {
        if (err) {
          return next(err)
        }
        return res.status(200).json(users)
      })
  })
  .post(function (req, res, next) {
    var user = req.body.username
    if (!user) {
      return res.status(400).json({
        'error': 'No Username specified'
      })
    }
    User.findOne({
      username: user
    })
      .exec(function (err, oldUser) {
        if (err) {
          console.warn('err:', err)
          return res.status(500).json(err)
        }
        if (oldUser) {
          console.log('username already exists')
          return res.status(400).json({
            'error': 'That username already exists'
          })
        } else {
          var newUser = User()
          newUser.username = user
          newUser.save(function (err) {
            if (err) {
              return next(err)
            } else {
              return res.status(201).json(newUser)
            }
          })
        }
      })
  })
  
  router.route('/:username')
  .get(function (req, res, next) {
    var username = req.params.username
    if (!username) {
      return res.status(400).json({
        'error': 'No Username specified'
      })
    }
    User.findOne({username: username}, '-_id')
      .exec(function (err, user) {
        if (err) {
          console.warn('err:', err)
          return res.status(500).json(err)
        } else {
          return res.status(200).json(user)
        }
      })
  })
  return router
}