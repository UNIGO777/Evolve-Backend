const mongoose = require('mongoose')

const processStepSchema = new mongoose.Schema(
  {
    number: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    iconKey: { type: String, required: true },
  },
  { _id: false }
)

const processContentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    kicker: { type: String, required: true },
    title1: { type: String, required: true },
    title2: { type: String, required: true },
    steps: { type: [processStepSchema], required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('ProcessContent', processContentSchema)

