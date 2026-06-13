import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { store } from '../admin/services/store'
import VehicleTabPrices from './VehicleTabPrices'

const EASE = [0.16, 1, 0.3, 1]

const FALLBACK_PRICES = [
  { prices: { car: 'No 130', suv: 'No 160', van: 'No 190' } },
  { prices: { car: '160',    suv: '180',    van: '200'    } },
]

export default function DetailingPrices() {
  const { t } = useLanguage()
  const td = t.detailing
  const [priceData, setPriceData] = useState(FALLBACK_PRICES)

  useEffect(() => {
    const load = () => store.getPrices().then(p => {
      if (p.detailing?.length) setPriceData(p.detailing)
    }).catch(() => {})
    load()
    const onVisible = () => { if (!document.hidden) load() }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [])

  return (
    <section
      id="detailing"
      className="relative overflow-hidden py-28 px-6"
      style={{ background: '#0E0E0E' }}
    >
      <DetailingDecor />
      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <p className="font-heading text-ec-gold mb-3" style={{ fontSize: '10px', letterSpacing: '0.45em', fontWeight: 800 }}>
            {td.tag}
          </p>
          <h2 className="font-display text-ec-white gold-line" style={{ fontSize: 'clamp(42px, 6vw, 80px)', letterSpacing: '0.04em' }}>
            {td.heading}
          </h2>
          <p className="font-body text-ec-white mt-6 max-w-2xl leading-relaxed" style={{ fontSize: '18px', fontWeight: 400, lineHeight: '1.75' }}>
            {td.body}
          </p>
        </motion.div>

        {/* Tab-based price table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        >
          <VehicleTabPrices
            vehicleTypes={t.washing.vehicleTypes}
            services={td.services}
            priceData={priceData}
            featuredBadge={td.recommended}
            images={{ car: '/assets/detailing-car.webp', suv: '/assets/detailing-suv.webp' }}
            selectPrompt={t.washing.selectPrompt}
          />
        </motion.div>

        {/* Dirty car surcharge note */}
        <motion.div
          className="mt-10 flex items-start gap-3"
          style={{
            background: 'rgba(201,168,76,0.07)',
            border: '1px solid rgba(201,168,76,0.22)',
            borderRadius: '4px',
            padding: '14px 18px',
          }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
        >
          <span style={{ color: '#C9A84C', fontSize: '16px', marginTop: '1px', flexShrink: 0 }}>⚠</span>
          <p className="font-body" style={{ color: '#C9A84C', fontSize: '13px', letterSpacing: '0.03em', lineHeight: '1.6' }}>
            {td.dirtyNote}
          </p>
        </motion.div>

        {/* VAT note */}
        <p
          className="font-body text-ec-muted mt-6"
          style={{ fontSize: '13px', letterSpacing: '0.04em', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px' }}
        >
          {td.vatNote}
        </p>
      </div>
    </section>
  )
}

function DetailingDecor() {
  return (
    <>
      <div className="absolute pointer-events-none" style={{ top: '4%', left: '4%', opacity: 0.09, transform: 'rotate(-18deg)' }}>
        <svg viewBox="0 0 74 172" width="74" height="172" fill="none" stroke="#C9A84C" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 10,66 Q 6,53 9,42 L 14,32 L 60,32 L 65,42 Q 68,53 64,66 L 64,142 Q 64,155 37,155 Q 10,155 10,142 Z" fill="rgba(201,168,76,0.10)" strokeWidth="2.5"/>
          <path d="M 12,72 Q 8,58 11,46" fill="none" stroke="rgba(201,168,76,0.42)" strokeWidth="1.2"/>
          <path d="M 64,66 Q 62,58 60,55" fill="none" stroke="rgba(201,168,76,0.22)" strokeWidth="1"/>
          <rect x="30" y="10" width="14" height="25" rx="4" fill="rgba(201,168,76,0.13)" strokeWidth="2"/>
          <ellipse cx="37" cy="8" rx="14" ry="10" fill="rgba(201,168,76,0.17)" strokeWidth="2"/>
          <path d="M 37,18 Q 42,27 37,35 Q 32,27 37,18" fill="rgba(201,168,76,0.12)" strokeWidth="1.8"/>
          <rect x="14" y="82" width="46" height="40" rx="3" fill="rgba(201,168,76,0.06)" strokeWidth="1.5"/>
          <line x1="20" y1="94"  x2="54" y2="94"  strokeWidth="1" opacity="0.4"/>
          <line x1="20" y1="104" x2="54" y2="104" strokeWidth="1" opacity="0.4"/>
          <line x1="20" y1="113" x2="40" y2="113" strokeWidth="1" opacity="0.3"/>
        </svg>
      </div>
      <div className="absolute pointer-events-none" style={{ bottom: '20px', left: '30%', opacity: 0.09, transform: 'rotate(-30deg)' }}>
        <svg viewBox="0 0 56 196" width="56" height="196" fill="none" stroke="#C9A84C" strokeLinecap="round" strokeLinejoin="round">
          <rect x="19" y="0" width="18" height="118" rx="7" fill="rgba(201,168,76,0.09)" strokeWidth="2.5"/>
          <line x1="21" y1="6" x2="21" y2="112" strokeWidth="1" opacity="0.38"/>
          <line x1="19" y1="30" x2="37" y2="30" strokeWidth="1.2" opacity="0.38"/>
          <line x1="19" y1="46" x2="37" y2="46" strokeWidth="1.2" opacity="0.38"/>
          <line x1="19" y1="62" x2="37" y2="62" strokeWidth="1.2" opacity="0.38"/>
          <line x1="19" y1="78" x2="37" y2="78" strokeWidth="1.2" opacity="0.38"/>
          <line x1="19" y1="94" x2="37" y2="94" strokeWidth="1.2" opacity="0.38"/>
          <rect x="15" y="115" width="26" height="16" rx="2" fill="rgba(201,168,76,0.14)" strokeWidth="2.2"/>
          <line x1="18" y1="121" x2="38" y2="121" strokeWidth="1" opacity="0.3"/>
          <path d="M 20,131 Q 9,158 4,188"  strokeWidth="2"/>
          <path d="M 24,131 Q 16,158 12,190" strokeWidth="2"/>
          <path d="M 28,131 Q 26,158 26,190" strokeWidth="2"/>
          <path d="M 32,131 Q 38,158 40,190" strokeWidth="2"/>
          <path d="M 36,131 Q 47,158 52,188" strokeWidth="2"/>
          <path d="M 2,188 Q 4,194 7,188"  strokeWidth="1.5"/>
          <path d="M 10,190 Q 12,196 15,190" strokeWidth="1.5"/>
          <path d="M 24,190 Q 26,196 29,190" strokeWidth="1.5"/>
          <path d="M 38,190 Q 40,196 43,190" strokeWidth="1.5"/>
          <path d="M 50,188 Q 52,194 54,188" strokeWidth="1.5"/>
        </svg>
      </div>
    </>
  )
}
