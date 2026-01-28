const path = require('path')

const Upload = require('../models/Upload')

const listUploads = async (req, res, next) => {
  try {
    const uploads = await Upload.find().sort({ createdAt: -1 }).lean()
    res.json({ ok: true, uploads })
  } catch (err) {
    next(err)
  }
}

const createUpload = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400)
      throw new Error('Missing file (field name: file)')
    }

    const relativePath = path.posix.join('uploads', req.file.filename)
    const doc = await Upload.create({
      originalName: req.file.originalname,
      filename: req.file.filename,
      relativePath,
      mimetype: req.file.mimetype,
      size: req.file.size,
    })

    res.status(201).json({
      ok: true,
      upload: doc,
      url: `/${relativePath}`,
    })
  } catch (err) {
    next(err)
  }
}

module.exports = { listUploads, createUpload }
