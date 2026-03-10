import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import PageWrapper from '../components/Wrapper'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <PageWrapper style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', textAlign: 'center' }}>
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(6rem,20vw,14rem)', fontWeight: 900, color: 'var(--green)', opacity: 0.1, lineHeight: 1, userSelect: 'none' }}>
        404
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,8vw,4rem)', fontWeight: 900, textTransform: 'uppercase', marginTop: '-2rem' }}>
          Stránka <span style={{ color: 'var(--green)' }}>nenalezena</span>
        </h1>
        <p style={{ color: 'var(--text-sub)', marginTop: '1rem' }}>Tato stránka neexistuje nebo byla přesunuta.</p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/dashboard')} style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.75rem 1.6rem', borderRadius: 'var(--radius-sm)', background: 'var(--green)', color: 'var(--bg)', border: 'none', cursor: 'pointer' }}>
            ← Dashboard
          </motion.button>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/about')} style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.75rem 1.6rem', borderRadius: 'var(--radius-sm)', background: 'var(--surface-2)', color: 'var(--text)', border: '1px solid var(--border)', cursor: 'pointer' }}>
            O nás
          </motion.button>
        </div>
      </motion.div>
    </PageWrapper>
  )
}
