const mongoose = require('mongoose')

const aboutHelpCardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    icon: { type: String, required: true },
  },
  { _id: false }
)

const aboutHelpContentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    helpTitle: { type: String, required: true },
    helpDesc: { type: String, required: true },
    helpCta: { type: String, required: true },
    helpHref: { type: String, required: true },
    imageUrl: { type: String, required: true },
    cards: { type: [aboutHelpCardSchema], required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('AboutHelpContent', aboutHelpContentSchema)
