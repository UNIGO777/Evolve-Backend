const express = require('express')

const { requireAdmin } = require('../middlewares/adminAuth')
const {
  getHomeHero,
  updateHomeHero,
  getHomeAbout,
  updateHomeAbout,
  getAboutHero,
  updateAboutHero,
  getAboutIntro,
  updateAboutIntro,
  getAboutTabs,
  updateAboutTabs,
  getAboutWhyChoose,
  updateAboutWhyChoose,
  getAboutHelp,
  updateAboutHelp,
  getAboutTeam,
  updateAboutTeam,
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

router.get('/about-hero', getAboutHero)
router.put('/about-hero', requireAdmin, updateAboutHero)

router.get('/about-intro', getAboutIntro)
router.put('/about-intro', requireAdmin, updateAboutIntro)

router.get('/about-tabs', getAboutTabs)
router.put('/about-tabs', requireAdmin, updateAboutTabs)

router.get('/about-why', getAboutWhyChoose)
router.put('/about-why', requireAdmin, updateAboutWhyChoose)

router.get('/about-help', getAboutHelp)
router.put('/about-help', requireAdmin, updateAboutHelp)

router.get('/about-team', getAboutTeam)
router.put('/about-team', requireAdmin, updateAboutTeam)

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
