const express = require('express')

const { uploadSingle } = require('../middlewares/upload')
const { listUploads, createUpload } = require('../controllers/uploadController')

const router = express.Router()

router.get('/', listUploads)
router.post('/', uploadSingle, createUpload)

module.exports = router
