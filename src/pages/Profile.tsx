import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { usePageTitle } from '../hooks/usePageTitle'
import { supabase } from '../lib/supabase'
import type { Profile } from '../lib/types'
import { FaDiscord, FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { MdAlternateEmail } from 'react-icons/md'

export default function ProfilePage() {
  const { slug } = useParams<{ slug: string }>()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  usePageTitle(profile?.display_name ?? slug ?? 'Profil')

  useEffect(() => {
    if (!slug) return
    supabase
      .from('profiles')
      .select('*')
      .eq('slug', slug)
      .single()
      .then(({ data, error }) => {
        if (error || !data) setNotFound(true)
        else setProfile(data)
        setLoading(false)
      })
  }, [slug])

  /* ── Loading ── */
  if (loading) return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      gap: '0.75rem', paddingTop: '64px',
      color: 'var(--muted)', fontSize: '0.9rem',
    }}>
      <span className="spinner" /> Načítám profil…
    </div>
  )

  /* ── 404 ── */
  if (notFound) return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: '1rem', paddingTop: '64px', textAlign: 'center', padding: '2rem',
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div style={{ fontSize: '5rem', fontWeight: 900, color: 'var(--border)', lineHeight: 1 }}>404</div>
        <div style={{ fontSize: '1rem', color: 'var(--muted)', margin: '0.75rem 0 1.5rem' }}>
          Hráč{' '}
          <span style={{ color: 'var(--green)', fontWeight: 700 }}>vaunt.cz/p/{slug}</span>
          {' '}neexistuje.
        </div>
        <Link to="/">
          <motion.button
            style={{
              padding: '0.65rem 1.5rem',
              background: 'var(--green)', color: '#000',
              fontWeight: 800, fontSize: '0.8rem',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              border: 'none', cursor: 'pointer',
              clipPath: 'polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)',
            }}
            whileHover={{ backgroundColor: '#56d91a', y: -1 }}
            whileTap={{ scale: 0.97 }}
          >
            Zpět domů
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )

  const socials = [
    profile?.discord_id && {
      icon: <FaDiscord />,
      label: 'Discord',
      href: `https://discord.com/users/${profile.discord_id}`,
      text: profile.discord_id,
    },
    profile?.instagram && {
      icon: <FaInstagram />,
      label: 'Instagram',
      href: `https://instagram.com/${profile.instagram.replace('@', '')}`,
      text: profile.instagram,
    },
    profile?.twitter && {
      icon: <FaXTwitter />,
      label: 'X',
      href: `https://x.com/${profile.twitter.replace('@', '')}`,
      text: profile.twitter,
    },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; href: string; text: string }[]

  /* ── Profile ── */
  return (
    <div style={{ minHeight: '100vh', paddingTop: '64px' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '60px 2.5rem' }}>

        {/* ── Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: 'var(--surface2)',
            border: '1px solid var(--border)',
            clipPath: 'polygon(18px 0%,100% 0%,calc(100% - 18px) 100%,0% 100%)',
            overflow: 'hidden',
          }}
        >
          {/* Green top accent */}
          <div style={{ height: 3, background: 'var(--green)' }} />

          <div style={{ padding: '2rem' }}>
            {/* Avatar + info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.75rem' }}>
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.display_name}
                  style={{
                    width: 80, height: 80,
                    borderRadius: 4,
                    border: '2px solid var(--border)',
                    objectFit: 'cover', flexShrink: 0,
                  }}
                />
              ) : (
                <div style={{
                  width: 80, height: 80,
                  background: 'rgba(68,176,21,0.1)',
                  border: '2px solid var(--green-dim)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '2rem', fontWeight: 900, color: 'var(--green)',
                  flexShrink: 0,
                }}>
                  {profile?.display_name?.[0]?.toUpperCase() ?? '?'}
                </div>
              )}
              <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.03em' }}>
                  {profile?.display_name}
                </h1>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.25rem',
                }}>
                  <MdAlternateEmail style={{ fontSize: '0.85rem' }} />
                  vaunt.cz/p/{profile?.slug}
                </div>
              </div>
            </div>

            {/* Socials */}
            {socials.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <div style={{
                  fontSize: '0.68rem', fontWeight: 700,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'var(--muted)', marginBottom: '0.25rem',
                }}>
                  Kontakty
                </div>
                {socials.map(s => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.75rem',
                      padding: '0.7rem 1rem',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      color: 'var(--muted)',
                      fontSize: '0.85rem', fontWeight: 600,
                      textDecoration: 'none',
                      clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)',
                    }}
                    whileHover={{ borderColor: 'var(--green)', color: 'var(--green)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span style={{ fontSize: '1rem', color: 'var(--green)' }}>{s.icon}</span>
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.78rem', minWidth: 64 }}>{s.label}</span>
                    <span>{s.text}</span>
                  </motion.a>
                ))}
              </div>
            )}

            {socials.length === 0 && (
              <p style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
                Hráč zatím nemá propojené žádné sociální sítě.
              </p>
            )}
          </div>
        </motion.div>

        {/* ── Back link ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          style={{ marginTop: '1.5rem', textAlign: 'center' }}
        >
          <Link to="/" style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 600 }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--green)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >
            ← Zpět na Vaunt.cz
          </Link>
        </motion.div>

      </div>
    </div>
  )
}