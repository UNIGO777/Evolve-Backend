const mongoose = require('mongoose')

const connectDb = async () => {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error('Missing MONGODB_URI in environment')
  }

  mongoose.set('strictQuery', true)

  await mongoose.connect(uri, {
    dbName: process.env.MONGODB_DBNAME || undefined,
  })

  console.log('MongoDB connected')
}

module.exports = connectDb
