import { useLanguage } from '../context/LanguageContext'

export default function PageLayout({ children }) {
  const { t } = useLanguage()

  return (
    <div className="bg-ec-black min-h-screen">
      <header
        className="fixed top-0 left-0 w-full z-50"
        style={{ background: 'rgba(10,10,10,0.97)', borderBottom: '1px solid rgba(201,168,76,0.12)' }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="/"
            className="font-heading text-ec-muted hover:text-ec-gold transition-colors duration-300 flex items-center gap-2"
            style={{ fontSize: '11px', letterSpacing: '0.25em', fontWeight: 700 }}
          >
            {t.layout.back}
          </a>

          <a href="/" className="flex items-baseline">
            <span className="font-script text-ec-gold" style={{ fontSize: '28px', lineHeight: 1 }}>Elite</span>
            <span className="font-brush text-ec-white" style={{ fontSize: '22px', lineHeight: 1 }}>Customs</span>
          </a>

          <a
            href="/#contact"
            className="font-heading text-ec-muted hover:text-ec-gold transition-colors duration-300"
            style={{ fontSize: '11px', letterSpacing: '0.25em', fontWeight: 700 }}
          >
            {t.layout.contact}
          </a>
        </div>
      </header>

      <main style={{ paddingTop: '64px' }}>
        {children}
      </main>

      <footer
        className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <span className="font-display text-ec-white/25" style={{ fontSize: '16px', letterSpacing: '0.3em' }}>
          ELITE CUSTOMS
        </span>
        <span className="font-body text-ec-muted" style={{ fontSize: '11px' }}>
          © {new Date().getFullYear()} Elite Customs. {t.layout.copyright}
        </span>
      </footer>
    </div>
  )
}
