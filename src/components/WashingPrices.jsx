import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { store } from '../admin/services/store'
import VehicleTabPrices from './VehicleTabPrices'

const EASE = [0.16, 1, 0.3, 1]

const FALLBACK_PRICES = [
  { prices: { car: '25 – 30', suv: '30 – 35', van: '35 – 40' } },
  { prices: { car: '35 – 40', suv: '40 – 45', van: '45 – 50' } },
  { prices: { car: '9',       suv: '12',       van: '12'       } },
  { prices: { car: '15 – 20', suv: '20 – 25', van: '25 – 30' } },
  { prices: { car: '20',      suv: '50',       van: '50'       } },
  { prices: { car: '10',      suv: '15',       van: '15'       } },
  { prices: { car: '10',      suv: '15',       van: '15'       } },
  { prices: { car: '30',      suv: '35',       van: '40'       } },
  { prices: { car: '15',      suv: '15',       van: '15'       } },
]

export default function WashingPrices() {
  const { t } = useLanguage()
  const tw = t.washing
  const [priceData,  setPriceData]  = useState(FALLBACK_PRICES)
  const [motoPrice,  setMotoPrice]  = useState('20')

  useEffect(() => {
    const load = () => store.getPrices().then(p => {
      if (p.washing?.length)  setPriceData(p.washing)
      if (p.washingMoto)      setMotoPrice(p.washingMoto)
    }).catch(() => {})
    load()
    const onVisible = () => { if (!document.hidden) load() }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [])

  return (
    <section id="washing" className="relative overflow-hidden bg-ec-black py-28 px-6">
      <PressureWasherDecor />
      <WashingExtrasDecor />

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
            {tw.tag}
          </p>
          <h2 className="font-display text-ec-white gold-line" style={{ fontSize: 'clamp(42px, 6vw, 80px)', letterSpacing: '0.04em' }}>
            {tw.heading}
          </h2>
          <p className="font-body text-ec-white mt-6 max-w-2xl leading-relaxed" style={{ fontSize: '18px', fontWeight: 400, lineHeight: '1.75' }}>
            {tw.body}
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
            vehicleTypes={tw.vehicleTypes}
            services={tw.services}
            priceData={priceData}
            motoPrice={motoPrice}
            motoLabel={tw.motorcycle.name}
            motoSub={tw.motorcycle.sub}
            selectPrompt={tw.selectPrompt}
          />
        </motion.div>

        {/* VAT note */}
        <p
          className="font-body text-ec-muted mt-10"
          style={{ fontSize: '13px', letterSpacing: '0.04em', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px' }}
        >
          {tw.vatNote}
        </p>
      </div>
    </section>
  )
}

function PressureWasherDecor() {
  const nx = 144
  const ny = 153
  const baseAngle = -2.46
  const halfSpread = 0.26

  const lines = Array.from({ length: 11 }, (_, i) => {
    const t = i / 10
    const angle = baseAngle - halfSpread + t * halfSpread * 2
    const len = 70 + Math.sin(t * Math.PI) * 55 + (i % 3) * 18
    return {
      x2: nx + Math.cos(angle) * len,
      y2: ny + Math.sin(angle) * len,
      len,
      delay: `${((i * 0.13) % 0.95).toFixed(2)}s`,
      dur:   `${(0.85 + (i % 4) * 0.18).toFixed(2)}s`,
    }
  })

  const coneEdge1 = { x: nx + Math.cos(baseAngle - halfSpread) * 165, y: ny + Math.sin(baseAngle - halfSpread) * 165 }
  const coneMid   = { x: nx + Math.cos(baseAngle) * 175,              y: ny + Math.sin(baseAngle) * 175 }
  const coneEdge2 = { x: nx + Math.cos(baseAngle + halfSpread) * 165, y: ny + Math.sin(baseAngle + halfSpread) * 165 }

  return (
    <div className="absolute right-0 bottom-0 pointer-events-none" style={{ width: '420px', height: '360px', opacity: 0.1 }}>
      <style>{`
        @keyframes sprayFlow {
          0%   { opacity: 0; stroke-dashoffset: 220; }
          20%  { opacity: 0.95; }
          78%  { opacity: 0.75; stroke-dashoffset: 0; }
          100% { opacity: 0; stroke-dashoffset: 0; }
        }
      `}</style>
      <svg viewBox="0 0 420 360" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={`M ${nx} ${ny} L ${coneEdge1.x} ${coneEdge1.y} Q ${coneMid.x} ${coneMid.y} ${coneEdge2.x} ${coneEdge2.y} Z`} fill="rgba(180,220,255,0.07)" />
        {lines.map((d, i) => (
          <line key={i} x1={nx} y1={ny} x2={d.x2} y2={d.y2} stroke="rgba(210,235,255,0.9)" strokeWidth="1.2" strokeLinecap="round" strokeDasharray={`${d.len} ${d.len}`} style={{ animation: `sprayFlow ${d.dur} ${d.delay} infinite ease-out` }} />
        ))}
        <g transform="translate(350, 320) rotate(-141)" stroke="#C9A84C" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <line x1="36" y1="0" x2="265" y2="0" strokeWidth="4.5" />
          <line x1="44" y1="-7" x2="44" y2="7" strokeWidth="3" />
          <rect x="32" y="-9" width="15" height="18" rx="2" strokeWidth="2" />
          <rect x="-48" y="-15" width="86" height="30" rx="3" strokeWidth="2.5" />
          <rect x="-55" y="-9" width="10" height="18" rx="2" strokeWidth="2" />
          <path d="M 6,15 L 19,73 Q 19,82 10,82 L -2,82 Q -11,82 -11,73 L 2,15" strokeWidth="2.5" />
          <line x1="-8"  y1="36" x2="16" y2="36" strokeWidth="1.5" opacity="0.45" />
          <line x1="-9"  y1="49" x2="15" y2="49" strokeWidth="1.5" opacity="0.45" />
          <line x1="-10" y1="62" x2="14" y2="62" strokeWidth="1.5" opacity="0.45" />
          <path d="M 17,5 Q 25,15 22,24 L 10,24 Q 8,14 14,5" strokeWidth="2" />
          <line x1="263" y1="-6" x2="263" y2="6" strokeWidth="4" />
          <line x1="268" y1="-3" x2="268" y2="3" strokeWidth="3" />
        </g>
      </svg>
    </div>
  )
}

function WashingExtrasDecor() {
  return (
    <>
      <div className="absolute pointer-events-none" style={{ top: '80px', right: '110px', opacity: 0.11, transform: 'rotate(-10deg)' }}>
        <svg viewBox="0 0 96 66" width="155" height="107" fill="none" stroke="#C9A84C" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 80,22 L 80,62 L 89,53 L 89,13 Z" fill="rgba(201,168,76,0.07)" strokeWidth="1.5"/>
          <path d="M 80,10 L 80,22 L 89,13 L 89,1 Z" fill="rgba(201,168,76,0.05)" strokeWidth="1.5"/>
          <path d="M 0,10 L 80,10 L 89,1 L 9,1 Z" fill="rgba(201,168,76,0.22)" strokeWidth="2"/>
          <line x1="20" y1="10" x2="29" y2="1" strokeWidth="1" opacity="0.38"/>
          <line x1="40" y1="10" x2="49" y2="1" strokeWidth="1" opacity="0.38"/>
          <line x1="60" y1="10" x2="69" y2="1" strokeWidth="1" opacity="0.38"/>
          <path d="M 0,10 L 80,10 L 80,22 L 0,22 Z" fill="rgba(201,168,76,0.13)" strokeWidth="2"/>
          <line x1="20" y1="10" x2="20" y2="22" strokeWidth="1" opacity="0.32"/>
          <line x1="40" y1="10" x2="40" y2="22" strokeWidth="1" opacity="0.32"/>
          <line x1="60" y1="10" x2="60" y2="22" strokeWidth="1" opacity="0.32"/>
          <path d="M 0,22 L 80,22 L 80,62 L 0,62 Z" fill="rgba(201,168,76,0.10)" strokeWidth="2.5"/>
          <circle cx="14" cy="34" r="4" strokeWidth="1.8"/>
          <circle cx="37" cy="29" r="4" strokeWidth="1.8"/>
          <circle cx="61" cy="35" r="4" strokeWidth="1.8"/>
          <circle cx="22" cy="51" r="4" strokeWidth="1.8"/>
          <circle cx="50" cy="50" r="4" strokeWidth="1.8"/>
          <circle cx="74" cy="43" r="4" strokeWidth="1.8"/>
        </svg>
      </div>
      <div className="absolute pointer-events-none" style={{ top: '22%', left: '28px', opacity: 0.10, transform: 'rotate(12deg)' }}>
        <svg viewBox="0 0 106 205" width="80" height="154" fill="none" stroke="#C9A84C" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 26,72 Q 12,82 12,104 L 12,168 Q 12,188 50,188 Q 88,188 88,168 L 88,104 Q 88,82 74,72" fill="rgba(201,168,76,0.10)" strokeWidth="2.5"/>
          <path d="M 14,106 Q 13,84 26,74" fill="none" stroke="rgba(201,168,76,0.38)" strokeWidth="1.2"/>
          <path d="M 26,72 Q 28,57 33,46 L 67,46 Q 72,57 74,72" fill="rgba(201,168,76,0.13)" strokeWidth="2"/>
          <rect x="16" y="112" width="68" height="48" rx="4" fill="rgba(201,168,76,0.06)" strokeWidth="1.5"/>
          <line x1="24" y1="124" x2="76" y2="124" strokeWidth="1" opacity="0.4"/>
          <line x1="24" y1="136" x2="76" y2="136" strokeWidth="1" opacity="0.4"/>
          <line x1="24" y1="147" x2="58" y2="147" strokeWidth="1" opacity="0.3"/>
          <rect x="20" y="33" width="64" height="15" rx="5" fill="rgba(201,168,76,0.17)" strokeWidth="2.2"/>
          <line x1="50" y1="33" x2="50" y2="46" strokeWidth="1.5" opacity="0.45"/>
          <line x1="50" y1="46" x2="50" y2="182" strokeWidth="1" strokeDasharray="4 5" opacity="0.18"/>
          <rect x="82" y="35" width="22" height="11" rx="4" fill="rgba(201,168,76,0.20)" strokeWidth="2"/>
          <circle cx="105" cy="40" r="4" fill="rgba(201,168,76,0.15)" strokeWidth="1.8"/>
          <path d="M 80,48 Q 94,52 96,67 Q 97,80 88,85 L 84,80 Q 90,76 88,65 Q 86,54 74,50 Z" fill="rgba(201,168,76,0.11)" strokeWidth="2"/>
        </svg>
      </div>
      <div className="absolute pointer-events-none" style={{ bottom: '55px', left: '18%', opacity: 0.10, transform: 'rotate(-18deg)' }}>
        <svg viewBox="0 0 180 112" width="180" height="112" fill="none" stroke="#C9A84C" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 12,56 Q 48,46 90,56 Q 132,66 168,52 L 168,70 Q 132,82 90,70 Q 48,58 12,70 Z" fill="rgba(201,168,76,0.05)" strokeWidth="0"/>
          <path d="M 8,38 Q 44,22 90,32 Q 136,42 172,28 L 172,76 Q 136,92 90,82 Q 44,70 8,82 Z" fill="rgba(201,168,76,0.10)" strokeWidth="2.5"/>
          <path d="M 8,54 Q 44,42 90,52 Q 136,62 172,48" strokeWidth="1.5" opacity="0.48"/>
          <path d="M 8,66 Q 44,57 90,65 Q 136,73 172,62" strokeWidth="1.3" opacity="0.33"/>
          <path d="M 8,38 Q 44,26 90,33 Q 136,40 172,28" strokeWidth="1.8" opacity="0.62"/>
          <path d="M 34,22 Q 32,13 40,10 Q 48,17 44,28" strokeWidth="1.5" opacity="0.5"/>
          <rect x="20" y="36" width="140" height="44" rx="7" strokeWidth="1" strokeDasharray="5 4" opacity="0.28"/>
        </svg>
      </div>
    </>
  )
}
