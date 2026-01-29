const HeroContent = require('../models/HeroContent')
const AboutContent = require('../models/AboutContent')
const AboutHeroContent = require('../models/AboutHeroContent')
const AboutIntroContent = require('../models/AboutIntroContent')
const AboutTabsContent = require('../models/AboutTabsContent')
const AboutWhyChooseContent = require('../models/AboutWhyChooseContent')
const AboutHelpContent = require('../models/AboutHelpContent')
const AboutTeamContent = require('../models/AboutTeamContent')
const ServicesContent = require('../models/ServicesContent')
const ProcessContent = require('../models/ProcessContent')
const TestimonialsContent = require('../models/TestimonialsContent')
const FaqContent = require('../models/FaqContent')
const ContactContent = require('../models/ContactContent')
const RecentActivity = require('../models/RecentActivity')

const HERO_KEY = 'home_hero'
const ABOUT_KEY = 'home_about'
const ABOUT_HERO_KEY = 'about_hero'
const ABOUT_INTRO_KEY = 'about_intro'
const ABOUT_TABS_KEY = 'about_tabs'
const ABOUT_WHY_KEY = 'about_why'
const ABOUT_HELP_KEY = 'about_help'
const ABOUT_TEAM_KEY = 'about_team'
const SERVICES_KEY = 'home_services'
const PROCESS_KEY = 'home_process'
const TESTIMONIALS_KEY = 'home_testimonials'
const FAQ_KEY = 'home_faq'
const CONTACT_KEY = 'home_contact'

