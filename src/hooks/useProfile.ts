import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Profile } from '../lib/types'

export function useProfile(steamId: string | null) {
  const [profile, setProfile]   = useState<Profile | null>(null)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState<string | null>(null)

  useEffect(() => {
    if (!steamId) { setLoading(false); return }

    supabase
      .from('profiles')
      .select('*')
      .eq('steam_id', steamId)
      .single()
      .then(({ data, error }) => {
        if (error && error.code !== 'PGRST116') setError(error.message)
        setProfile(data ?? null)
        setLoading(false)
      })
  }, [steamId])

  async function saveProfile(updates: Partial<Profile>) {
    if (!steamId) return { error: 'Nejsi přihlášen' }

    const payload = { ...updates, steam_id: steamId }
    const { data, error } = await supabase
      .from('profiles')
      .upsert(payload, { onConflict: 'steam_id' })
      .select()
      .single()

    if (!error) setProfile(data)
    return { error: error?.message ?? null }
  }

  async function deleteProfile() {
    if (!steamId) return
    await supabase.from('profiles').delete().eq('steam_id', steamId)
    setProfile(null)
  }

  return { profile, loading, error, saveProfile, deleteProfile }
}