import { usePageTitle } from  '../hooks/usePageTitle'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaServer, FaUsers, FaChartBar, FaShieldAlt, FaArrowRight, FaFlagCheckered } from 'react-icons/fa'
import { BsFillLightningChargeFill } from 'react-icons/bs'

/* Framer */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

const features = [
  { icon: <BsFillLightningChargeFill />, title: 'Kvalitní servery',    desc: '128-tick servery s nízkým pingem. Žádný lag, žádné výmluvy — jen čistá hra.' },
  { icon: <FaShieldAlt />,               title: 'Anti-cheat',          desc: 'Aktivní ochrana proti cheaterům. Fair play je u nás víc než jen slogan.' },
  { icon: <FaChartBar />,                title: 'Statistiky',          desc: 'Sleduj K/D, headshoty, vítězství. Každý zápas se počítá.' },
  { icon: <FaUsers />,                   title: 'CZ/SK Komunita',      desc: 'Hraj s lidmi, kteří mluví tvým jazykem. Žádná jazyková bariéra.' },
  { icon: <FaServer />,                  title: 'Hráčské profily',     desc: 'Nastav si vlastní vaunt.cz/p/{nick} a propoj Discord, Instagram, X.' },
  { icon: <FaFlagCheckered />,           title: 'Turnaje (brzy)',      desc: 'Plánujeme ligové žebříčky a komunitní turnaje. Připrav se.' },
]

