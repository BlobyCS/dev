import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'
import { FaSteam } from 'react-icons/fa'

const links = [
  { to: '/', label: 'Domů'},
  { to: '/about', label: 'O nás' },
  { to: '/team', label: 'Tým' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleSteam = () => {
    setOpen(false)
    navigate('/dashboard')
  }

  return (
    <nav style={nav}>
      <NavLink to="/" style={logo}>
        <span style={{ color: '#444' }}>[</span>
        VAUNT
        <span style={{ color: '#f0f0f0' }}>.</span>
        cz
        <span style={{ color: '#444' }}>]</span>
      </NavLink>

      <ul style={linksList}>
        {links.map(l => (
          <li key={l.to}>
            <NavLink
              to={l.to}
              style={({ isActive }) => ({
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.95rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                padding: '0.45rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                textDecoration: 'none',
                color: isActive ? 'var(--green)' : 'var(--text-sub)',
                background: isActive ? 'var(--green-dim)' : 'transparent',
              })}
            >
              {l.label}
            </NavLink>
          </li>
        ))}
        <li>
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: 'var(--green-glow)' }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSteam}
            style={steamBtn}
          >
            <FaSteam size={15} />
            Přihlásit přes Steam
          </motion.button>
        </li>
      </ul>

      <button style={burger} onClick={() => setOpen(v => !v)}>
        {open
          ? <RiCloseLine size={24} color="var(--green)" />
          : <RiMenu3Line size={24} color="var(--text)" />
        }
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            style={mobileMenu}
          >
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                style={({ isActive }) => ({
                  fontFamily: 'var(--font-display)',
                  fontSize: '2rem',
                  fontWeight: 900,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase' as const,
                  textDecoration: 'none',
                  color: isActive ? 'var(--green)' : 'var(--text)',
                })}
              >
                {l.label}
              </NavLink>
            ))}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleSteam}
              style={{ ...steamBtn, fontSize: '1.1rem', padding: '0.8rem 2rem', marginTop: '0.5rem' }}
            >
              <FaSteam size={20} />
              Přihlásit přes Steam
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

const nav: React.CSSProperties = {
  position: 'fixed',
  top: 0, left: 0, right: 0,
  height: 'var(--nav-h)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 clamp(1rem,4vw,2.5rem)',
  background: 'rgba(5,5,5,0.88)',
  backdropFilter: 'blur(18px)',
  borderBottom: '1px solid var(--border)',
  zIndex: 1000,
}

const logo: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: '1.5rem',
  fontWeight: 900,
  letterSpacing: '0.08em',
  color: 'var(--green)',
  textShadow: 'var(--green-glow-sm)',
  textDecoration: 'none',
}

const linksList: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
  listStyle: 'none',
}

const steamBtn: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontFamily: 'var(--font-display)',
  fontWeight: 800,
  fontSize: '0.88rem',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  padding: '0.5rem 1.1rem',
  borderRadius: 'var(--radius-sm)',
  background: 'var(--green)',
  color: 'var(--bg)',
  border: 'none',
  cursor: 'pointer',
  boxShadow: 'var(--green-glow-sm)',
  whiteSpace: 'nowrap',
}

const burger: React.CSSProperties = {
  display: 'none',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '6px',
}

const mobileMenu: React.CSSProperties = {
  position: 'fixed',
  top: 'var(--nav-h)',
  left: 0, right: 0, bottom: 0,
  background: 'rgba(5,5,5,0.97)',
  backdropFilter: 'blur(20px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.5rem',
  zIndex: 999,
}