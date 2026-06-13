import { supabase } from './supabase'

const AUTH_KEY = 'ec_admin_auth'
const PASSWORD = '6969'

// ─── Price row → grouped structure ────────────────────────────────────────────

function rowsToPrices(rows) {
  const out = { washing: [], detailing: [], polishing: [], washingMoto: '20' }
  ;[...rows].sort((a, b) => a.sort_order - b.sort_order).forEach(r => {
    if (r.id === 'wmoto') {
      out.washingMoto = r.price_car
    } else if (out[r.section]) {
      out[r.section].push({
        id:     r.id,
        name:   r.name,
        prices: { car: r.price_car, suv: r.price_suv, van: r.price_van },
      })
    }
  })
  return out
}

// ─── Public API ───────────────────────────────────────────────────────────────

export const store = {

  // ── Auth (localStorage — no DB needed for a simple password) ──────────────
  login(password) {
    if (password === PASSWORD) { localStorage.setItem(AUTH_KEY, '1'); return true }
    return false
  },
  logout()  { localStorage.removeItem(AUTH_KEY) },
  getAuth() { return !!localStorage.getItem(AUTH_KEY) },

  // ── Listings ──────────────────────────────────────────────────────────────
  async getListings() {
    const { data, error } = await supabase.from('listings').select('*').order('id')
    if (error) throw error
    return data.map(l => ({ ...l, ssLink: l.ss_link }))
  },

  async saveListing(listing) {
    const row = {
      type:        listing.type,
      name:        listing.name,
      spec:        listing.spec,
      price:       listing.price,
      active:      listing.active,
      description: listing.description,
      ss_link:     listing.ssLink || null,
    }
    if (listing.id) {
      const { error } = await supabase.from('listings').update(row).eq('id', listing.id)
      if (error) throw error
    } else {
      const { error } = await supabase.from('listings').insert(row)
      if (error) throw error
    }
  },

  async deleteListing(id) {
    const { error } = await supabase.from('listings').delete().eq('id', id)
    if (error) throw error
  },

  // ── Prices ────────────────────────────────────────────────────────────────
  async getPrices() {
    const { data, error } = await supabase.from('prices').select('*')
    if (error) throw error
    return rowsToPrices(data)
  },

  async savePrices(prices) {
    const rows = []
    ;['washing', 'detailing', 'polishing'].forEach(section => {
      prices[section].forEach((row, i) => {
        rows.push({
          id:         row.id,
          section,
          name:       row.name,
          price_car:  row.prices.car,
          price_suv:  row.prices.suv,
          price_van:  row.prices.van,
          sort_order: i + 1,
        })
      })
    })
    rows.push({ id: 'wmoto', section: 'meta', name: 'washing_moto', price_car: prices.washingMoto, price_suv: '', price_van: '', sort_order: 0 })

    const { error } = await supabase.from('prices').upsert(rows)
    if (error) throw error
  },

  // ── Bookings ──────────────────────────────────────────────────────────────
  async getBookings() {
    const { data, error } = await supabase.from('bookings').select('*').order('from_date')
    if (error) throw error
    return data.map(b => ({ id: b.id, from: b.from_date, to: b.to_date, name: b.client_name || '' }))
  },

  async addBooking({ from, to, name }) {
    const { error } = await supabase.from('bookings').insert({ from_date: from, to_date: to, client_name: name || '' })
    if (error) throw error
  },

  async cancelBooking(id) {
    const { error } = await supabase.from('bookings').delete().eq('id', id)
    if (error) throw error
  },

  async getBookedDates() {
    const bookings = await store.getBookings()
    const set_ = new Set()
    bookings.forEach(({ from, to }) => {
      const cur = new Date(from + 'T00:00:00')
      const end = new Date(to   + 'T00:00:00')
      while (cur <= end) {
        set_.add(cur.toISOString().slice(0, 10))
        cur.setDate(cur.getDate() + 1)
      }
    })
    return set_
  },

  // ── Settings ──────────────────────────────────────────────────────────────
  async getSettings() {
    const { data, error } = await supabase.from('settings').select('*').eq('id', 1).single()
    if (error) throw error
    return {
      businessName: data.business_name || '',
      address:      data.address       || '',
      phone:        data.phone         || '',
      email:        data.email         || '',
      instagram:    data.instagram     || '',
      tiktok:       data.tiktok        || '',
      facebook:     data.facebook      || '',
      whatsapp:     data.whatsapp      || '',
      hours:        data.hours         || '',
    }
  },

  async saveSettings(s) {
    const { error } = await supabase.from('settings').upsert({
      id:            1,
      business_name: s.businessName,
      address:       s.address,
      phone:         s.phone,
      email:         s.email,
      instagram:     s.instagram,
      tiktok:        s.tiktok,
      facebook:      s.facebook,
      whatsapp:      s.whatsapp,
      hours:         s.hours,
    })
    if (error) throw error
  },
}
