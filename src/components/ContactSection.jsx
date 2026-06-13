import { FaTiktok, FaInstagram, FaFacebook, FaMapMarkerAlt, FaExternalLinkAlt, FaWhatsapp, FaEnvelope } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const EASE = [0.16, 1, 0.3, 1]

// Display order: Mon(1), Tue(2), Wed(3), Thu(4), Fri(5), Sat(6), Sun(0)
const HOURS_DATA = [
  { dayIdx: 1, time: '9:00 – 17:00' },
  { dayIdx: 2, time: '9:00 – 17:00' },
  { dayIdx: 3, time: '9:00 – 17:00' },
  { dayIdx: 4, time: '9:00 – 17:00' },
  { dayIdx: 5, time: '9:00 – 17:00' },
  { dayIdx: 6, time: '10:00 – 16:00' },
  { dayIdx: 0, closed: true },
]

const socials = [
  { Icon: FaInstagram, label: 'Instagram', handle: '@elitecustoms.lv',  href: 'https://www.instagram.com/elitecustoms.lv/' },
  { Icon: FaTiktok,    label: 'TikTok',    handle: '@elitecustoms.lv',  href: 'https://www.tiktok.com/@elitecustoms.lv'   },
  { Icon: FaFacebook,  label: 'Facebook',  handle: 'Elite Customs',     href: 'https://www.facebook.com/p/Elitecustomslv-61560396632713/' },
]

const MAP_URL   = 'https://maps.google.com/maps?q=56.713314249393434,23.83375557771488&t=k&z=15&output=embed'
const MAPS_LINK = 'https://maps.google.com/maps?q=56.713314249393434,23.83375557771488'

function isShopOpen() {
  const now  = new Date()
  const day  = now.getDay()
  const mins = now.getHours() * 60 + now.getMinutes()
  if (day === 0) return false
  if (day === 6) return mins >= 600 && mins < 960
  return mins >= 540 && mins < 1020
}

