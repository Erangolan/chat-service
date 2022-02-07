const http = require('http')
const socketIo = require('socket.io')

const messages = []

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
  })

  io.on('error', (err) => {
    console.log(err)
  })
  server.listen(port, () => console.log(`Listening on port ${port}`))
  io.messages = messages
  return io
}

module.exports = {
  initSocket,
}
