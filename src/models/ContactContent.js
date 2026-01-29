const mongoose = require('mongoose')

const contactCardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    lines: { type: [String], required: true, default: [] },
  },
  { _id: false }
)

const contactContentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    kicker: { type: String, required: true },
    cards: { type: [contactCardSchema], required: true, default: [] },
    formTitle: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String, required: true },
    countryPlaceholder: { type: String, required: true },
    message: { type: String, required: true },
    messagePlaceholder: { type: String, required: true },
    servicesTitle: { type: String, required: true },
    submit: { type: String, required: true },
    agreePrefix: { type: String, required: true },
    privacy: { type: String, required: true },
    countries: { type: [String], required: true, default: [] },
    services: { type: [String], required: true, default: [] },
  },
  { timestamps: true }
)

module.exports = mongoose.model('ContactContent', contactContentSchema)
