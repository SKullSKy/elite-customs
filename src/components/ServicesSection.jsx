import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SprayCan, Paintbrush, Eraser, Sparkles } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const EASE = [0.16, 1, 0.3, 1]

function PressureWasherIcon() {
  return (
    <div className="relative">
      <div
        className="p-5 rounded-sm"
        style={{ border: '1px solid rgba(201,168,76,0.25)', background: 'rgba(201,168,76,0.05)' }}
      >
        <SprayCan size={52} strokeWidth={1.25} style={{ transform: 'rotate(45deg)' }} />
      </div>
      <span className="absolute top-3 right-3 flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: '#C9A84C' }} />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: '#C9A84C' }} />
      </span>
    </div>
  )
}

function DetailingBrushIcon() {
  return (
    <div
      className="p-5 rounded-sm"
      style={{ border: '1px solid rgba(201,168,76,0.25)', background: 'rgba(201,168,76,0.05)' }}
    >
      <Paintbrush size={52} strokeWidth={1.25} />
    </div>
  )
}

function SpongeIcon() {
  return (
    <div className="relative">
      <div
        className="p-5 rounded-sm"
        style={{ border: '1px solid rgba(201,168,76,0.25)', background: 'rgba(201,168,76,0.05)' }}
      >
        <Eraser size={52} strokeWidth={1.25} style={{ transform: 'rotate(-12deg)' }} />
      </div>
      <Sparkles
        size={20}
        strokeWidth={1.5}
        className="absolute -top-2 -right-2"
        style={{ color: '#C9A84C' }}
      />
    </div>
  )
}

const icons = [PressureWasherIcon, DetailingBrushIcon, SpongeIcon]

export default function ServicesSection() {
  const { t } = useLanguage()
  const services = t.services.items

  return (
    <section id="services" className="relative bg-ec-black py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <h2 className="font-display text-ec-white gold-line" style={{ fontSize: 'clamp(58px, 9vw, 130px)', letterSpacing: '0.06em', lineHeight: 1 }}>
            {t.services.heading}
          </h2>
        </motion.div>

        <div className="flex flex-col">
          {services.map((s, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={s.href}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
                style={{
                  borderTop: '1px solid rgba(255,255,255,0.07)',
                  ...(i === services.length - 1 ? { borderBottom: '1px solid rgba(255,255,255,0.07)' } : {}),
                }}
              >
                <Link
                  to={s.href}
                  className="group flex py-12 md:py-16 relative"
                  style={{ justifyContent: s.side === 'right' ? 'flex-end' : 'flex-start' }}
                >
                  <div
                    className="absolute top-1/2 -translate-y-1/2 text-ec-gold/18 group-hover:text-ec-gold/55 transition-colors duration-500 hidden md:flex items-center justify-center"
                    style={{ [s.side === 'right' ? 'left' : 'right']: '8%' }}
                  >
                    <Icon />
                  </div>

                  <div style={{ width: 'min(65%, 820px)' }}>
                    <div className={`flex items-start gap-5 ${s.side === 'right' ? 'flex-row-reverse' : 'flex-row'}`}>

                      <span
                        className="font-heading text-ec-white/15 flex-shrink-0 mt-3"
                        style={{ fontSize: '12px', letterSpacing: '0.3em', fontWeight: 800 }}
                      >
                        {s.num}
                      </span>

                      <div className={s.side === 'right' ? 'text-right' : 'text-left'}>
                        <p
                          className="font-body text-ec-muted/50 mb-1"
                          style={{ fontSize: '11px', letterSpacing: '0.2em', fontWeight: 300 }}
                        >
                          {s.sub}
                        </p>

                        <h3
                          className="font-display text-ec-white/20 group-hover:text-ec-gold transition-colors duration-500"
                          style={{ fontSize: 'clamp(52px, 7.5vw, 114px)', letterSpacing: '0.03em', lineHeight: 0.92 }}
                        >
                          {s.name}
                        </h3>

                        <p
                          className="font-body text-ec-muted mt-5 leading-relaxed max-w-xs"
                          style={{ fontSize: '13px', fontWeight: 300, marginLeft: s.side === 'right' ? 'auto' : '0' }}
                        >
                          {s.desc}
                        </p>

                        <p
                          className="font-heading text-ec-gold mt-5 group-hover:tracking-widest transition-all duration-300"
                          style={{ fontSize: '10px', letterSpacing: '0.3em', fontWeight: 800 }}
                        >
                          {t.services.cta}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
