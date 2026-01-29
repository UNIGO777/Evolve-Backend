const mongoose = require('mongoose')

const aboutTeamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, required: true },
  },
  { _id: false }
)

const aboutTeamContentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    teamLabel: { type: String, required: true },
    teamTitle: { type: String, required: true },
    teamDesc: { type: String, required: true },
    teamCta: { type: String, required: true },
    teamHref: { type: String, required: true },
    members: { type: [aboutTeamMemberSchema], required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('AboutTeamContent', aboutTeamContentSchema)
