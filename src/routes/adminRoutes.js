const express = require('express')

const { requestAdminOtp, verifyAdminOtp } = require('../controllers/adminAuthController')

const router = express.Router()

router.post('/login', requestAdminOtp)
router.post('/verify-otp', verifyAdminOtp)

module.exports = router
