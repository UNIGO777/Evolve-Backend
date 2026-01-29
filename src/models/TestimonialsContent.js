const mongoose = require('mongoose')

const testimonialItemSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    name: { type: String, required: true },
    handle: { type: String, required: false },
    avatar: { type: String, required: false },
  },
  { _id: false }
)

const testimonialsContentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    kicker: { type: String, required: true },
    title: { type: String, required: true },
    testimonials: { type: [testimonialItemSchema], required: true, default: [] },
  },
  { timestamps: true }
)

module.exports = mongoose.model('TestimonialsContent', testimonialsContentSchema)
