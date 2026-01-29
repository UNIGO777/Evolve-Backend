const RecentActivity = require('../models/RecentActivity')

const toPositiveInt = (value, fallback) => {
  const n = Number.parseInt(String(value ?? ''), 10)
  if (Number.isFinite(n) && n > 0) return n
  return fallback
}

const listRecentActivities = async (req, res, next) => {
  try {
    const limit = Math.min(toPositiveInt(req.query?.limit, 10), 50)
    const activities = await RecentActivity.find().sort({ createdAt: -1 }).limit(limit).lean()
    res.json({ ok: true, activities })
  } catch (err) {
    next(err)
  }
}

module.exports = { listRecentActivities }
