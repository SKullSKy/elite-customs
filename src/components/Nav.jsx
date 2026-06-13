import { useState, useEffect, Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const EASE = [0.16, 1, 0.3, 1]
const LANGS = ['LV', 'EN', 'RU']

function NavLink({ label, href, onClick }) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      className="relative font-heading text-xs text-ec-muted"
      style={{ letterSpacing: '0.2em', fontWeight: 700 }}
      whileHover={{ color: '#C9A84C' }}
      transition={{ duration: 0.22, ease: EASE }}
    >
      {label}
      <motion.span
        className="absolute -bottom-0.5 left-0 h-px bg-ec-gold"
        initial={{ scaleX: 0, originX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.28, ease: EASE }}
        style={{ width: '100%' }}
      />
    </motion.a>
  )
}

function LangSwitcher({ mobile }) {
  const { lang, setLang } = useLanguage()

  if (mobile) {
    return (
      <div className="flex items-center justify-center gap-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        {LANGS.map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className="font-heading transition-colors duration-200"
            style={{
              fontSize: '11px',
              letterSpacing: '0.2em',
              fontWeight: 800,
              color: lang === l ? '#C9A84C' : 'rgba(255,255,255,0.35)',
            }}
          >
            {l}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div
      className="flex items-center gap-2"
      style={{ borderLeft: '1px solid rgba(255,255,255,0.12)', paddingLeft: '16px', marginLeft: '8px' }}
    >
      {LANGS.map((l, i) => (
        <Fragment key={l}>
          {i > 0 && (
            <span style={{ color: 'rgba(255,255,255,0.18)', fontSize: '10px', userSelect: 'none' }}>·</span>
          )}
          <button
            onClick={() => setLang(l)}
            className="font-heading transition-colors duration-200"
            style={{
              fontSize: '10px',
              letterSpacing: '0.15em',
              fontWeight: 800,
              color: lang === l ? '#C9A84C' : 'rgba(255,255,255,0.32)',
              padding: '2px 0',
            }}
          >
            {l}
          </button>
        </Fragment>
      ))}
    </div>
  )
}

export default function Nav() {
  const { t } = useLanguage()
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { label: t.nav.home,     href: '#hero'      },
    { label: t.nav.services, href: '#services'  },
    { label: t.nav.sales,    href: '#pardosana' },
    { label: t.nav.contact,  href: '#contact'   },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(10,10,10,0.97)'
          : 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : 'none',
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 h-20 grid grid-cols-3 items-center">
        {/* Left links */}
        <div className="hidden md:flex items-center gap-10">
          {links.slice(0, 2).map((l) => (
            <NavLink key={l.href} {...l} />
          ))}
        </div>

        {/* Centre logo */}
        <div className="col-start-2 flex justify-center">
          <motion.a
            href="#hero"
            className="flex items-baseline"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            <span className="font-script text-ec-gold" style={{ fontSize: '32px', lineHeight: 1 }}>
              Elite
            </span>
            <span className="font-brush text-ec-white" style={{ fontSize: '26px', lineHeight: 1 }}>
              Customs
            </span>
          </motion.a>
        </div>

        {/* Right links + language switcher */}
        <div className="hidden md:flex items-center justify-end gap-10">
          {links.slice(2).map((l) => (
            <NavLink key={l.href} {...l} />
          ))}
          <LangSwitcher />
        </div>

        {/* Mobile hamburger */}
        <motion.button
          className="md:hidden col-start-3 justify-self-end text-ec-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.92 }}
        >
          <div className="flex flex-col gap-1.5">
            <motion.span
              className="block h-px w-6 bg-ec-white origin-center"
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.32, ease: EASE }}
            />
            <motion.span
              className="block h-px w-6 bg-ec-white"
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.22, ease: EASE }}
            />
            <motion.span
              className="block h-px w-6 bg-ec-white origin-center"
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.32, ease: EASE }}
            />
          </div>
        </motion.button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.38, ease: EASE }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(10,10,10,0.98)' }}
          >
            <motion.div
              className="flex flex-col items-center gap-6 py-8 px-6"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
            >
              {links.map((l) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-heading text-sm text-ec-white hover:text-ec-gold transition-colors duration-300"
                  style={{ letterSpacing: '0.2em', fontWeight: 700 }}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
                  }}
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.div
                className="w-full"
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
                }}
              >
                <LangSwitcher mobile />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
