import { useState, CSSProperties } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaDiscord, FaInstagram, FaYoutube, FaSteam } from 'react-icons/fa'
import { RiBarChartLine, RiUserSettingsLine, RiHomeLine } from 'react-icons/ri'
import PageWrapper from '../components/Wrapper'
import { useAuth } from '../context/AuthContext'
import { useSteamStats } from '../hooks/useSteamStats'
import { supabase } from '../lib/supabase'

type SideTab = 'statistiky' | 'nastaveni'

const SIDE_ITEMS: { id: SideTab; label: string; icon: React.ReactNode }[] = [
  { id: 'statistiky',  label: 'Statistiky',        icon: <RiBarChartLine size={20} /> },
  { id: 'nastaveni',   label: 'Nastavení profilu', icon: <RiUserSettingsLine size={20} /> },
]

function StatistikyPanel() {
  const { stats, loading } = useSteamStats()
  const cards = stats ? [
    { num: stats.kills.toLocaleString('cs'),          label: 'Kills',        icon: '🎯' },
    { num: stats.deaths.toLocaleString('cs'),         label: 'Deaths',       icon: '💀' },
    { num: stats.hours_played,                        label: 'Hodin ve hře', icon: '⏱️' },
    { num: stats.kd_ratio,                            label: 'K/D Ratio',    icon: '📊' },
    { num: stats.matches_played.toLocaleString('cs'), label: 'Zápasů',       icon: '🏆' },
    { num: stats.win_rate,                            label: 'Win Rate',     icon: '✅' },
    { num: stats.headshots.toLocaleString('cs'),      label: 'Headshoty',    icon: '🎯' },
    { num: stats.kills > 0 ? `${Math.round((stats.headshots / stats.kills) * 100)}%` : '—', label: 'HS %', icon: '💡' },
  ] : Array(8).fill(null).map((_, i) => ({
    num: '—',
    label: ['Kills','Deaths','Hodin','K/D','Zápasů','Win Rate','Headshoty','HS %'][i],
    icon: '—',
  }))

  return (
    <div>
      <div style={s.sectionLabel}><span style={s.labelLine} />Steam Statistiky</div>
      {loading
        ? <div style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}>Načítám...</div>
        : <div style={s.statsGrid}>
            {cards.map((c, i) => (
              <motion.div key={c.label} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4, boxShadow: '0 0 40px rgba(127,255,0,0.25)' }}
                style={s.statCard}>
                <div style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>{c.icon}</div>
                <div style={s.statNum}>{c.num}</div>
                <div style={s.statLabel}>{c.label}</div>
              </motion.div>
            ))}
          </div>
      }
      <div style={{ marginTop: '2rem' }}>
        <div style={s.sectionLabel}><span style={s.labelLine} />Komunita</div>
        <div style={s.socialsCard}>
          {[
            { icon: <FaDiscord size={14}/>,   label: 'Discord',   href: 'https://discord.gg/vaunt' },
            { icon: <FaInstagram size={14}/>, label: 'Instagram', href: '#' },
            { icon: <FaYoutube size={14}/>,   label: 'YouTube',   href: '#' },
            { icon: <FaSteam size={14}/>,     label: 'Steam',     href: '#' },
          ].map(item => (
            <a key={item.label} href={item.href} target="_blank" rel="noreferrer" style={s.socialLink}>
              {item.icon} {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Nastavení Panel ───────────────────────────────────
function NastaveniPanel() {
  const { profile, refreshProfile } = useAuth()
  const [slug,     setSlug]    = useState(profile?.username ?? '')
  const [tradeUrl, setTradeUrl] = useState('')
  const [privacy,  setPrivacy] = useState<'public' | 'private'>('public')
  const [saving,   setSaving]  = useState(false)
  const [saved,    setSaved]   = useState(false)

  const handleSave = async () => {
    if (!profile) return
    setSaving(true)
    await supabase.from('profiles').update({ username: slug }).eq('id', profile.id)
    await refreshProfile()
    setSaving(false); setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={s.sectionLabel}><span style={s.labelLine} />Nastavení profilu</div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={s.settingsCard}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          {profile?.avatar_url
            ? <img src={profile.avatar_url} alt="" style={s.settingsAvatar} />
            : <div style={s.settingsAvatarPlaceholder}><FaSteam size={28} color="var(--green)" /></div>}
          <div>
            <div style={s.settingsName}>{profile?.display_name ?? 'Steam uživatel'}</div>
            <div style={s.steamIdRow}>
              <span style={s.steamIdLabel}>SteamID64:</span>
              <span style={s.steamIdValue}>{profile?.steam_id ?? '—'}</span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 }} style={s.settingsCard}>
        <div style={s.fieldLabel}>Vlastní URL profilu</div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={s.prefixWrap}>
            <span style={s.prefix}>vaunt.cz/profile/</span>
            <input style={s.slugInput} value={slug}
              onChange={e => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
              placeholder="tvujnick" maxLength={24} />
          </div>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={handleSave} style={saved ? s.btnSaved : s.btnPrimary} disabled={saving}>
            {saved ? '✓ Uloženo' : saving ? 'Ukládám...' : 'Uložit'}
          </motion.button>
        </div>
        {slug && (
          <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            → <span style={{ color: 'var(--green)' }}>vaunt.cz/profile/{slug}</span>
          </div>
        )}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }} style={s.settingsCard}>
        <div style={s.fieldLabel}>Soukromí profilu</div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {(['public', 'private'] as const).map(opt => (
            <button key={opt} onClick={() => setPrivacy(opt)}
              style={privacy === opt ? s.btnPrimary : s.btnOutline}>
              {opt === 'public' ? '🌍 Veřejný' : '🔒 Soukromý'}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.21 }} style={s.settingsCard}>
        <div style={s.fieldLabel}>Trade URL</div>
        <input
          style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '0.88rem', padding: '0.65rem 0.9rem', outline: 'none', width: '100%', boxSizing: 'border-box' as const }}
          placeholder="https://steamcommunity.com/tradeoffer/new/?partner=..."
          value={tradeUrl} onChange={e => setTradeUrl(e.target.value)} />
        <div style={{ marginTop: '0.4rem', fontSize: '0.73rem', color: 'var(--text-muted)' }}>
          Slouží pro obchodování na VAUNT serverech.
        </div>
      </motion.div>
    </div>
  )
}

