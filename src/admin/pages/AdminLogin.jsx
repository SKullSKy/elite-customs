import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { store } from '../services/store'

export default function AdminLogin() {
  const [pw, setPw]       = useState('')
  const [error, setError] = useState(false)
  const navigate          = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    if (store.login(pw)) {
      navigate('/admin/dashboard', { replace: true })
    } else {
      setError(true)
      setPw('')
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: '#080808' }}
    >
      {/* Logo */}
      <div className="mb-10 text-center">
        <p
          className="font-heading text-ec-gold mb-1"
          style={{ fontSize: '10px', letterSpacing: '0.5em', fontWeight: 800 }}
        >
          ELITE CUSTOMS
        </p>
        <p
          className="font-heading"
          style={{ fontSize: '9px', letterSpacing: '0.4em', color: 'rgba(255,255,255,0.22)', fontWeight: 700 }}
        >
          ADMIN PANEL
        </p>
      </div>

      {/* Card */}
      <form
        onSubmit={submit}
        className="w-full max-w-sm"
        style={{
          background: '#111111',
          border: '1px solid rgba(255,255,255,0.05)',
          padding: '40px 36px',
        }}
      >
        <p
          className="font-heading text-ec-white mb-8"
          style={{ fontSize: '13px', letterSpacing: '0.25em', fontWeight: 800 }}
        >
          PIEKĻUVE
        </p>

        <label className="block mb-6">
          <span
            className="font-heading block mb-2"
            style={{ fontSize: '9px', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.35)', fontWeight: 700 }}
          >
            PAROLE
          </span>
          <input
            type="password"
            value={pw}
            onChange={e => { setPw(e.target.value); setError(false) }}
            autoFocus
            className="w-full font-body text-sm text-ec-white outline-none"
            style={{
              background: '#1A1A1A',
              border: error ? '1px solid rgba(220,60,60,0.7)' : '1px solid rgba(255,255,255,0.08)',
              padding: '12px 16px',
              letterSpacing: '0.15em',
            }}
          />
          {error && (
            <p
              className="font-body mt-2"
              style={{ fontSize: '11px', color: 'rgba(220,80,80,0.9)' }}
            >
              Nepareiza parole
            </p>
          )}
        </label>

        <button
          type="submit"
          className="w-full font-heading text-ec-gold transition-colors duration-200"
          style={{
            background: '#0A0A0A',
            border: '1px solid rgba(201,168,76,0.35)',
            padding: '13px',
            fontSize: '10px',
            letterSpacing: '0.35em',
            fontWeight: 800,
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.8)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)'}
        >
          IENĀKT
        </button>
      </form>

      <p
        className="mt-8 font-body"
        style={{ fontSize: '11px', color: 'rgba(255,255,255,0.15)' }}
      >
        © Elite Customs LV
      </p>
    </div>
  )
}
