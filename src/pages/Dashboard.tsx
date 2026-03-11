import { useState } from 'react'
import { usePageTitle } from '../hooks/usePageTitle'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaSteam, FaUser, FaChartBar, FaCog, FaSignOutAlt,
  FaDiscord, FaInstagram, FaSave, FaCopy, FaCheck,
} from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

type Tab = 'stats' | 'profile'
type MockUser = {
  name: string
  avatar: string
  steamId: string
  slug: string
  discord: string
  instagram: string
  twitter: string
}

const MOCK_USER: MockUser = {
  name:      'Hráč#1234',
  avatar:    'https://avatars.fastly.steamstatic.com/7843db5394166ab39c4f3cfcd814614734fc74c4_full.jpg',
  steamId:   '76561198000000000',
  slug:      '',
  discord:   '',
  instagram: '',
  twitter:   '',
}

const MOCK_STATS = {
  kills:   1248,
  deaths:  873,
  kd:      '1.43',
  hours:   214,
  wins:    88,
  mvp:     34,
  hs:      '42%',
  matches: 160,
}

function StatBox({ val, lbl }: { val: string | number; lbl: string }) {
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      padding: '1rem 1.25rem', textAlign: 'center',
    }}>
      <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--green)', lineHeight: 1 }}>
        {val}
      </div>
      <div style={{
        fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em',
        textTransform: 'uppercase', color: 'var(--muted)', marginTop: '0.35rem',
      }}>
        {lbl}
      </div>
    </div>
  )
}


function FormField({
  label, value, onChange, placeholder, prefix,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  prefix?: string
}) {
  return (
    <div style={{ marginBottom: '1.1rem' }}>
      <label className="form-label">{label}</label>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {prefix && (
          <span style={{
            padding: '0.65rem 0.75rem',
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRight: 'none', color: 'var(--muted)',
            fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap',
          }}>
            {prefix}
          </span>
        )}
        <input
          className="input"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ borderRadius: 0 }}
        />
      </div>
    </div>
  )
}

