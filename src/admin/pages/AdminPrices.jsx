import { useState, useEffect } from 'react'
import { store } from '../services/store'
import { PageHeader, Spinner } from './AdminDashboard'

function PriceInput({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      className="font-body text-ec-white outline-none text-center"
      style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.07)', padding: '7px 10px', fontSize: '12px', width: '90px' }}
      onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.4)'}
      onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.07)'}
    />
  )
}

function PriceTable({ rows, onChange, motoPrice, onMotoChange }) {
  return (
    <div style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.04)', overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <th className="font-heading text-left" style={{ padding: '12px 20px', fontSize: '8px', letterSpacing: '0.3em', fontWeight: 800, color: 'rgba(255,255,255,0.25)', minWidth: 240 }}>PAKALPOJUMS</th>
            {['AUTO','SUV / DŽIPS','MINIBUSS'].map(h => (
              <th key={h} className="font-heading text-center" style={{ padding: '12px 16px', fontSize: '8px', letterSpacing: '0.3em', fontWeight: 800, color: 'rgba(255,255,255,0.25)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id} onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.015)'} onMouseLeave={e => e.currentTarget.style.background='transparent'}>
              <td style={{ padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <p className="font-body" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.75)' }}>{row.name}</p>
              </td>
              {['car','suv','van'].map(key => (
                <td key={key} style={{ padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.03)', textAlign: 'center' }}>
                  <PriceInput value={row.prices[key]} onChange={val => onChange(i, key, val)} />
                </td>
              ))}
            </tr>
          ))}
          {motoPrice !== undefined && (
            <tr style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <td style={{ padding: '12px 20px' }}><p className="font-body" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)' }}>Motocikla Mazgāšana</p></td>
              <td colSpan={3} style={{ padding: '10px 16px', textAlign: 'center' }}>
                <PriceInput value={motoPrice} onChange={onMotoChange} />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default function AdminPrices() {
  const [prices, setPrices] = useState(null)
  const [active, setActive] = useState('washing')
  const [saving, setSaving] = useState(false)
  const [saved,  setSaved]  = useState(false)

  useEffect(() => { store.getPrices().then(setPrices) }, [])

  const updateRow = section => (i, key, val) => {
    setPrices(p => {
      const rows = [...p[section]]
      rows[i] = { ...rows[i], prices: { ...rows[i].prices, [key]: val } }
      return { ...p, [section]: rows }
    })
  }

  const save = async () => {
    setSaving(true)
    try {
      await store.savePrices(prices)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (e) {
      alert('Kļūda: ' + e.message)
    } finally {
      setSaving(false)
    }
  }

  const TABS = [
    { key: 'washing',   label: 'MAZGĀŠANA' },
    { key: 'detailing', label: 'DETAILING'  },
    { key: 'polishing', label: 'PULĒŠANA'  },
  ]

  return (
    <div>
      <PageHeader title="CENAS" sub="Labojiet pakalpojumu cenas zemāk" />

      <div className="flex gap-2 mb-6">
        {TABS.map(({ key, label }) => (
          <button key={key} onClick={() => setActive(key)} className="font-heading" style={{ fontSize: '8px', letterSpacing: '0.35em', fontWeight: 800, padding: '9px 20px', background: active === key ? 'rgba(201,168,76,0.1)' : 'transparent', border: `1px solid ${active === key ? 'rgba(201,168,76,0.35)' : 'rgba(255,255,255,0.07)'}`, color: active === key ? '#C9A84C' : 'rgba(255,255,255,0.3)', cursor: 'pointer' }}>
            {label}
          </button>
        ))}
      </div>

      {!prices ? <Spinner /> : (
        <>
          <PriceTable
            rows={prices[active]}
            onChange={updateRow(active)}
            motoPrice={active === 'washing' ? prices.washingMoto : undefined}
            onMotoChange={val => setPrices(p => ({ ...p, washingMoto: val }))}
          />
          <p className="font-body mt-4" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.22)' }}>
            Cenas tiek rādītas tieši kā ievadītas (piemēram: "No 130", "25 – 30").
          </p>
          <div className="flex items-center gap-4 mt-8">
            <button onClick={save} disabled={saving} className="font-heading text-ec-gold" style={{ background: '#0A0A0A', border: '1px solid rgba(201,168,76,0.4)', padding: '12px 28px', fontSize: '9px', letterSpacing: '0.35em', fontWeight: 800, cursor: 'pointer', opacity: saving ? 0.6 : 1 }}>
              {saving ? 'SAGLABĀ...' : saved ? '✓ SAGLABĀTS' : 'SAGLABĀT'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
