const path = require('path')

require('dotenv').config({ path: path.join(__dirname, '.env'), override: true })

const app = require('./src/app')
const connectDb = require('./src/config/db')

const PORT = Number(process.env.PORT || 5000)

const start = async () => {
  await connectDb()

  const server = app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`)
  })

  const shutdown = (signal) => {
    server.close(() => {
      console.log(`Server closed (${signal})`)
      process.exit(0)
    })
  }

  process.on('SIGINT', () => shutdown('SIGINT'))
  process.on('SIGTERM', () => shutdown('SIGTERM'))
}

start().catch((err) => {
  console.error(err)
  process.exit(1)
})