export default function HomePage() {
  usePageTitle('Domů')

  return (
    <div style={{ minHeight: '100vh' }}>
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />

        <motion.div className="hero-tag" variants={fadeUp} initial="hidden" animate="show" custom={0}>
          CS2 Portál CZ/SK
        </motion.div>

        <motion.h1 className="hero-title" variants={fadeUp} initial="hidden" animate="show" custom={1}>
          VAUNT<span className="accent">.CZ</span>
        </motion.h1>

        <motion.p className="hero-sub" variants={fadeUp} initial="hidden" animate="show" custom={2}>
          <strong>Vítej na Vaunt.cz</strong> — kde si užiješ atmosféru CS2 naplno.
          Komunitní portál pro českou a slovenskou scénu.
        </motion.p>

        <motion.div className="hero-cta" variants={fadeUp} initial="hidden" animate="show" custom={3}>
          <Link to="/servery">
            <motion.button
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.75rem 2rem',
                background: 'var(--green)', color: '#000',
                fontWeight: 800, fontSize: '0.82rem',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                border: 'none', cursor: 'pointer',
                clipPath: 'polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)',
              }}
              whileHover={{ backgroundColor: '#56d91a', y: -2, boxShadow: '0 8px 30px rgba(68,176,21,0.35)' }}
              whileTap={{ scale: 0.97 }}
            >
              <FaServer /> Naše Servery
            </motion.button>
          </Link>

          <Link to="/o-nas">
            <motion.button
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.75rem 2rem',
                background: 'transparent', color: 'var(--green)',
                fontWeight: 700, fontSize: '0.82rem',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                border: '1px solid var(--green)', cursor: 'pointer',
                clipPath: 'polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)',
              }}
              whileHover={{ backgroundColor: 'rgba(68,176,21,0.08)', y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Zjistit více <FaArrowRight style={{ fontSize: '0.72rem' }} />
            </motion.button>
          </Link>
        </motion.div>
      </section>

      <section style={{ padding: '80px 2.5rem', maxWidth: '1200px', margin: '0 auto', borderTop: '1px solid var(--border)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
        >
          <div className="section-label">Proč Vaunt.cz</div>
          <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '2.5rem' }}>
            Vše co potřebuješ<br />
            <span style={{ color: 'var(--green)' }}>na jednom místě</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1rem' }}>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="card skew-clip"
              style={{ padding: '1.5rem' }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ borderColor: 'var(--green)', backgroundColor: 'rgba(68,176,21,0.04)' }}
            >
              <div style={{
                width: 36, height: 36,
                background: 'rgba(68,176,21,0.1)',
                border: '1px solid var(--green-dim)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1rem', color: 'var(--green)', fontSize: '1rem',
              }}>
                {f.icon}
              </div>
              <h4 style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--green)', marginBottom: '0.4rem' }}>{f.title}</h4>
              <p style={{ fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section style={{
        padding: '80px 2.5rem', maxWidth: '1200px', margin: '0 auto',
        borderTop: '1px solid var(--border)',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center',
      }}
        className="about-grid-responsive"
      >
        <motion.div
          initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <div className="section-label">O Vaunt.cz</div>
          <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '1.25rem' }}>
            Víc než jen<br /><span style={{ color: 'var(--green)' }}>server</span>
          </h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.75, fontSize: '0.92rem', marginBottom: '0.9rem' }}>
            Vaunt.cz je <span style={{ color: 'var(--text)' }}>nezávislý komunitní portál</span>, který vznikl
            z lásky k CS2 a české herní scéně. Nejsme jen server — jsme místo,
            kde se setkávají hráči, kteří to myslí vážně.
          </p>
          <p style={{ color: 'var(--muted)', lineHeight: 1.75, fontSize: '0.92rem', marginBottom: '1.5rem' }}>
            Nabízíme <span style={{ color: 'var(--green)', fontWeight: 700 }}>prémiový herní zážitek</span>,
            komunitní profily, statistiky a prostor pro budování vlastní reputace v CZ/SK scéně.
          </p>
          <Link to="/o-nas">
            <motion.button
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.65rem 1.5rem',
                background: 'transparent', color: 'var(--green)',
                fontWeight: 700, fontSize: '0.8rem',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                border: '1px solid var(--green)', cursor: 'pointer',
                clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)',
              }}
              whileHover={{ backgroundColor: 'rgba(68,176,21,0.08)', y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              Číst více <FaArrowRight style={{ fontSize: '0.72rem' }} />
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}
          initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
        >
          {[
            { num: '128',   lbl: 'Tickrate'          },
            { num: 'CZ/SK', lbl: 'Jazyk komunity'    },
            { num: '24/7',  lbl: 'Server uptime'     },
            { num: '0',     lbl: 'Tolerance cheaterů'},
          ].map((s, i) => (
            <motion.div
              key={s.lbl}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '1rem 1.25rem',
                background: 'var(--surface2)', border: '1px solid var(--border)',
                clipPath: 'polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)',
              }}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              whileHover={{ borderColor: 'var(--green)' }}
            >
              <span style={{ fontSize: '0.82rem', color: 'var(--muted)', fontWeight: 600 }}>{s.lbl}</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--green)' }}>{s.num}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section style={{ padding: '60px 2.5rem', maxWidth: '1200px', margin: '0 auto', borderTop: '1px solid var(--border)' }}>
        <motion.div
          style={{
            background: 'linear-gradient(135deg,rgba(68,176,21,0.08) 0%,rgba(0,0,0,0) 60%)',
            border: '1px solid var(--green-dim)',
            padding: '2.5rem',
            clipPath: 'polygon(20px 0%,100% 0%,calc(100% - 20px) 100%,0% 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '1.5rem',
          }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.4rem' }}>
              Připoj se k <span style={{ color: 'var(--green)' }}>Vaunt.cz</span>
            </h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>
              Přihlas se přes Steam, nastav si profil a začni hrát.
            </p>
          </div>
          <Link to="/servery">
            <motion.button
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.8rem 2.2rem',
                background: 'var(--green)', color: '#000',
                fontWeight: 800, fontSize: '0.82rem',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                border: 'none', cursor: 'pointer',
                clipPath: 'polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)',
                whiteSpace: 'nowrap',
              }}
              whileHover={{ backgroundColor: '#56d91a', scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <FaServer /> Zobrazit servery
            </motion.button>
          </Link>
        </motion.div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .about-grid-responsive { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </div>
  )
}
