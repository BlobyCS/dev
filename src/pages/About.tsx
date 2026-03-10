import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import PageWrapper from '../components/Wrapper'

const features = [
  { icon: '🎮', title: 'Herní servery 24/7', desc: 'Dedikované CS2 servery s vlastními pluginy, skiny a nastaveními.' },
  { icon: '📊', title: 'Statistiky & žebříčky', desc: 'Sleduj své K/D, vyhráné zápasy a pozici v komunitním žebříčku.' },
  { icon: '🔫', title: 'Brzy', desc: 'Coming soon.' },
]

export default function About() {
  const navigate = useNavigate()

  return (
    <PageWrapper>
      <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ padding: '2rem 0' }}>
        <div style={s.sectionLabel}><span style={s.labelLine} />Kdo jsme</div>
        <h1 style={s.heroTitle}>O <span style={{ color: 'var(--green)', textShadow: 'var(--green-glow)' }}>VAUNT</span>.cz</h1>
        <p style={s.heroSub}>Vznikli jsme z lásky k Counter-Strike. Nejsme korporát — jsme hráči, kteří postavili něco vlastního, pro českou komunitu.</p>
      </motion.section>

      <hr style={s.divider} />

      <div style={s.body}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15, duration: 0.45 }} style={s.text}>
          <p style={s.p}><strong>VAUNT.cz</strong> je nezávislá česká CS2 komunita. Provozujeme herní servery, komunitu na Discordu a portál pro hráče. Naším cílem je vytvořit místo, kde se hráči setkávají, sdílí loadouty, měří statistiky — bez reklam, bez BS. Jsme <strong>nezávislá komunita</strong> — nespadáme pod Steam ani Valve.</p>
          <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/dashboard')} style={{ ...s.btn, marginTop: '1.5rem' }}>
            Přidat se →
          </motion.button>
        </motion.div>

        <div style={s.features}>
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }} whileHover={{ y: -3, boxShadow: 'var(--green-glow)' }} style={s.featureCard}>
              <span style={{ fontSize: '1.5rem' }}>{f.icon}</span>
              <div>
                <div style={s.featureTitle}>{f.title}</div>
                <div style={s.featureDesc}>{f.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <footer style={s.footer}>
        <p style={s.footerText}>VAUNT.cz je nezávislá česká komunita. Nespadáme pod Steam ani Valve.<br />© 2026 VAUNT.cz</p>
      </footer>
    </PageWrapper>
  )
}

const s: Record<string, React.CSSProperties> = {
  sectionLabel: { display: 'flex', alignItems: 'center', gap: '0.6rem', fontFamily: 'var(--font-display)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '1.2rem' },
  labelLine: { display: 'block', width: 20, height: 2, background: 'var(--green)', borderRadius: 99 },
  heroTitle: { fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,10vw,7rem)', fontWeight: 900, lineHeight: 0.92, textTransform: 'uppercase' },
  heroSub: { color: 'var(--text-sub)', marginTop: '1rem', maxWidth: 560, fontSize: '1.05rem', lineHeight: 1.8 },
  divider: { border: 'none', borderTop: '1px solid var(--border)', margin: '2rem 0' },
  body: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start', marginTop: '1rem' },
  text: {},
  p: { color: 'var(--text-sub)', lineHeight: 1.85, marginBottom: '1.2rem' },
  btn: { fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.75rem 1.6rem', borderRadius: 'var(--radius-sm)', background: 'var(--green)', color: 'var(--bg)', border: 'none', cursor: 'pointer', boxShadow: 'var(--green-glow-sm)' },
  features: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  featureCard: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.1rem 1.25rem', display: 'flex', alignItems: 'flex-start', gap: '1rem', transition: 'border-color 0.3s' },
  featureTitle: { fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1rem', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.25rem' },
  featureDesc: { fontSize: '0.85rem', color: 'var(--text-sub)', lineHeight: 1.6 },
  footer: { borderTop: '1px solid var(--border)', marginTop: '4rem', paddingTop: '2rem', textAlign: 'center' },
  footerText: { fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.8 },
}