// ── Main Dashboard ────────────────────────────────────
export default function Dashboard() {
  const { profile } = useAuth()
  const [activeTab, setActiveTab] = useState<SideTab>('statistiky')

  return (
    <PageWrapper>
      <div style={s.root}>

        <aside style={s.sidebar}>
          <div style={s.sideProfile}>
            {profile?.avatar_url
              ? <img src={profile.avatar_url} alt="" style={s.sideAvatar} />
              : <div style={s.sideAvatarPlaceholder}><FaSteam size={16} color="var(--green)" /></div>}
            <div style={{ minWidth: 0 }}>
              <div style={s.sideName}>{profile?.display_name ?? 'Hráč'}</div>
              {profile?.username && <div style={s.sideSlug}>/{profile.username}</div>}
            </div>
          </div>
          <div style={s.sideDivider} />
          <nav style={s.sideNav}>
            {SIDE_ITEMS.map(item => {
              const active = activeTab === item.id
              return (
                <motion.button key={item.id} onClick={() => setActiveTab(item.id)} whileHover={{ x: 2 }}
                  style={{ ...s.sideItem, color: active ? '#7fff00' : 'var(--text-sub)', background: active ? 'rgba(127,255,0,0.08)' : 'transparent', borderLeft: active ? '2px solid #7fff00' : '2px solid transparent', textShadow: active ? '0 0 12px rgba(127,255,0,0.5)' : 'none' }}>
                  <span style={{ opacity: active ? 1 : 0.55 }}>{item.icon}</span>
                  {item.label}
                </motion.button>
              )
            })}
          </nav>
          <div style={{ ...s.sideDivider, marginTop: 'auto' }} />
          <div style={s.sideFooter}>VAUNT.cz · CS2</div>
        </aside>

        <main style={s.content}>
          <div style={s.contentHeader}>
            <h1 style={s.contentTitle}>{SIDE_ITEMS.find(i => i.id === activeTab)?.label}</h1>
            {profile?.username && (
              <div style={s.contentMeta}>
                vaunt.cz/profile/<span style={{ color: 'var(--green)' }}>{profile.username}</span>
              </div>
            )}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeTab}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
              {activeTab === 'statistiky' && <StatistikyPanel />}
              {activeTab === 'nastaveni'  && <NastaveniPanel />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <footer style={s.footer}>
        <p style={s.footerText}>VAUNT.cz je nezávislá česká komunita. Nespadáme pod Steam ani Valve.</p>
      </footer>
    </PageWrapper>
  )
}

