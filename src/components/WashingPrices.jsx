import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

const motorcycleService = {
  lv: 'Motocikla Mazgāšana',
  en: 'Motorcycle Wash',
  price: '20',
}

const services = [
  {
    lv: 'A/M Mazgāšana',
    en: 'Standard Car Wash',
    note: 'Paklāji + 30×30cm',
    prices: { car: '25 – 30', suv: '30 – 35', van: '35 – 40' },
  },
  {
    lv: 'A/M Padziļinātā Mazgāšana',
    en: 'Deep Car Wash',
    note: 'Paklāji + sliekšņi + durvis + 30×30cm',
    prices: { car: '35 – 40', suv: '40 – 45', van: '45 – 50' },
  },
  {
    lv: 'Rokas Vaska Uzklāšana',
    en: 'Hand Wax Application',
    note: null,
    prices: { car: '9', suv: '12', van: '12' },
  },
  {
    lv: 'A/M Salona Tīrīšana',
    en: 'Interior Detailing',
    note: 'Panelis + polsterējums',
    prices: { car: '15 – 20', suv: '20 – 25', van: '25 – 30' },
  },
  {
    lv: 'A/M Dzīvnieku Mazgāšana',
    en: 'Pet Hair Removal',
    note: null,
    prices: { car: '20', suv: '50', van: '50' },
  },
  {
    lv: 'A/M Stiklu Tīrīšana',
    en: 'Glass & Window Cleaning',
    note: null,
    prices: { car: '10', suv: '15', van: '15' },
  },
  {
    lv: 'Ādas Kondicionērs',
    en: 'Leather Conditioning',
    note: null,
    prices: { car: '10', suv: '15', van: '15' },
  },
  {
    lv: 'Asfalta (Pike) Noņemšana',
    en: 'Tar & Asphalt Removal',
    note: null,
    prices: { car: '30', suv: '35', van: '40' },
  },
  {
    lv: 'Velodiretāla Disku Mazgāšana',
    en: 'Brake Disc & Wheel Cleaning',
    note: null,
    prices: { car: '15', suv: '15', van: '15' },
  },
]

const vehicleTypes = [
  { key: 'car', label: 'VIEGLAIS AUTO', sub: 'Sedan / Hatchback / Coupe' },
  { key: 'suv', label: 'DŽIPI & MINIVENI', sub: 'SUV / MPV / Minivan' },
  { key: 'van', label: 'MINIBUSS', sub: 'Minibus / Cargo Van' },
]

export default function WashingPrices() {
  const [activeVehicle, setActiveVehicle] = useState('car')

  return (
    <section id="washing" className="relative overflow-hidden bg-ec-black py-28 px-6">
      <PressureWasherDecor />
      <WashingExtrasDecor />
      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Section header — slides up on scroll */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <p className="font-heading text-ec-gold mb-3" style={{ fontSize: '10px', letterSpacing: '0.45em', fontWeight: 800 }}>
            PAKALPOJUMI
          </p>
          <h2 className="font-display text-ec-white gold-line" style={{ fontSize: 'clamp(42px, 6vw, 80px)', letterSpacing: '0.04em' }}>
            MAZGĀŠANA
          </h2>
          <p className="font-body text-ec-muted mt-6 max-w-lg leading-relaxed" style={{ fontSize: '16px', fontWeight: 400 }}>
            No ikdienas mazgāšanas līdz padziļinātai salona kopšanai —
            katrs pakalpojums tiek veikts ar precizitāti un rūpību.
          </p>
        </motion.div>

        {/* ── Sliding vehicle-type tabs ── */}
        <motion.div
          className="flex mb-8"
          style={{ border: '1px solid rgba(201,168,76,0.18)' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        >
          {vehicleTypes.map((v) => (
            <button
              key={v.key}
              onClick={() => setActiveVehicle(v.key)}
              className="relative flex-1 py-3 px-2 text-center focus:outline-none"
            >
              {activeVehicle === v.key && (
                <motion.div
                  layoutId="vehicleTab"
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
                  color: activeVehicle === v.key ? '#C9A84C' : 'rgba(255,255,255,0.45)',
                  transition: 'color 0.25s ease',
                }}
              >
                {v.label}
              </span>
              <span
                className="relative z-10 block font-body"
                style={{
                  fontSize: '11px',
                  color: activeVehicle === v.key ? 'rgba(201,168,76,0.7)' : 'rgba(255,255,255,0.25)',
                  marginTop: '3px',
                  transition: 'color 0.25s ease',
                }}
              >
                {v.sub}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Service rows — staggered entrance */}
        <div className="flex flex-col">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.55, ease: EASE, delay: i * 0.045 }}
            >
              <ServiceRow service={s} activeVehicle={activeVehicle} />
            </motion.div>
          ))}
        </div>

        {/* Motorcycle callout */}
        <motion.div
          className="flex items-center justify-between mt-6 px-6 py-4"
          style={{ border: '1px solid rgba(201,168,76,0.15)', background: 'rgba(201,168,76,0.03)' }}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <div>
            <p className="font-heading text-ec-white" style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '0.02em' }}>
              {motorcycleService.lv}
            </p>
            <p className="font-body text-ec-muted mt-1" style={{ fontSize: '13px', fontWeight: 400 }}>{motorcycleService.en}</p>
          </div>
          <span className="font-heading text-ec-white" style={{ fontSize: '24px', fontWeight: 800 }}>
            {motorcycleService.price}
            <span className="text-ec-gold" style={{ fontSize: '14px' }}>€</span>
          </span>
        </motion.div>

        {/* VAT note */}
        <p
          className="font-body text-ec-muted mt-10"
          style={{ fontSize: '13px', letterSpacing: '0.04em', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px' }}
        >
          * Visas cenas norādītas bez PVN. Papildu pakalpojumi tiek aprēķināti atsevišķi.
        </p>
      </div>
    </section>
  )
}

