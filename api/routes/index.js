module.exports = function (app, express) {
  var router = express.Router()

  var v1 = require('./v1')

  router.use('/api/v1', v1(app, express))

  return router
}