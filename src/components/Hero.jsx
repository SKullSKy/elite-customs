import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'

const EASE       = [0.16, 1, 0.3, 1]
const PRE_START  = 17.0  // start next video silently so it's warm before the fade
const FADE_START = 18.5  // begin opacity crossfade
const FADE_MS    = 1500  // crossfade duration ms

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
  const containerRef = useRef(null)
  const v0Ref        = useRef(null)
  const v1Ref        = useRef(null)
  const timerRef     = useRef(null)
  const preWarmed    = useRef(false)
  const [activeIdx, setActiveIdx] = useState(0)

  const { scrollY }  = useScroll()
  const contentY     = useTransform(scrollY, [0, 650], [0, -55])
  const contentAlpha = useTransform(scrollY, [0, 380], [1, 0])

  const btn1 = useMagnetic()
  const btn2 = useMagnetic()

  // Pause + reset video 1 on mount so only video 0 plays first
  useEffect(() => {
    const v1 = v1Ref.current
    if (v1) { v1.pause(); v1.currentTime = 0 }
  }, [])

  // Crossfade logic — re-runs whenever activeIdx changes
  useEffect(() => {
    const refs   = [v0Ref, v1Ref]
    const active = refs[activeIdx].current
    const next   = refs[1 - activeIdx].current
    if (!active || !next) return

    const onTimeUpdate = () => {
      const t = active.currentTime

      // Pre-warm: start next video silently 1.5s before the visible fade
      // so the browser has already decoded frames before we need them
      if (t >= PRE_START && !preWarmed.current) {
        preWarmed.current = true
        next.currentTime = 0
        next.play().catch(() => {})
      }

      // Begin crossfade — both videos are already rendering at this point
      if (t >= FADE_START && !timerRef.current) {
        active.style.transition = `opacity ${FADE_MS}ms ease-in-out`
        active.style.opacity    = '0'

        next.style.transition   = `opacity ${FADE_MS}ms ease-in-out`
        next.style.opacity      = '1'

        timerRef.current = setTimeout(() => {
          active.pause()
          active.currentTime      = 0
          active.style.transition = 'none'
          active.style.opacity    = '0'
          preWarmed.current       = false
          setActiveIdx(prev => 1 - prev)
          timerRef.current        = null
        }, FADE_MS + 150)
      }
    }

    active.addEventListener('timeupdate', onTimeUpdate)
    return () => {
      active.removeEventListener('timeupdate', onTimeUpdate)
      clearTimeout(timerRef.current)
    }
  }, [activeIdx])

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-screen flex items-end overflow-hidden"
    >
      {/* Video backgrounds — no parallax, plain GPU layers */}
      <video
        ref={v0Ref}
        src="/assets/showcase.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ opacity: 1, willChange: 'opacity', transform: 'translateZ(0)' }}
      />
      <video
        ref={v1Ref}
        src="/assets/showcase2.mp4"
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ opacity: 0, willChange: 'opacity', transform: 'translateZ(0)' }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.15) 100%)' }}/>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.65) 0%, transparent 65%)' }}/>

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
            PREMIUM CAR CARE · LATVIJA
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-ec-white leading-none mb-2"
            style={{ fontSize: 'clamp(52px, 9vw, 130px)', letterSpacing: '0.02em' }}
          >
            EVERY DETAIL.
          </motion.h1>

          <motion.h1
            variants={item}
            className="font-display leading-none mb-8"
            style={{
              fontSize: 'clamp(52px, 9vw, 130px)',
              letterSpacing: '0.02em',
              WebkitTextStroke: '1px rgba(201,168,76,0.8)',
              color: 'transparent',
            }}
          >
            PERFECTED.
          </motion.h1>

          <motion.p
            variants={item}
            className="font-body text-ec-white/70 mb-10 max-w-md leading-relaxed"
            style={{ fontSize: '15px', fontWeight: 400 }}
          >
            Professional washing and detailing — we treat your vehicle
            the way it deserves to be treated.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4">
            <motion.a
              ref={btn1.ref}
              href="#washing"
              onMouseMove={btn1.onMove}
              onMouseLeave={btn1.onLeave}
              style={{ x: btn1.sx, y: btn1.sy, letterSpacing: '0.2em', fontWeight: 800 }}
              whileHover={{ scale: 1.05 }}
              transition={{ scale: { duration: 0.28, ease: EASE } }}
              className="font-heading text-xs text-ec-black bg-ec-gold px-8 py-4 hover:bg-ec-gold-dim transition-colors duration-300"
            >
              MAZGĀŠANA
            </motion.a>

            <motion.a
              ref={btn2.ref}
              href="#detailing"
              onMouseMove={btn2.onMove}
              onMouseLeave={btn2.onLeave}
              style={{ x: btn2.sx, y: btn2.sy, letterSpacing: '0.2em', fontWeight: 800, border: '1px solid rgba(201,168,76,0.5)' }}
              whileHover={{ scale: 1.05 }}
              transition={{ scale: { duration: 0.28, ease: EASE } }}
              className="font-heading text-xs text-ec-white px-8 py-4 hover:text-ec-gold transition-colors duration-300"
            >
              DETAILING
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
