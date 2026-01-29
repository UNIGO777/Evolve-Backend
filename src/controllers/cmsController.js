const HeroContent = require('../models/HeroContent')
const AboutContent = require('../models/AboutContent')
const ServicesContent = require('../models/ServicesContent')

const HERO_KEY = 'home_hero'
const ABOUT_KEY = 'home_about'
const SERVICES_KEY = 'home_services'

const defaultHero = () => ({
  key: HERO_KEY,
  kicker: 'Technology and Business Solutions',
  title1: 'We Convert Concept',
  title2: 'Into Technology',
  desc: 'We help teams build products with modern engineering, thoughtful design, and scalable systems that grow with your business.',
  cta: 'Get Started',
  backgroundType: 'image',
  backgroundUrl:
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2344&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  backgroundImage:
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2344&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
})

const toStringOrEmpty = (v) => String(v ?? '').trim()
const toBackgroundType = (v) => {
  const value = String(v ?? '').trim().toLowerCase()
  return value === 'video' ? 'video' : 'image'
}

const defaultAbout = () => ({
  key: ABOUT_KEY,
  aboutLabel: 'About Us',
  heading1: 'Empowering Your Success',
  heading2: 'with Digital Expertise',
  paragraph1:
    'We craft digital marketing strategies that grow your pipeline, strengthen your brand, and improve customer experience across channels.',
  paragraph2:
    'Our team blends performance marketing, content, SEO, and analytics to deliver measurable growth outcomes.',
  buttonText: 'About Us',
  image1Url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=60',
  image2Url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=60',
  stats: [
    { value: '3k+', label: 'Successful Projects' },
    { value: '200+', label: 'Expert Team' },
    { value: '350+', label: 'Happy Customers' },
    { value: '16+', label: 'Years of Experience' },
  ],
})

const defaultServices = () => ({
  key: SERVICES_KEY,
  tag: 'Our Services',
  title1: 'Services We Provide to',
  title2: 'Elevate Your Business',
  viewAll: 'View All Services',
  cards: [
    {
      title: 'Website Development',
      description: 'Fast, responsive, conversion-focused websites that strengthen your brand.',
      href: '#service-website',
      iconKey: 'website',
    },
    {
      title: 'Mobile App Development',
      description: 'iOS/Android apps with smooth UX, stable performance, and room to scale.',
      href: '#service-mobile',
      iconKey: 'mobile',
    },
    {
      title: 'UI/UX Design',
      description: 'Modern interfaces that engage users and improve retention across journeys.',
      href: '#service-design',
      iconKey: 'design',
    },
  ],
})

const normalizeAboutStats = ({ stats, values, labels }) => {
  const safe = (v) => toStringOrEmpty(v)

  if (Array.isArray(stats) && stats.length) {
    const mapped = stats
      .map((s) => ({ value: safe(s?.value), label: safe(s?.label) }))
      .filter((s) => s.value || s.label)
    if (mapped.length) return mapped.slice(0, 4)
  }

  if (Array.isArray(values) || Array.isArray(labels)) {
    const out = []
    for (let i = 0; i < 4; i += 1) {
      const value = safe(values?.[i])
      const label = safe(labels?.[i])
      if (value || label) out.push({ value, label })
    }
    if (out.length) return out
  }

  return []
}

const normalizeServiceCards = (cards) => {
  if (!Array.isArray(cards)) return []
  return cards
    .map((c) => ({
      title: toStringOrEmpty(c?.title),
      description: toStringOrEmpty(c?.description),
      href: toStringOrEmpty(c?.href),
      iconKey: toStringOrEmpty(c?.iconKey) || 'website',
    }))
    .filter((c) => c.title || c.description || c.href || c.iconKey)
    .slice(0, 3)
}

const getHomeHero = async (req, res, next) => {
  try {
    const doc = await HeroContent.findOneAndUpdate(
      { key: HERO_KEY },
      { $setOnInsert: defaultHero() },
      { upsert: true, new: true }
    ).lean()

    const normalized = doc?.backgroundUrl
      ? doc
      : {
          ...doc,
          backgroundType: doc?.backgroundType || 'image',
          backgroundUrl: doc?.backgroundImage || defaultHero().backgroundUrl,
        }

    res.json({ ok: true, hero: normalized })
  } catch (err) {
    next(err)
  }
}

