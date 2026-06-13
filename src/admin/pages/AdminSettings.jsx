import { useState, useEffect } from 'react'
import { store } from '../services/store'
import { PageHeader, SectionLabel, Spinner } from './AdminDashboard'

function Field({ label, value, onChange, textarea, type = 'text' }) {
  const shared = {
    value,
    onChange: e => onChange(e.target.value),
    className: 'w-full font-body text-ec-white outline-none',
    style: { background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.07)', padding: '11px 16px', fontSize: '13px', resize: 'vertical' },
    onFocus: e => e.target.style.borderColor = 'rgba(201,168,76,0.4)',
    onBlur:  e => e.target.style.borderColor = 'rgba(255,255,255,0.07)',
  }
  return (
    <label className="block">
      <span className="font-heading block mb-1" style={{ fontSize: '8px', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.28)', fontWeight: 800 }}>{label}</span>
      {textarea ? <textarea rows={3} {...shared} /> : <input type={type} {...shared} />}
    </label>
  )
}

export default function AdminSettings() {
  const [s, setS]         = useState(null)
  const [saving, setSaving] = useState(false)
  const [saved,  setSaved]  = useState(false)

  useEffect(() => { store.getSettings().then(setS) }, [])

  const update = key => val => setS(prev => ({ ...prev, [key]: val }))

  const save = async () => {
    setSaving(true)
    try {
      await store.saveSettings(s)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (e) {
      alert('Kļūda: ' + e.message)
    } finally {
      setSaving(false)
    }
  }

  if (!s) return <div><PageHeader title="IESTATĪJUMI" /><Spinner /></div>

  return (
    <div>
      <PageHeader title="IESTATĪJUMI" sub="Uzņēmuma kontaktinformācija un saites" />
      <div className="grid gap-6" style={{ maxWidth: 560 }}>
        <SectionLabel>KONTAKTINFORMĀCIJA</SectionLabel>
        <Field label="UZŅĒMUMA NOSAUKUMS" value={s.businessName} onChange={update('businessName')} />
        <Field label="ADRESE"              value={s.address}      onChange={update('address')} />
        <Field label="TĀLRUNIS"            value={s.phone}        onChange={update('phone')} type="tel" />
        <Field label="E-PASTS"             value={s.email}        onChange={update('email')} type="email" />
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 24 }}>
          <SectionLabel>SOCIĀLIE TĪKLI</SectionLabel>
        </div>
        <Field label="INSTAGRAM URL"  value={s.instagram} onChange={update('instagram')} />
        <Field label="TIKTOK URL"     value={s.tiktok}    onChange={update('tiktok')} />
        <Field label="FACEBOOK URL"   value={s.facebook}  onChange={update('facebook')} />
        <Field label="WHATSAPP (nr.)" value={s.whatsapp}  onChange={update('whatsapp')} />
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 24 }}>
          <SectionLabel>DARBA LAIKS</SectionLabel>
        </div>
        <Field label="DARBA LAIKS" value={s.hours} onChange={update('hours')} textarea />
        <div className="flex gap-3 pt-2">
          <button onClick={save} disabled={saving} className="font-heading text-ec-gold" style={{ background: '#0A0A0A', border: '1px solid rgba(201,168,76,0.4)', padding: '12px 28px', fontSize: '9px', letterSpacing: '0.35em', fontWeight: 800, cursor: 'pointer', opacity: saving ? 0.6 : 1 }}>
            {saving ? 'SAGLABĀ...' : saved ? '✓ SAGLABĀTS' : 'SAGLABĀT'}
          </button>
        </div>
      </div>
    </div>
  )
}
