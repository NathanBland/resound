module.exports = function (app, express) {
  var router = express.Router()

  var users = require('./user')

  router.use('/user', users(app, express))

  return router
}