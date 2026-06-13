import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CircleDot, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { store } from '../admin/services/store'
import { listings as staticListings } from '../data/listings'

const EASE = [0.16, 1, 0.3, 1]

// Build lookup by lowercase name for merging photos + specs from static file
const staticByName = {}
staticListings.forEach(l => { staticByName[l.name.toLowerCase()] = l })

function mergeWithStatic(supaListing) {
  const s = staticByName[supaListing.name.toLowerCase()]
  return { ...supaListing, imgs: s?.imgs ?? [], specs: s?.specs ?? [], id: s?.id ?? supaListing.id }
}

export default function SalesSection() {
  const { t } = useLanguage()
  const [dbListings, setDbListings] = useState(null)
  const [active, setActive] = useState('all')

  useEffect(() => {
    const load = () => store.getListings()
      .then(data => setDbListings(data.filter(l => l.active).map(mergeWithStatic)))
      .catch(() => setDbListings(staticListings))
    load()
    const onVisible = () => { if (!document.hidden) load() }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [])

  const filters = [
    { key: 'all',   label: t.sales.filters.all   },
    { key: 'car',   label: t.sales.filters.car   },
    { key: 'wheel', label: t.sales.filters.wheel },
  ]
  const visible = !dbListings ? [] : dbListings.filter(l => active === 'all' || l.type === active)

  return (
    <section id="pardosana" className="relative py-28 px-6 overflow-hidden" style={{ background: '#0A0A0A' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <p className="font-heading text-ec-gold mb-3" style={{ fontSize: '10px', letterSpacing: '0.45em', fontWeight: 800 }}>
            {t.sales.tag}
          </p>
          <h2 className="font-display text-ec-white gold-line" style={{ fontSize: 'clamp(42px, 6vw, 80px)', letterSpacing: '0.04em' }}>
            {t.sales.heading}
          </h2>
          <p className="font-body text-ec-muted mt-6 max-w-lg leading-relaxed" style={{ fontSize: '15px', fontWeight: 300 }}>
            {t.sales.body}
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          className="flex mb-12"
          style={{ border: '1px solid rgba(201,168,76,0.18)', width: 'fit-content' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        >
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className="relative py-3 px-8 focus:outline-none"
            >
              {active === f.key && (
                <motion.div
                  layoutId="salesFilter"
                  className="absolute inset-0"
                  style={{ background: 'rgba(201,168,76,0.11)', borderBottom: '2px solid #C9A84C' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span
                className="relative z-10 font-heading"
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.22em',
                  fontWeight: 800,
                  color: active === f.key ? '#C9A84C' : 'rgba(255,255,255,0.4)',
                  transition: 'color 0.25s ease',
                }}
              >
                {f.label}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Listings grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.07 }}
              >
                <ListingCard item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom note */}
        <p
          className="font-body text-ec-muted mt-12"
          style={{ fontSize: '12px', letterSpacing: '0.04em', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px' }}
        >
          {t.sales.vatNote}
        </p>
      </div>
    </section>
  )
}

/* ─── Listing Card ─────────────────────────────────────────────────────────── */

function ListingCard({ item }) {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [imgIndex, setImgIndex] = useState(0)
  const hasImgs = item.imgs.length > 0
  const waMsg = encodeURIComponent(`Sveiki! Mani interesē: ${item.name}`)

  const prev = (e) => {
    e.stopPropagation()
    setImgIndex(i => (i - 1 + item.imgs.length) % item.imgs.length)
  }
  const next = (e) => {
    e.stopPropagation()
    setImgIndex(i => (i + 1) % item.imgs.length)
  }

  return (
    <div
      className="group flex flex-col overflow-hidden cursor-pointer"
      style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}
      onClick={() => navigate(`/pardosana/${item.id}`)}
    >
      {/* Image area */}
      {hasImgs ? (
        <div className="relative overflow-hidden" style={{ height: '220px' }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={imgIndex}
              src={item.imgs[imgIndex]}
              alt={`${item.name} ${imgIndex + 1}`}
              className="w-full h-full object-cover object-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />
          </AnimatePresence>

          {/* Nav arrows */}
          {item.imgs.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ width: 32, height: 32, background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(201,168,76,0.3)' }}
              >
                <ChevronLeft size={16} style={{ color: '#C9A84C' }} />
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ width: 32, height: 32, background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(201,168,76,0.3)' }}
              >
                <ChevronRight size={16} style={{ color: '#C9A84C' }} />
              </button>

              {/* Dot indicators */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {item.imgs.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setImgIndex(idx) }}
                    style={{
                      width: idx === imgIndex ? 16 : 5,
                      height: 5,
                      borderRadius: 3,
                      background: idx === imgIndex ? '#C9A84C' : 'rgba(255,255,255,0.35)',
                      transition: 'all 0.25s ease',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </div>
            </>
          )}

          {/* "View listing" hint on hover */}
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ background: 'rgba(0,0,0,0.28)' }}
          >
            <span
              className="font-heading text-ec-white"
              style={{ fontSize: '10px', letterSpacing: '0.3em', fontWeight: 800, background: 'rgba(0,0,0,0.55)', padding: '8px 18px', border: '1px solid rgba(201,168,76,0.4)' }}
            >
              SKATĪT →
            </span>
          </div>
        </div>
      ) : (
        <div
          className="w-full flex flex-col items-center justify-center gap-3 relative"
          style={{
            height: '220px',
            background: 'linear-gradient(135deg, #161616 0%, #0E0E0E 100%)',
            borderBottom: '1px solid rgba(201,168,76,0.1)',
          }}
        >
          <CircleDot size={56} strokeWidth={0.8} style={{ color: 'rgba(201,168,76,0.18)' }} />
          <span className="font-heading" style={{ fontSize: '8px', letterSpacing: '0.35em', color: 'rgba(201,168,76,0.25)', fontWeight: 800 }}>
            {t.sales.noPhoto}
          </span>
        </div>
      )}

      {/* Card content */}
      <div className="flex flex-col flex-1 p-6">
        <h3
          className="font-display text-ec-white mb-1"
          style={{ fontSize: 'clamp(22px, 3vw, 28px)', letterSpacing: '0.04em', lineHeight: 1.1 }}
        >
          {item.name}
        </h3>

        <p className="font-body text-ec-muted mb-5" style={{ fontSize: '12px', fontWeight: 300, letterSpacing: '0.04em' }}>
          {item.spec}
        </p>

        <div style={{ height: '1px', background: 'rgba(201,168,76,0.15)', marginBottom: '20px' }} />

        <div className="flex items-center justify-between mt-auto gap-4">
          {item.price ? (
            <span className="font-heading text-ec-white" style={{ fontSize: '26px', fontWeight: 800 }}>
              {item.price}
              <span className="text-ec-gold" style={{ fontSize: '14px', marginLeft: '2px' }}>€</span>
            </span>
          ) : (
            <span className="font-heading text-ec-muted" style={{ fontSize: '13px', letterSpacing: '0.1em', fontWeight: 300 }}>
              Cena pēc pieprasījuma
            </span>
          )}

          <a
            href={`https://wa.me/37122332628?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="font-heading text-ec-black bg-ec-gold hover:bg-ec-gold-dim transition-colors duration-300 flex-shrink-0"
            style={{ fontSize: '10px', letterSpacing: '0.2em', fontWeight: 800, padding: '10px 18px' }}
          >
            {t.sales.contact}
          </a>
        </div>
      </div>
    </div>
  )
}
