const mongoose = require('mongoose')

const uploadSchema = new mongoose.Schema(
  {
    originalName: { type: String, required: true },
    filename: { type: String, required: true },
    relativePath: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number, required: true },
    kind: { type: String, enum: ['file', 'image', 'video'], default: 'file', index: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Upload', uploadSchema)
