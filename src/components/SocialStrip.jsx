import { motion } from 'framer-motion'
import { FaInstagram, FaTiktok, FaFacebook } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'

const EASE = [0.16, 1, 0.3, 1]

const SOCIALS = [
  {
    Icon: FaInstagram,
    label: 'Instagram',
    handle: '@elitecustoms.lv',
    href: 'https://www.instagram.com/elitecustoms.lv/',
  },
  {
    Icon: FaTiktok,
    label: 'TikTok',
    handle: '@elitecustoms.lv',
    href: 'https://www.tiktok.com/@elitecustoms.lv',
  },
  {
    Icon: FaFacebook,
    label: 'Facebook',
    handle: 'Elite Customs',
    href: 'https://www.facebook.com/p/Elitecustomslv-61560396632713/',
  },
]

const TAGS = {
  LV: 'SEKO MUMS',
  EN: 'FOLLOW US',
  RU: 'ПОДПИСЫВАЙТЕСЬ',
}

export default function SocialStrip() {
  const { lang } = useLanguage()

  return (
    <section
      style={{
        borderTop: '1px solid rgba(201,168,76,0.12)',
        borderBottom: '1px solid rgba(201,168,76,0.12)',
        background: '#080808',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-8">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex items-center gap-4 flex-shrink-0"
        >
          <div className="w-8 h-px" style={{ background: '#C9A84C' }} />
          <p
            className="font-heading text-ec-gold"
            style={{ fontSize: '11px', letterSpacing: '0.45em', fontWeight: 800 }}
          >
            {TAGS[lang] || TAGS.LV}
          </p>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex items-center gap-6 sm:gap-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        >
          {SOCIALS.map(({ Icon, label, handle, href }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.08 }}
              whileHover={{ y: -2 }}
            >
              <div
                className="flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                style={{
                  width: 38,
                  height: 38,
                  border: '1px solid rgba(201,168,76,0.2)',
                  color: 'rgba(201,168,76,0.55)',
                }}
              >
                <Icon size={16} className="group-hover:text-ec-gold transition-colors duration-300" style={{ color: 'inherit' }} />
              </div>
              <div className="hidden sm:block">
                <p
                  className="font-heading text-ec-white group-hover:text-ec-gold transition-colors duration-300"
                  style={{ fontSize: '11px', letterSpacing: '0.18em', fontWeight: 800, lineHeight: 1.2 }}
                >
                  {label.toUpperCase()}
                </p>
                <p
                  className="font-body text-ec-muted"
                  style={{ fontSize: '11px', marginTop: '2px' }}
                >
                  {handle}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Right hairline */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="hidden sm:flex items-center gap-4 flex-shrink-0"
        >
          <p
            className="font-heading text-ec-muted"
            style={{ fontSize: '10px', letterSpacing: '0.3em', fontWeight: 700 }}
          >
            #ELITECUSTOMSLV
          </p>
          <div className="w-8 h-px" style={{ background: 'rgba(201,168,76,0.3)' }} />
        </motion.div>

      </div>
    </section>
  )
}
