const express = require('express')
const { initSocket } = require('./src/api/middleware/initSocket')

const { PORT } = require('./src/consts')
const api = require('./src/api/index')

const app = express()

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json')

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST, GET')
    return res.status(200).json({})
  }
  return next()
})

app.use('/', api)

const socketIO = initSocket(app, PORT)

app.set('socketIO', socketIO)
