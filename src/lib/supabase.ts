import { createClient } from '@supabase/supabase-js'
import type { Profile } from './types'

const SUPABASE_URL      = import.meta.env.VITE_SUPABASE_URL as string
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY as string

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('[Supabase] Chybí VITE_SUPABASE_URL nebo VITE_SUPABASE_ANON_KEY v .env')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
/** Načti profil podle steam_id */
export async function getProfileBySteamId(steamId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('steam_id', steamId)
    .single()
  return { data: data as Profile | null, error }
}

/** Načti profil podle slug (veřejná URL /p/:slug) */
export async function getProfileBySlug(slug: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('slug', slug)
    .single()
  return { data: data as Profile | null, error }
}

/** Ulož nebo aktualizuj profil */
export async function upsertProfile(profile: Partial<Profile> & { steam_id: string }) {
  const { data, error } = await supabase
    .from('profiles')
    .upsert(
      { ...profile, updated_at: new Date().toISOString() },
      { onConflict: 'steam_id' }
    )
    .select()
    .single()
  return { data: data as Profile | null, error }
}

/** Zkontroluje jestli je slug volný */
export async function isSlugAvailable(slug: string, currentSteamId?: string) {
  const { data } = await supabase
    .from('profiles')
    .select('steam_id')
    .eq('slug', slug)
    .single()

  if (!data) return true
  if (currentSteamId && data.steam_id === currentSteamId) return true
  return false
}

/** Smaž profil */
export async function deleteProfile(steamId: string) {
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('steam_id', steamId)
  return { error }
}
