import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]
const FADE_START = 18.2   // seconds before end to begin fade
const FADE_DURATION = 800 // ms for the opacity transition

export default function VideoSection() {
  const videoRef  = useRef(null)
  const timerRef  = useRef(null)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      if (video.currentTime >= FADE_START) {
        // start fade out
        setOpacity(0)
        if (!timerRef.current) {
          timerRef.current = setTimeout(() => {
            video.currentTime = 0
            video.play()
            setOpacity(1)
            timerRef.current = null
          }, FADE_DURATION + 100)
        }
      }
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <section className="relative bg-ec-black py-24 px-6 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <p
            className="font-heading text-ec-gold mb-3"
            style={{ fontSize: '11px', letterSpacing: '0.45em', fontWeight: 800 }}
          >
            MŪSU DARBS
          </p>
          <h2
            className="font-display text-ec-white gold-line"
            style={{ fontSize: 'clamp(42px, 6vw, 80px)', letterSpacing: '0.04em' }}
          >
            IN ACTION
          </h2>
        </motion.div>

        {/* Video frame */}
        <motion.div
          className="relative w-full overflow-hidden"
          style={{
            border: '1px solid rgba(201,168,76,0.3)',
            aspectRatio: '16 / 9',
          }}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        >
          {/* Gold corner accents */}
          <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-ec-gold pointer-events-none z-10" />
          <span className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-ec-gold pointer-events-none z-10" />
          <span className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-ec-gold pointer-events-none z-10" />
          <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-ec-gold pointer-events-none z-10" />

          <video
            ref={videoRef}
            src="/assets/showcase.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            style={{
              opacity,
              transition: `opacity ${FADE_DURATION}ms ease-in-out`,
            }}
          />
        </motion.div>

      </div>
    </section>
  )
}
