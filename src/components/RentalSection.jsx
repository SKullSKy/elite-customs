import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { store } from '../admin/services/store'

const EASE = [0.16, 1, 0.3, 1]
// Exterior walkaround (clockwise: front-left → front → front-right → rear-right → rear → rear-left → left side), then interior
const VAN_IMAGES = [2, 1, 8, 17, 10, 9, 6, 7, 21, 18, 5, 4, 3, 11, 13, 20, 14, 16, 15, 19, 12].map(n => `/assets/van-${n}.webp`)
const CLEANING_FEE = 50
const KM_SHORT_THRESHOLD = 6   // 1–6 days → 150 km/day; 7+ days → 100 km/day
const KM_SHORT = 150
const KM_LONG  = 100
const DEPOSIT_STANDARD = 500
const DEPOSIT_REPEAT   = 300

// Flat-rate tiers: total days determines the rate for ALL days in the booking
const TIERS = [
  { maxDays: 1,        rate: 130 },
  { maxDays: 3,        rate: 125 },
  { maxDays: 6,        rate: 120 },
  { maxDays: 13,       rate: 115 },
  { maxDays: 29,       rate: 105 },
  { maxDays: Infinity, rate: 90  },
]

function getRate(days) {
  return TIERS.find(t => days <= t.maxDays)?.rate ?? 90
}

function tierRangeLabel(i, daysLabel) {
  const from = i === 0 ? 1 : TIERS[i - 1].maxDays + 1
  const to   = TIERS[i].maxDays
  if (to === Infinity) return `${from}+ ${daysLabel}`
  if (from === to)     return `${from} ${daysLabel}`
  return `${from}–${to} ${daysLabel}`
}

function dateKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function getMonthGrid(year, month) {
  const firstDay = new Date(year, month, 1)
  const lastDate = new Date(year, month + 1, 0).getDate()
  let startPad = firstDay.getDay() - 1
  if (startPad < 0) startPad = 6
  const cells = []
  for (let i = 0; i < startPad; i++) cells.push(null)
  for (let d = 1; d <= lastDate; d++) cells.push(new Date(year, month, d))
  return cells
}

