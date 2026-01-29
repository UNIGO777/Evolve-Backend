const path = require('path')

const Upload = require('../models/Upload')
const RecentActivity = require('../models/RecentActivity')

const logRecentActivity = async ({ req, action, actor, details }) => {
  try {
    await RecentActivity.create({
      action,
      controller: 'uploadController',
      actor,
      method: req?.method,
      path: req?.originalUrl,
      ip: req?.ip,
      userAgent: req?.get?.('user-agent'),
      details,
    })
  } catch (err) {
    return
  }
}

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

    await logRecentActivity({
      req,
      action: 'upload.created',
      actor: req.admin?.email,
      details: {
        uploadId: String(doc?._id || ''),
        kind: doc?.kind,
        originalName: doc?.originalName,
        relativePath: doc?.relativePath,
      },
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

      await logRecentActivity({
        req,
        action: 'upload.created',
        actor: req.admin?.email,
        details: {
          uploadId: String(doc?._id || ''),
          kind: doc?.kind,
          originalName: doc?.originalName,
          relativePath: doc?.relativePath,
        },
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
