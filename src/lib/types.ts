// ─── Supabase: Profil hráče ───────────────────────────────────────
export type Profile = {
  id:           string
  steam_id:     string
  slug:         string
  display_name: string
  avatar_url?:  string
  discord_id?:  string
  instagram?:   string
  twitter?:     string
  created_at:   string
  updated_at?:  string
}

// ─── Fakaheda: Data serveru ───────────────────────────────────────
export type ServerData = {
  name:         string
  map:          string
  players:      number
  max_players:  number
  ip:           string
  port:         number
  online:       boolean
  tickrate:     number
  game_type?:   string
}

// ─── Tým ─────────────────────────────────────────────────────────
export type TeamMember = {
  name:        string
  rank:        string
  rankColor:   string
  avatar:      string
  email:       string
  instagram?:  string
  discord?:    string
  youtube?:    string
  github?:     string
  twitter?:    string
}

// ─── Steam OpenID ─────────────────────────────────────────────────
export type SteamUser = {
  steam_id:     string
  display_name: string
  avatar_url:   string
  profile_url:  string
}

// ─── API responses ────────────────────────────────────────────────
export type ApiResponse<T> = {
  data:    T | null
  error:   string | null
  loading: boolean
}
