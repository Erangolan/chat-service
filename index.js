const express = require('express')
const { initSocket } = require('./src/api/middleware/initSocket')

const { PORT } = require('./src/consts')
const api = require('./src/api/index')

const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST, GET')
    return res.status(200).json({})
  }
  return next()
})

app.use('/', api)

const socketIO = initSocket(app, PORT)

app.set('socketIO', socketIO)
