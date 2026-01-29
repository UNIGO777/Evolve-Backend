const express = require('express')

const { requireAdmin } = require('../middlewares/adminAuth')
const {
  getHomeHero,
  updateHomeHero,
  getHomeAbout,
  updateHomeAbout,
  getHomeServices,
  updateHomeServices,
  getHomeProcess,
  updateHomeProcess,
  getHomeTestimonials,
  updateHomeTestimonials,
  getHomeFaq,
  updateHomeFaq,
  getHomeContact,
  updateHomeContact,
} = require('../controllers/cmsController')

const router = express.Router()

router.get('/hero', getHomeHero)
router.put('/hero', requireAdmin, updateHomeHero)

router.get('/about', getHomeAbout)
router.put('/about', requireAdmin, updateHomeAbout)

router.get('/services', getHomeServices)
router.put('/services', requireAdmin, updateHomeServices)

router.get('/process', getHomeProcess)
router.put('/process', requireAdmin, updateHomeProcess)

router.get('/testimonials', getHomeTestimonials)
router.put('/testimonials', requireAdmin, updateHomeTestimonials)

router.get('/faq', getHomeFaq)
router.put('/faq', requireAdmin, updateHomeFaq)

router.get('/contact', getHomeContact)
router.put('/contact', requireAdmin, updateHomeContact)

module.exports = router
