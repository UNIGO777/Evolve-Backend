const express = require('express')

const { requireAdmin } = require('../middlewares/adminAuth')
const {
  getHomeHero,
  updateHomeHero,
  getHomeAbout,
  updateHomeAbout,
  getHomeServices,
  updateHomeServices,
} = require('../controllers/cmsController')

const router = express.Router()

router.get('/hero', getHomeHero)
router.put('/hero', requireAdmin, updateHomeHero)

router.get('/about', getHomeAbout)
router.put('/about', requireAdmin, updateHomeAbout)

router.get('/services', getHomeServices)
router.put('/services', requireAdmin, updateHomeServices)

module.exports = router
