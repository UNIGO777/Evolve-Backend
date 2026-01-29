const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const multer = require('multer')

const uploadsDir = path.join(__dirname, '..', '..', 'uploads')

const makeStorage = (subdir) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const dest = subdir ? path.join(uploadsDir, subdir) : uploadsDir
      fs.mkdirSync(dest, { recursive: true })
      cb(null, dest)
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname || '')
      const name = crypto.randomUUID()
      cb(null, `${name}${ext}`)
    },
  })

const makeFileFilter = ({ acceptPrefix }) => {
  return (req, file, cb) => {
    if (!file?.mimetype || !file.mimetype.startsWith(acceptPrefix)) {
      const err = new Error(`Invalid file type. Expected ${acceptPrefix}*`)
      err.statusCode = 400
      cb(err)
      return
    }
    cb(null, true)
  }
}

const uploadSingle = multer({
  storage: makeStorage(''),
  limits: { fileSize: 10 * 1024 * 1024 },
}).single('file')

const uploadImageSingle = multer({
  storage: makeStorage('images'),
  fileFilter: makeFileFilter({ acceptPrefix: 'image/' }),
  limits: { fileSize: 10 * 1024 * 1024 },
}).single('file')

const uploadVideoSingle = multer({
  storage: makeStorage('videos'),
  fileFilter: makeFileFilter({ acceptPrefix: 'video/' }),
  limits: { fileSize: 200 * 1024 * 1024 },
}).single('file')

module.exports = { uploadSingle, uploadImageSingle, uploadVideoSingle, uploadsDir }
