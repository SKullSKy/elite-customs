import { motion } from 'framer-motion'
import PageLayout from '../components/PageLayout'
import { useLanguage } from '../context/LanguageContext'

const EASE = [0.16, 1, 0.3, 1]

export default function PolishingPage() {
  const { t } = useLanguage()
  const tp = t.polishing

  return (
    <PageLayout>
      <section className="relative overflow-hidden py-28 px-6" style={{ background: '#0E0E0E' }}>
        <div className="relative z-10 max-w-4xl mx-auto">

          {/* Header */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE }}
          >
            <p className="font-heading text-ec-gold mb-3" style={{ fontSize: '10px', letterSpacing: '0.45em', fontWeight: 800 }}>
              {tp.tag}
            </p>
            <h2 className="font-display text-ec-white gold-line" style={{ fontSize: 'clamp(42px, 6vw, 80px)', letterSpacing: '0.04em' }}>
              {tp.heading}
            </h2>
            <p className="font-body text-ec-white mt-6 max-w-2xl leading-relaxed" style={{ fontSize: '18px', fontWeight: 400, lineHeight: '1.75' }}>
              {tp.body}
            </p>
          </motion.div>

          {/* Service cards */}
          <div className="flex flex-col gap-4 mb-12">
            {tp.depths.map((depth, i) => (
              <motion.div
                key={depth.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.1 }}
                style={{
                  background: depth.featured ? 'rgba(201,168,76,0.06)' : 'rgba(255,255,255,0.02)',
                  border: depth.featured ? '1px solid rgba(201,168,76,0.35)' : '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '4px',
                  padding: '24px 28px',
                }}
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    {depth.featured && (
                      <span
                        className="font-heading inline-block mb-2"
                        style={{ fontSize: '9px', letterSpacing: '0.35em', color: '#C9A84C', fontWeight: 800 }}
                      >
                        {tp.recommended}
                      </span>
                    )}
                    <h3
                      className="font-heading text-ec-white"
                      style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '0.04em' }}
                    >
                      {depth.name}
                    </h3>
                    <p className="font-body text-ec-muted mt-1" style={{ fontSize: '12px', letterSpacing: '0.08em' }}>
                      {depth.sub}
                    </p>
                  </div>
                </div>
                <p className="font-body mt-3" style={{ fontSize: '14px', color: 'rgba(245,245,240,0.65)', lineHeight: '1.7' }}>
                  {depth.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Individual pricing note */}
          <motion.div
            className="flex items-start gap-3 mb-6"
            style={{
              background: 'rgba(201,168,76,0.07)',
              border: '1px solid rgba(201,168,76,0.22)',
              borderRadius: '4px',
              padding: '16px 20px',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.45 }}
          >
            <span style={{ color: '#C9A84C', fontSize: '16px', marginTop: '1px', flexShrink: 0 }}>ℹ</span>
            <p className="font-body" style={{ color: '#C9A84C', fontSize: '14px', letterSpacing: '0.03em', lineHeight: '1.7' }}>
              {tp.individualNote}
            </p>
          </motion.div>

          {/* VAT note */}
          <p
            className="font-body text-ec-muted"
            style={{ fontSize: '11px', letterSpacing: '0.04em', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px' }}
          >
            {tp.vatNote}
          </p>
        </div>
      </section>
    </PageLayout>
  )
}
