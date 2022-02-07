const router = require('express').Router()
const {
  MESSAGE,
} = require('../../consts')

router.post('/', async (req, res) => {
  try {
    const {
      app,
      query: {
        socketId,
        userTxt,
        name: userName,
      },
    } = req

    const socket = app.get('socketIO')

    const pack = {
      socketId,
      userTxt,
      userName,
    }

    app.messages.push(pack)

    socket.emit(MESSAGE, pack)
    console.log('pack sent: ', socketId)

    return res.json({
      message: 'success',
    })
  } catch (e) {
    console.log({ stack: e.stack }, 'error with message-delivery route', { message: e.toString() })

    return res.status(500).json({
      error: e,
    })
  }
})

module.exports = router
