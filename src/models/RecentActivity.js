const mongoose = require('mongoose')

const recentActivitySchema = new mongoose.Schema(
  {
    action: { type: String, required: true },
    controller: { type: String, required: true },
    actor: { type: String, required: false },
    method: { type: String, required: false },
    path: { type: String, required: false },
    ip: { type: String, required: false },
    userAgent: { type: String, required: false },
    details: { type: mongoose.Schema.Types.Mixed, required: false },
  },
  { timestamps: true }
)

module.exports = mongoose.model('RecentActivity', recentActivitySchema)
