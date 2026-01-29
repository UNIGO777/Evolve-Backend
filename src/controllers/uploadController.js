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

const listUploadsByKind = (kind) => async (req, res, next) => {
  try {
    const uploads = await Upload.find({ kind }).sort({ createdAt: -1 }).lean()
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
      kind: 'file',
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

const createUploadByKind =
  ({ kind, subdir }) =>
  async (req, res, next) => {
    try {
      if (!req.file) {
        res.status(400)
        throw new Error('Missing file (field name: file)')
      }

      const relativePath = path.posix.join('uploads', subdir, req.file.filename)
      const doc = await Upload.create({
        originalName: req.file.originalname,
        filename: req.file.filename,
        relativePath,
        mimetype: req.file.mimetype,
        size: req.file.size,
        kind,
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

const listImageUploads = listUploadsByKind('image')
const listVideoUploads = listUploadsByKind('video')
const createImageUpload = createUploadByKind({ kind: 'image', subdir: 'images' })
const createVideoUpload = createUploadByKind({ kind: 'video', subdir: 'videos' })

module.exports = {
  listUploads,
  createUpload,
  listImageUploads,
  listVideoUploads,
  createImageUpload,
  createVideoUpload,
}
