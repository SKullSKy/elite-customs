import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { store } from '../services/store'

export function PageHeader({ title, sub }) {
  return (
    <div className="mb-10" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 24 }}>
      <p className="font-heading text-ec-gold mb-1" style={{ fontSize: '9px', letterSpacing: '0.45em', fontWeight: 800 }}>
        ELITE CUSTOMS
      </p>
      <h1 className="font-display text-ec-white" style={{ fontSize: '32px', letterSpacing: '0.04em', lineHeight: 1 }}>
        {title}
      </h1>
      {sub && <p className="font-body mt-2" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.28)' }}>{sub}</p>}
    </div>
  )
}

export function SectionLabel({ children }) {
  return (
    <p className="font-heading" style={{ fontSize: '9px', letterSpacing: '0.4em', fontWeight: 800, color: 'rgba(255,255,255,0.28)' }}>
      {children}
    </p>
  )
}

export function Spinner() {
  return (
    <div style={{ padding: '60px 0', textAlign: 'center' }}>
      <p className="font-heading" style={{ fontSize: '9px', letterSpacing: '0.4em', color: 'rgba(255,255,255,0.18)', fontWeight: 800 }}>
        IELĀDĒ...
      </p>
    </div>
  )
}

function StatCard({ label, value, sub, to }) {
  return (
    <Link
      to={to}
      style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.04)', padding: '28px 32px', textDecoration: 'none', display: 'block' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.18)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'}
    >
      <p className="font-heading text-ec-gold mb-3" style={{ fontSize: '8px', letterSpacing: '0.4em', fontWeight: 800 }}>
        {label}
      </p>
      <p className="font-display text-ec-white" style={{ fontSize: '42px', letterSpacing: '0.02em', lineHeight: 1 }}>
        {value}
      </p>
      {sub && <p className="font-body mt-2" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.28)' }}>{sub}</p>}
    </Link>
  )
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    Promise.all([store.getListings(), store.getBookings()])
      .then(([listings, bookings]) => {
        setStats({
          total:    listings.length,
          cars:     listings.filter(l => l.type === 'car').length,
          wheels:   listings.filter(l => l.type === 'wheel').length,
          active:   listings.filter(l => l.active).length,
          bookings: bookings.length,
        })
      })
      .catch(() => setStats({ total: 0, cars: 0, wheels: 0, active: 0, bookings: 0 }))
  }, [])

  return (
    <div>
      <PageHeader title="PĀRSKATS" sub="Elite Customs administrācijas panelis" />

      {!stats ? <Spinner /> : (
        <div className="grid gap-4 mb-10" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          <StatCard label="KOPĀ SLUDINĀJUMI" value={stats.total}    sub={`${stats.cars} auto · ${stats.wheels} diski`} to="/admin/listings" />
          <StatCard label="AKTĪVIE"           value={stats.active}   sub="redzami vietnē"                               to="/admin/listings" />
          <StatCard label="REZERVĀCIJAS"      value={stats.bookings} sub="furgona noma"                                 to="/admin/rental"   />
          <StatCard label="PAKALPOJUMI"        value="3"             sub="sekcijas ar cenrādi"                          to="/admin/prices"   />
        </div>
      )}

      <SectionLabel>ĀTRĀS SAITES</SectionLabel>
      <div className="grid gap-3 mt-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
        {[
          { to: '/admin/listings', label: 'Pievienot sludinājumu', icon: '+' },
          { to: '/admin/rental',   label: 'Pievienot rezervāciju', icon: '◉' },
          { to: '/admin/prices',   label: 'Labot cenas',           icon: '✎' },
          { to: '/admin/settings', label: 'Uzņēmuma info',         icon: '◎' },
        ].map(({ to, label, icon }) => (
          <Link
            key={to}
            to={to}
            style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.04)', padding: '16px 20px', textDecoration: 'none', color: 'rgba(255,255,255,0.45)', fontSize: '11px', display: 'flex', alignItems: 'center', gap: 12 }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.18)'; e.currentTarget.style.color = '#C9A84C' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)' }}
          >
            <span style={{ fontSize: '16px', color: '#C9A84C', opacity: 0.6 }}>{icon}</span>
            <span className="font-body">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