export default function ContactSection() {
  const { t } = useLanguage()
  const open       = isShopOpen()
  const todayIdx   = new Date().getDay()

  return (
    <section id="contact" className="relative overflow-hidden" style={{ background: '#0A0A0A' }}>

      <img
        src="/assets/bmw.webp"
        loading="lazy"
        width="1920"
        height="1080"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        style={{ opacity: 0.18, imageRendering: '-webkit-optimize-contrast' }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.7) 55%, rgba(10,10,10,0.98) 100%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">

        {/* Section header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <p className="font-heading text-ec-gold mb-3" style={{ fontSize: '10px', letterSpacing: '0.45em', fontWeight: 800 }}>
            {t.contact.tag}
          </p>
          <h2 className="font-display text-ec-white gold-line" style={{ fontSize: 'clamp(42px, 6vw, 80px)', letterSpacing: '0.04em' }}>
            {t.contact.heading}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-10 xl:gap-14">

          {/* LEFT: Google Maps */}
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <p className="font-heading text-ec-gold" style={{ fontSize: '10px', letterSpacing: '0.4em', fontWeight: 800 }}>
              {t.contact.locationTag}
            </p>

            <div
              className="relative w-full overflow-hidden"
              style={{ border: '1px solid rgba(201,168,76,0.3)', height: '480px' }}
            >
              <iframe
                title="Elite Customs atrašanās vieta"
                src={MAP_URL}
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-ec-gold pointer-events-none" />
              <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-ec-gold pointer-events-none" />
              <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-ec-gold pointer-events-none" />
              <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-ec-gold pointer-events-none" />
            </div>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=56.713314249393434,23.83375557771488"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 py-4 font-heading text-ec-black bg-ec-gold hover:bg-ec-gold-dim transition-colors duration-300"
              style={{ fontSize: '11px', letterSpacing: '0.25em', fontWeight: 800 }}
            >
              <FaMapMarkerAlt style={{ fontSize: '12px' }} />
              {t.contact.directionsBtn}
            </a>

            <div className="flex items-start justify-between gap-4 pt-1">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-ec-gold mt-0.5 flex-shrink-0" style={{ fontSize: '14px' }} />
                <span className="font-body text-ec-muted" style={{ fontSize: '12px', fontWeight: 400, lineHeight: 1.6 }}>
                  {t.contact.address.split('\n').map((line, i) => (
                    <span key={i}>{line}{i === 0 && <br />}</span>
                  ))}
                </span>
              </div>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-ec-gold hover:text-ec-white transition-colors duration-300 flex-shrink-0"
                style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em' }}
              >
                <span className="font-heading">{t.contact.openInMaps}</span>
                <FaExternalLinkAlt style={{ fontSize: '9px' }} />
              </a>
            </div>
          </motion.div>

          {/* RIGHT: Hours + Contact + Socials */}
          <motion.div
            className="flex flex-col gap-12"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          >

            {/* Working hours */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <p className="font-heading text-ec-gold" style={{ fontSize: '10px', letterSpacing: '0.4em', fontWeight: 800 }}>
                  {t.contact.hoursTag}
                </p>
                <span
                  className="flex items-center gap-1.5"
                  style={{
                    border: open ? '1px solid rgba(74,222,128,0.35)' : '1px solid rgba(248,113,113,0.35)',
                    padding: '3px 10px',
                  }}
                >
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: open ? '#4ade80' : '#f87171', flexShrink: 0 }} />
                  <span className="font-heading" style={{ fontSize: '8px', letterSpacing: '0.25em', fontWeight: 800, color: open ? '#4ade80' : '#f87171' }}>
                    {open ? t.contact.openLabel : t.contact.closedLabel}
                  </span>
                </span>
              </div>

              <div className="flex flex-col">
                {HOURS_DATA.map((h) => {
                  const isToday  = h.dayIdx === todayIdx
                  const dayName  = t.contact.days[h.dayIdx]
                  const timeText = h.closed ? t.contact.closedDay : h.time
                  return (
                    <div
                      key={h.dayIdx}
                      className="flex items-center justify-between py-3"
                      style={{
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                        background:   isToday ? 'rgba(201,168,76,0.05)' : 'transparent',
                        paddingLeft:  isToday ? '12px' : '0',
                        borderLeft:   isToday ? '2px solid #C9A84C' : '2px solid transparent',
                      }}
                    >
                      <span
                        className="font-heading"
                        style={{
                          fontSize: '12px',
                          letterSpacing: '0.04em',
                          color: isToday ? '#C9A84C' : 'rgba(245,245,240,0.7)',
                          fontWeight: isToday ? 800 : 600,
                        }}
                      >
                        {dayName}
                        {isToday && (
                          <span className="ml-2" style={{ fontSize: '8px', letterSpacing: '0.25em', color: '#C9A84C', opacity: 0.8, fontWeight: 800 }}>
                            {t.contact.todayLabel}
                          </span>
                        )}
                      </span>
                      <span
                        className="font-heading"
                        style={{
                          fontSize: '12px',
                          letterSpacing: '0.06em',
                          color: h.closed ? 'rgba(245,245,240,0.22)' : isToday ? '#C9A84C' : 'rgba(245,245,240,0.9)',
                          fontWeight: isToday ? 800 : 600,
                        }}
                      >
                        {timeText}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Contact details */}
            <div>
              <p className="font-heading text-ec-gold mb-6" style={{ fontSize: '10px', letterSpacing: '0.4em', fontWeight: 800 }}>
                {t.contact.contactTag}
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { href: 'https://wa.me/37122332628', Icon: FaWhatsapp, label: 'WhatsApp', sub: '+371 22332628' },
                  { href: 'mailto:elitecustomslv@gmail.com', Icon: FaEnvelope, label: 'E-pasts', sub: 'elitecustomslv@gmail.com' },
                ].map(({ href, Icon, label, sub }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group flex items-center gap-5 py-4 px-5 transition-all duration-300"
                    style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'; e.currentTarget.style.background = 'rgba(201,168,76,0.04)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
                  >
                    <Icon className="flex-shrink-0 text-ec-muted group-hover:text-ec-gold transition-colors duration-300" style={{ fontSize: '18px' }} />
                    <div className="flex flex-col">
                      <span className="font-heading text-ec-white group-hover:text-ec-gold transition-colors duration-300" style={{ fontSize: '12px', letterSpacing: '0.1em', fontWeight: 700 }}>{label}</span>
                      <span className="font-body text-ec-muted" style={{ fontSize: '11px', fontWeight: 400 }}>{sub}</span>
                    </div>
                    <span className="ml-auto font-heading text-ec-muted group-hover:text-ec-gold transition-all duration-300 group-hover:translate-x-1" style={{ fontSize: '15px', fontWeight: 700 }}>→</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div>
              <p className="font-heading text-ec-gold mb-6" style={{ fontSize: '10px', letterSpacing: '0.4em', fontWeight: 800 }}>
                {t.contact.socialsTag}
              </p>
              <div className="flex flex-col gap-3">
                {socials.map(({ Icon, label, handle, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-5 py-4 px-5 transition-all duration-300"
                    style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'; e.currentTarget.style.background = 'rgba(201,168,76,0.04)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
                  >
                    <Icon className="flex-shrink-0 text-ec-muted group-hover:text-ec-gold transition-colors duration-300" style={{ fontSize: '18px' }} />
                    <div className="flex flex-col">
                      <span className="font-heading text-ec-white group-hover:text-ec-gold transition-colors duration-300" style={{ fontSize: '12px', letterSpacing: '0.1em', fontWeight: 700 }}>{label}</span>
                      <span className="font-body text-ec-muted" style={{ fontSize: '11px', fontWeight: 400 }}>{handle}</span>
                    </div>
                    <span className="ml-auto font-heading text-ec-muted group-hover:text-ec-gold transition-all duration-300 group-hover:translate-x-1" style={{ fontSize: '15px', fontWeight: 700 }}>→</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer strip */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-6 pb-10 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '32px' }}
      >
        <span className="font-display text-ec-white/25" style={{ fontSize: '18px', letterSpacing: '0.3em' }}>
          ELITE CUSTOMS
        </span>
        <span className="font-body text-ec-muted" style={{ fontSize: '11px', fontWeight: 400 }}>
          © {new Date().getFullYear()} Elite Customs. {t.contact.copyright}
        </span>
      </div>
    </section>
  )
}
