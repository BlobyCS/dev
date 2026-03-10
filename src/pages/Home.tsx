import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FaSteam } from 'react-icons/fa'
import PageWrapper from '../components/Wrapper'

export default function Home() {
  const navigate = useNavigate()

  return (
    <PageWrapper>
      <section style={s.hero}>
        <div style={s.bg} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={s.meta}
          >
            <span style={s.badge}><span style={s.dot} />Online · 247 hráčů</span>
            <span style={{ ...s.badge, color: 'var(--text-sub)', borderColor: 'var(--border)', background: 'transparent' }}>CS2 Community</span>
          </motion.div>

          <h1 style={s.title}>
            VAUNT<span style={s.accent}>.cz</span>
          </h1>

          <p style={s.sub}>
            Nezávislá česká CS2 komunita.<br />
            Servery, skiny, hráči — na jednom místě.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            style={s.buttons}
          >
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: 'var(--green-glow)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/dashboard')}
              style={s.btnPrimary}
            >
              <FaSteam size={16} />
              Přihlásit přes Steam
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/about')}
              style={s.btnOutline}
            >
              Zjistit více →
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section style={{ marginTop: '5rem' }}>
        <div style={s.sectionLabel}><span style={s.labelLine} />Proč VAUNT</div>
        <div style={s.grid}>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
              whileHover={{ y: -4, boxShadow: 'var(--green-glow)' }}
              style={s.featureCard}
            >
              <span style={{ fontSize: '1.8rem' }}>{f.icon}</span>
              <div style={s.featureTitle}>{f.title}</div>
              <div style={s.featureDesc}>{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={s.cta}
      >
        <h2 style={s.ctaTitle}>Připrav se na server</h2>
        <p style={s.ctaSub}>Přihlas se přes Steam a okamžitě přistup ke svému profilu, vybavení a statistikám.</p>
        <motion.button
          whileHover={{ scale: 1.04, boxShadow: 'var(--green-glow)' }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/dashboard')}
          style={s.btnPrimary}
        >
          <FaSteam size={16} />
          Začít hrát
        </motion.button>
      </motion.section>

      <footer style={s.footer}>
        <p style={s.footerText}>
          VAUNT.cz je nezávislá česká komunita. Nespadáme pod Steam ani Valve.<br />
          © 2026 VAUNT.cz — Všechna práva vyhrazena.
        </p>
      </footer>
    </PageWrapper>
  )
}

const features = [
  { icon: '🎮', title: 'Herní servery',     desc: 'Dedikované CS2 servery s vlastními pluginy a nastaveními 24/7.' },
  { icon: '🔫', title: 'Custom vybavení',   desc: 'Coming Soon.' },
  { icon: '📊', title: 'Statistiky',        desc: 'K/D, win rate, žebříčky a měsíční přehledy.' },
  { icon: '💬', title: 'Discord komunita',  desc: 'Coming Soon' },
]

const s: Record<string, React.CSSProperties> = {
  hero: {
    minHeight: '75vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    padding: '4rem 0',
    overflow: 'hidden',
  },
  bg: {
    position: 'absolute', inset: 0,
    background: `
      radial-gradient(ellipse 80% 60% at 60% 40%, rgba(127,255,0,0.05) 0%, transparent 70%),
      repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(127,255,0,0.02) 39px, rgba(127,255,0,0.02) 40px),
      repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(127,255,0,0.02) 39px, rgba(127,255,0,0.02) 40px)
    `,
    pointerEvents: 'none',
  },
  meta: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' },
  badge: {
    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
    fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: 700,
    letterSpacing: '0.12em', textTransform: 'uppercase',
    padding: '0.3rem 0.75rem', borderRadius: 99,
    border: '1px solid rgba(127,255,0,0.4)',
    background: 'rgba(127,255,0,0.08)', color: 'var(--green)',
  },
  dot: { width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 6px var(--green)', display: 'inline-block' },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(5rem,16vw,11rem)',
    fontWeight: 900,
    lineHeight: 0.88,
    letterSpacing: '-0.02em',
    textTransform: 'uppercase',
    color: 'var(--text)',
  },
  accent: { color: 'var(--green)', textShadow: '0 0 40px rgba(127,255,0,0.4), 0 0 100px rgba(127,255,0,0.15)' },
  sub: {
    color: 'var(--text-sub)', marginTop: '1.5rem',
    fontSize: 'clamp(1rem,2.5vw,1.2rem)', lineHeight: 1.7, maxWidth: 500,
  },
  buttons: { display: 'flex', gap: '0.75rem', marginTop: '2.5rem', flexWrap: 'wrap' },
  btnPrimary: {
    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
    fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem',
    letterSpacing: '0.1em', textTransform: 'uppercase',
    padding: '0.8rem 1.8rem', borderRadius: 'var(--radius-sm)',
    background: 'var(--green)', color: 'var(--bg)', border: 'none',
    cursor: 'pointer', boxShadow: 'var(--green-glow-sm)',
  },
  btnOutline: {
    fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem',
    letterSpacing: '0.1em', textTransform: 'uppercase',
    padding: '0.8rem 1.8rem', borderRadius: 'var(--radius-sm)',
    background: 'transparent', color: 'var(--green)',
    border: '1.5px solid var(--green)', cursor: 'pointer',
  },
  sectionLabel: {
    display: 'flex', alignItems: 'center', gap: '0.6rem',
    fontFamily: 'var(--font-display)', fontSize: '0.7rem', fontWeight: 700,
    letterSpacing: '0.22em', textTransform: 'uppercase',
    color: 'var(--green)', marginBottom: '1.5rem',
  },
  labelLine: { display: 'block', width: 20, height: 2, background: 'var(--green)', borderRadius: 99 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' },
  featureCard: {
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius)', padding: '1.75rem 1.5rem',
    display: 'flex', flexDirection: 'column', gap: '0.75rem',
    transition: 'border-color 0.3s',
  },
  featureTitle: {
    fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.05rem',
    letterSpacing: '0.06em', textTransform: 'uppercase',
  },
  featureDesc: { fontSize: '0.85rem', color: 'var(--text-sub)', lineHeight: 1.65 },
  cta: {
    marginTop: '5rem',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '3rem 2.5rem',
    textAlign: 'center',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
    boxShadow: 'var(--green-glow)',
  },
  ctaTitle: {
    fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,5vw,3rem)',
    fontWeight: 900, textTransform: 'uppercase',
  },
  ctaSub: { color: 'var(--text-sub)', maxWidth: 460, lineHeight: 1.7, fontSize: '0.95rem' },
  footer: { borderTop: '1px solid var(--border)', marginTop: '5rem', paddingTop: '2rem', textAlign: 'center' },
  footerText: { fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.8 },
}