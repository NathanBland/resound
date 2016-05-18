module.exports = function (app, express) {
  var router = express.Router()

  var local = require('./local.js')

  router.use('/local', local(app, express))

  return router
}