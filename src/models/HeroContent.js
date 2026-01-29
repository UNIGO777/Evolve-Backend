const mongoose = require('mongoose')

const heroContentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    kicker: { type: String, required: true },
    title1: { type: String, required: true },
    title2: { type: String, required: true },
    desc: { type: String, required: true },
    cta: { type: String, required: true },
    backgroundType: { type: String, enum: ['image', 'video'], required: true, default: 'image' },
    backgroundUrl: { type: String, required: true },
    backgroundImage: { type: String, required: false },
  },
  { timestamps: true }
)

module.exports = mongoose.model('HeroContent', heroContentSchema)
