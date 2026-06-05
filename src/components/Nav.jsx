import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

const links = [
  { label: 'HOME',      href: '#hero'     },
  { label: 'MAZGĀŠANA', href: '#washing'  },
  { label: 'DETAILING', href: '#detailing' },
  { label: 'KONTAKTI',  href: '#contact'  },
]

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
      {/* animated gold underline on hover */}
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

export default function Nav() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left links */}
        <div className="hidden md:flex items-center gap-10">
          {links.slice(0, 2).map((l) => (
            <NavLink key={l.href} {...l} />
          ))}
        </div>

        {/* Centre logo */}
        <motion.a
          href="#hero"
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.28, ease: EASE }}
        >
          <span
            className="font-display text-2xl text-ec-white"
            style={{ letterSpacing: '0.35em' }}
          >
            ELITE
          </span>
          <span
            className="font-heading text-xs text-ec-gold"
            style={{ letterSpacing: '0.45em', marginTop: '-2px', fontWeight: 800 }}
          >
            CUSTOMS
          </span>
        </motion.a>

        {/* Right links */}
        <div className="hidden md:flex items-center gap-10">
          {links.slice(2).map((l) => (
            <NavLink key={l.href} {...l} />
          ))}
        </div>

        {/* Mobile hamburger */}
        <motion.button
          className="md:hidden ml-auto text-ec-white"
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
              className="flex flex-col items-center gap-6 py-8"
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
