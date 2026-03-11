import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSteam } from 'react-icons/fa'
import { HiMenu, HiX } from 'react-icons/hi'

const links = [
  { href: '/',        label: 'Domů'    },
  { href: '/o-nas',   label: 'O nás'   },
  { href: '/tym',     label: 'Tým'     },
]

export default function Navbar({ onSteamClick }: { onSteamClick?: () => void }) {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          Vaunt<span>.cz</span>
        </Link>

        {/* Desktop links */}
        <ul className="navbar-links">
          {links.map(l => (
            <li key={l.href}>
              <Link
                to={l.href}
                className={pathname === l.href ? 'active' : ''}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Steam button */}
          <motion.button
            onClick={onSteamClick}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.5rem 1.2rem',
              background: 'var(--green)', color: '#000',
              fontWeight: 800, fontSize: '0.75rem',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              border: 'none', cursor: 'pointer',
              clipPath: 'polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)',
            }}
            whileHover={{ backgroundColor: '#56d91a', y: -1 }}
            whileTap={{ scale: 0.97 }}
          >
            <FaSteam style={{ fontSize: '1rem' }} />
            <span className="steam-label">Přihlásit přes Steam</span>
          </motion.button>

          {/* Burger — mobile only */}
          <button
            onClick={() => setOpen(o => !o)}
            style={{
              display: 'none', background: 'none',
              border: 'none', color: 'var(--text)',
              fontSize: '1.4rem', cursor: 'pointer',
              lineHeight: 1,
            }}
            className="burger"
          >
            {open ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', top: '64px', left: 0, right: 0, zIndex: 999,
              background: 'rgba(0,0,0,0.97)',
              borderBottom: '1px solid var(--border)',
              padding: '0.5rem 1.5rem 1.25rem',
            }}
          >
            {links.map(l => (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setOpen(false)}
                style={{
                  display: 'block', padding: '0.85rem 0',
                  color: pathname === l.href ? 'var(--green)' : 'var(--text)',
                  fontWeight: 700, fontSize: '0.95rem',
                  borderBottom: '1px solid var(--border)',
                  textDecoration: 'none',
                  letterSpacing: '0.05em',
                }}
              >
                {l.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .navbar-links  { display: none !important; }
          .burger        { display: block !important; }
          .steam-label   { display: none; }
        }
      `}</style>
    </>
  )
}
