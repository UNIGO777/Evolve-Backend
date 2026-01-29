const jwt = require('jsonwebtoken')

const requireAdmin = (req, res, next) => {
  try {
    const header = String(req.headers.authorization || '')
    const parts = header.split(' ')
    const token = parts.length === 2 && parts[0] === 'Bearer' ? parts[1] : ''

    if (!token) {
      res.status(401)
      throw new Error('Missing admin token')
    }

    const secret = process.env.ADMIN_JWT_SECRET
    if (!secret) {
      res.status(500)
      throw new Error('Missing ADMIN_JWT_SECRET in environment')
    }

    const payload = jwt.verify(token, secret)
    if (payload?.sub !== 'admin') {
      res.status(403)
      throw new Error('Forbidden')
    }

    req.admin = payload
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = { requireAdmin }