function ServiceRow({ service, activeVehicle }) {
  const price = service.prices[activeVehicle]
  return (
    <motion.div
      className="grid items-center py-5 px-2"
      style={{ gridTemplateColumns: '2fr 1fr', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)', paddingLeft: '10px', paddingRight: '10px' }}
      transition={{ duration: 0.2 }}
    >
      {/* Service name */}
      <div>
        <p className="font-heading text-ec-white" style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '0.01em' }}>
          {service.lv}
        </p>
        <p className="font-body text-ec-muted mt-1" style={{ fontSize: '14px', fontWeight: 400 }}>
          {service.en}
          {service.note && <span className="ml-2 opacity-60">· {service.note}</span>}
        </p>
      </div>

      {/* Price — cross-fades when active vehicle changes */}
      <AnimatePresence mode="wait">
        <motion.span
          key={`${activeVehicle}-${price}`}
          className="font-heading"
          style={{ fontSize: '26px', fontWeight: 800, color: '#F5F5F0' }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.26, ease: EASE }}
        >
          {price === '—' ? (
            <span style={{ color: 'rgba(138,138,138,0.35)', fontSize: '18px' }}>—</span>
          ) : (
            <>
              {price}
              <span className="text-ec-gold" style={{ fontSize: '15px', marginLeft: '2px' }}>€</span>
            </>
          )}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Pressure washer background decoration ───────────────────────────────────
