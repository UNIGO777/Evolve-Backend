const express = require('express')

const uploadRoutes = require('./uploadRoutes')
const adminRoutes = require('./adminRoutes')
const cmsRoutes = require('./cmsRoutes')
const recentActivityRoutes = require('./recentActivityRoutes')

const router = express.Router()

router.use('/uploads', uploadRoutes)
router.use('/admin', adminRoutes)
router.use('/cms', cmsRoutes)
router.use('/recent-activity', recentActivityRoutes)

module.exports = router
