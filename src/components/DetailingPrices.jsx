import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

const services = [
  {
    lv: 'Polka Ķīmikāļu Stikla Tīrīšana',
    en: 'Chemical Glass Polish',
    description:
      'Profesionāla stikla virsmas apstrāde ar ķīmiskiem polēšanas līdzekļiem. Noņem skrāpējumus, ūdens traipus un smalkus bojājumus, atjaunojot kristāldzidru redzamību.',
    includes: ['Ķīmiskā polēšana', 'Stikla kondicionēšana', 'UV aizsardzība'],
    prices: { car: 'No 130', suv: 'No 160', van: 'No 190' },
  },
  {
    lv: 'Overcoat Keramiskais Pārklājums',
    en: 'Overcoat Ceramic Coating',
    description:
      'Augstākā klases aizsardzība jūsu automobilim. Keramiskais pārklājums nodrošina ilglaicīgu aizsardzību pret vides faktoriem, UV stariem un sīkiem skrāpējumiem.',
    includes: [
      'A/M padziļinātā mazgāšana',
      'Asfalta (pike) noņemšana',
      'Keramiskā pārklājuma uzklāšana',
    ],
    prices: { car: '160', suv: '180', van: '200' },
    featured: true,
  },
]

const vehicleTypes = [
  { key: 'car', label: 'VIEGLAIS AUTO' },
  { key: 'suv', label: 'DŽIPI & MINIVENI' },
  { key: 'van', label: 'MINIBUSS' },
]

export default function DetailingPrices() {
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
          className="mb-20"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <p className="font-heading text-ec-gold mb-3" style={{ fontSize: '10px', letterSpacing: '0.45em' }}>
            PREMIUM PAKALPOJUMI
          </p>
          <h2 className="font-display text-ec-white gold-line" style={{ fontSize: 'clamp(42px, 6vw, 80px)', letterSpacing: '0.04em' }}>
            DETAILING
          </h2>
          <p className="font-body text-ec-muted mt-6 max-w-lg leading-relaxed" style={{ fontSize: '14px', fontWeight: 300 }}>
            Specialitātes pakalpojumi automobiļiem, kas prasa vairāk.
            Katrs detaļa apstrādāta ar eksperta precizitāti.
          </p>
        </motion.div>

        {/* Cards — staggered entrance */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.14 }}
            >
              <DetailCard service={s} />
            </motion.div>
          ))}
        </div>

        {/* VAT note */}
        <p
          className="font-body text-ec-muted mt-10"
          style={{
            fontSize: '11px',
            letterSpacing: '0.05em',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: '20px',
          }}
        >
          * Visas cenas norādītas bez PVN. Papildu pakalpojumi tiek aprēķināti atsevišķi.
        </p>
      </div>
    </section>
  )
}

