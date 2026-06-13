import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const EASE    = [0.16, 1, 0.3, 1]
const FADE_MS = 2200

// Each clip's actual duration — fade starts 2.8s before end
const CLIPS = [
  { src: '/assets/hero2.mp4', duration: 8.19  },
  { src: '/assets/hero3.mp4', duration: 6.69  },
  { src: '/assets/hero1.mp4', duration: 7.27  },
  { src: '/assets/hero4.mp4', duration: 15.04 },
  { src: '/assets/hero5.mp4', duration: 16.02 },
]
const FADE_BEFORE = 2.8  // seconds before end to start crossfade
const PRE_BEFORE  = 5.0  // seconds before end to start loading next

function useMagnetic(strength = 0.26) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 210, damping: 18, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 210, damping: 18, mass: 0.5 })
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * strength)
    y.set((e.clientY - r.top - r.height / 2) * strength)
  }
  const onLeave = () => { x.set(0); y.set(0) }
  return { ref, sx, sy, onMove, onLeave }
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.18 } },
}
const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.95, ease: EASE } },
}

export default function Hero() {
  const { t } = useLanguage()

  // Two video slots — we ping-pong between them
  const aRef = useRef(null)
  const bRef = useRef(null)

  // Which slot is currently the foreground (opacity: 1)
  const [fgSlot, setFgSlot] = useState('a')

  // Which clip index is playing in each slot
  const fgIdx   = useRef(0)
  const bgIdx   = useRef(1)

  const timerRef    = useRef(null)
  const preWarmed   = useRef(false)
  const fading      = useRef(false)

  const containerRef = useRef(null)
  const { scrollY }  = useScroll()
  const contentY     = useTransform(scrollY, [0, 650], [0, -55])
  const contentAlpha = useTransform(scrollY, [0, 380], [1, 0])

  const btn1 = useMagnetic()
  const btn2 = useMagnetic()
  const btn3 = useMagnetic()

  // helpers
  const getRef  = (slot) => slot === 'a' ? aRef : bRef
  const fgRef   = () => getRef(fgSlot)
  const bgRef   = () => getRef(fgSlot === 'a' ? 'b' : 'a')

  // Kick off on mount: play first clip in slot A, preload slot B with clip 1
  useEffect(() => {
    const a = aRef.current
    const b = bRef.current
    if (!a || !b) return

    a.src = CLIPS[0].src
    a.style.opacity = '1'
    a.play().catch(() => {})

    b.src = CLIPS[1].src
    b.style.opacity = '0'
    b.load()
  }, [])

  // Crossfade controller — re-attaches whenever fgSlot changes
  useEffect(() => {
    const fg   = fgRef().current
    const bg   = bgRef().current
    if (!fg || !bg) return

    const clip    = CLIPS[fgIdx.current]
    const fadeAt  = clip.duration - FADE_BEFORE
    const preAt   = clip.duration - PRE_BEFORE

    preWarmed.current = false
    fading.current    = false

    const onTime = () => {
      const ct = fg.currentTime

      // Pre-warm background slot
      if (ct >= preAt && !preWarmed.current) {
        preWarmed.current = true
        bg.currentTime = 0
        bg.play().catch(() => {})
      }

      // Start crossfade — bring bg UP on top, fg stays fully visible underneath
      if (ct >= fadeAt && !fading.current) {
        fading.current = true

        // bg slides in on top; fg stays at opacity 1 the whole time
        bg.style.zIndex    = '2'
        fg.style.zIndex    = '1'
        bg.style.transition = `opacity ${FADE_MS}ms cubic-bezier(0.37,0,0.63,1)`
        bg.style.opacity    = '1'

        timerRef.current = setTimeout(() => {
          // bg is now fully visible — instantly hide fg beneath it
          fg.style.transition = 'none'
          fg.style.opacity    = '0'
          fg.style.zIndex     = '1'
          fg.pause()

          // Advance indices
          fgIdx.current = bgIdx.current
          bgIdx.current = (bgIdx.current + 1) % CLIPS.length

          // Load next clip into the now-background slot
          fg.src = CLIPS[bgIdx.current].src
          fg.load()

          setFgSlot(prev => prev === 'a' ? 'b' : 'a')
          timerRef.current = null
        }, FADE_MS + 150)
      }
    }

    fg.addEventListener('timeupdate', onTime)
    return () => {
      fg.removeEventListener('timeupdate', onTime)
      clearTimeout(timerRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fgSlot])

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-screen flex items-end overflow-hidden"
    >
      {/* Slot A */}
      <video
        ref={aRef}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ opacity: 1, zIndex: 1, willChange: 'opacity', transform: 'translateZ(0)' }}
      />
      {/* Slot B */}
      <video
        ref={bRef}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ opacity: 0, zIndex: 1, willChange: 'opacity', transform: 'translateZ(0)' }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.28)' }}/>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.15) 75%, transparent 100%)' }}/>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.4) 45%, transparent 75%)' }}/>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 pb-20 md:pb-28"
        style={{ y: contentY, opacity: contentAlpha }}
      >
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="font-heading text-ec-gold mb-4"
            style={{ fontSize: '11px', letterSpacing: '0.4em', fontWeight: 800 }}
          >
            {t.hero.tag}
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-ec-white leading-none mb-2"
            style={{
              fontSize: 'clamp(52px, 9vw, 130px)',
              letterSpacing: '0.02em',
              textShadow: '0 2px 32px rgba(0,0,0,0.85), 0 0 64px rgba(0,0,0,0.6)',
            }}
          >
            {t.hero.line1}
          </motion.h1>

          <motion.h1
            variants={item}
            className="font-display leading-none mb-8"
            style={{
              fontSize: 'clamp(52px, 9vw, 130px)',
              letterSpacing: '0.02em',
              WebkitTextStroke: '2px rgba(201,168,76,0.95)',
              color: 'transparent',
              textShadow: '0 2px 32px rgba(0,0,0,0.9), 0 0 64px rgba(0,0,0,0.7)',
            }}
          >
            {t.hero.line2}
          </motion.h1>

          <motion.p
            variants={item}
            className="font-body mb-10 max-w-md leading-relaxed"
            style={{ fontSize: '15px', fontWeight: 400, color: '#0A0A0A' }}
          >
            {t.hero.body}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4">
            <motion.a
              ref={btn1.ref}
              href="/mazgasana"
              onMouseMove={btn1.onMove}
              onMouseLeave={btn1.onLeave}
              style={{ x: btn1.sx, y: btn1.sy, letterSpacing: '0.2em', fontWeight: 800, background: '#0A0A0A', border: '1px solid rgba(201,168,76,0.4)' }}
              whileHover={{ scale: 1.05 }}
              transition={{ scale: { duration: 0.28, ease: EASE } }}
              className="font-heading text-xs text-ec-gold px-8 py-4 hover:border-ec-gold transition-colors duration-300"
            >
              {t.hero.btnWash}
            </motion.a>

            <motion.a
              ref={btn2.ref}
              href="/detailing"
              onMouseMove={btn2.onMove}
              onMouseLeave={btn2.onLeave}
              style={{ x: btn2.sx, y: btn2.sy, letterSpacing: '0.2em', fontWeight: 800, background: '#0A0A0A', border: '1px solid rgba(201,168,76,0.4)' }}
              whileHover={{ scale: 1.05 }}
              transition={{ scale: { duration: 0.28, ease: EASE } }}
              className="font-heading text-xs text-ec-gold px-8 py-4 hover:border-ec-gold transition-colors duration-300"
            >
              {t.hero.btnDetail}
            </motion.a>

            <motion.a
              ref={btn3.ref}
              href="/pulesana"
              onMouseMove={btn3.onMove}
              onMouseLeave={btn3.onLeave}
              style={{ x: btn3.sx, y: btn3.sy, letterSpacing: '0.2em', fontWeight: 800, background: '#0A0A0A', border: '1px solid rgba(201,168,76,0.4)' }}
              whileHover={{ scale: 1.05 }}
              transition={{ scale: { duration: 0.28, ease: EASE } }}
              className="font-heading text-xs text-ec-gold px-8 py-4 hover:border-ec-gold transition-colors duration-300"
            >
              {t.hero.btnPolish}
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 right-8 md:right-16 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2, duration: 1.2, ease: EASE }}
      >
        <span
          className="font-heading text-ec-white"
          style={{ fontSize: '9px', letterSpacing: '0.3em', writingMode: 'vertical-rl', fontWeight: 700 }}
        >
          SCROLL
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-ec-white/80 to-transparent" />
      </motion.div>
    </section>
  )
}
