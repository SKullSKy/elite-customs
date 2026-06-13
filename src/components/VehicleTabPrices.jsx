import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

const DEFAULT_IMAGES = {
  car: '/assets/porsche.webp',
  suv: '/assets/bmw.webp',
  van: '/assets/van-services.webp',
}

// Per-image: crop focus + cinematic grade for active state
const IMAGE_CONFIG = {
  // Washing page (portrait shots, crop into car body)
  '/assets/porsche.webp':      { position: '50% 74%', activeFilter: 'brightness(0.7)  contrast(1.35) saturate(1.22)' },
  '/assets/bmw.webp':          { position: '52% 64%', activeFilter: 'brightness(0.76) contrast(1.3)  saturate(1.18)' },
  // Detailing — white E30 (blue sky, lower 60%); dark X7 (very low light)
  '/assets/detailing-car.webp': { position: '46% 70%', activeFilter: 'brightness(0.72) contrast(1.38) saturate(1.28)' },
  '/assets/detailing-suv.webp': { position: '50% 58%', activeFilter: 'brightness(0.92) contrast(1.42) saturate(0.82)' },
  // Polishing — matte dark Mercedes; white X7 with trees
  '/assets/polishing-car.webp': { position: '44% 55%', activeFilter: 'brightness(0.84) contrast(1.3)  saturate(0.88)' },
  '/assets/polishing-suv.webp': { position: '52% 60%', activeFilter: 'brightness(0.7)  contrast(1.35) saturate(1.25)' },
  // Van — black Mercedes V-Class, portrait shot, front-facing
  '/assets/van-services.webp':  { position: '50% 68%', activeFilter: 'brightness(0.72) contrast(1.32) saturate(1.15)' },
}

const DEFAULT_CONFIG = { position: 'center center', activeFilter: 'brightness(0.72) contrast(1.2) saturate(1.1)' }

// VAN placeholder — large centred outline
function VanSilhouette() {
  return (
    <svg viewBox="0 0 260 110" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '200px', opacity: 0.22 }}>
      <path d="M 12,72 L 12,46 Q 12,32 24,26 L 76,18 Q 92,8 122,8 L 185,8 Q 218,8 236,26 L 248,46 L 248,72 Z"
        fill="rgba(201,168,76,0.06)" stroke="#C9A84C" strokeWidth="2.2" strokeLinejoin="round"/>
      <line x1="12" y1="58" x2="248" y2="58" stroke="#C9A84C" strokeWidth="1" opacity="0.4"/>
      <line x1="76" y1="18" x2="76" y2="58" stroke="#C9A84C" strokeWidth="1.2" opacity="0.35"/>
      <line x1="128" y1="8"  x2="128" y2="58" stroke="#C9A84C" strokeWidth="1.2" opacity="0.35"/>
      <line x1="182" y1="8"  x2="182" y2="58" stroke="#C9A84C" strokeWidth="1.2" opacity="0.35"/>
      <circle cx="58"  cy="78" r="16" fill="rgba(201,168,76,0.08)" stroke="#C9A84C" strokeWidth="2.2"/>
      <circle cx="58"  cy="78" r="6"  fill="#C9A84C" opacity="0.25"/>
      <circle cx="200" cy="78" r="16" fill="rgba(201,168,76,0.08)" stroke="#C9A84C" strokeWidth="2.2"/>
      <circle cx="200" cy="78" r="6"  fill="#C9A84C" opacity="0.25"/>
    </svg>
  )
}

