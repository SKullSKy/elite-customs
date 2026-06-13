import { useState, useEffect } from 'react'
import { store } from '../services/store'
import { PageHeader, SectionLabel, Spinner } from './AdminDashboard'

const LV_MONTHS = ['janv.','febr.','marts','apr.','maijs','jūn.','jūl.','aug.','sept.','okt.','nov.','dec.']

function formatDate(str) {
  if (!str) return '—'
  const d = new Date(str + 'T00:00:00')
  return `${d.getDate()}. ${LV_MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

function diffDays(from, to) {
  return Math.round((new Date(to + 'T00:00:00') - new Date(from + 'T00:00:00')) / 86400000) + 1
}

function DateField({ label, hint, value, min, onChange }) {
  return (
    <div>
      <p style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.55)', marginBottom: 6, letterSpacing: '0.04em' }}>
        {label}
      </p>
      {hint && (
        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', marginBottom: 8 }}>{hint}</p>
      )}
      <input
        type="date"
        value={value}
        min={min}
        onChange={e => onChange(e.target.value)}
        className="w-full font-body text-ec-white outline-none"
        style={{
          background: '#1A1A1A',
          border: '1px solid rgba(255,255,255,0.12)',
          padding: '14px 16px',
          fontSize: '16px',
          colorScheme: 'dark',
          borderRadius: 0,
        }}
        onFocus={e => e.target.style.borderColor = '#C9A84C'}
        onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
      />
    </div>
  )
}

export default function AdminRental() {
  const [bookings, setBookings] = useState(null)
  const [form, setForm]         = useState({ from: '', to: '', name: '' })
  const [error, setError]       = useState('')
  const [adding, setAdding]     = useState(false)

  const reload = () => store.getBookings().then(setBookings)
  useEffect(() => { reload() }, [])

  const cancelBooking = async (id) => {
    if (!window.confirm('Atcelt rezervāciju?')) return
    try { await store.cancelBooking(id); reload() }
    catch (e) { alert('Kļūda: ' + e.message) }
  }

  const addBooking = async () => {
    if (!form.from)            { setError('Izvēlieties sākuma datumu.'); return }
    if (!form.to)              { setError('Izvēlieties beigu datumu.'); return }
    if (form.to < form.from)   { setError('Beigu datums nedrīkst būt pirms sākuma datuma.'); return }
    setError('')
    setAdding(true)
    try {
      await store.addBooking(form)
      await reload()
      setForm({ from: '', to: '', name: '' })
    } catch (e) {
      setError('Kļūda: ' + e.message)
    } finally {
      setAdding(false)
    }
  }

  const today = new Date().toISOString().slice(0, 10)

  // Preview of days selected
  const previewDays = form.from && form.to && form.to >= form.from
    ? diffDays(form.from, form.to)
    : null

  return (
    <div>
      <PageHeader title="NOMA" sub="Furgona rezervāciju pārvaldība" />

      {/* ── Active bookings ── */}
      <SectionLabel>AKTĪVĀS REZERVĀCIJAS</SectionLabel>

      {!bookings ? <Spinner /> : (
        <div style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.06)', marginTop: 16 }}>
          {bookings.length === 0 ? (
            <p className="font-body text-center py-14" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.2)' }}>
              Nav aktīvu rezervāciju
            </p>
          ) : bookings.map((b, i) => {
            const days   = diffDays(b.from, b.to)
            const isPast = b.to < today
            return (
              <div
                key={b.id}
                className="flex items-center justify-between gap-6"
                style={{
                  padding: '20px 28px',
                  borderBottom: i < bookings.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  opacity: isPast ? 0.4 : 1,
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div className="flex-1 min-w-0">
                  {/* Date range — big and clear */}
                  <p className="font-body" style={{ fontSize: '17px', color: '#F5F5F0', lineHeight: 1.5 }}>
                    <span style={{ color: '#C9A84C', fontWeight: 700 }}>{formatDate(b.from)}</span>
                    <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 10px' }}>→</span>
                    <span style={{ color: '#C9A84C', fontWeight: 700 }}>{formatDate(b.to)}</span>
                  </p>

                  {/* Meta row */}
                  <div className="flex items-center gap-5 mt-1 flex-wrap">
                    <span className="font-body" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
                      {days} {days === 1 ? 'diena' : 'dienas'}
                    </span>
                    {b.name && (
                      <span className="font-body" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
                        · {b.name}
                      </span>
                    )}
                    {isPast && (
                      <span className="font-body" style={{ fontSize: '12px', color: 'rgba(200,80,80,0.6)' }}>
                        · pagājusi
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => cancelBooking(b.id)}
                  className="font-body flex-shrink-0"
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    padding: '10px 22px',
                    background: 'transparent',
                    border: '1px solid rgba(220,80,80,0.35)',
                    color: 'rgba(220,80,80,0.6)',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background='rgba(200,60,60,0.12)'; e.currentTarget.style.borderColor='rgba(220,80,80,0.7)'; e.currentTarget.style.color='rgba(220,80,80,1)' }}
                  onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor='rgba(220,80,80,0.35)'; e.currentTarget.style.color='rgba(220,80,80,0.6)' }}
                >
                  Atcelt
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* ── Add booking form ── */}
      <div className="mt-12">
        <SectionLabel>JAUNA REZERVĀCIJA</SectionLabel>
        <p className="font-body mt-1 mb-6" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)' }}>
          Ievadiet datumus, kad furgons ir rezervēts. Šie datumi tiks bloķēti galvenās lapas kalendārā.
        </p>

        <div
          style={{
            background: '#111111',
            border: '1px solid rgba(255,255,255,0.06)',
            padding: '32px',
            maxWidth: 520,
          }}
        >
          <div className="grid gap-6">

            {/* Date pickers side by side */}
            <div className="grid grid-cols-2 gap-5">
              <DateField
                label="Sākuma datums"
                hint="No kura datuma?"
                value={form.from}
                min={today}
                onChange={v => { setForm(f => ({ ...f, from: v, to: f.to && f.to < v ? '' : f.to })); setError('') }}
              />
              <DateField
                label="Beigu datums"
                hint="Līdz kuram datumam?"
                value={form.to}
                min={form.from || today}
                onChange={v => { setForm(f => ({ ...f, to: v })); setError('') }}
              />
            </div>

            {/* Day count preview */}
            {previewDays && (
              <div style={{ background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.2)', padding: '12px 18px' }}>
                <p className="font-body" style={{ fontSize: '14px', color: '#C9A84C' }}>
                  Rezervācija: <strong>{formatDate(form.from)}</strong> → <strong>{formatDate(form.to)}</strong>
                  <span style={{ color: 'rgba(201,168,76,0.6)', marginLeft: 12 }}>({previewDays} {previewDays === 1 ? 'diena' : 'dienas'})</span>
                </p>
              </div>
            )}

            {/* Client name */}
            <div>
              <p style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.55)', marginBottom: 6, letterSpacing: '0.04em' }}>
                Klienta vārds <span style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 400 }}>(neobligāti)</span>
              </p>
              <input
                type="text"
                value={form.name}
                placeholder="Piem. Jānis Bērziņš"
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full font-body text-ec-white outline-none"
                style={{
                  background: '#1A1A1A',
                  border: '1px solid rgba(255,255,255,0.12)',
                  padding: '14px 16px',
                  fontSize: '16px',
                }}
                onFocus={e => e.target.style.borderColor = '#C9A84C'}
                onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
              />
            </div>

            {/* Error */}
            {error && (
              <p className="font-body" style={{ fontSize: '13px', color: 'rgba(220,80,80,0.9)', background: 'rgba(200,60,60,0.08)', padding: '10px 14px', border: '1px solid rgba(200,60,60,0.2)' }}>
                ⚠ {error}
              </p>
            )}

            {/* Submit */}
            <button
              onClick={addBooking}
              disabled={adding}
              className="font-body"
              style={{
                background: adding ? '#1A1A1A' : '#C9A84C',
                color: adding ? 'rgba(255,255,255,0.3)' : '#0A0A0A',
                border: 'none',
                padding: '16px 32px',
                fontSize: '15px',
                fontWeight: 700,
                cursor: adding ? 'default' : 'pointer',
                letterSpacing: '0.04em',
                transition: 'background 0.2s',
                alignSelf: 'flex-start',
              }}
              onMouseEnter={e => { if (!adding) e.currentTarget.style.background = '#DDB85C' }}
              onMouseLeave={e => { if (!adding) e.currentTarget.style.background = '#C9A84C' }}
            >
              {adding ? 'Saglabā...' : '+ Pievienot rezervāciju'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
