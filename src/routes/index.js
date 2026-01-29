const express = require('express')

const uploadRoutes = require('./uploadRoutes')
const adminRoutes = require('./adminRoutes')

const router = express.Router()

router.use('/uploads', uploadRoutes)
router.use('/admin', adminRoutes)

module.exports = router