export default function VehicleTabPrices({
  vehicleTypes,
  services,
  priceData,
  featuredBadge,
  images,
  motoPrice,
  motoLabel,
  motoSub,
  selectPrompt,
}) {
  const [selected, setSelected] = useState(null)
  const VEHICLE_IMAGES = { ...DEFAULT_IMAGES, ...images }

  return (
    <div>
      {/* Horizontal accordion bar */}
      <motion.div
        animate={{ height: selected ? 230 : 400 }}
        transition={{ duration: 0.55, ease: EASE }}
        style={{ display: 'flex', gap: '3px', overflow: 'hidden' }}
      >
        {vehicleTypes.map((v) => {
          const img = VEHICLE_IMAGES[v.key]
          const isActive = selected === v.key
          const flexVal = isActive ? 6 : selected ? 1.5 : 3

          return (
            <button
              key={v.key}
              onClick={() => setSelected(isActive ? null : v.key)}
              style={{
                position: 'relative',
                overflow: 'hidden',
                flex: flexVal,
                minWidth: 0,
                border: isActive
                  ? '1px solid rgba(201,168,76,0.55)'
                  : '1px solid rgba(255,255,255,0.07)',
                background: '#0D0D0D',
                cursor: 'pointer',
                transition: 'flex 0.52s cubic-bezier(0.16,1,0.3,1), border-color 0.3s',
                padding: 0,
              }}
            >
              {/* Photo */}
              {img ? (
                <img
                  src={img}
                  alt={v.label}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: (IMAGE_CONFIG[img] || DEFAULT_CONFIG).position,
                    display: 'block',
                    filter: isActive
                      ? (IMAGE_CONFIG[img] || DEFAULT_CONFIG).activeFilter
                      : selected
                        ? 'brightness(0.18) saturate(0.3) contrast(1.1)'
                        : `${(IMAGE_CONFIG[img] || DEFAULT_CONFIG).activeFilter} brightness(0.58)`,
                    transition: 'filter 0.45s cubic-bezier(0.16,1,0.3,1)',
                  }}
                />
              ) : (
                <div style={{
                  width: '100%', height: '100%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'linear-gradient(160deg, #131313 0%, #1e1e1e 100%)',
                  opacity: selected && !isActive ? 0.38 : 1,
                  transition: 'opacity 0.4s',
                }}>
                  <VanSilhouette />
                </div>
              )}

              {/* Bottom gradient */}
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'linear-gradient(to top, rgba(13,13,13,0.96) 0%, rgba(13,13,13,0.18) 55%, transparent 100%)',
              }} />

              {/* Label — always horizontal at bottom, transitions smoothly */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: isActive ? '0 16px 14px' : '0 12px 12px',
                pointerEvents: 'none',
                transition: 'padding 0.52s cubic-bezier(0.16,1,0.3,1)',
                overflow: 'hidden',
              }}>
                <p className="font-heading" style={{
                  fontSize: isActive ? '11px' : '8.5px',
                  letterSpacing: isActive ? '0.18em' : '0.14em',
                  fontWeight: 800,
                  color: isActive ? '#C9A84C' : selected ? 'rgba(245,245,240,0.5)' : 'rgba(245,245,240,0.8)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  transition: 'font-size 0.52s cubic-bezier(0.16,1,0.3,1), letter-spacing 0.52s cubic-bezier(0.16,1,0.3,1), color 0.35s',
                }}>
                  {v.label}
                </p>
                <p className="font-body" style={{
                  fontSize: '9px',
                  marginTop: '2px',
                  color: 'rgba(138,138,138,0.7)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  opacity: isActive ? 1 : 0,
                  transition: 'opacity 0.35s cubic-bezier(0.16,1,0.3,1)',
                }}>
                  {v.sub}
                </p>
              </div>

              {/* Gold underline */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: '2px', background: '#C9A84C',
                opacity: isActive ? 1 : 0,
                transition: 'opacity 0.25s',
              }} />

              {/* Checkmark badge */}
              {isActive && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{
                    position: 'absolute', top: 12, right: 12,
                    width: 22, height: 22,
                    background: '#C9A84C', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="#0A0A0A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              )}
            </button>
          )
        })}
      </motion.div>

      {/* Prompt when nothing selected */}
      <AnimatePresence>
        {!selected && (
          <motion.p
            key="prompt"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="font-body text-ec-muted text-center mt-6"
            style={{ fontSize: '13px', letterSpacing: '0.08em' }}
          >
            {selectPrompt || '↑ Izvēlieties transportlīdzekļa tipu, lai redzētu cenas'}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Price rows for selected vehicle */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.38, ease: EASE }}
            style={{
              marginTop: '2px',
              border: '1px solid rgba(201,168,76,0.18)',
              borderTop: '1px solid rgba(201,168,76,0.35)',
            }}
          >
            {services.map((s, i) => (
              <motion.div
                key={i}
                className="flex items-center justify-between px-6 py-4"
                style={{
                  borderBottom: i < services.length - 1
                    ? '1px solid rgba(255,255,255,0.05)'
                    : 'none',
                  background: s.featured ? 'rgba(201,168,76,0.03)' : 'transparent',
                  borderLeft: s.featured ? '2px solid rgba(201,168,76,0.4)' : '2px solid transparent',
                }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.32, ease: EASE, delay: i * 0.04 }}
              >
                <div className="flex-1 pr-6">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-heading text-ec-white" style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '0.01em' }}>
                      {s.name}
                    </p>
                    {s.featured && featuredBadge && (
                      <span
                        className="font-heading text-ec-black"
                        style={{ background: '#C9A84C', fontSize: '7px', letterSpacing: '0.25em', fontWeight: 800, padding: '2px 7px' }}
                      >
                        {featuredBadge}
                      </span>
                    )}
                  </div>
                  <p className="font-body text-ec-muted mt-0.5" style={{ fontSize: '12px' }}>
                    {s.sub}
                    {s.note && <span className="ml-1 opacity-60">· {s.note}</span>}
                    {s.desc && <span className="ml-1 opacity-60">· {s.desc}</span>}
                  </p>
                </div>
                <span className="font-heading text-ec-white" style={{ fontSize: '26px', fontWeight: 800, whiteSpace: 'nowrap' }}>
                  {priceData[i].prices[selected]}
                  <span className="text-ec-gold" style={{ fontSize: '14px', marginLeft: '2px' }}>€</span>
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Motorcycle callout — washing only */}
      {motoPrice && (
        <motion.div
          className="flex items-center justify-between mt-3 px-5 py-4"
          style={{ border: '1px solid rgba(201,168,76,0.15)', background: 'rgba(201,168,76,0.03)' }}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <div>
            <p className="font-heading text-ec-white" style={{ fontSize: '17px', fontWeight: 700, letterSpacing: '0.02em' }}>
              {motoLabel}
            </p>
            <p className="font-body text-ec-muted mt-1" style={{ fontSize: '13px' }}>{motoSub}</p>
          </div>
          <span className="font-heading text-ec-white" style={{ fontSize: '26px', fontWeight: 800 }}>
            {motoPrice}
            <span className="text-ec-gold" style={{ fontSize: '14px' }}>€</span>
          </span>
        </motion.div>
      )}
    </div>
  )
}
