import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import type { Profile } from '../lib/types'

type SteamUser = {
  steamId: string
  displayName: string
  avatar: string
}

type AuthContextType = {
  user: SteamUser | null
  profile: Profile | null
  isLoggedIn: boolean
  loading: boolean
  steamLogin: () => void
  logout: () => void
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]       = useState<SteamUser | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const stored = sessionStorage.getItem('vaunt_user')
    if (stored) {
      const parsed = JSON.parse(stored) as SteamUser
      setUser(parsed)
      loadProfile(parsed.steamId)
    } else {
      setLoading(false)
    }
  }, [])

  async function loadProfile(steamId: string) {
    setLoading(true)
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('steam_id', steamId)
      .single()
    setProfile(data ?? null)
    setLoading(false)
  }

  function steamLogin() {
    // V produkci přesměrovat na Steam OpenID:
    // window.location.href = '/api/auth/steam'
    const mockUser: SteamUser = {
      steamId:     '76561198000000000',
      displayName: 'Hráč',
      avatar:      'https://avatars.fastly.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg',
    }
    setUser(mockUser)
    sessionStorage.setItem('vaunt_user', JSON.stringify(mockUser))
    loadProfile(mockUser.steamId)
  }

  function logout() {
    setUser(null)
    setProfile(null)
    sessionStorage.removeItem('vaunt_user')
  }


  async function refreshProfile() {
    if (!user) return
    await loadProfile(user.steamId)
  }

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      isLoggedIn: !!user,
      loading,
      steamLogin,
      logout,
      refreshProfile,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth musí být uvnitř <AuthProvider>')
  return ctx
}
