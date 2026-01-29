const mongoose = require('mongoose')

const serviceCardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    href: { type: String, required: true },
    iconKey: { type: String, required: true },
  },
  { _id: false }
)

const servicesContentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    tag: { type: String, required: true },
    title1: { type: String, required: true },
    title2: { type: String, required: true },
    viewAll: { type: String, required: true },
    cards: { type: [serviceCardSchema], required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('ServicesContent', servicesContentSchema)
