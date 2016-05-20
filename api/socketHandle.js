module.exports = function (client, io) {
  let connectedClient = io.sockets.connected[client.id]
  client
    .on('join', function (data) {
      if (!client.authenticated) {
        connectedClient.emit('reject')
        connectedClient.disconnect()
      } else {
         connectedClient.emit('authenticated')
      }
    })
  return client
}