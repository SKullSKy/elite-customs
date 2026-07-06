import { listings as staticListings } from '../data/listings'

// Build lookup by lowercase name for merging photos + specs from static file
const staticByName = {}
staticListings.forEach(l => { staticByName[l.name.toLowerCase()] = l })

// Supabase is the source of truth for editable fields (price, name, description, ssLink, active).
// Static data only fills in imgs/specs when the admin hasn't set them, and provides an id fallback.
export function mergeWithStatic(supaListing) {
  const s = staticByName[supaListing.name.toLowerCase()]
  return {
    ...supaListing,
    imgs:  supaListing.imgs?.length  ? supaListing.imgs  : (s?.imgs  ?? []),
    specs: supaListing.specs?.length ? supaListing.specs : (s?.specs ?? []),
    id:    s?.id ?? supaListing.id,
  }
}
