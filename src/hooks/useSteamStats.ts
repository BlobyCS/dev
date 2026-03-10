import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

interface SteamStats {
  kills:          number
  deaths:         number
  matches_played: number
  wins:           number
  time_played:    number
  headshots:      number
  kd_ratio:       string
  win_rate:       string
  hours_played:   string
}

export function useSteamStats() {
  const { session } = useAuth()
  const [stats, setStats]     = useState<SteamStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)

  useEffect(() => {
    if (!session) return

    const fetchStats = async () => {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/steam-stats`,
          { headers: { Authorization: `Bearer ${session.access_token}` } }
        )

        if (!res.ok) throw new Error('Nepodařilo se načíst statistiky')

        const data = await res.json()
        setStats({
          ...data,
          kd_ratio:    data.deaths > 0 ? (data.kills / data.deaths).toFixed(2) : '0.00',
          win_rate:    data.matches_played > 0 ? `${Math.round((data.wins / data.matches_played) * 100)}%` : '0%',
          hours_played: Math.round(data.time_played / 3600).toLocaleString('cs'),
        })
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [session])

  return { stats, loading, error }
}
