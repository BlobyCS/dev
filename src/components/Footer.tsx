import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaDiscord, FaYoutube, FaInstagram, FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const navLinks = [
  { href: '/',        label: 'Domů'    },
  { href: '/o-nas',   label: 'O nás'   },
  { href: '/tym',     label: 'Tým'     },
]

const legalLinks = [
  { href: '/pravidla',  label: 'Pravidla'            },
  { href: '/soukromi',  label: 'Ochrana soukromí'    },
]

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      marginTop: '4rem',
      background: 'var(--surface)',
    }}>
      {/* Top */}
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: '3rem 2.5rem 2rem',
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr 1fr',
        gap: '2.5rem',
      }}
        className="footer-grid"
      >
        {/* Brand */}
        <div>
          <Link to="/" style={{
            fontWeight: 900, fontSize: '1.3rem',
            letterSpacing: '-0.5px', textTransform: 'uppercase',
            color: 'var(--green)', textDecoration: 'none',
          }}>
            Vaunt<span style={{ color: 'var(--text)' }}>.cz</span>
          </Link>
          <p style={{
            marginTop: '0.75rem', fontSize: '0.82rem',
            color: 'var(--muted)', lineHeight: 1.7, maxWidth: '260px',
          }}>
            Komunitní CS2 portál pro českou a slovenskou scénu.
            Servery, statistiky, hráčské profily.
          </p>
        </div>

        {/* Nav */}
        <div>
          <div style={{
            fontSize: '0.68rem', fontWeight: 700,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--green)', marginBottom: '1rem',
          }}>
            Navigace
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {navLinks.map(l => (
              <li key={l.href}>
                <Link to={l.href} style={{
                  fontSize: '0.85rem', color: 'var(--muted)',
                  textDecoration: 'none', fontWeight: 500,
                  transition: 'color 0.2s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--green)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: '1.25rem 2.5rem',
        borderTop: '1px solid var(--border)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem',
      }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
          © {new Date().getFullYear()} Vaunt.cz — Všechna práva vyhrazena.
        </span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {legalLinks.map(l => (
            <Link key={l.href} to={l.href} style={{
              fontSize: '0.75rem', color: 'var(--muted)',
              textDecoration: 'none', transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--green)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </footer>
  )
}
