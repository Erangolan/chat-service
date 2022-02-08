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

    const socket = app.get('socketIO')
    const { messages, disconnected, connected } = socket
    let name

    if (userName === '') {
      ({ name } = disconnected[disconnected.length - 1])
    }

    connected.push({ socketId, name: userName || name })
    socket.emit('join', `${userName || name} joined the chat`)

    const pack = {
      socketId,
      name: userName || name,
      messages,
    }

    socket.to(socketId).emit(MESSAGES, pack)

    return res.json({
      message: 'success',
    })
  } catch (e) {
    console.log({ stack: e.stack }, 'error with notifications route', { message: e.toString() })

    return res.status(500).json({
      error: e,
    })
  }
})

module.exports = router
