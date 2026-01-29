const nodemailer = require('nodemailer')

const getTransporter = () => {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 587)
  const secure = String(process.env.SMTP_SECURE || 'false').toLowerCase() === 'true'
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    const err = new Error('Missing SMTP config in environment')
    err.statusCode = 500
    throw err
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  })
}

const sendMail = async ({ to, subject, html }) => {
  const from = process.env.SMTP_FROM || process.env.SMTP_USER
  const transporter = getTransporter()
  await transporter.sendMail({ from, to, subject, html })
}

module.exports = { sendMail }
