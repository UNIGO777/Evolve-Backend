const mongoose = require('mongoose')

const aboutTabSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    panelTitle: { type: String, required: true },
    panelDesc: { type: String, required: true },
    panelCta: { type: String, required: true },
    panelHref: { type: String, required: true },
    panelImage: { type: String, required: true },
  },
  { _id: false }
)

const aboutTabsContentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    tabs: { type: [aboutTabSchema], required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('AboutTabsContent', aboutTabsContentSchema)