function DetailCard({ service }) {
  return (
    <div
      className="relative flex flex-col"
      style={{
        background: service.featured
          ? 'linear-gradient(145deg, #1C1810 0%, #141414 100%)'
          : '#141414',
        border: service.featured
          ? '1px solid rgba(201,168,76,0.4)'
          : '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* Featured badge */}
      {service.featured && (
        <div
          className="absolute top-0 right-0"
          style={{
            background: '#C9A84C',
            padding: '6px 16px',
          }}
        >
          <span
            className="font-heading text-ec-black"
            style={{ fontSize: '9px', letterSpacing: '0.3em', fontWeight: 800 }}
          >
            IETEICAMĀKAIS
          </span>
        </div>
      )}

      <div className="p-8 md:p-10 flex flex-col h-full">
        {/* Title */}
        <div className="mb-6">
          <p
            className="font-heading mb-1"
            style={{ fontSize: '10px', letterSpacing: '0.35em', color: '#C9A84C', fontWeight: 800 }}
          >
            {service.en.toUpperCase()}
          </p>
          <h3
            className="font-display text-ec-white"
            style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', letterSpacing: '0.03em', lineHeight: 1.1 }}
          >
            {service.lv}
          </h3>
        </div>

        {/* Gold divider */}
        <div
          className="mb-6"
          style={{ height: '1px', background: 'rgba(201,168,76,0.2)' }}
        />

        {/* Description */}
        <p
          className="font-body text-ec-muted leading-relaxed mb-8"
          style={{ fontSize: '13px', fontWeight: 300 }}
        >
          {service.description}
        </p>

        {/* Includes */}
        <div className="mb-10">
          <p
            className="font-heading text-ec-muted mb-3"
            style={{ fontSize: '9px', letterSpacing: '0.35em', fontWeight: 800 }}
          >
            IEKĻAUTS
          </p>
          <ul className="flex flex-col gap-2">
            {service.includes.map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <span
                  className="flex-shrink-0 w-4 h-px"
                  style={{ background: '#C9A84C' }}
                />
                <span
                  className="font-body text-ec-white/80"
                  style={{ fontSize: '13px', fontWeight: 500 }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Price grid */}
        <div className="mt-auto grid grid-cols-3 gap-3">
          {vehicleTypes.map((v) => (
            <div
              key={v.key}
              className="text-center py-4 px-2"
              style={{ border: '1px solid rgba(201,168,76,0.15)' }}
            >
              <p
                className="font-heading text-ec-muted mb-2"
                style={{ fontSize: '8px', letterSpacing: '0.25em', fontWeight: 800 }}
              >
                {v.label}
              </p>
              <p
                className="font-heading text-ec-white"
                style={{ fontSize: '20px', fontWeight: 800 }}
              >
                {service.prices[v.key]}
                <span className="text-ec-gold" style={{ fontSize: '11px' }}>
                  €
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function DetailingDecor() {
  return (
    <>
      {/* ── Ceramic coating dropper bottle ── upper-left, tilted -18° */}
      <div className="absolute pointer-events-none" style={{ top: '4%', left: '4%', opacity: 0.09, transform: 'rotate(-18deg)' }}>
        <svg viewBox="0 0 74 172" width="74" height="172" fill="none" stroke="#C9A84C" strokeLinecap="round" strokeLinejoin="round">
          {/* Bottle body */}
          <path d="M 10,66 Q 6,53 9,42 L 14,32 L 60,32 L 65,42 Q 68,53 64,66 L 64,142 Q 64,155 37,155 Q 10,155 10,142 Z"
            fill="rgba(201,168,76,0.10)" strokeWidth="2.5"/>
          {/* Left highlight */}
          <path d="M 12,72 Q 8,58 11,46" fill="none" stroke="rgba(201,168,76,0.42)" strokeWidth="1.2"/>
          {/* Shoulder shadow */}
          <path d="M 64,66 Q 62,58 60,55" fill="none" stroke="rgba(201,168,76,0.22)" strokeWidth="1"/>
          {/* Neck */}
          <rect x="30" y="10" width="14" height="25" rx="4" fill="rgba(201,168,76,0.13)" strokeWidth="2"/>
          {/* Rubber dropper bulb */}
          <ellipse cx="37" cy="8" rx="14" ry="10" fill="rgba(201,168,76,0.17)" strokeWidth="2"/>
          {/* Drip hanging from bulb */}
          <path d="M 37,18 Q 42,27 37,35 Q 32,27 37,18" fill="rgba(201,168,76,0.12)" strokeWidth="1.8"/>
          {/* Label */}
          <rect x="14" y="82" width="46" height="40" rx="3" fill="rgba(201,168,76,0.06)" strokeWidth="1.5"/>
          <line x1="20" y1="94"  x2="54" y2="94"  strokeWidth="1" opacity="0.4"/>
          <line x1="20" y1="104" x2="54" y2="104" strokeWidth="1" opacity="0.4"/>
          <line x1="20" y1="113" x2="40" y2="113" strokeWidth="1" opacity="0.3"/>
        </svg>
      </div>

      {/* ── Detailing brush ── bottom-centre, tilted -30° */}
      <div className="absolute pointer-events-none" style={{ bottom: '20px', left: '30%', opacity: 0.09, transform: 'rotate(-30deg)' }}>
        <svg viewBox="0 0 56 196" width="56" height="196" fill="none" stroke="#C9A84C" strokeLinecap="round" strokeLinejoin="round">
          {/* Handle */}
          <rect x="19" y="0" width="18" height="118" rx="7" fill="rgba(201,168,76,0.09)" strokeWidth="2.5"/>
          {/* Handle left highlight */}
          <line x1="21" y1="6" x2="21" y2="112" strokeWidth="1" opacity="0.38"/>
          {/* Grip rings */}
          <line x1="19" y1="30" x2="37" y2="30" strokeWidth="1.2" opacity="0.38"/>
          <line x1="19" y1="46" x2="37" y2="46" strokeWidth="1.2" opacity="0.38"/>
          <line x1="19" y1="62" x2="37" y2="62" strokeWidth="1.2" opacity="0.38"/>
          <line x1="19" y1="78" x2="37" y2="78" strokeWidth="1.2" opacity="0.38"/>
          <line x1="19" y1="94" x2="37" y2="94" strokeWidth="1.2" opacity="0.38"/>
          {/* Ferrule (metal band) */}
          <rect x="15" y="115" width="26" height="16" rx="2" fill="rgba(201,168,76,0.14)" strokeWidth="2.2"/>
          <line x1="18" y1="121" x2="38" y2="121" strokeWidth="1" opacity="0.3"/>
          {/* Bristle fan */}
          <path d="M 20,131 Q 9,158 4,188"  strokeWidth="2"/>
          <path d="M 24,131 Q 16,158 12,190" strokeWidth="2"/>
          <path d="M 28,131 Q 26,158 26,190" strokeWidth="2"/>
          <path d="M 32,131 Q 38,158 40,190" strokeWidth="2"/>
          <path d="M 36,131 Q 47,158 52,188" strokeWidth="2"/>
          {/* Bristle tip curls */}
          <path d="M 2,188 Q 4,194 7,188"  strokeWidth="1.5"/>
          <path d="M 10,190 Q 12,196 15,190" strokeWidth="1.5"/>
          <path d="M 24,190 Q 26,196 29,190" strokeWidth="1.5"/>
          <path d="M 38,190 Q 40,196 43,190" strokeWidth="1.5"/>
          <path d="M 50,188 Q 52,194 54,188" strokeWidth="1.5"/>
        </svg>
      </div>

      {/* ── Trigger spray bottle ── left side, tilted +10° */}
      <div className="absolute pointer-events-none" style={{ top: '38%', left: '1.5%', opacity: 0.09, transform: 'rotate(10deg)' }}>
        <svg viewBox="0 0 106 205" width="76" height="147" fill="none" stroke="#C9A84C" strokeLinecap="round" strokeLinejoin="round">
          {/* Bottle body */}
          <path d="M 26,72 Q 12,82 12,104 L 12,168 Q 12,188 50,188 Q 88,188 88,168 L 88,104 Q 88,82 74,72"
            fill="rgba(201,168,76,0.10)" strokeWidth="2.5"/>
          {/* Left highlight */}
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
          {/* Pump rod */}
          <line x1="50" y1="33" x2="50" y2="46" strokeWidth="1.5" opacity="0.45"/>
          {/* Dip tube */}
          <line x1="50" y1="46" x2="50" y2="182" strokeWidth="1" strokeDasharray="4 5" opacity="0.18"/>
          {/* Nozzle */}
          <rect x="82" y="35" width="22" height="11" rx="4" fill="rgba(201,168,76,0.20)" strokeWidth="2"/>
          <circle cx="105" cy="40" r="4" fill="rgba(201,168,76,0.15)" strokeWidth="1.8"/>
          {/* Trigger */}
          <path d="M 80,48 Q 94,52 96,67 Q 97,80 88,85 L 84,80 Q 90,76 88,65 Q 86,54 74,50 Z"
            fill="rgba(201,168,76,0.11)" strokeWidth="2"/>
        </svg>
      </div>
    </>
  )
}