export default function DashboardPage() {
  usePageTitle('Dashboard')

  const [loggedIn, setLoggedIn]     = useState(false)
  const [tab, setTab]               = useState<Tab>('stats')
  const [user, setUser]             = useState<MockUser>(MOCK_USER)
  const [saved, setSaved]           = useState(false)
  const [copied, setCopied]         = useState(false)

  function handleSteamLogin() {
    // V produkci: přesměrovat na Steam OpenID endpoint
    // window.location.href = '/api/auth/steam'
    setLoggedIn(true)
  }

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  function handleCopySlug() {
    navigator.clipboard.writeText(`vaunt.cz/p/${user.slug}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!loggedIn) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        paddingTop: '64px', padding: '64px 1.5rem 2rem',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: 'var(--surface2)',
            border: '1px solid var(--border)',
            padding: '3rem 2.5rem',
            width: '100%', maxWidth: '420px',
            clipPath: 'polygon(18px 0%,100% 0%,calc(100% - 18px) 100%,0% 100%)',
            textAlign: 'center',
          }}
        >
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'rgba(68,176,21,0.1)',
            border: '1px solid var(--green-dim)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.5rem',
            fontSize: '1.5rem', color: 'var(--green)',
          }}>
            <FaUser />
          </div>

          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.5rem' }}>
            Dashboard
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
            Pro přístup k dashboardu se musíš přihlásit přes Steam.
            Po přihlášení uvidíš své statistiky a nastavení profilu.
          </p>

          <motion.button
            onClick={handleSteamLogin}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              gap: '0.6rem', width: '100%', padding: '0.85rem 1.5rem',
              background: 'var(--green)', color: '#000',
              fontWeight: 800, fontSize: '0.85rem',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              border: 'none', cursor: 'pointer',
              clipPath: 'polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)',
            }}
            whileHover={{ backgroundColor: '#56d91a', y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <FaSteam style={{ fontSize: '1.1rem' }} />
            Přihlásit přes Steam
          </motion.button>

          <p style={{ marginTop: '1rem', fontSize: '0.72rem', color: 'var(--muted)' }}>
            Přihlášením souhlasíš s{' '}
            <a href="/pravidla" style={{ color: 'var(--green)' }}>pravidly</a> Vaunt.cz.
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: '64px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem 2.5rem' }}>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
            marginBottom: '2.5rem',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img
              src={user.avatar}
              alt={user.name}
              style={{
                width: 52, height: 52, borderRadius: 4,
                border: '2px solid var(--green-dim)', objectFit: 'cover',
              }}
            />
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 900 }}>{user.name}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '0.15rem' }}>
                Steam ID: {user.steamId}
              </div>
            </div>
          </div>

          <motion.button
            onClick={() => setLoggedIn(false)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.45rem 1rem',
              background: 'transparent', color: 'var(--muted)',
              fontWeight: 700, fontSize: '0.75rem',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              border: '1px solid var(--border)', cursor: 'pointer',
              clipPath: 'polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)',
            }}
            whileHover={{ borderColor: '#ff4444', color: '#ff4444' }}
            whileTap={{ scale: 0.96 }}
          >
            <FaSignOutAlt /> Odhlásit
          </motion.button>
        </motion.div>

        <div className="tabs" style={{ marginBottom: '2rem' }}>
          <button
            className={`tab ${tab === 'stats' ? 'active' : ''}`}
            onClick={() => setTab('stats')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <FaChartBar style={{ fontSize: '0.78rem' }} /> Statistiky
          </button>
          <button
            className={`tab ${tab === 'profile' ? 'active' : ''}`}
            onClick={() => setTab('profile')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <FaCog style={{ fontSize: '0.78rem' }} /> Nastavení profilu
          </button>
        </div>

        <AnimatePresence mode="wait">
          {tab === 'stats' && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '0.85rem',
                marginBottom: '1.5rem',
              }}>
                <StatBox val={MOCK_STATS.kills}   lbl="Zabití"          />
                <StatBox val={MOCK_STATS.deaths}  lbl="Úmrtí"           />
                <StatBox val={MOCK_STATS.kd}      lbl="K/D Ratio"       />
                <StatBox val={MOCK_STATS.hs}      lbl="Headshot %"      />
                <StatBox val={MOCK_STATS.wins}    lbl="Vítězství"       />
                <StatBox val={MOCK_STATS.mvp}     lbl="MVP"             />
                <StatBox val={MOCK_STATS.matches} lbl="Zápasy"          />
                <StatBox val={MOCK_STATS.hours}   lbl="Odehrané hodiny" />
              </div>

              <div style={{
                padding: '1rem 1.25rem',
                background: 'rgba(68,176,21,0.05)',
                borderLeft: '2px solid var(--green)',
                fontSize: '0.8rem', color: 'var(--muted)',
              }}>
                📡 Statistiky jsou napojeny na{' '}
                <span style={{ color: 'var(--green)', fontWeight: 700 }}>Fakaheda API</span>
                {' '}— SERVER_ID: 431518. Data se aktualizují po každém zápase.
              </div>
            </motion.div>
          )}

          {tab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {user.slug && (
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0.85rem 1.1rem', marginBottom: '1.5rem',
                  background: 'rgba(68,176,21,0.06)',
                  border: '1px solid var(--green-dim)',
                  clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)',
                  flexWrap: 'wrap', gap: '0.5rem',
                }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text)', fontWeight: 600 }}>
                    vaunt.cz/p/<span style={{ color: 'var(--green)' }}>{user.slug}</span>
                  </span>
                  <motion.button
                    onClick={handleCopySlug}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                      padding: '0.3rem 0.75rem',
                      background: 'transparent', color: copied ? 'var(--green)' : 'var(--muted)',
                      fontWeight: 700, fontSize: '0.72rem',
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      border: `1px solid ${copied ? 'var(--green)' : 'var(--border)'}`,
                      cursor: 'pointer',
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {copied ? <FaCheck /> : <FaCopy />}
                    {copied ? 'Zkopírováno!' : 'Kopírovat'}
                  </motion.button>
                </div>
              )}

              <FormField
                label="Tvůj URL slug"
                prefix="vaunt.cz/p/"
                value={user.slug}
                onChange={v => setUser(u => ({ ...u, slug: v }))}
                placeholder="tvojenick"
              />

              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem',
              }}
                className="profile-grid"
              >
                <FormField
                  label="Discord User ID"
                  value={user.discord}
                  onChange={v => setUser(u => ({ ...u, discord: v }))}
                  placeholder="123456789012345678"
                />
                <FormField
                  label="Instagram"
                  prefix="@"
                  value={user.instagram}
                  onChange={v => setUser(u => ({ ...u, instagram: v }))}
                  placeholder="tvojenick"
                />
                <FormField
                  label="X / Twitter"
                  prefix="@"
                  value={user.twitter}
                  onChange={v => setUser(u => ({ ...u, twitter: v }))}
                  placeholder="tvojenick"
                />
              </div>
              
              {(user.discord || user.instagram || user.twitter) && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <div className="form-label" style={{ marginBottom: '0.6rem' }}>Náhled odkazů</div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {user.discord && (
                      <a
                        href={`https://discord.com/users/${user.discord}`}
                        target="_blank" rel="noreferrer"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                          padding: '0.4rem 0.85rem',
                          background: 'var(--surface)', border: '1px solid var(--border)',
                          color: 'var(--muted)', fontSize: '0.78rem', fontWeight: 600,
                          textDecoration: 'none',
                        }}
                      >
                        <FaDiscord /> Discord
                      </a>
                    )}
                    {user.instagram && (
                      <a
                        href={`https://instagram.com/${user.instagram}`}
                        target="_blank" rel="noreferrer"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                          padding: '0.4rem 0.85rem',
                          background: 'var(--surface)', border: '1px solid var(--border)',
                          color: 'var(--muted)', fontSize: '0.78rem', fontWeight: 600,
                          textDecoration: 'none',
                        }}
                      >
                        <FaInstagram /> @{user.instagram}
                      </a>
                    )}
                    {user.twitter && (
                      <a
                        href={`https://x.com/${user.twitter}`}
                        target="_blank" rel="noreferrer"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                          padding: '0.4rem 0.85rem',
                          background: 'var(--surface)', border: '1px solid var(--border)',
                          color: 'var(--muted)', fontSize: '0.78rem', fontWeight: 600,
                          textDecoration: 'none',
                        }}
                      >
                        <FaXTwitter /> @{user.twitter}
                      </a>
                    )}
                  </div>
                </div>
              )}

              <motion.button
                onClick={handleSave}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.75rem 2rem',
                  background: saved ? 'var(--green-dim)' : 'var(--green)',
                  color: '#000', fontWeight: 800, fontSize: '0.82rem',
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  border: 'none', cursor: 'pointer',
                  clipPath: 'polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)',
                }}
                whileHover={{ backgroundColor: '#56d91a', y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                {saved ? <FaCheck /> : <FaSave />}
                {saved ? 'Uloženo!' : 'Uložit profil'}
              </motion.button>

              <p style={{ marginTop: '0.75rem', fontSize: '0.72rem', color: 'var(--muted)' }}>
                Data se ukládají do{' '}
                <span style={{ color: 'var(--green)', fontWeight: 700 }}>Lokální databáze</span>.
                Profil bude veřejný na vaunt.cz/p/{user.slug || '{slug}'}.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .profile-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}