// Gun is positioned bottom-right pointing upper-left at ~141°.
// Nozzle tip lands at approximately (144, 153) in the 420×360 viewBox.
// Spray lines fan ±15° around the wand axis with staggered CSS animation.
function PressureWasherDecor() {
  const nx = 144
  const ny = 153
  const baseAngle = -2.46   // rad — upper-left direction matching the wand
  const halfSpread = 0.26   // rad — ±15°

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
    <div
      className="absolute right-0 bottom-0 pointer-events-none"
      style={{ width: '420px', height: '360px', opacity: 0.1 }}
    >
      <style>{`
        @keyframes sprayFlow {
          0%   { opacity: 0; stroke-dashoffset: 220; }
          20%  { opacity: 0.95; }
          78%  { opacity: 0.75; stroke-dashoffset: 0; }
          100% { opacity: 0; stroke-dashoffset: 0; }
        }
      `}</style>

      <svg viewBox="0 0 420 360" fill="none" xmlns="http://www.w3.org/2000/svg">

        {/* Spray cone mist */}
        <path
          d={`M ${nx} ${ny} L ${coneEdge1.x} ${coneEdge1.y} Q ${coneMid.x} ${coneMid.y} ${coneEdge2.x} ${coneEdge2.y} Z`}
          fill="rgba(180,220,255,0.07)"
        />

        {/* Spray lines */}
        {lines.map((d, i) => (
          <line
            key={i}
            x1={nx} y1={ny} x2={d.x2} y2={d.y2}
            stroke="rgba(210,235,255,0.9)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeDasharray={`${d.len} ${d.len}`}
            style={{ animation: `sprayFlow ${d.dur} ${d.delay} infinite ease-out` }}
          />
        ))}

        {/* Gun assembly — translate to bottom-right, rotate to point upper-left */}
        <g
          transform="translate(350, 320) rotate(-141)"
          stroke="#C9A84C"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          {/* Lance / wand */}
          <line x1="36" y1="0" x2="265" y2="0" strokeWidth="4.5" />
          {/* Wand collar ring */}
          <line x1="44" y1="-7" x2="44" y2="7" strokeWidth="3" />
          {/* Wand socket on body */}
          <rect x="32" y="-9" width="15" height="18" rx="2" strokeWidth="2" />
          {/* Main body housing */}
          <rect x="-48" y="-15" width="86" height="30" rx="3" strokeWidth="2.5" />
          {/* Rear end cap */}
          <rect x="-55" y="-9" width="10" height="18" rx="2" strokeWidth="2" />
          {/* Handle / grip */}
          <path d="M 6,15 L 19,73 Q 19,82 10,82 L -2,82 Q -11,82 -11,73 L 2,15" strokeWidth="2.5" />
          {/* Grip ridges */}
          <line x1="-8"  y1="36" x2="16" y2="36" strokeWidth="1.5" opacity="0.45" />
          <line x1="-9"  y1="49" x2="15" y2="49" strokeWidth="1.5" opacity="0.45" />
          <line x1="-10" y1="62" x2="14" y2="62" strokeWidth="1.5" opacity="0.45" />
          {/* Trigger */}
          <path d="M 17,5 Q 25,15 22,24 L 10,24 Q 8,14 14,5" strokeWidth="2" />
          {/* Nozzle tip */}
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
      {/* ── 3D oblique sponge ── upper-right, tilted -10° */}
      {/* Oblique projection: body 80×40, scrub pad 80×12, depth offset (9,-9) */}
      <div className="absolute pointer-events-none" style={{ top: '80px', right: '110px', opacity: 0.11, transform: 'rotate(-10deg)' }}>
        <svg viewBox="0 0 96 66" width="155" height="107" fill="none" stroke="#C9A84C" strokeLinecap="round" strokeLinejoin="round">
          {/* Body right face (shadow) */}
          <path d="M 80,22 L 80,62 L 89,53 L 89,13 Z" fill="rgba(201,168,76,0.07)" strokeWidth="1.5"/>
          {/* Scrub pad right face */}
          <path d="M 80,10 L 80,22 L 89,13 L 89,1 Z" fill="rgba(201,168,76,0.05)" strokeWidth="1.5"/>
          {/* Scrub pad top face (most lit) */}
          <path d="M 0,10 L 80,10 L 89,1 L 9,1 Z" fill="rgba(201,168,76,0.22)" strokeWidth="2"/>
          {/* Hatching on scrub pad top */}
          <line x1="20" y1="10" x2="29" y2="1" strokeWidth="1" opacity="0.38"/>
          <line x1="40" y1="10" x2="49" y2="1" strokeWidth="1" opacity="0.38"/>
          <line x1="60" y1="10" x2="69" y2="1" strokeWidth="1" opacity="0.38"/>
          {/* Scrub pad front face */}
          <path d="M 0,10 L 80,10 L 80,22 L 0,22 Z" fill="rgba(201,168,76,0.13)" strokeWidth="2"/>
          <line x1="20" y1="10" x2="20" y2="22" strokeWidth="1" opacity="0.32"/>
          <line x1="40" y1="10" x2="40" y2="22" strokeWidth="1" opacity="0.32"/>
          <line x1="60" y1="10" x2="60" y2="22" strokeWidth="1" opacity="0.32"/>
          {/* Body front face */}
          <path d="M 0,22 L 80,22 L 80,62 L 0,62 Z" fill="rgba(201,168,76,0.10)" strokeWidth="2.5"/>
          {/* Pores */}
          <circle cx="14" cy="34" r="4" strokeWidth="1.8"/>
          <circle cx="37" cy="29" r="4" strokeWidth="1.8"/>
          <circle cx="61" cy="35" r="4" strokeWidth="1.8"/>
          <circle cx="22" cy="51" r="4" strokeWidth="1.8"/>
          <circle cx="50" cy="50" r="4" strokeWidth="1.8"/>
          <circle cx="74" cy="43" r="4" strokeWidth="1.8"/>
        </svg>
      </div>

      {/* ── Trigger spray bottle ── left side, tilted +12° */}
      <div className="absolute pointer-events-none" style={{ top: '22%', left: '28px', opacity: 0.10, transform: 'rotate(12deg)' }}>
        <svg viewBox="0 0 106 205" width="80" height="154" fill="none" stroke="#C9A84C" strokeLinecap="round" strokeLinejoin="round">
          {/* Bottle body */}
          <path d="M 26,72 Q 12,82 12,104 L 12,168 Q 12,188 50,188 Q 88,188 88,168 L 88,104 Q 88,82 74,72"
            fill="rgba(201,168,76,0.10)" strokeWidth="2.5"/>
          {/* Body left highlight */}
          <path d="M 14,106 Q 13,84 26,74" fill="none" stroke="rgba(201,168,76,0.38)" strokeWidth="1.2"/>
          {/* Shoulder */}
          <path d="M 26,72 Q 28,57 33,46 L 67,46 Q 72,57 74,72"
            fill="rgba(201,168,76,0.13)" strokeWidth="2"/>
          {/* Label */}
          <rect x="16" y="112" width="68" height="48" rx="4" fill="rgba(201,168,76,0.06)" strokeWidth="1.5"/>
          <line x1="24" y1="124" x2="76" y2="124" strokeWidth="1" opacity="0.4"/>
          <line x1="24" y1="136" x2="76" y2="136" strokeWidth="1" opacity="0.4"/>
          <line x1="24" y1="147" x2="58" y2="147" strokeWidth="1" opacity="0.3"/>
          {/* Spray head housing */}
          <rect x="20" y="33" width="64" height="15" rx="5" fill="rgba(201,168,76,0.17)" strokeWidth="2.2"/>
          {/* Pump rod inside neck */}
          <line x1="50" y1="33" x2="50" y2="46" strokeWidth="1.5" opacity="0.45"/>
          {/* Dip tube (dashed) */}
          <line x1="50" y1="46" x2="50" y2="182" strokeWidth="1" strokeDasharray="4 5" opacity="0.18"/>
          {/* Nozzle — horizontal tube right of spray head */}
          <rect x="82" y="35" width="22" height="11" rx="4" fill="rgba(201,168,76,0.20)" strokeWidth="2"/>
          {/* Nozzle opening */}
          <circle cx="105" cy="40" r="4" fill="rgba(201,168,76,0.15)" strokeWidth="1.8"/>
          {/* Trigger — curved lever */}
          <path d="M 80,48 Q 94,52 96,67 Q 97,80 88,85 L 84,80 Q 90,76 88,65 Q 86,54 74,50 Z"
            fill="rgba(201,168,76,0.11)" strokeWidth="2"/>
        </svg>
      </div>

      {/* ── Microfiber cloth ── bottom-center, tilted -18° */}
      <div className="absolute pointer-events-none" style={{ bottom: '55px', left: '18%', opacity: 0.10, transform: 'rotate(-18deg)' }}>
        <svg viewBox="0 0 180 112" width="180" height="112" fill="none" stroke="#C9A84C" strokeLinecap="round" strokeLinejoin="round">
          {/* Shadow underside */}
          <path d="M 12,56 Q 48,46 90,56 Q 132,66 168,52 L 168,70 Q 132,82 90,70 Q 48,58 12,70 Z"
            fill="rgba(201,168,76,0.05)" strokeWidth="0"/>
          {/* Cloth body */}
          <path d="M 8,38 Q 44,22 90,32 Q 136,42 172,28 L 172,76 Q 136,92 90,82 Q 44,70 8,82 Z"
            fill="rgba(201,168,76,0.10)" strokeWidth="2.5"/>
          {/* Fabric fold lines */}
          <path d="M 8,54 Q 44,42 90,52 Q 136,62 172,48" strokeWidth="1.5" opacity="0.48"/>
          <path d="M 8,66 Q 44,57 90,65 Q 136,73 172,62" strokeWidth="1.3" opacity="0.33"/>
          {/* Top fold highlight */}
          <path d="M 8,38 Q 44,26 90,33 Q 136,40 172,28" strokeWidth="1.8" opacity="0.62"/>
          {/* Corner turned-up fold */}
          <path d="M 34,22 Q 32,13 40,10 Q 48,17 44,28" strokeWidth="1.5" opacity="0.5"/>
          {/* Stitched edge */}
          <rect x="20" y="36" width="140" height="44" rx="7" strokeWidth="1" strokeDasharray="5 4" opacity="0.28"/>
        </svg>
      </div>
    </>
  )
}
