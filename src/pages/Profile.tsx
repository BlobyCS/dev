import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageWrapper from '../components/Wrapper'

export default function Profile() {
  const { username = 'bloby' } = useParams()
  const navigate = useNavigate()
  const display = username.charAt(0).toUpperCase() + username.slice(1)

  const [slug, setSlug] = useState(username)
  const [displayName, setDisplayName] = useState(display)
  const [bio, setBio] = useState('')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    if (!slug) return
    setSaved(true)
    setTimeout(() => { setSaved(false); navigate('/profile/' + slug) }, 1200)
  }

  return (
    <PageWrapper>

      {/* BANNER */}
      <section style={{ padding: '2rem 0 0' }}>
        <div style={s.banner} />
        <div style={s.avatarRow}>
          <div style={s.avatar}>👤</div>
          <div style={{ paddingBottom: '0.5rem' }}>
            <h1 style={s.name}>{display}</h1>
            <div style={s.url}>vaunt.cz/profile/<span style={{ color: 'var(--green)' }}>{username}</span></div>
            <div style={s.meta}>
              <span style={s.badgeGreen}><span style={s.dot} />Online</span>
              <span style={s.badge}>CS2 Hráč</span>
              <span style={s.badge}>Člen od 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ marginTop: '2.5rem' }}>
        <div style={s.sectionLabel}><span style={s.labelLine} />Statistiky</div>
        <div style={s.statsGrid}>
          {[['18 197','Minut ve hře'],['830','Zápasů celkem'],['61%','Win rate']].map(([num, label], i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ y: -4, boxShadow: 'var(--green-glow)' }} style={s.statCard}>
              <div style={s.statNum}>{num}</div>
              <div style={s.statLabel}>{label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <hr style={s.divider} />

      {/* SETTINGS */}
      <section>
        <div style={s.sectionLabel}><span style={s.labelLine} />Nastavení profilu</div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={s.card}>
          <div style={s.settingsGrid}>

            <div style={s.inputGroup}>
              <label style={s.label}>Zobrazované jméno</label>
              <input style={s.input} value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="Tvůj nick" maxLength={32} />
            </div>

            <div style={s.inputGroup}>
              <label style={s.label}>Vlastní odkaz (slug)</label>
              <div style={s.prefixWrap}>
                <span style={s.prefix}>vaunt.cz/profile/</span>
                <input
                  style={{ ...s.input, border: 'none', borderRadius: 0, background: 'transparent' }}
                  value={slug}
                  onChange={e => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g,''))}
                  placeholder="tvujnick"
                  maxLength={24}
                />
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Náhled: <span style={{ color: 'var(--green)' }}>{slug || 'tvujnick'}</span>
              </span>
            </div>

            <div style={{ ...s.inputGroup, gridColumn: '1 / -1' }}>
              <label style={s.label}>Bio</label>
              <textarea style={{ ...s.input, resize: 'vertical' as const }} rows={3} value={bio} onChange={e => setBio(e.target.value)} placeholder="Něco o sobě..." />
            </div>

          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleSave} style={saved ? s.btnSaved : s.btnPrimary}>
              {saved ? '✓ Uloženo!' : 'Uložit profil'}
            </motion.button>
          </div>
        </motion.div>
      </section>

      <footer style={s.footer}>
        <p style={s.footerText}>VAUNT.cz je nezávislá česká komunita. Nespadáme pod Steam ani Valve.<br />© 2026 VAUNT.cz</p>
      </footer>

    </PageWrapper>
  )
}

const s: Record<string, React.CSSProperties> = {
  banner: { width: '100%', height: 180, background: 'linear-gradient(135deg,#0a1a00 0%,#050505 60%,#001a06 100%)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' },
  avatarRow: { display: 'flex', alignItems: 'flex-end', gap: '1.5rem', padding: '0 1.5rem', marginTop: '-3rem' },
  avatar: { width: 96, height: 96, borderRadius: 'var(--radius-sm)', border: '3px solid var(--green)', boxShadow: 'var(--green-glow)', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', flexShrink: 0 },
  name: { fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,5vw,2.8rem)', fontWeight: 900, letterSpacing: '0.02em', textTransform: 'uppercase', lineHeight: 1 },
  url: { fontSize: '0.8rem', color: 'var(--green)', letterSpacing: '0.06em', marginTop: '0.25rem' },
  meta: { display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.5rem', flexWrap: 'wrap' },
  badge: { display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-display)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.28rem 0.7rem', borderRadius: 99, border: '1px solid var(--border)', background: 'var(--surface-2)', color: 'var(--text-sub)' },
  badgeGreen: { display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-display)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.28rem 0.7rem', borderRadius: 99, border: '1px solid rgba(127,255,0,0.4)', background: 'rgba(127,255,0,0.08)', color: 'var(--green)' },
  dot: { width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' },
  sectionLabel: { display: 'flex', alignItems: 'center', gap: '0.6rem', fontFamily: 'var(--font-display)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '1.2rem' },
  labelLine: { display: 'block', width: 20, height: 2, background: 'var(--green)', borderRadius: 99 },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem' },
  statCard: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.75rem 1.5rem', boxShadow: 'var(--green-glow)', transition: 'box-shadow 0.3s' },
  statNum: { fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem,5vw,3.8rem)', fontWeight: 900, color: 'var(--green)', textShadow: 'var(--green-glow-sm)', lineHeight: 1 },
  statLabel: { fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-sub)', marginTop: '0.35rem' },
  divider: { border: 'none', borderTop: '1px solid var(--border)', margin: '2.5rem 0' },
  card: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.75rem' },
  settingsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.45rem' },
  label: { fontFamily: 'var(--font-display)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-sub)' },
  input: { width: '100%', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '0.95rem', padding: '0.7rem 1rem', outline: 'none' },
  prefixWrap: { display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden', background: 'var(--surface-2)' },
  prefix: { fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--green)', padding: '0 0.75rem', background: 'rgba(127,255,0,0.06)', borderRight: '1px solid var(--border)', whiteSpace: 'nowrap' },
  btnPrimary: { fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.75rem 1.6rem', borderRadius: 'var(--radius-sm)', background: 'var(--green)', color: 'var(--bg)', border: 'none', cursor: 'pointer', boxShadow: 'var(--green-glow-sm)' },
  btnSaved: { fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.75rem 1.6rem', borderRadius: 'var(--radius-sm)', background: '#3a7a00', color: '#fff', border: 'none', cursor: 'pointer' },
  footer: { borderTop: '1px solid var(--border)', marginTop: '4rem', paddingTop: '2rem', textAlign: 'center' },
  footerText: { fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.8 },
}