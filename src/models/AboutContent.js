const mongoose = require('mongoose')

const aboutStatSchema = new mongoose.Schema(
  {
    value: { type: String, required: true },
    label: { type: String, required: true },
  },
  { _id: false }
)

const aboutContentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    aboutLabel: { type: String, required: true },
    heading1: { type: String, required: true },
    heading2: { type: String, required: true },
    paragraph1: { type: String, required: true },
    paragraph2: { type: String, required: true },
    buttonText: { type: String, required: true },
    image1Url: { type: String, required: true },
    image2Url: { type: String, required: true },
    stats: { type: [aboutStatSchema], required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('AboutContent', aboutContentSchema)
