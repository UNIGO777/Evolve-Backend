const express = require('express')

const { uploadSingle, uploadImageSingle, uploadVideoSingle } = require('../middlewares/upload')
const {
  listUploads,
  createUpload,
  listImageUploads,
  listVideoUploads,
  createImageUpload,
  createVideoUpload,
} = require('../controllers/uploadController')

const router = express.Router()

router.get('/', listUploads)
router.post('/', uploadSingle, createUpload)

router.get('/images', listImageUploads)
router.post('/images', uploadImageSingle, createImageUpload)

router.get('/videos', listVideoUploads)
router.post('/videos', uploadVideoSingle, createVideoUpload)

module.exports = router
