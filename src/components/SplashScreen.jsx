import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// Persists for the lifetime of the JS bundle — resets on hard refresh, skipped on back-navigation
let splashPlayed = false

export default function SplashScreen({ onComplete }) {
  const [exiting, setExiting] = useState(false)
  const [gone,    setGone]    = useState(splashPlayed)

  useEffect(() => {
    if (splashPlayed) { onComplete?.(); return }

    document.body.style.overflow = 'hidden'
    const t1 = setTimeout(() => setExiting(true), 2000)
    const t2 = setTimeout(() => {
      document.body.style.overflow = ''
      splashPlayed = true
      setGone(true)
      onComplete?.()
    }, 3200)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      document.body.style.overflow = ''
    }
  }, [])

  if (gone) return null

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: '#000' }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 1.1, ease: 'easeInOut' }}
    >
      <motion.img
        src="/assets/logo.webp"
        alt="Elite Customs"
        style={{ width: 'min(620px, 86vw)', display: 'block' }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: exiting ? 0 : 1, scale: exiting ? 1.04 : 1 }}
        transition={{ duration: exiting ? 0.6 : 1.0, ease: 'easeInOut' }}
        draggable={false}
      />
    </motion.div>
  )
}