const logRecentActivity = async ({ req, action, actor, details }) => {
  try {
    await RecentActivity.create({
      action,
      controller: 'cmsController',
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

const defaultAboutHero = () => ({
  key: ABOUT_HERO_KEY,
  title: 'About Us',
  kicker: 'Evolv Digitals',
  backgroundImage:
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2200&q=60',
})

const defaultAboutIntro = () => ({
  key: ABOUT_INTRO_KEY,
  label: 'ABOUT EVOLV',
  h1: 'Innovative Strategies',
  h2: 'for Digital Growth',
  p1: 'We help brands scale with performance marketing, thoughtful design, and product-led strategy across channels.',
  p2: 'Our focus stays simple: measurable outcomes, better customer experience, and long-term trust built on execution.',
  points: [
    'Custom strategy & planning',
    'SEO & content growth',
    'Performance marketing',
    'Branding & design systems',
    'Analytics & optimization',
    'Scalable tech support',
  ],
  cta: 'Learn More',
  exp1: '25+',
  exp2: 'Years of Experience',
  image1Url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=60',
  image2Url: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=60',
})

const defaultAboutTabs = () => ({
  key: ABOUT_TABS_KEY,
  tabs: [
    {
      title: 'Our Vision',
      desc: 'Build brands that earn trust and scale sustainably with strong digital foundations and consistent execution.',
      panelTitle: 'Our vision prepares you for long-term growth',
      panelDesc:
        'We combine brand, performance, and product thinking to build scalable growth systems—short-term wins with long-term trust.',
      panelCta: 'Contact Us',
      panelHref: '/#contact',
      panelImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2000&q=60',
    },
    {
      title: 'Our Mission',
      desc: 'Deliver measurable growth through strategy, design, marketing, and analytics—aligned to business goals.',
      panelTitle: 'Our mission is to deliver measurable results',
      panelDesc:
        'Goal-first planning, fast execution, and transparent reporting—so you always know what’s working and why.',
      panelCta: 'Contact Us',
      panelHref: '/#contact',
      panelImage: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=2000&q=60',
    },
    {
      title: 'Our History',
      desc: 'From small beginnings to a growth partner for teams—our journey is defined by results and relationships.',
      panelTitle: 'Our history is built on execution and trust',
      panelDesc: 'We’ve partnered with teams to ship campaigns and full-funnel systems—always focused on measurable outcomes.',
      panelCta: 'Contact Us',
      panelHref: '/#contact',
      panelImage: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=2000&q=60',
    },
  ],
})

const defaultAboutWhy = () => ({
  key: ABOUT_WHY_KEY,
  whyLabel: 'WHY CHOOSE US',
  whyTitle1: 'Reliable Digital Solutions',
  whyTitle2: 'Tailored to Your Needs',
  whyDesc: 'A clear process, experienced execution, and transparent reporting—built to deliver growth you can measure.',
  whyCardTitle: 'Growth Research for Results Mastery',
  imageUrl: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=1600&q=60',
  skills: [
    { label: 'Analytical Skill', value: 94 },
    { label: 'Marketing Knowledge', value: 98 },
    { label: 'Advisory & Consultation', value: 93 },
    { label: 'Problem-Solving Skills', value: 96 },
  ],
})

const defaultAboutHelp = () => ({
  key: ABOUT_HELP_KEY,
  helpTitle: "We're here to help you achieve your goals",
  helpDesc: 'From strategy to execution, we deliver clear plans and measurable actions that improve brand and performance.',
  helpCta: 'Contact Us',
  helpHref: '/#contact',
  imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=60',
  cards: [
    {
      title: 'Commitment',
      desc: 'We stay focused on delivery and outcomes so progress is visible in every sprint.',
      icon: 'gear',
    },
    {
      title: 'Honesty',
      desc: 'Transparent reporting and clear communication, so decisions stay data-driven.',
      icon: 'scale',
    },
    {
      title: 'Growth',
      desc: 'Continuous optimization and experimentation to build sustainable growth systems.',
      icon: 'chart',
    },
  ],
})

const defaultAboutTeam = () => ({
  key: ABOUT_TEAM_KEY,
  teamLabel: 'OUR TEAM',
  teamTitle: 'Meet Our Professional Team',
  teamDesc: 'A team of strategists, creatives, and performance marketers focused on measurable outcomes and clean execution.',
  teamCta: 'View More',
  teamHref: '#',
  members: [
    {
      name: 'Mark Joseph',
      role: 'Growth Strategist',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1600&q=60',
    },
    {
      name: 'Ella Grace',
      role: 'Performance Marketer',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1600&q=60',
    },
    {
      name: 'Kylian Herrera',
      role: 'Creative Lead',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1600&q=60',
    },
    {
      name: 'Noah Carter',
      role: 'SEO Specialist',
      image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=1600&q=60',
    },
    {
      name: 'Sophia Patel',
      role: 'Content Strategist',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1600&q=60',
    },
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

const defaultProcess = () => ({
  key: PROCESS_KEY,
  kicker: 'Our Work Process',
  title1: 'Our Proven',
  title2: 'Work Process',
  steps: [
    {
      number: '01',
      title: 'Consultation',
      description: 'Understand your goals, audience, and requirements to set direction.',
      iconKey: 'consultation',
    },
    {
      number: '02',
      title: 'Strategy',
      description: 'Create a clear roadmap so results stay predictable and measurable.',
      iconKey: 'strategy',
    },
    {
      number: '03',
      title: 'Implementation',
      description: 'Execute design, development, and launch with fast iterations.',
      iconKey: 'implementation',
    },
    {
      number: '04',
      title: 'Final Result',
      description: 'Ship with QA, delivery, and reporting to ensure outcomes.',
      iconKey: 'final',
    },
  ],
})

const defaultTestimonials = () => ({
  key: TESTIMONIALS_KEY,
  kicker: 'Testimonial',
  title: 'Transformative Client Experiences',
  testimonials: [
    {
      text: 'From the very first call, the team exuded professionalism and an almost obsessive attention to detail. Every question was answered before I even asked it, and the final deliverable felt tailor-made for our brand. I could not be happier with the results.',
      name: 'Guy Hawkins',
      handle: '@guyhawkins',
      avatar: 'https://i.pravatar.cc/80?img=12',
    },
    {
      text: 'A truly seamless experience from start to finish. The onboarding was effortless, communication was crystal-clear, and the project wrapped up ahead of schedule. If you are looking for a partner you can trust to get it right the first time, look no further.',
      name: 'Karla Lynn',
      handle: '@karlalynn98',
      avatar: 'https://i.pravatar.cc/80?img=47',
    },
    {
      text: 'Reliable, trustworthy, and incredibly proactive. They anticipated roadblocks before they appeared and handled every curveball with grace. Working with them made my life so much easier and freed me up to focus on growing my business.',
      name: 'Jane Cooper',
      handle: '@janecooper',
      avatar: 'https://i.pravatar.cc/80?img=5',
    },
    {
      text: 'The level of craftsmanship and strategic thinking blew me away. They took our vague idea and transformed it into a polished, high-impact solution that our users love. The ROI we have seen in just three months is already triple what we invested.',
      name: 'Rafael Silva',
      handle: '@rafaelsilva',
      avatar: 'https://i.pravatar.cc/80?img=23',
    },
    {
      text: 'I have worked with dozens of agencies, but none have matched the clarity, speed, and genuine care this team brings to the table. They treat your project like it is their own, and that passion shows in every pixel and every line of code.',
      name: 'Amara Okafor',
      handle: '@amarao',
      avatar: 'https://i.pravatar.cc/80?img=64',
    },
    {
      text: 'What stood out most was their commitment to understanding our mission. They did not just build a product; they crafted an experience that resonates with our community and amplifies our impact. The feedback from stakeholders has been overwhelmingly positive.',
      name: 'Leo Thompson',
      handle: '@leothompson',
      avatar: 'https://i.pravatar.cc/80?img=39',
    },
  ],
})

const defaultFaq = () => ({
  key: FAQ_KEY,
  imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=60',
  title: 'Do you have questions?',
  footerLeft: 'My question is not here.',
  footerBtn: 'CONNECT US',
  items: [
    {
      q: 'What is your return policy?',
      a: 'We offer a 15-day return window for a full refund or exchange on unused items. Returns must include original packaging and proof of purchase for processing.',
    },
    {
      q: 'Do you offer international shipping?',
      a: 'Yes. We ship internationally to select destinations. Shipping rates and delivery times vary by location.',
    },
    {
      q: 'What if I receive a damaged or defective product?',
      a: 'Contact us within 48 hours of delivery with photos of the issue. We will arrange a replacement or refund after review.',
    },
    {
      q: 'Are the product colors on the website accurate?',
      a: 'We do our best to display colors accurately, but screen settings can vary. If you need help, reach out before ordering.',
    },
    {
      q: 'How do I contact customer support?',
      a: 'Use the contact form on the website and we will get back to you as soon as possible.',
    },
  ],
})

const defaultContact = () => ({
  key: CONTACT_KEY,
  kicker: 'We’re Here to Help',
  cards: [
    { title: 'Call Us', lines: ['+1 (800) 123-4567', 'Monday – Friday,', '9:00 AM to 5:00 PM'] },
    { title: 'Email Us', lines: ['support@evolv.com', 'Response Time', 'Within 24 hours'] },
    { title: 'Visit Us', lines: ['500 Wellness Ave,', 'Suite 10, MedCity,', 'NY 10001'] },
    { title: 'Chat with Us', lines: ['Availability', 'Monday – Friday,', '9:00 AM to 5:00 PM'] },
  ],
  formTitle: 'Get in Touch with Us',
  fullName: 'Full Name *',
  email: 'Email Address *',
  phone: 'Phone Number',
  country: 'Country',
  countryPlaceholder: 'Select Country',
  message: 'Message',
  messagePlaceholder: 'Let us know how we can help you',
  servicesTitle: 'Services*',
  submit: 'Submit',
  agreePrefix: 'By submitting, I agree to the',
  privacy: 'Privacy Policy.',
  countries: ['India', 'United States', 'United Kingdom', 'Canada', 'Australia', 'United Arab Emirates'],
  services: [
    'SEO',
    'Social Media Ads',
    'Reputation / Reviews',
    'Photography / Video',
    'Email Marketing',
    'PPC',
    'CRO',
    'Content Writing',
    'Amazon Marketing',
    'Link Building',
    'AI Search Optimization',
    'Web Design',
    'Local SEO',
    'Social Media Organic',
    'ADA Compliance',
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

const normalizeProcessSteps = (steps) => {
  if (!Array.isArray(steps)) return []
  return steps
    .map((s) => ({
      number: toStringOrEmpty(s?.number),
      title: toStringOrEmpty(s?.title),
      description: toStringOrEmpty(s?.description),
      iconKey: toStringOrEmpty(s?.iconKey) || 'consultation',
    }))
    .filter((s) => s.number || s.title || s.description || s.iconKey)
    .slice(0, 4)
}

const normalizeTestimonials = (items) => {
  if (!Array.isArray(items)) return []
  return items
    .map((t) => ({
      text: toStringOrEmpty(t?.text),
      name: toStringOrEmpty(t?.name),
      handle: toStringOrEmpty(t?.handle),
      avatar: toStringOrEmpty(t?.avatar),
    }))
    .filter((t) => t.text && t.name)
    .slice(0, 50)
}

const normalizeFaqItems = (items) => {
  if (!Array.isArray(items)) return []
  return items
    .map((i) => ({
      q: toStringOrEmpty(i?.q),
      a: toStringOrEmpty(i?.a),
    }))
    .filter((i) => i.q && i.a)
    .slice(0, 50)
}

const normalizeContactCards = (cards) => {
  if (!Array.isArray(cards)) return []
  return cards
    .map((c) => ({
      title: toStringOrEmpty(c?.title),
      lines: Array.isArray(c?.lines) ? c.lines.map((l) => toStringOrEmpty(l)).filter(Boolean).slice(0, 6) : [],
    }))
    .filter((c) => c.title || (Array.isArray(c.lines) && c.lines.length))
    .slice(0, 8)
}

const normalizeStringList = (items, limit = 50) => {
  if (!Array.isArray(items)) return []
  return items.map((v) => toStringOrEmpty(v)).filter(Boolean).slice(0, limit)
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

    await logRecentActivity({
      req,
      action: 'cms.updated',
      actor: req.admin?.email,
      details: { key: HERO_KEY },
    })

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

const getAboutHero = async (req, res, next) => {
  try {
    const doc = await AboutHeroContent.findOneAndUpdate(
      { key: ABOUT_HERO_KEY },
      { $setOnInsert: defaultAboutHero() },
      { upsert: true, new: true }
    ).lean()

    res.json({ ok: true, hero: doc })
  } catch (err) {
    next(err)
  }
}

const updateAboutHero = async (req, res, next) => {
  try {
    const defaults = defaultAboutHero()
    const incomingBg = toStringOrEmpty(req.body?.backgroundImage || req.body?.backgroundUrl)
    const nextDoc = {
      title: toStringOrEmpty(req.body?.title) || defaults.title,
      kicker: toStringOrEmpty(req.body?.kicker) || defaults.kicker,
      backgroundImage: incomingBg || defaults.backgroundImage,
    }

    const doc = await AboutHeroContent.findOneAndUpdate(
      { key: ABOUT_HERO_KEY },
      { $set: nextDoc, $setOnInsert: { key: ABOUT_HERO_KEY } },
      { upsert: true, new: true }
    ).lean()

    await logRecentActivity({
      req,
      action: 'cms.updated',
      actor: req.admin?.email,
      details: { key: ABOUT_HERO_KEY },
    })

    res.json({ ok: true, hero: doc })
  } catch (err) {
    next(err)
  }
}

const normalizeAboutTabs = (tabs) => {
  if (!Array.isArray(tabs)) return []
  return tabs
    .map((t) => ({
      title: toStringOrEmpty(t?.title),
      desc: toStringOrEmpty(t?.desc),
      panelTitle: toStringOrEmpty(t?.panelTitle),
      panelDesc: toStringOrEmpty(t?.panelDesc),
      panelCta: toStringOrEmpty(t?.panelCta),
      panelHref: toStringOrEmpty(t?.panelHref),
      panelImage: toStringOrEmpty(t?.panelImage),
    }))
    .filter((t) => t.title || t.desc || t.panelTitle || t.panelDesc || t.panelCta || t.panelHref || t.panelImage)
    .slice(0, 6)
}

const normalizeAboutWhySkills = (skills) => {
  if (!Array.isArray(skills)) return []
  return skills
    .map((s) => {
      const value = Number(s?.value)
      return {
        label: toStringOrEmpty(s?.label),
        value: Number.isFinite(value) ? value : 0,
      }
    })
    .filter((s) => s.label)
    .slice(0, 12)
}

const normalizeAboutHelpCards = (cards) => {
  if (!Array.isArray(cards)) return []
  return cards
    .map((c) => ({
      title: toStringOrEmpty(c?.title),
      desc: toStringOrEmpty(c?.desc),
      icon: toStringOrEmpty(c?.icon),
    }))
    .filter((c) => c.title || c.desc || c.icon)
    .slice(0, 12)
}

const normalizeAboutTeamMembers = (members) => {
  if (!Array.isArray(members)) return []
  return members
    .map((m) => ({
      name: toStringOrEmpty(m?.name),
      role: toStringOrEmpty(m?.role),
      image: toStringOrEmpty(m?.image),
    }))
    .filter((m) => m.name || m.role || m.image)
    .slice(0, 24)
}

const getAboutIntro = async (req, res, next) => {
  try {
    const doc = await AboutIntroContent.findOneAndUpdate(
      { key: ABOUT_INTRO_KEY },
      { $setOnInsert: defaultAboutIntro() },
      { upsert: true, new: true }
    ).lean()

    res.json({ ok: true, intro: doc })
  } catch (err) {
    next(err)
  }
}

const updateAboutIntro = async (req, res, next) => {
  try {
    const defaults = defaultAboutIntro()
    const incomingPoints = normalizeStringList(req.body?.points, 24)

    const nextDoc = {
      label: toStringOrEmpty(req.body?.label) || defaults.label,
      h1: toStringOrEmpty(req.body?.h1) || defaults.h1,
      h2: toStringOrEmpty(req.body?.h2) || defaults.h2,
      p1: toStringOrEmpty(req.body?.p1) || defaults.p1,
      p2: toStringOrEmpty(req.body?.p2) || defaults.p2,
      points: incomingPoints.length ? incomingPoints : defaults.points,
      cta: toStringOrEmpty(req.body?.cta) || defaults.cta,
      exp1: toStringOrEmpty(req.body?.exp1) || defaults.exp1,
      exp2: toStringOrEmpty(req.body?.exp2) || defaults.exp2,
      image1Url: toStringOrEmpty(req.body?.image1Url) || defaults.image1Url,
      image2Url: toStringOrEmpty(req.body?.image2Url) || defaults.image2Url,
    }

    const doc = await AboutIntroContent.findOneAndUpdate(
      { key: ABOUT_INTRO_KEY },
      { $set: nextDoc, $setOnInsert: { key: ABOUT_INTRO_KEY } },
      { upsert: true, new: true }
    ).lean()

    await logRecentActivity({
      req,
      action: 'cms.updated',
      actor: req.admin?.email,
      details: { key: ABOUT_INTRO_KEY },
    })

    res.json({ ok: true, intro: doc })
  } catch (err) {
    next(err)
  }
}

const getAboutTabs = async (req, res, next) => {
  try {
    const doc = await AboutTabsContent.findOneAndUpdate(
      { key: ABOUT_TABS_KEY },
      { $setOnInsert: defaultAboutTabs() },
      { upsert: true, new: true }
    ).lean()

    res.json({ ok: true, tabs: doc })
  } catch (err) {
    next(err)
  }
}

const updateAboutTabs = async (req, res, next) => {
  try {
    const defaults = defaultAboutTabs()
    const incomingTabs = normalizeAboutTabs(req.body?.tabs)

    const nextTabs = defaults.tabs.map((d, idx) => {
      const t = incomingTabs[idx] || {}
      return {
        title: t.title || d.title,
        desc: t.desc || d.desc,
        panelTitle: t.panelTitle || d.panelTitle,
        panelDesc: t.panelDesc || d.panelDesc,
        panelCta: t.panelCta || d.panelCta,
        panelHref: t.panelHref || d.panelHref,
        panelImage: t.panelImage || d.panelImage,
      }
    })

    const doc = await AboutTabsContent.findOneAndUpdate(
      { key: ABOUT_TABS_KEY },
      { $set: { tabs: nextTabs }, $setOnInsert: { key: ABOUT_TABS_KEY } },
      { upsert: true, new: true }
    ).lean()

    await logRecentActivity({
      req,
      action: 'cms.updated',
      actor: req.admin?.email,
      details: { key: ABOUT_TABS_KEY },
    })

    res.json({ ok: true, tabs: doc })
  } catch (err) {
    next(err)
  }
}

const getAboutWhyChoose = async (req, res, next) => {
  try {
    const doc = await AboutWhyChooseContent.findOneAndUpdate(
      { key: ABOUT_WHY_KEY },
      { $setOnInsert: defaultAboutWhy() },
      { upsert: true, new: true }
    ).lean()

    res.json({ ok: true, why: doc })
  } catch (err) {
    next(err)
  }
}

const updateAboutWhyChoose = async (req, res, next) => {
  try {
    const defaults = defaultAboutWhy()
    const incomingSkills = normalizeAboutWhySkills(req.body?.skills)

    const nextDoc = {
      whyLabel: toStringOrEmpty(req.body?.whyLabel) || defaults.whyLabel,
      whyTitle1: toStringOrEmpty(req.body?.whyTitle1) || defaults.whyTitle1,
      whyTitle2: toStringOrEmpty(req.body?.whyTitle2) || defaults.whyTitle2,
      whyDesc: toStringOrEmpty(req.body?.whyDesc) || defaults.whyDesc,
      whyCardTitle: toStringOrEmpty(req.body?.whyCardTitle) || defaults.whyCardTitle,
      imageUrl: toStringOrEmpty(req.body?.imageUrl) || defaults.imageUrl,
      skills: incomingSkills.length ? incomingSkills : defaults.skills,
    }

    const doc = await AboutWhyChooseContent.findOneAndUpdate(
      { key: ABOUT_WHY_KEY },
      { $set: nextDoc, $setOnInsert: { key: ABOUT_WHY_KEY } },
      { upsert: true, new: true }
    ).lean()

    await logRecentActivity({
      req,
      action: 'cms.updated',
      actor: req.admin?.email,
      details: { key: ABOUT_WHY_KEY },
    })

    res.json({ ok: true, why: doc })
  } catch (err) {
    next(err)
  }
}

const getAboutHelp = async (req, res, next) => {
  try {
    const doc = await AboutHelpContent.findOneAndUpdate(
      { key: ABOUT_HELP_KEY },
      { $setOnInsert: defaultAboutHelp() },
      { upsert: true, new: true }
    ).lean()

    res.json({ ok: true, help: doc })
  } catch (err) {
    next(err)
  }
}

const updateAboutHelp = async (req, res, next) => {
  try {
    const defaults = defaultAboutHelp()
    const incomingCards = normalizeAboutHelpCards(req.body?.cards)

    const nextDoc = {
      helpTitle: toStringOrEmpty(req.body?.helpTitle) || defaults.helpTitle,
      helpDesc: toStringOrEmpty(req.body?.helpDesc) || defaults.helpDesc,
      helpCta: toStringOrEmpty(req.body?.helpCta) || defaults.helpCta,
      helpHref: toStringOrEmpty(req.body?.helpHref) || defaults.helpHref,
      imageUrl: toStringOrEmpty(req.body?.imageUrl) || defaults.imageUrl,
      cards: incomingCards.length ? incomingCards : defaults.cards,
    }

    const doc = await AboutHelpContent.findOneAndUpdate(
      { key: ABOUT_HELP_KEY },
      { $set: nextDoc, $setOnInsert: { key: ABOUT_HELP_KEY } },
      { upsert: true, new: true }
    ).lean()

    await logRecentActivity({
      req,
      action: 'cms.updated',
      actor: req.admin?.email,
      details: { key: ABOUT_HELP_KEY },
    })

    res.json({ ok: true, help: doc })
  } catch (err) {
    next(err)
  }
}

const getAboutTeam = async (req, res, next) => {
  try {
    const doc = await AboutTeamContent.findOneAndUpdate(
      { key: ABOUT_TEAM_KEY },
      { $setOnInsert: defaultAboutTeam() },
      { upsert: true, new: true }
    ).lean()

    res.json({ ok: true, team: doc })
  } catch (err) {
    next(err)
  }
}

const updateAboutTeam = async (req, res, next) => {
  try {
    const defaults = defaultAboutTeam()
    const incomingMembers = normalizeAboutTeamMembers(req.body?.members)

    const nextDoc = {
      teamLabel: toStringOrEmpty(req.body?.teamLabel) || defaults.teamLabel,
      teamTitle: toStringOrEmpty(req.body?.teamTitle) || defaults.teamTitle,
      teamDesc: toStringOrEmpty(req.body?.teamDesc) || defaults.teamDesc,
      teamCta: toStringOrEmpty(req.body?.teamCta) || defaults.teamCta,
      teamHref: toStringOrEmpty(req.body?.teamHref) || defaults.teamHref,
      members: incomingMembers.length ? incomingMembers : defaults.members,
    }

    const doc = await AboutTeamContent.findOneAndUpdate(
      { key: ABOUT_TEAM_KEY },
      { $set: nextDoc, $setOnInsert: { key: ABOUT_TEAM_KEY } },
      { upsert: true, new: true }
    ).lean()

    await logRecentActivity({
      req,
      action: 'cms.updated',
      actor: req.admin?.email,
      details: { key: ABOUT_TEAM_KEY },
    })

    res.json({ ok: true, team: doc })
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

    await logRecentActivity({
      req,
      action: 'cms.updated',
      actor: req.admin?.email,
      details: { key: ABOUT_KEY },
    })

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

    await logRecentActivity({
      req,
      action: 'cms.updated',
      actor: req.admin?.email,
      details: { key: SERVICES_KEY },
    })

    res.json({ ok: true, services: doc })
  } catch (err) {
    next(err)
  }
}

const getHomeProcess = async (req, res, next) => {
  try {
    const doc = await ProcessContent.findOneAndUpdate(
      { key: PROCESS_KEY },
      { $setOnInsert: defaultProcess() },
      { upsert: true, new: true }
    ).lean()

    res.json({ ok: true, process: doc })
  } catch (err) {
    next(err)
  }
}

const updateHomeProcess = async (req, res, next) => {
  try {
    const defaults = defaultProcess()
    const incomingSteps = normalizeProcessSteps(req.body?.steps)

    const nextSteps = defaults.steps.map((d, idx) => {
      const s = incomingSteps[idx] || {}
      return {
        number: s.number || d.number,
        title: s.title || d.title,
        description: s.description || d.description,
        iconKey: s.iconKey || d.iconKey,
      }
    })

    const nextDoc = {
      kicker: toStringOrEmpty(req.body?.kicker) || defaults.kicker,
      title1: toStringOrEmpty(req.body?.title1) || defaults.title1,
      title2: toStringOrEmpty(req.body?.title2) || defaults.title2,
      steps: nextSteps,
    }

    const doc = await ProcessContent.findOneAndUpdate(
      { key: PROCESS_KEY },
      { $set: nextDoc, $setOnInsert: { key: PROCESS_KEY } },
      { upsert: true, new: true }
    ).lean()

    await logRecentActivity({
      req,
      action: 'cms.updated',
      actor: req.admin?.email,
      details: { key: PROCESS_KEY },
    })

    res.json({ ok: true, process: doc })
  } catch (err) {
    next(err)
  }
}

const getHomeTestimonials = async (req, res, next) => {
  try {
    const doc = await TestimonialsContent.findOneAndUpdate(
      { key: TESTIMONIALS_KEY },
      { $setOnInsert: defaultTestimonials() },
      { upsert: true, new: true }
    ).lean()

    res.json({ ok: true, testimonials: doc })
  } catch (err) {
    next(err)
  }
}

const updateHomeTestimonials = async (req, res, next) => {
  try {
    const defaults = defaultTestimonials()
    const incomingItems = req.body?.testimonials
    const normalized = Array.isArray(incomingItems) ? normalizeTestimonials(incomingItems) : null

    const nextDoc = {
      kicker: toStringOrEmpty(req.body?.kicker) || defaults.kicker,
      title: toStringOrEmpty(req.body?.title) || defaults.title,
      testimonials: normalized ?? defaults.testimonials,
    }

    const doc = await TestimonialsContent.findOneAndUpdate(
      { key: TESTIMONIALS_KEY },
      { $set: nextDoc, $setOnInsert: { key: TESTIMONIALS_KEY } },
      { upsert: true, new: true }
    ).lean()

    await logRecentActivity({
      req,
      action: 'cms.updated',
      actor: req.admin?.email,
      details: { key: TESTIMONIALS_KEY },
    })

    res.json({ ok: true, testimonials: doc })
  } catch (err) {
    next(err)
  }
}

const getHomeFaq = async (req, res, next) => {
  try {
    const defaults = defaultFaq()
    const doc = await FaqContent.findOneAndUpdate(
      { key: FAQ_KEY },
      { $setOnInsert: defaults },
      { upsert: true, new: true }
    ).lean()

    const normalized = doc?.imageUrl ? doc : { ...doc, imageUrl: defaults.imageUrl }

    res.json({ ok: true, faq: normalized })
  } catch (err) {
    next(err)
  }
}

const updateHomeFaq = async (req, res, next) => {
  try {
    const defaults = defaultFaq()
    const normalizedItems = normalizeFaqItems(req.body?.items)

    const nextDoc = {
      imageUrl: toStringOrEmpty(req.body?.imageUrl) || defaults.imageUrl,
      title: toStringOrEmpty(req.body?.title) || defaults.title,
      footerLeft: toStringOrEmpty(req.body?.footerLeft) || defaults.footerLeft,
      footerBtn: toStringOrEmpty(req.body?.footerBtn) || defaults.footerBtn,
      items: normalizedItems.length ? normalizedItems : defaults.items,
    }

    const doc = await FaqContent.findOneAndUpdate(
      { key: FAQ_KEY },
      { $set: nextDoc, $setOnInsert: { key: FAQ_KEY } },
      { upsert: true, new: true }
    ).lean()

    await logRecentActivity({
      req,
      action: 'cms.updated',
      actor: req.admin?.email,
      details: { key: FAQ_KEY },
    })

    res.json({ ok: true, faq: doc })
  } catch (err) {
    next(err)
  }
}

const getHomeContact = async (req, res, next) => {
  try {
    const doc = await ContactContent.findOneAndUpdate(
      { key: CONTACT_KEY },
      { $setOnInsert: defaultContact() },
      { upsert: true, new: true }
    ).lean()

    res.json({ ok: true, contact: doc })
  } catch (err) {
    next(err)
  }
}

const updateHomeContact = async (req, res, next) => {
  try {
    const defaults = defaultContact()
    const incomingCards = normalizeContactCards(req.body?.cards)
    const incomingCountries = normalizeStringList(req.body?.countries, 100)
    const incomingServices = normalizeStringList(req.body?.services, 200)

    const nextDoc = {
      kicker: toStringOrEmpty(req.body?.kicker) || defaults.kicker,
      cards: incomingCards.length ? incomingCards.slice(0, 4) : defaults.cards,
      formTitle: toStringOrEmpty(req.body?.formTitle) || defaults.formTitle,
      fullName: toStringOrEmpty(req.body?.fullName) || defaults.fullName,
      email: toStringOrEmpty(req.body?.email) || defaults.email,
      phone: toStringOrEmpty(req.body?.phone) || defaults.phone,
      country: toStringOrEmpty(req.body?.country) || defaults.country,
      countryPlaceholder: toStringOrEmpty(req.body?.countryPlaceholder) || defaults.countryPlaceholder,
      message: toStringOrEmpty(req.body?.message) || defaults.message,
      messagePlaceholder: toStringOrEmpty(req.body?.messagePlaceholder) || defaults.messagePlaceholder,
      servicesTitle: toStringOrEmpty(req.body?.servicesTitle) || defaults.servicesTitle,
      submit: toStringOrEmpty(req.body?.submit) || defaults.submit,
      agreePrefix: toStringOrEmpty(req.body?.agreePrefix) || defaults.agreePrefix,
      privacy: toStringOrEmpty(req.body?.privacy) || defaults.privacy,
      countries: incomingCountries.length ? incomingCountries : defaults.countries,
      services: incomingServices.length ? incomingServices : defaults.services,
    }

    const doc = await ContactContent.findOneAndUpdate(
      { key: CONTACT_KEY },
      { $set: nextDoc, $setOnInsert: { key: CONTACT_KEY } },
      { upsert: true, new: true }
    ).lean()

    await logRecentActivity({
      req,
      action: 'cms.updated',
      actor: req.admin?.email,
      details: { key: CONTACT_KEY },
    })

    res.json({ ok: true, contact: doc })
  } catch (err) {
    next(err)
  }
}

module.exports = {
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
}
