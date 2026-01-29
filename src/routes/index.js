const express = require('express')

const uploadRoutes = require('./uploadRoutes')
const adminRoutes = require('./adminRoutes')
const cmsRoutes = require('./cmsRoutes')

const router = express.Router()

router.use('/uploads', uploadRoutes)
router.use('/admin', adminRoutes)
router.use('/cms', cmsRoutes)

module.exports = router
