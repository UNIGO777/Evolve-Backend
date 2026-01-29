const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const AdminOtp = require('../models/AdminOtp')
const RecentActivity = require('../models/RecentActivity')
const { sendMail } = require('../utils/mailer')

const normalizeEmail = (value) => String(value || '').trim().toLowerCase()

const logRecentActivity = async ({ req, action, actor, details }) => {
  try {
    await RecentActivity.create({
      action,
      controller: 'adminAuthController',
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

const getOtpSecret = () => {
  const secret = process.env.ADMIN_OTP_SECRET || process.env.ADMIN_JWT_SECRET
  if (!secret) {
    const err = new Error('Missing ADMIN_OTP_SECRET (or ADMIN_JWT_SECRET) in environment')
    err.statusCode = 500
    throw err
  }
  return secret
}

const hashOtp = (otp) => {
  const secret = getOtpSecret()
  return crypto.createHmac('sha256', secret).update(String(otp)).digest('hex')
}

const generateOtp = () => String(crypto.randomInt(100000, 1000000))

const requestAdminOtp = async (req, res, next) => {
  try {
    const email = normalizeEmail(req.body?.email)
    const password = String(req.body?.password || '').trim()

    const adminEmail = normalizeEmail(process.env.ADMIN_EMAIL)
    const adminPassword = String(process.env.ADMIN_PASSWORD || '').trim()

    if (!adminEmail || !adminPassword) {
      res.status(500)
      throw new Error('Missing ADMIN_EMAIL or ADMIN_PASSWORD in environment')
    }

    if (email !== adminEmail || password !== adminPassword) {
      const isProd = String(process.env.NODE_ENV || '').toLowerCase() === 'production'
      return res.status(401).json({
        ok: false,
        message: 'Invalid credentials',
        ...(isProd
          ? {}
          : {
              details: {
                emailMatch: email === adminEmail,
                passwordMatch: password === adminPassword,
                receivedEmail: email,
                receivedPasswordLen: password.length,
              },
            }),
      })
    }

    const otp = generateOtp()
    const otpHash = hashOtp(otp)
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000)

    await AdminOtp.findOneAndUpdate(
      { email: adminEmail },
      { $set: { otpHash, expiresAt } },
      { upsert: true, new: true }
    )

    await sendMail({
      to: adminEmail,
      subject: 'Admin OTP',
      html: `<div style="font-family:Arial,sans-serif;line-height:1.5">
        <h2 style="margin:0 0 10px 0">Your OTP</h2>
        <p style="margin:0 0 12px 0">Use this OTP to login. It expires in 10 minutes.</p>
        <div style="font-size:28px;font-weight:700;letter-spacing:6px">${otp}</div>
      </div>`,
    })

    await logRecentActivity({
      req,
      action: 'admin.otp_requested',
      actor: adminEmail,
      details: { email: adminEmail },
    })

    res.json({ ok: true, message: 'OTP sent' })
  } catch (err) {
    next(err)
  }
}

const verifyAdminOtp = async (req, res, next) => {
  try {
    const email = normalizeEmail(req.body?.email)
    const otp = String(req.body?.otp || '').trim()

    const adminEmail = normalizeEmail(process.env.ADMIN_EMAIL)
    const jwtSecret = process.env.ADMIN_JWT_SECRET

    if (!adminEmail) {
      res.status(500)
      throw new Error('Missing ADMIN_EMAIL in environment')
    }

    if (email !== adminEmail) {
      res.status(400)
      throw new Error('Invalid email')
    }

    if (!otp || otp.length < 4) {
      res.status(400)
      throw new Error('Invalid OTP')
    }

    const doc = await AdminOtp.findOne({ email: adminEmail })
    if (!doc) {
      res.status(400)
      throw new Error('OTP expired or not found')
    }

    if (doc.expiresAt.getTime() < Date.now()) {
      await AdminOtp.deleteOne({ email: adminEmail })
      res.status(400)
      throw new Error('OTP expired')
    }

    const ok = hashOtp(otp) === doc.otpHash
    if (!ok) {
      res.status(400)
      throw new Error('Invalid OTP')
    }

    await AdminOtp.deleteOne({ email: adminEmail })

    if (!jwtSecret) {
      res.status(500)
      throw new Error('Missing ADMIN_JWT_SECRET in environment')
    }

    const token = jwt.sign({ sub: 'admin', email: adminEmail }, jwtSecret, { expiresIn: '1d' })

    await logRecentActivity({
      req,
      action: 'admin.login',
      actor: adminEmail,
      details: { email: adminEmail },
    })

    res.json({ ok: true, token })
  } catch (err) {
    next(err)
  }
}

module.exports = { requestAdminOtp, verifyAdminOtp }
