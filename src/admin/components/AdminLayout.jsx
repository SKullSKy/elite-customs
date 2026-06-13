import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { store } from '../services/store'

const NAV = [
  { to: '/admin/dashboard', label: 'PĀRSKATS',    icon: '⊞' },
  { to: '/admin/listings',  label: 'SLUDINĀJUMI', icon: '◈' },
  { to: '/admin/rental',    label: 'NOMA',        icon: '◉' },
  { to: '/admin/prices',    label: 'CENAS',       icon: '◧' },
  { to: '/admin/settings',  label: 'IESTATĪJUMI', icon: '◎' },
]

const SIDEBAR = 220

export default function AdminLayout() {
  const navigate = useNavigate()

  const logout = () => {
    store.logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="flex min-h-screen" style={{ background: '#0A0A0A' }}>

      {/* Sidebar */}
      <aside
        className="flex flex-col flex-shrink-0"
        style={{
          width: SIDEBAR,
          background: '#080808',
          borderRight: '1px solid rgba(255,255,255,0.04)',
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
        }}
      >
        {/* Brand */}
        <div
          className="px-6 py-7"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
        >
          <p
            className="font-heading text-ec-gold"
            style={{ fontSize: '11px', letterSpacing: '0.4em', fontWeight: 800, lineHeight: 1 }}
          >
            ELITE CUSTOMS
          </p>
          <p
            className="font-heading mt-1"
            style={{ fontSize: '8px', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.2)', fontWeight: 700 }}
          >
            ADMIN
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4">
          {NAV.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className="flex items-center gap-3 px-6 py-3 font-heading transition-colors duration-150"
              style={({ isActive }) => ({
                fontSize: '9px',
                letterSpacing: '0.3em',
                fontWeight: 800,
                color: isActive ? '#C9A84C' : 'rgba(255,255,255,0.3)',
                background: isActive ? 'rgba(201,168,76,0.05)' : 'transparent',
                borderLeft: isActive ? '2px solid #C9A84C' : '2px solid transparent',
              })}
            >
              <span style={{ fontSize: '14px', opacity: 0.7 }}>{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', padding: '16px 24px' }}>
          <button
            onClick={logout}
            className="font-heading w-full text-left transition-colors duration-150"
            style={{
              fontSize: '9px',
              letterSpacing: '0.3em',
              fontWeight: 800,
              color: 'rgba(255,255,255,0.18)',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(220,60,60,0.7)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.18)'}
          >
            ← IZIET
          </button>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading block mt-3 transition-colors duration-150"
            style={{
              fontSize: '9px',
              letterSpacing: '0.3em',
              fontWeight: 800,
              color: 'rgba(255,255,255,0.18)',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(201,168,76,0.6)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.18)'}
          >
            ↗ VIETNE
          </a>
        </div>
      </aside>

      {/* Main */}
      <main
        className="flex-1 min-h-screen"
        style={{ marginLeft: SIDEBAR, padding: '40px 44px' }}
      >
        <Outlet />
      </main>
    </div>
  )
}
