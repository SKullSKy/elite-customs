import { useState, useEffect } from 'react'
import { store } from '../services/store'
import { PageHeader, SectionLabel, Spinner } from './AdminDashboard'

const EMPTY = { id: null, type: 'car', name: '', spec: '', price: '', active: true, description: '', ssLink: '' }

function Badge({ type }) {
  return (
    <span className="font-heading" style={{ fontSize: '8px', letterSpacing: '0.3em', fontWeight: 800, padding: '3px 8px', background: type === 'car' ? 'rgba(201,168,76,0.12)' : 'rgba(100,160,255,0.1)', color: type === 'car' ? '#C9A84C' : 'rgba(130,180,255,0.8)', border: `1px solid ${type === 'car' ? 'rgba(201,168,76,0.25)' : 'rgba(100,160,255,0.2)'}` }}>
      {type === 'car' ? 'AUTO' : 'DISKI'}
    </span>
  )
}

function Td({ children, style }) {
  return <td className="font-body" style={{ padding: '14px 16px', fontSize: '12px', color: 'rgba(255,255,255,0.65)', borderBottom: '1px solid rgba(255,255,255,0.04)', verticalAlign: 'middle', ...style }}>{children}</td>
}

function Input({ label, value, onChange, textarea, type = 'text' }) {
  const shared = { value, onChange: e => onChange(e.target.value), className: 'w-full font-body text-ec-white outline-none', style: { background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.08)', padding: '10px 14px', fontSize: '13px', resize: 'vertical' } }
  return (
    <label className="block">
      <span className="font-heading block mb-1" style={{ fontSize: '8px', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.28)', fontWeight: 800 }}>{label}</span>
      {textarea ? <textarea rows={3} {...shared} /> : <input type={type} {...shared} />}
    </label>
  )
}

function Modal({ form, setForm, onSave, onClose, saving }) {
  const update = key => val => setForm(f => ({ ...f, [key]: val }))
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4" style={{ background: 'rgba(0,0,0,0.75)' }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-xl max-h-screen overflow-y-auto" style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)', padding: '36px' }}>
        <div className="flex items-center justify-between mb-8">
          <p className="font-heading text-ec-white" style={{ fontSize: '11px', letterSpacing: '0.3em', fontWeight: 800 }}>
            {form.id ? 'LABOT SLUDINĀJUMU' : 'JAUNS SLUDINĀJUMS'}
          </p>
          <button onClick={onClose} style={{ color: 'rgba(255,255,255,0.3)', fontSize: '20px', background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1 }}>×</button>
        </div>
        <div className="grid gap-4">
          <label className="block">
            <span className="font-heading block mb-1" style={{ fontSize: '8px', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.28)', fontWeight: 800 }}>TIPS</span>
            <select value={form.type} onChange={e => update('type')(e.target.value)} className="font-body text-ec-white outline-none" style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.08)', padding: '10px 14px', fontSize: '13px', width: '100%' }}>
              <option value="car">Automašīna</option>
              <option value="wheel">Diski</option>
            </select>
          </label>
          <Input label="NOSAUKUMS"    value={form.name}         onChange={update('name')} />
          <Input label="SPEC (īss)"   value={form.spec}         onChange={update('spec')} />
          <Input label="CENA (€)"     value={form.price}        onChange={update('price')} />
          <Input label="SS.COM SAITE" value={form.ssLink || ''} onChange={update('ssLink')} />
          <Input label="APRAKSTS"     value={form.description}  onChange={update('description')} textarea />
          <label className="flex items-center gap-3 cursor-pointer">
            <div onClick={() => update('active')(!form.active)} style={{ width: 40, height: 22, borderRadius: 11, background: form.active ? '#C9A84C' : 'rgba(255,255,255,0.1)', position: 'relative', transition: 'background 0.2s', cursor: 'pointer', flexShrink: 0 }}>
              <div style={{ position: 'absolute', top: 3, left: form.active ? 21 : 3, width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
            </div>
            <span className="font-heading" style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.45)', fontWeight: 800 }}>{form.active ? 'AKTĪVS' : 'SLĒPTS'}</span>
          </label>
        </div>
        <div className="flex gap-3 mt-8">
          <button onClick={onSave} disabled={saving} className="font-heading text-ec-gold" style={{ background: '#0A0A0A', border: '1px solid rgba(201,168,76,0.4)', padding: '12px 28px', fontSize: '9px', letterSpacing: '0.35em', fontWeight: 800, cursor: 'pointer', opacity: saving ? 0.5 : 1 }}>
            {saving ? 'SAGLABĀ...' : 'SAGLABĀT'}
          </button>
          <button onClick={onClose} className="font-heading" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', padding: '12px 28px', fontSize: '9px', letterSpacing: '0.35em', fontWeight: 800, color: 'rgba(255,255,255,0.35)', cursor: 'pointer' }}>
            ATCELT
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AdminListings() {
  const [listings, setListings] = useState(null)
  const [filter, setFilter]     = useState('all')
  const [modal, setModal]       = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [saving, setSaving]     = useState(false)
  const [deleting, setDeleting] = useState(false)

  const reload = () => store.getListings().then(setListings)
  useEffect(() => { reload() }, [])

  const save = async () => {
    if (!modal.name.trim()) return
    setSaving(true)
    try { await store.saveListing(modal); await reload(); setModal(null) }
    catch (e) { alert('Kļūda: ' + e.message) }
    finally { setSaving(false) }
  }

  const confirmDelete = async () => {
    setDeleting(true)
    try { await store.deleteListing(deleteId); await reload(); setDeleteId(null) }
    catch (e) { alert('Kļūda: ' + e.message) }
    finally { setDeleting(false) }
  }

  const filtered = !listings ? [] : filter === 'all' ? listings : listings.filter(l => l.type === filter)

  return (
    <div>
      <PageHeader title="SLUDINĀJUMI" sub={listings ? `${listings.length} ieraksti kopā` : '…'} />

      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          {[['all','VISI'],['car','AUTO'],['wheel','DISKI']].map(([val, lbl]) => (
            <button key={val} onClick={() => setFilter(val)} className="font-heading" style={{ fontSize: '8px', letterSpacing: '0.3em', fontWeight: 800, padding: '7px 16px', background: filter === val ? 'rgba(201,168,76,0.12)' : 'transparent', border: `1px solid ${filter === val ? 'rgba(201,168,76,0.35)' : 'rgba(255,255,255,0.07)'}`, color: filter === val ? '#C9A84C' : 'rgba(255,255,255,0.3)', cursor: 'pointer' }}>
              {lbl}
            </button>
          ))}
        </div>
        <button onClick={() => setModal({ ...EMPTY })} className="font-heading text-ec-gold" style={{ fontSize: '8px', letterSpacing: '0.3em', fontWeight: 800, padding: '9px 20px', background: '#0A0A0A', border: '1px solid rgba(201,168,76,0.35)', cursor: 'pointer' }}>
          + JAUNS
        </button>
      </div>

      {!listings ? <Spinner /> : (
        <div style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.04)', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['NOSAUKUMS','TIPS','SPEC','CENA','STATUSS',''].map(h => (
                  <th key={h} className="font-heading text-left" style={{ padding: '12px 16px', fontSize: '8px', letterSpacing: '0.3em', fontWeight: 800, color: 'rgba(255,255,255,0.25)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(l => (
                <tr key={l.id} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.015)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <Td style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>{l.name}</Td>
                  <Td><Badge type={l.type} /></Td>
                  <Td style={{ maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.spec}</Td>
                  <Td>€{l.price}</Td>
                  <Td><span style={{ color: l.active ? 'rgba(100,200,100,0.7)' : 'rgba(200,80,80,0.6)', fontSize: '10px' }}>{l.active ? '● AKTĪVS' : '○ SLĒPTS'}</span></Td>
                  <Td>
                    <div className="flex gap-3">
                      <button onClick={() => setModal({ ...l })} className="font-heading" style={{ fontSize: '8px', letterSpacing: '0.25em', fontWeight: 800, color: '#C9A84C', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.7 }} onMouseEnter={e => e.currentTarget.style.opacity='1'} onMouseLeave={e => e.currentTarget.style.opacity='0.7'}>LABOT</button>
                      <button onClick={() => setDeleteId(l.id)} className="font-heading" style={{ fontSize: '8px', letterSpacing: '0.25em', fontWeight: 800, color: 'rgba(220,80,80,0.55)', background: 'none', border: 'none', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.color='rgba(220,80,80,0.9)'} onMouseLeave={e => e.currentTarget.style.color='rgba(220,80,80,0.55)'}>DZĒST</button>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p className="font-body text-center py-12" style={{ color: 'rgba(255,255,255,0.2)', fontSize: '12px' }}>Nav ierakstu</p>}
        </div>
      )}

      {modal && <Modal form={modal} setForm={setModal} onSave={save} onClose={() => setModal(null)} saving={saving} />}

      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: 'rgba(0,0,0,0.75)' }}>
          <div style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)', padding: '36px', maxWidth: 360, width: '100%' }}>
            <p className="font-heading text-ec-white mb-2" style={{ fontSize: '11px', letterSpacing: '0.3em', fontWeight: 800 }}>DZĒST SLUDINĀJUMU?</p>
            <p className="font-body mb-8" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>Šo darbību nevar atcelt.</p>
            <div className="flex gap-3">
              <button onClick={confirmDelete} disabled={deleting} className="font-heading" style={{ fontSize: '8px', letterSpacing: '0.3em', fontWeight: 800, padding: '10px 22px', background: 'rgba(200,60,60,0.15)', border: '1px solid rgba(200,60,60,0.4)', color: 'rgba(220,80,80,0.9)', cursor: 'pointer', opacity: deleting ? 0.5 : 1 }}>
                {deleting ? '...' : 'DZĒST'}
              </button>
              <button onClick={() => setDeleteId(null)} className="font-heading" style={{ fontSize: '8px', letterSpacing: '0.3em', fontWeight: 800, padding: '10px 22px', background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.35)', cursor: 'pointer' }}>ATCELT</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
