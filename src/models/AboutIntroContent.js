const mongoose = require('mongoose')

const aboutIntroContentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    label: { type: String, required: true },
    h1: { type: String, required: true },
    h2: { type: String, required: true },
    p1: { type: String, required: true },
    p2: { type: String, required: true },
    cta: { type: String, required: true },
    exp1: { type: String, required: true },
    exp2: { type: String, required: true },
    points: { type: [String], required: true },
    image1Url: { type: String, required: true },
    image2Url: { type: String, required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('AboutIntroContent', aboutIntroContentSchema)