const updateHomeHero = async (req, res, next) => {
  try {
    const incomingBackgroundUrl = toStringOrEmpty(req.body?.backgroundUrl || req.body?.backgroundImage)
    const patch = {
      kicker: toStringOrEmpty(req.body?.kicker),
      title1: toStringOrEmpty(req.body?.title1),
      title2: toStringOrEmpty(req.body?.title2),
      desc: toStringOrEmpty(req.body?.desc),
      cta: toStringOrEmpty(req.body?.cta),
      backgroundType: toBackgroundType(req.body?.backgroundType),
      backgroundUrl: incomingBackgroundUrl,
    }

    const defaults = defaultHero()
    const nextDoc = {
      kicker: patch.kicker || defaults.kicker,
      title1: patch.title1 || defaults.title1,
      title2: patch.title2 || defaults.title2,
      desc: patch.desc || defaults.desc,
      cta: patch.cta || defaults.cta,
      backgroundType: patch.backgroundType || defaults.backgroundType,
      backgroundUrl: patch.backgroundUrl || defaults.backgroundUrl,
    }

    const doc = await HeroContent.findOneAndUpdate(
      { key: HERO_KEY },
      {
        $set: {
          ...nextDoc,
          backgroundImage: nextDoc.backgroundType === 'image' ? nextDoc.backgroundUrl : '',
        },
        $setOnInsert: { key: HERO_KEY },
      },
      { upsert: true, new: true }
    ).lean()

    res.json({ ok: true, hero: doc })
  } catch (err) {
    next(err)
  }
}

const getHomeAbout = async (req, res, next) => {
  try {
    const doc = await AboutContent.findOneAndUpdate(
      { key: ABOUT_KEY },
      { $setOnInsert: defaultAbout() },
      { upsert: true, new: true }
    ).lean()

    res.json({ ok: true, about: doc })
  } catch (err) {
    next(err)
  }
}

const updateHomeAbout = async (req, res, next) => {
  try {
    const defaults = defaultAbout()
    const incomingStats = normalizeAboutStats({
      stats: req.body?.stats,
      values: req.body?.statsValues,
      labels: req.body?.statsLabels,
    })

    const nextDoc = {
      aboutLabel: toStringOrEmpty(req.body?.aboutLabel) || defaults.aboutLabel,
      heading1: toStringOrEmpty(req.body?.heading1) || defaults.heading1,
      heading2: toStringOrEmpty(req.body?.heading2) || defaults.heading2,
      paragraph1: toStringOrEmpty(req.body?.paragraph1) || defaults.paragraph1,
      paragraph2: toStringOrEmpty(req.body?.paragraph2) || defaults.paragraph2,
      buttonText: toStringOrEmpty(req.body?.buttonText) || defaults.buttonText,
      image1Url: toStringOrEmpty(req.body?.image1Url) || defaults.image1Url,
      image2Url: toStringOrEmpty(req.body?.image2Url) || defaults.image2Url,
      stats:
        incomingStats.length === 4
          ? incomingStats
          : defaults.stats.map((s, idx) => ({
              value: incomingStats[idx]?.value || s.value,
              label: incomingStats[idx]?.label || s.label,
            })),
    }

    const doc = await AboutContent.findOneAndUpdate(
      { key: ABOUT_KEY },
      { $set: nextDoc, $setOnInsert: { key: ABOUT_KEY } },
      { upsert: true, new: true }
    ).lean()

    res.json({ ok: true, about: doc })
  } catch (err) {
    next(err)
  }
}

const getHomeServices = async (req, res, next) => {
  try {
    const doc = await ServicesContent.findOneAndUpdate(
      { key: SERVICES_KEY },
      { $setOnInsert: defaultServices() },
      { upsert: true, new: true }
    ).lean()

    res.json({ ok: true, services: doc })
  } catch (err) {
    next(err)
  }
}

const updateHomeServices = async (req, res, next) => {
  try {
    const defaults = defaultServices()
    const incomingCards = normalizeServiceCards(req.body?.cards)

    const nextCards = defaults.cards.map((d, idx) => {
      const c = incomingCards[idx] || {}
      return {
        title: c.title || d.title,
        description: c.description || d.description,
        href: c.href || d.href,
        iconKey: c.iconKey || d.iconKey,
      }
    })

    const nextDoc = {
      tag: toStringOrEmpty(req.body?.tag) || defaults.tag,
      title1: toStringOrEmpty(req.body?.title1) || defaults.title1,
      title2: toStringOrEmpty(req.body?.title2) || defaults.title2,
      viewAll: toStringOrEmpty(req.body?.viewAll) || defaults.viewAll,
      cards: nextCards,
    }

    const doc = await ServicesContent.findOneAndUpdate(
      { key: SERVICES_KEY },
      { $set: nextDoc, $setOnInsert: { key: SERVICES_KEY } },
      { upsert: true, new: true }
    ).lean()

    res.json({ ok: true, services: doc })
  } catch (err) {
    next(err)
  }
}

module.exports = { getHomeHero, updateHomeHero, getHomeAbout, updateHomeAbout, getHomeServices, updateHomeServices }
