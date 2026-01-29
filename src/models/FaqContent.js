const mongoose = require('mongoose')

const faqItemSchema = new mongoose.Schema(
  {
    q: { type: String, required: true },
    a: { type: String, required: true },
  },
  { _id: false }
)

const faqContentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    title: { type: String, required: true },
    footerLeft: { type: String, required: true },
    footerBtn: { type: String, required: true },
    items: { type: [faqItemSchema], required: true, default: [] },
  },
  { timestamps: true }
)

module.exports = mongoose.model('FaqContent', faqContentSchema)
