import { usePageTitle } from '../hooks/usePageTitle'
import { motion } from 'framer-motion'
import { teamMembers } from '../lib/team'
import {
  FaInstagram, FaDiscord, FaYoutube, FaGithub, FaEnvelope,
} from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

type SocialLink = { icon: React.ReactNode; href: string; label: string }

function getSocials(m: typeof teamMembers[0]): SocialLink[] {
  const s: SocialLink[] = []
  if (m.instagram) s.push({ icon: <FaInstagram />, href: m.instagram, label: 'Instagram' })
  if (m.discord)   s.push({ icon: <FaDiscord />,   href: m.discord,   label: 'Discord'   })
  if (m.youtube)   s.push({ icon: <FaYoutube />,   href: m.youtube,   label: 'YouTube'   })
  if (m.github)    s.push({ icon: <FaGithub />,    href: m.github,    label: 'GitHub'    })
  if (m.twitter)   s.push({ icon: <FaXTwitter />,  href: m.twitter,   label: 'X'         })
  return s
}

export default function TeamPage() {
  usePageTitle('Tým')

  return (
    <div style={{ minHeight: '100vh', paddingTop: '64px' }}>
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 2.5rem' }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: '3rem' }}
        >
          <div className="section-label">Za projektem stojí</div>
          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1,
            marginBottom: '1rem',
          }}>
            Náš <span style={{ color: 'var(--green)' }}>Tým</span>
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--muted)', maxWidth: '480px', lineHeight: 1.7 }}>
            Lidé, kteří stojí za Vaunt.cz. Hráči, správci a nadšenci
            z české a slovenské CS2 scény.
          </p>
        </motion.div>

        {/* ── Cards ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.25rem',
        }}>
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={i}
              whileHover={{ borderColor: 'var(--green)', backgroundColor: 'rgba(68,176,21,0.03)' }}
              style={{
                background: 'var(--surface2)',
                border: '1px solid var(--border)',
                padding: '1.75rem',
                clipPath: 'polygon(14px 0%,100% 0%,calc(100% - 14px) 100%,0% 100%)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 0.25s, background-color 0.25s',
              }}
            >
              {/* Glow blob */}
              <div style={{
                position: 'absolute', top: -40, right: -40,
                width: 120, height: 120,
                borderRadius: '50%',
                background: 'var(--green-glow)',
                filter: 'blur(40px)',
                pointerEvents: 'none',
                opacity: 0.5,
              }} />

              {/* Avatar + name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                <img
                  src={member.avatar}
                  alt={member.name}
                  onError={e => {
                    (e.currentTarget as HTMLImageElement).src =
                      `https://placehold.co/64x64/111/44b015?text=${member.name[0]}`
                  }}
                  style={{
                    width: 64, height: 64,
                    borderRadius: 4,
                    border: '2px solid var(--border)',
                    objectFit: 'cover',
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 900, letterSpacing: '-0.02em' }}>
                    {member.name}
                  </div>
                  <div style={{
                    fontSize: '0.7rem', fontWeight: 800,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: member.rankColor, marginTop: '0.2rem',
                  }}>
                    {member.rank}
                  </div>
                </div>
              </div>

              {/* Social icons */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {getSocials(member).map(s => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    title={s.label}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: 32, height: 32,
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      color: 'var(--muted)',
                      fontSize: '0.88rem',
                      textDecoration: 'none',
                    }}
                    whileHover={{ borderColor: 'var(--green)', color: 'var(--green)', y: -2 }}
                    whileTap={{ scale: 0.92 }}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>

              {/* Email */}
              <motion.a
                href={`mailto:${member.email}`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  fontSize: '0.78rem', color: 'var(--muted)',
                  textDecoration: 'none', fontWeight: 500,
                }}
                whileHover={{ color: 'var(--green)' }}
              >
                <FaEnvelope style={{ fontSize: '0.72rem' }} />
                {member.email}
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom note ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            marginTop: '3rem',
            padding: '1.25rem 1.5rem',
            borderLeft: '2px solid var(--green)',
            background: 'rgba(68,176,21,0.04)',
            fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.7,
          }}
        >
          Chceš se přidat k týmu? Napiš nám na{' '}
          <a href="mailto:info@vaunt.cz" style={{ color: 'var(--green)', fontWeight: 700 }}>
            info@vaunt.cz
          </a>{' '}
          nebo nás kontaktuj přes Discord.
        </motion.div>

      </section>
    </div>
  )
}