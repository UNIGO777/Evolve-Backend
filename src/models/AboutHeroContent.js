const mongoose = require('mongoose')

const aboutHeroContentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    kicker: { type: String, required: true },
    backgroundImage: { type: String, required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('AboutHeroContent', aboutHeroContentSchema)
