const express = require('express')

const { requireAdmin } = require('../middlewares/adminAuth')
const { listRecentActivities } = require('../controllers/recentActivityController')

const router = express.Router()

router.get('/', requireAdmin, listRecentActivities)

module.exports = router
