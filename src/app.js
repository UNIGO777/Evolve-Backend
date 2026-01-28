const express = require('express')
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')

const apiRoutes = require('./routes')
const { notFound, errorHandler } = require('./middlewares/errorHandler')

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: true }))

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

app.use('/api', apiRoutes)

app.use(notFound)
app.use(errorHandler)

module.exports = app