// ── Styles ────────────────────────────────────────────
const s: Record<string, CSSProperties> = {
  root:          { display: 'flex', gap: 0, minHeight: 'calc(100vh - var(--nav-h) - 6rem)', alignItems: 'flex-start' },
  sidebar:       { width: 220, flexShrink: 0, background: 'var(--surface)', borderRight: '1px solid var(--border)', borderRadius: 'var(--radius) 0 0 var(--radius)', padding: '1.25rem 0 1rem', position: 'sticky', top: 'calc(var(--nav-h) + 3rem)', display: 'flex', flexDirection: 'column', minHeight: '65vh' },
  sideProfile:   { display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0 1rem', marginBottom: '1rem' },
  sideAvatar:    { width: 34, height: 34, borderRadius: '50%', border: '1.5px solid var(--green)', boxShadow: 'var(--green-glow-sm)', flexShrink: 0 },
  sideAvatarPlaceholder: { width: 34, height: 34, borderRadius: '50%', border: '1.5px solid var(--border)', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  sideName:      { fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.82rem', letterSpacing: '0.04em', color: 'var(--text)', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 130 },
  sideSlug:      { fontSize: '0.68rem', color: 'var(--green)', marginTop: 2 },
  sideDivider:   { height: 1, background: 'var(--border)', margin: '0 0 0.6rem' },
  sideNav:       { display: 'flex', flexDirection: 'column', gap: 2, padding: '0 0.4rem', flex: 1 },
  sideItem:      { display: 'flex', alignItems: 'center', gap: '0.6rem', fontFamily: 'var(--font-display)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.7rem 0.75rem', borderRadius: 'var(--radius-sm)', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%', transition: 'all 0.15s' },
  sideFooter:    { padding: '0.75rem 1rem 0', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' },
  content:       { flex: 1, padding: '0 0 0 2rem', minWidth: 0 },
  contentHeader: { marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' },
  contentTitle:  { fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,4vw,2.5rem)', fontWeight: 900, letterSpacing: '0.04em', textTransform: 'uppercase', lineHeight: 1 },
  contentMeta:   { marginTop: '0.3rem', fontSize: '0.75rem', color: 'var(--text-sub)' },
  sectionLabel:  { display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '1rem' },
  labelLine:     { display: 'block', width: 16, height: 2, background: 'var(--green)', borderRadius: 99 },
  statsGrid:     { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' },
  statCard:      { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.4rem 1.2rem', boxShadow: 'var(--green-glow)', transition: 'box-shadow 0.3s', cursor: 'default' },
  statNum:       { fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 900, color: 'var(--green)', textShadow: 'var(--green-glow-sm)', lineHeight: 1 },
  statLabel:     { fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-sub)', marginTop: '0.3rem' },
  socialsCard:   { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' },
  socialLink:    { display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-display)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.38rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--surface-2)', color: 'var(--text-sub)', textDecoration: 'none' },
  settingsCard:  { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.35rem' },
  settingsAvatar:{ width: 60, height: 60, borderRadius: '50%', border: '2px solid var(--green)', boxShadow: 'var(--green-glow-sm)', flexShrink: 0 },
  settingsAvatarPlaceholder: { width: 60, height: 60, borderRadius: '50%', border: '2px solid var(--border)', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  settingsName:  { fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 900, letterSpacing: '0.04em' },
  steamIdRow:    { display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem', flexWrap: 'wrap' },
  steamIdLabel:  { fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em', textTransform: 'uppercase' },
  steamIdValue:  { fontSize: '0.75rem', color: 'var(--green)', fontFamily: 'var(--font-body)', fontWeight: 600 },
  fieldLabel:    { fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.65rem' },
  prefixWrap:    { display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden', background: 'var(--surface-2)', flex: 1, minWidth: 200 },
  prefix:        { fontFamily: 'var(--font-display)', fontSize: '0.78rem', fontWeight: 700, color: 'var(--green)', padding: '0 0.6rem', background: 'rgba(127,255,0,0.06)', borderRight: '1px solid var(--border)', whiteSpace: 'nowrap' },
  slugInput:     { flex: 1, background: 'transparent', border: 'none', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '0.88rem', padding: '0.6rem 0.65rem', outline: 'none' },
  btnPrimary:    { fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.6rem 1.2rem', borderRadius: 'var(--radius-sm)', background: '#7fff00', color: '#050505', border: 'none', cursor: 'pointer', boxShadow: 'var(--green-glow-sm)', whiteSpace: 'nowrap' },
  btnSaved:      { fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.6rem 1.2rem', borderRadius: 'var(--radius-sm)', background: '#1a3d00', color: '#7fff00', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' },
  btnOutline:    { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.6rem 1.2rem', borderRadius: 'var(--radius-sm)', background: 'transparent', color: 'var(--text-sub)', border: '1px solid var(--border)', cursor: 'pointer' },
  footer:        { borderTop: '1px solid var(--border)', marginTop: '4rem', paddingTop: '1.75rem', textAlign: 'center' },
  footerText:    { fontSize: '0.73rem', color: 'var(--text-muted)', lineHeight: 1.8 },
}
