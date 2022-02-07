/* eslint-disable no-unreachable */
const router = require('express').Router()

router.get('/', async (req, res) => {
  try {
    return 0
  } catch (e) {
    console.log({ stack: e.stack }, 'error with this files', { message: e.toString() })

    return res.status(500).json({
      error: e,
    })
  }
})

module.exports = router
