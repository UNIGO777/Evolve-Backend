const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const multer = require('multer')

const uploadsDir = path.join(__dirname, '..', '..', 'uploads')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync(uploadsDir, { recursive: true })
    cb(null, uploadsDir)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || '')
    const name = crypto.randomUUID()
    cb(null, `${name}${ext}`)
  },
})

const uploadSingle = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
}).single('file')

module.exports = { uploadSingle, uploadsDir }
