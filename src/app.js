const express = require('express')
const app = express()

require('./db/mongoose')

const ticketRouter = require('./routers/ticket')

app.use(express.json())
app.use(ticketRouter)

app.get('/', (req, res) => {
  res.send({ message: 'Server is running...' })
})

app.get('*', (req, res) => {
  res.status(404).send()
})

module.exports = app
