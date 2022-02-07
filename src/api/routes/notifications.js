const router = require('express').Router()
const {
  MESSAGES,
} = require('../../consts')

router.post('/', async (req, res) => {
  try {
    const {
      app,
      query: {
        id: socketId,
        name: userName,
      },
    } = req

    const jsonMessages = app.messages
    const socket = app.get('socketIO')
    let name

    if (userName === '' || userName === undefined || userName === null) {
      name = socket.disconnected[socket.disconnected.length - 1].name
      socket.to(socketId).emit('refresh', name)
    }

    socket.connected.push({ socketId, name: name || userName })
    socket.emit('join', `${name || userName} joined the chat`)

    const pack = {
      socketId,
      userName: userName || name,
      messages: jsonMessages,
    }

    socket.to(socketId).emit(MESSAGES, pack)

    return res.json({
      message: 'success',
    })
  } catch (e) {
    console.log({ stack: e.stack }, 'error with this files', { message: e.toString() })

    return res.status(500).json({
      error: e,
    })
  }
})

module.exports = router
