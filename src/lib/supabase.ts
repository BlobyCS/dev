import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL    = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON   = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON)

export const steamLoginUrl = () => {
  const base = import.meta.env.VITE_SUPABASE_URL
  return `${base}/functions/v1/steam-auth?action=login`
}
