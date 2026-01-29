const mongoose = require('mongoose')

const aboutWhySkillSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: Number, required: true },
  },
  { _id: false }
)

const aboutWhyChooseContentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    whyLabel: { type: String, required: true },
    whyTitle1: { type: String, required: true },
    whyTitle2: { type: String, required: true },
    whyDesc: { type: String, required: true },
    whyCardTitle: { type: String, required: true },
    imageUrl: { type: String, required: true },
    skills: { type: [aboutWhySkillSchema], required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('AboutWhyChooseContent', aboutWhyChooseContentSchema)
