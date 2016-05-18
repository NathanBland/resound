module.exports = function (app, express) {
  var router = express.Router()

  var users = require('./user')
  var room = require('./room')

  router.use('/user', users(app, express))
  router.use('/room', room(app, express))

  return router
}