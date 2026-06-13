import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, CircleDot, X } from 'lucide-react'
import { FaWhatsapp, FaEnvelope, FaExternalLinkAlt } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'
import { listings } from '../data/listings'
import PageLayout from '../components/PageLayout'

const EASE = [0.16, 1, 0.3, 1]

export default function ListingPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t } = useLanguage()
  const listing = listings.find(l => l.id === Number(id))

  useEffect(() => {
    if (!listing) navigate('/#pardosana', { replace: true })
  }, [listing])

  if (!listing) return null

  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Back link */}
        <button
          onClick={() => navigate('/#pardosana')}
          className="font-heading text-ec-muted hover:text-ec-gold transition-colors duration-300 mb-8 flex items-center gap-2"
          style={{ fontSize: '11px', letterSpacing: '0.25em', fontWeight: 700 }}
        >
          {t.listing.back}
        </button>

        {/* Gallery */}
        <Gallery imgs={listing.imgs} name={listing.name} t={t} />

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 mt-10">

          {/* Left — specs */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              {/* Title */}
              <h1
                className="font-display text-ec-white"
                style={{ fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '0.04em', lineHeight: 1 }}
              >
                {listing.name}
              </h1>
              <p className="font-body text-ec-muted mt-2 mb-8" style={{ fontSize: '13px', fontWeight: 300, letterSpacing: '0.04em' }}>
                {listing.spec}
              </p>

              {/* Spec table */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                {listing.specs.map((s) => (
                  <div
                    key={s.key}
                    className="flex items-center justify-between py-4"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <span
                      className="font-heading text-ec-muted"
                      style={{ fontSize: '11px', letterSpacing: '0.18em', fontWeight: 700 }}
                    >
                      {t.listing.specLabels[s.key] ?? s.key.toUpperCase()}
                    </span>
                    <span
                      className="font-heading text-ec-white"
                      style={{ fontSize: '13px', letterSpacing: '0.08em', fontWeight: 700 }}
                    >
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Description */}
              {listing.description && (
                <p
                  className="font-body text-ec-white mt-8 leading-relaxed"
                  style={{ fontSize: '16px', fontWeight: 400, lineHeight: 1.8 }}
                >
                  {listing.description}
                </p>
              )}

              {/* SS.com link */}
              {listing.ssLink && (
                <a
                  href={listing.ssLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-8 font-heading text-ec-gold hover:text-ec-white transition-colors duration-300"
                  style={{ fontSize: '11px', letterSpacing: '0.2em', fontWeight: 800 }}
                >
                  {t.listing.ssLink}
                  <FaExternalLinkAlt style={{ fontSize: '9px' }} />
                </a>
              )}
            </motion.div>
          </div>

          {/* Right — price card (sticky) */}
          <div>
            <motion.div
              className="lg:sticky"
              style={{ top: '88px' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            >
              <div
                style={{
                  border: '1px solid rgba(201,168,76,0.25)',
                  background: 'rgba(201,168,76,0.03)',
                  padding: '32px',
                }}
              >
                {/* Price */}
                <div className="mb-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: '24px' }}>
                  <p className="font-heading text-ec-muted mb-1" style={{ fontSize: '10px', letterSpacing: '0.35em', fontWeight: 700 }}>
                    CENA
                  </p>
                  {listing.price ? (
                    <span className="font-display text-ec-white" style={{ fontSize: '52px', letterSpacing: '0.04em', lineHeight: 1 }}>
                      {listing.price}
                      <span className="text-ec-gold" style={{ fontSize: '28px', marginLeft: '4px' }}>€</span>
                    </span>
                  ) : (
                    <span className="font-heading text-ec-muted" style={{ fontSize: '16px', letterSpacing: '0.1em' }}>
                      Cena pēc pieprasījuma
                    </span>
                  )}
                  <p className="font-body text-ec-muted mt-2" style={{ fontSize: '11px', fontWeight: 300 }}>
                    {t.listing.vatNote}
                  </p>
                </div>

                {/* Contact buttons */}
                <div className="flex flex-col gap-3">
                  <a
                    href={`https://wa.me/37122332628?text=${encodeURIComponent(`Sveiki! Mani interesē: ${listing.name}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 py-4 font-heading text-ec-black bg-ec-gold hover:bg-ec-gold-dim transition-colors duration-300"
                    style={{ fontSize: '11px', letterSpacing: '0.22em', fontWeight: 800 }}
                  >
                    <FaWhatsapp style={{ fontSize: '15px' }} />
                    {t.listing.whatsapp}
                  </a>

                  <a
                    href="mailto:elitecustomslv@gmail.com"
                    className="flex items-center justify-center gap-3 py-4 font-heading text-ec-white hover:text-ec-gold transition-colors duration-300"
                    style={{
                      fontSize: '11px',
                      letterSpacing: '0.22em',
                      fontWeight: 800,
                      border: '1px solid rgba(201,168,76,0.3)',
                    }}
                  >
                    <FaEnvelope style={{ fontSize: '13px' }} />
                    {t.listing.email}
                  </a>
                </div>

                {/* Phone */}
                <p className="font-body text-ec-muted text-center mt-6" style={{ fontSize: '12px', fontWeight: 400 }}>
                  +371 22332628
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

/* ─── Gallery ───────────────────────────────────────────────────────────────── */

function Gallery({ imgs, name, t }) {
  const [index, setIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const thumbsRef = useRef(null)
  const hasImgs = imgs.length > 0

  const goTo = useCallback((i) => {
    setIndex(i)
    setTimeout(() => {
      thumbsRef.current?.children[i]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }, 50)
  }, [])

  const goPrev = useCallback(() => goTo((index - 1 + imgs.length) % imgs.length), [index, imgs.length, goTo])
  const goNext = useCallback(() => goTo((index + 1) % imgs.length), [index, imgs.length, goTo])

  useEffect(() => {
    if (lightboxOpen) return
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goPrev, goNext, lightboxOpen])

  if (!hasImgs) {
    return (
      <motion.div
        className="w-full flex flex-col items-center justify-center gap-4"
        style={{
          height: '520px',
          background: 'linear-gradient(135deg, #141414 0%, #0E0E0E 100%)',
          border: '1px solid rgba(201,168,76,0.12)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <CircleDot size={64} strokeWidth={0.7} style={{ color: 'rgba(201,168,76,0.18)' }} />
        <span className="font-heading" style={{ fontSize: '10px', letterSpacing: '0.4em', color: 'rgba(201,168,76,0.3)', fontWeight: 800 }}>
          {t.listing.noPhoto}
        </span>
      </motion.div>
    )
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {/* Main image */}
        <div
          className="relative w-full overflow-hidden cursor-zoom-in"
          style={{
            height: 'clamp(320px, 60vw, 680px)',
            background: '#0E0E0E',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
          onClick={() => setLightboxOpen(true)}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={imgs[index]}
              alt={`${name} ${index + 1}`}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            />
          </AnimatePresence>

          {/* Counter badge */}
          <div
            className="absolute top-4 right-4 font-heading text-ec-white"
            style={{ background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(255,255,255,0.12)', padding: '4px 12px', fontSize: '11px', letterSpacing: '0.15em', fontWeight: 700 }}
          >
            {index + 1} / {imgs.length}
          </div>

          {/* Arrows */}
          {imgs.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goPrev() }}
                className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center transition-all hover:scale-105"
                style={{ width: 48, height: 48, background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(201,168,76,0.3)' }}
              >
                <ChevronLeft size={22} style={{ color: '#C9A84C' }} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext() }}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center transition-all hover:scale-105"
                style={{ width: 48, height: 48, background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(201,168,76,0.3)' }}
              >
                <ChevronRight size={22} style={{ color: '#C9A84C' }} />
              </button>
            </>
          )}

          {/* Gold corner accents */}
          <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-ec-gold pointer-events-none" />
          <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-ec-gold pointer-events-none" />
          <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-ec-gold pointer-events-none" />
          <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-ec-gold pointer-events-none" />
        </div>

        {/* Thumbnail strip */}
        {imgs.length > 1 && (
          <div
            ref={thumbsRef}
            className="flex gap-2 mt-3 overflow-x-auto pb-1"
            style={{ scrollbarWidth: 'none' }}
          >
            {imgs.map((src, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="flex-shrink-0 overflow-hidden transition-all duration-200"
                style={{
                  width: 88,
                  height: 62,
                  border: i === index ? '2px solid #C9A84C' : '2px solid rgba(255,255,255,0.07)',
                  opacity: i === index ? 1 : 0.5,
                }}
              >
                <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </motion.div>

      {/* Fullscreen lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            imgs={imgs}
            startIndex={index}
            name={name}
            onClose={() => setLightboxOpen(false)}
            onIndexChange={setIndex}
          />
        )}
      </AnimatePresence>
    </>
  )
}

/* ─── Lightbox ───────────────────────────────────────────────────────────────── */

function Lightbox({ imgs, startIndex, name, onClose, onIndexChange }) {
  const [index, setIndex] = useState(startIndex)
  const thumbsRef = useRef(null)

  const goTo = useCallback((i) => {
    setIndex(i)
    onIndexChange(i)
    setTimeout(() => {
      thumbsRef.current?.children[i]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }, 50)
  }, [onIndexChange])

  const goPrev = useCallback(() => goTo((index - 1 + imgs.length) % imgs.length), [index, imgs.length, goTo])
  const goNext = useCallback(() => goTo((index + 1) % imgs.length), [index, imgs.length, goTo])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  goPrev()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'Escape')     onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [goPrev, goNext, onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col"
      style={{ background: 'rgba(0,0,0,0.97)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-6 py-4 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4">
          <span className="font-display text-ec-white/30" style={{ fontSize: '14px', letterSpacing: '0.3em' }}>
            {name.toUpperCase()}
          </span>
          <span className="font-heading text-ec-muted" style={{ fontSize: '11px', letterSpacing: '0.2em' }}>
            {index + 1} / {imgs.length}
          </span>
        </div>
        <button
          onClick={onClose}
          className="flex items-center justify-center transition-colors hover:bg-white/10"
          style={{ width: 38, height: 38, border: '1px solid rgba(255,255,255,0.15)' }}
        >
          <X size={16} style={{ color: 'rgba(255,255,255,0.7)' }} />
        </button>
      </div>

      {/* Main image */}
      <div
        className="flex-1 flex items-center justify-center relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={imgs[index]}
            alt={`${name} ${index + 1}`}
            className="max-h-full max-w-full object-contain select-none"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        </AnimatePresence>

        {imgs.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); goPrev() }}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center transition-all hover:scale-105"
              style={{ width: 48, height: 48, background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(201,168,76,0.3)', zIndex: 10 }}
            >
              <ChevronLeft size={22} style={{ color: '#C9A84C' }} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goNext() }}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center transition-all hover:scale-105"
              style={{ width: 48, height: 48, background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(201,168,76,0.3)', zIndex: 10 }}
            >
              <ChevronRight size={22} style={{ color: '#C9A84C' }} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      <div
        className="flex-shrink-0 py-4 px-6"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div ref={thumbsRef} className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {imgs.map((src, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="flex-shrink-0 overflow-hidden transition-all duration-200"
              style={{
                width: 72, height: 50,
                border: i === index ? '2px solid #C9A84C' : '2px solid transparent',
                opacity: i === index ? 1 : 0.4,
              }}
            >
              <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