export default function RentalSection() {
  const { t } = useLanguage()
  const tr = t.rental
  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  const [bookedDates, setBookedDates] = useState(new Set())
  useEffect(() => {
    const fetch = () => store.getBookedDates().then(setBookedDates).catch(() => {})
    fetch()
    const onVisible = () => { if (!document.hidden) fetch() }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [])

  const [imgIdx,    setImgIdx]    = useState(0)
  const [calYear,   setCalYear]   = useState(today.getFullYear())
  const [calMonth,  setCalMonth]  = useState(today.getMonth())
  const [selected,  setSelected]  = useState(new Set())

  const grid = useMemo(() => getMonthGrid(calYear, calMonth), [calYear, calMonth])

  function prevMonth() {
    if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11) }
    else setCalMonth(m => m - 1)
  }
  function nextMonth() {
    if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0) }
    else setCalMonth(m => m + 1)
  }

  function toggleDate(date) {
    if (!date || date < today) return
    const key = dateKey(date)
    if (bookedDates.has(key)) return
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const n           = selected.size
  const rate        = n > 0 ? getRate(n) : 0
  const baseTotal   = n * rate
  const cleaningFee = n > 0 && n <= KM_SHORT_THRESHOLD ? CLEANING_FEE : 0
  const total       = baseTotal + cleaningFee
  const isLongTerm  = n > KM_SHORT_THRESHOLD
  const sortedDates = [...selected].sort()

  const waText = sortedDates.length
    ? encodeURIComponent(
        `Sveiki! Es vēlos rezervēt minibusu:\n` +
        `Datumi: ${sortedDates.join(', ')}\n` +
        `${n} dienas × €${rate} = €${baseTotal}\n` +
        (cleaningFee > 0 ? `Tīrīšana: €${CLEANING_FEE}\n` : 'Tīrīšana: iekļauta\n') +
        `Depozīts: €${DEPOSIT_STANDARD}\n` +
        `Kopā: €${total}`
      )
    : ''

  return (
    <section id="noma" className="relative py-28 px-6 overflow-hidden" style={{ background: '#080808' }}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <p className="font-heading text-ec-gold mb-3" style={{ fontSize: '10px', letterSpacing: '0.45em', fontWeight: 800 }}>
            {tr.tag}
          </p>
          <h2 className="font-display text-ec-white gold-line" style={{ fontSize: 'clamp(42px, 6vw, 80px)', letterSpacing: '0.04em' }}>
            {tr.heading}
          </h2>
          <p className="font-body text-ec-white mt-6 max-w-2xl leading-relaxed" style={{ fontSize: '18px', fontWeight: 400, lineHeight: '1.75' }}>
            {tr.body}
          </p>
        </motion.div>

        {/* Gallery + Booking */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            {/* Main photo */}
            <div className="relative overflow-hidden" style={{ height: 'min(80vh, 860px)', border: '1px solid rgba(255,255,255,0.07)', background: '#0A0A0A' }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={imgIdx}
                  src={VAN_IMAGES[imgIdx]}
                  alt={`Van ${imgIdx + 1}`}
                  className="w-full h-full"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28 }}
                />
              </AnimatePresence>

              <button
                onClick={() => setImgIdx(i => (i - 1 + VAN_IMAGES.length) % VAN_IMAGES.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center"
                style={{ width: 38, height: 38, background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(201,168,76,0.35)' }}
              >
                <ChevronLeft size={18} style={{ color: '#C9A84C' }} />
              </button>
              <button
                onClick={() => setImgIdx(i => (i + 1) % VAN_IMAGES.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center"
                style={{ width: 38, height: 38, background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(201,168,76,0.35)' }}
              >
                <ChevronRight size={18} style={{ color: '#C9A84C' }} />
              </button>

              <div
                className="absolute bottom-3 right-3 font-heading"
                style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.7)', background: 'rgba(0,0,0,0.55)', padding: '4px 10px', border: '1px solid rgba(201,168,76,0.2)' }}
              >
                {imgIdx + 1} / {VAN_IMAGES.length}
              </div>
            </div>

            {/* Thumbnails */}
            <style>{`
              .van-thumbs::-webkit-scrollbar { height: 3px; }
              .van-thumbs::-webkit-scrollbar-track { background: rgba(255,255,255,0.04); }
              .van-thumbs::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.45); border-radius: 2px; }
            `}</style>
            <div className="van-thumbs flex gap-2 mt-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(201,168,76,0.45) rgba(255,255,255,0.04)' }}>
              {VAN_IMAGES.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className="flex-shrink-0 overflow-hidden"
                  style={{
                    width: 80,
                    height: 60,
                    background: '#0A0A0A',
                    border: i === imgIdx ? '1.5px solid #C9A84C' : '1.5px solid rgba(255,255,255,0.07)',
                    opacity: i === imgIdx ? 1 : 0.55,
                    transition: 'border-color 0.2s, opacity 0.2s',
                  }}
                >
                  <img src={src} alt="" loading="lazy" className="w-full h-full" style={{ objectFit: 'contain', objectPosition: 'center' }} />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Booking panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.1 }}
            style={{ border: '1px solid rgba(201,168,76,0.2)', background: '#0D0D0D' }}
          >

            {/* ── Vehicle header — centered ─────────────────────── */}
            <div className="text-center px-6 pt-8 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="font-display text-ec-white mb-3" style={{ fontSize: '20px', letterSpacing: '0.1em', lineHeight: 1.2 }}>
                {tr.vehicleName}
              </p>
              <div className="flex items-center justify-center flex-wrap gap-1 mb-4">
                {tr.vehicleSpecs.map((spec, i) => (
                  <span key={spec} className="flex items-center">
                    <span className="font-heading text-ec-white" style={{ fontSize: '11px', letterSpacing: '0.15em', fontWeight: 700 }}>{spec}</span>
                    {i < tr.vehicleSpecs.length - 1 && (
                      <span className="mx-2" style={{ color: 'rgba(201,168,76,0.3)', fontSize: '12px' }}>·</span>
                    )}
                  </span>
                ))}
              </div>
              <div className="inline-flex items-center px-4 py-2" style={{ border: '1px solid rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.05)' }}>
                <span className="font-heading text-ec-gold" style={{ fontSize: '12px', letterSpacing: '0.18em', fontWeight: 800 }}>
                  {tr.rateRange}
                </span>
              </div>
            </div>

            {/* ── Month nav ────────────────────────────────────── */}
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <button
                onClick={prevMonth}
                className="flex items-center justify-center"
                style={{ width: 36, height: 36, border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}
              >
                <ChevronLeft size={16} />
              </button>
              <span className="font-heading text-ec-white" style={{ fontSize: '13px', letterSpacing: '0.28em', fontWeight: 800 }}>
                {tr.months[calMonth]} {calYear}
              </span>
              <button
                onClick={nextMonth}
                className="flex items-center justify-center"
                style={{ width: 36, height: 36, border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Week day headers */}
            <div className="grid grid-cols-7 px-5 pt-5 pb-2">
              {tr.weekDays.map(d => (
                <div key={d} className="font-heading text-center" style={{ fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(201,168,76,0.5)', fontWeight: 800 }}>
                  {d}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 px-5 pb-6" style={{ gap: '3px' }}>
              {grid.map((date, idx) => {
                if (!date) return <div key={idx} />
                const isPast    = date < today
                const key       = dateKey(date)
                const isSel     = selected.has(key)
                const isToday   = date.getTime() === today.getTime()
                const isBooked  = bookedDates.has(key)
                const disabled  = isPast || isBooked
                return (
                  <button
                    key={idx}
                    onClick={() => toggleDate(date)}
                    disabled={disabled}
                    className="flex items-center justify-center font-body relative"
                    style={{
                      height: 40,
                      fontSize: '14px',
                      fontWeight: isSel ? 700 : 400,
                      color: disabled ? 'rgba(255,255,255,0.18)' : isSel ? '#0A0A0A' : isToday ? '#C9A84C' : '#F5F5F0',
                      background: isBooked ? 'rgba(200,60,60,0.08)' : isSel ? '#C9A84C' : isToday && !isSel ? 'rgba(201,168,76,0.07)' : 'transparent',
                      border: isBooked ? '1px solid rgba(200,60,60,0.18)' : isToday && !isSel ? '1px solid rgba(201,168,76,0.35)' : '1px solid transparent',
                      cursor: disabled ? 'default' : 'pointer',
                      transition: 'background 0.15s, color 0.15s',
                      textDecoration: isBooked ? 'line-through' : 'none',
                    }}
                  >
                    {date.getDate()}
                  </button>
                )
              })}
            </div>

            {/* ── Pricing tiers ───────────────────────────────── */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="font-heading text-ec-gold px-6 pt-5 pb-3" style={{ fontSize: '14px', letterSpacing: '0.28em', fontWeight: 800 }}>
                {tr.priceTableLabel}
              </p>
              {TIERS.map((tier, i) => {
                const isActive = n > 0 && tier.rate === rate
                return (
                  <div
                    key={i}
                    className="flex justify-between items-center px-6 py-3"
                    style={{
                      background: isActive ? 'rgba(201,168,76,0.09)' : 'transparent',
                      borderLeft: isActive ? '3px solid #C9A84C' : '3px solid transparent',
                    }}
                  >
                    <span className="font-body" style={{ fontSize: '14px', color: isActive ? '#F5F5F0' : '#F5F5F0' }}>
                      {tierRangeLabel(i, tr.daysLabel)}
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-heading" style={{ fontSize: '19px', fontWeight: 800, letterSpacing: '0.02em', color: isActive ? '#C9A84C' : 'rgba(245,245,240,0.75)' }}>
                        €{tier.rate}
                      </span>
                      <span className="font-body" style={{ fontSize: '11px', color: isActive ? 'rgba(201,168,76,0.65)' : 'rgba(245,245,240,0.55)' }}>
                        {tr.ratePerDay}
                      </span>
                    </div>
                  </div>
                )
              })}
              <p className="font-body text-ec-white px-6 pt-2 pb-5" style={{ fontSize: '11px', lineHeight: 1.6 }}>
                + €{CLEANING_FEE} {tr.cleaningLabel} ({tr.cleaningFree.toLowerCase()})
              </p>
            </div>

            {/* ── KM policy ────────────────────────────────────── */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="font-heading text-ec-gold px-6 pt-5 pb-3" style={{ fontSize: '14px', letterSpacing: '0.28em', fontWeight: 800 }}>
                {tr.kmPolicyLabel}
              </p>
              {[
                { label: tr.kmShortLabel, km: KM_SHORT, active: !isLongTerm },
                { label: tr.kmLongLabel,  km: KM_LONG,  active: isLongTerm  },
              ].map(({ label, km, active }) => {
                const on = active && n > 0
                return (
                  <div
                    key={label}
                    className="flex justify-between items-center px-6 py-3"
                    style={{
                      background: on ? 'rgba(201,168,76,0.09)' : 'transparent',
                      borderLeft: on ? '3px solid #C9A84C' : '3px solid transparent',
                    }}
                  >
                    <span className="font-body" style={{ fontSize: '14px', color: on ? '#F5F5F0' : '#F5F5F0' }}>
                      {label}
                    </span>
                    <span className="font-heading" style={{ fontSize: '19px', fontWeight: 800, letterSpacing: '0.02em', color: on ? '#C9A84C' : 'rgba(245,245,240,0.75)' }}>
                      {km} km
                    </span>
                  </div>
                )
              })}
              <div className="flex justify-between items-center px-6 py-3">
                <span className="font-body text-ec-white" style={{ fontSize: '14px' }}>{tr.unlimitedKm}</span>
                <span className="font-heading text-ec-white" style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '0.02em' }}>{tr.unlimitedKmRate}</span>
              </div>
              <p className="font-body text-ec-white px-6 pb-5" style={{ fontSize: '11px', lineHeight: 1.6 }}>
                * {tr.kmExtra}
              </p>
            </div>

            {/* ── Security deposit ─────────────────────────────── */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="font-heading text-ec-gold px-6 pt-5 pb-3" style={{ fontSize: '14px', letterSpacing: '0.28em', fontWeight: 800 }}>
                {tr.depositLabel}
              </p>
              <div className="px-6 pb-5 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="font-body text-ec-white" style={{ fontSize: '13px' }}>
                    {tr.depositStandard.split('—')[1]?.trim() ?? tr.depositStandard}
                  </span>
                  <span className="font-heading text-ec-white" style={{ fontSize: '17px', fontWeight: 800, letterSpacing: '0.04em' }}>
                    €{DEPOSIT_STANDARD}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-body text-ec-white" style={{ fontSize: '13px' }}>
                    {tr.depositRepeat.split('—')[1]?.trim() ?? tr.depositRepeat}
                  </span>
                  <span className="font-heading text-ec-gold" style={{ fontSize: '17px', fontWeight: 800, letterSpacing: '0.04em' }}>
                    €{DEPOSIT_REPEAT}
                  </span>
                </div>
              </div>
            </div>

            {/* ── Price summary ────────────────────────────────── */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '24px' }}>
              {n > 0 ? (
                <div className="flex flex-col gap-3 mb-6 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="flex justify-between items-center">
                    <span className="font-body text-ec-white" style={{ fontSize: '14px' }}>
                      {n} {tr.daysLabel} × €{rate}
                    </span>
                    <span className="font-heading text-ec-white" style={{ fontSize: '16px', fontWeight: 700 }}>
                      €{baseTotal}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-body text-ec-white" style={{ fontSize: '13px' }}>
                      {tr.cleaningLabel}
                    </span>
                    <span
                      className="font-heading"
                      style={{ fontSize: '16px', fontWeight: 700, color: cleaningFee > 0 ? '#F5F5F0' : '#4ade80' }}
                    >
                      {cleaningFee > 0 ? `€${cleaningFee}` : tr.cleaningFree}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="font-body text-ec-white mb-6 text-center" style={{ fontSize: '13px', letterSpacing: '0.04em' }}>
                  {tr.noSelection}
                </p>
              )}

              {/* Total — centered hero */}
              <div className="text-center mb-6">
                <p className="font-heading text-ec-white mb-2" style={{ fontSize: '14px', letterSpacing: '0.28em', fontWeight: 800 }}>
                  {tr.totalLabel}
                </p>
                <motion.div
                  key={total}
                  initial={{ opacity: 0.4, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="inline-flex items-end justify-center gap-1"
                >
                  <span className="font-heading text-ec-white" style={{ fontSize: '64px', fontWeight: 800, lineHeight: 1 }}>
                    {total}
                  </span>
                  <span className="font-heading text-ec-gold" style={{ fontSize: '30px', fontWeight: 700, lineHeight: 1, marginBottom: '7px' }}>
                    €
                  </span>
                </motion.div>
              </div>

              <a
                href={n > 0 ? `https://wa.me/37122332628?text=${waText}` : undefined}
                onClick={n === 0 ? e => e.preventDefault() : undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center font-heading"
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.32em',
                  fontWeight: 800,
                  padding: '18px',
                  background: n > 0 ? '#C9A84C' : 'rgba(201,168,76,0.07)',
                  color: n > 0 ? '#0A0A0A' : 'rgba(201,168,76,0.22)',
                  cursor: n > 0 ? 'pointer' : 'default',
                  transition: 'background 0.3s, color 0.3s',
                }}
              >
                {tr.bookBtn}
              </a>
            </div>
          </motion.div>
        </div>

        {/* VAT note */}
        <p
          className="font-body text-ec-white mt-10"
          style={{ fontSize: '11px', letterSpacing: '0.04em', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px' }}
        >
          {tr.vatNote}
        </p>
      </div>
    </section>
  )
}
