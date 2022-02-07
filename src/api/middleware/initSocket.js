const http = require('http')
const socketIo = require('socket.io')

const messages = []
const connected = []
const disconnected = []

const initSocket = (app, port) => {
  const server = http.createServer(app)
  const options = {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    },
  }

  const io = socketIo(server, options)

  io.on('connection', (socket) => {
    console.log('new client connected: ', socket.id)

    socket.on('disconnect', () => {
      const connectedName = connected.find(({ socketId }) => socketId === socket.id)

      disconnected.push({
        socketId: socket.id,
        name: connectedName.name || socket.handshake.query.name,
      })
      const userLeft = connected.find(({ socketId }) => socketId === socket.id)

      console.log(`${userLeft.name} left the chat`)
      io.emit('left', `${userLeft.name} left the chat`)
    })
  })

  io.on('error', (err) => {
    console.log(err)
  })
  server.listen(port, () => console.log(`Listening on port ${port}`))
  io.messages = messages
  io.connected = connected
  io.disconnected = disconnected
  return io
}

module.exports = {
  initSocket,
}
