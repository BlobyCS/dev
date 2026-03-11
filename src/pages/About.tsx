import { usePageTitle } from '../hooks/usePageTitle'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FaShieldAlt, FaUsers, FaServer, FaDiscord,
  FaArrowRight, FaHeart,
} from 'react-icons/fa'
import { BsFillLightningChargeFill } from 'react-icons/bs'
import { MdOutlineEmojiEvents } from 'react-icons/md'

const values = [
  { icon: <FaShieldAlt />,              title: 'Fair Play',        desc: 'Banujeme cheaters bez milosti. Každý hráč si zaslouží čistou hru.' },
  { icon: <BsFillLightningChargeFill />, title: 'Transparentnost', desc: 'Žádné skryté poplatky, žádné p2w výhody. Vše je otevřené.' },
  { icon: <FaHeart />,                  title: 'Komunita první',   desc: 'Zpětná vazba hráčů přímo formuje vývoj portálu.' },
  { icon: <FaUsers />,                  title: 'Respekt',          desc: 'Toxicita je u nás nulová tolerance. Hrajeme spolu, ne proti sobě.' },
]

const plans = [
  { icon: <MdOutlineEmojiEvents />, title: 'Turnaje',          desc: 'Komunitní turnaje s cenami pro nejlepší hráče CZ/SK scény.' },
  { icon: <FaServer />,            title: 'Více serverů',      desc: 'Rozšíření serverového parku o další herní módy.' },
  { icon: <FaDiscord />,           title: 'Discord integrace', desc: 'Propojení webu s Discord serverem — notifikace, role, statistiky.' },
  { icon: <FaUsers />,             title: 'Ligové žebříčky',   desc: 'Vlastní ELO systém a sezónní ligy pro CZ/SK hráče.' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function AboutPage() {
  usePageTitle('O nás')

  return (
    <div style={{ minHeight: '100vh', paddingTop: '64px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 2.5rem' }}>

        {/* ══════════════ HEADER ══════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: '4rem' }}
        >
          <div className="section-label">Náš příběh</div>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.95,
            marginBottom: '1.5rem',
          }}>
            Jsme Vaunt.cz —<br />
            <span style={{ color: 'var(--green)' }}>pro hráče od hráčů</span>
          </h1>
        </motion.div>

        {/* ══════════════ STORY ══════════════ */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '4rem', alignItems: 'start',
          marginBottom: '5rem',
        }}
          className="about-2col"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {[
              'Jsme nezávislý portál, který má v sobě všechno, co potřebuje CS2 hráč z České republiky nebo Slovenska. Vznikli jsme jako odpověď na nedostatek kvalitní, česky mluvící komunity s důrazem na fair play a dobrý zážitek z hraní.',
              'Na Vaunt.cz nenajdeš pay-to-win výhody ani chaos bez řádu. Stojíme na principu, že každý zaslouží hrát na serveru, kde jsou dodržována pravidla a kde se hráči cítí doma.',
              'Náš tým tvoří nadšenci, kteří sami hrají CS2 a vědí přesně, co hráči potřebují. Od technické správy serverů až po moderaci komunity — každý krok děláme s citem pro detail.',
            ].map((text, i) => (
              <motion.p
                key={i}
                style={{
                  color: 'var(--muted)', lineHeight: 1.8,
                  fontSize: '0.95rem', marginBottom: '1.1rem',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              >
                {text}
              </motion.p>
            ))}
          </motion.div>

          {/* Quick facts */}
          <motion.div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {[
              { lbl: 'Tickrate',           val: '128'    },
              { lbl: 'Jazyk komunity',     val: 'CZ / SK' },
              { lbl: 'Server uptime',      val: '24 / 7' },
              { lbl: 'Anti-cheat',         val: 'Aktivní' },
              { lbl: 'Pay-to-win',         val: 'Nikdy'  },
              { lbl: 'Tolerance cheaterů', val: '0'      },
            ].map((f, i) => (
              <motion.div
                key={f.lbl}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '0.9rem 1.25rem',
                  background: 'var(--surface2)', border: '1px solid var(--border)',
                  clipPath: 'polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)',
                }}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                whileHover={{ borderColor: 'var(--green)' }}
              >
                <span style={{ fontSize: '0.82rem', color: 'var(--muted)', fontWeight: 600 }}>{f.lbl}</span>
                <span style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--green)' }}>{f.val}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ══════════════ HODNOTY ══════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '2rem' }}
        >
          <div className="section-label">Co nás řídí</div>
          <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '2rem' }}>
            Naše <span style={{ color: 'var(--green)' }}>hodnoty</span>
          </h2>
        </motion.div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))',
          gap: '1rem', marginBottom: '5rem',
        }}>
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              className="card skew-clip"
              style={{ padding: '1.5rem' }}
              variants={fadeUp} initial="hidden"
              whileInView="show" viewport={{ once: true }} custom={i}
              whileHover={{ borderColor: 'var(--green)', backgroundColor: 'rgba(68,176,21,0.04)' }}
            >
              <div style={{
                width: 36, height: 36,
                background: 'rgba(68,176,21,0.1)',
                border: '1px solid var(--green-dim)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1rem', color: 'var(--green)', fontSize: '1rem',
              }}>
                {v.icon}
              </div>
              <h4 style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--green)', marginBottom: '0.4rem' }}>{v.title}</h4>
              <p style={{ fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.65 }}>{v.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* ══════════════ PLÁNY ══════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '2rem' }}
        >
          <div className="section-label">Co chystáme</div>
          <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '2rem' }}>
            Plány do <span style={{ color: 'var(--green)' }}>budoucna</span>
          </h2>
        </motion.div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))',
          gap: '1rem', marginBottom: '5rem',
        }}>
          {plans.map((p, i) => (
            <motion.div
              key={p.title}
              className="card skew-clip"
              style={{ padding: '1.5rem' }}
              variants={fadeUp} initial="hidden"
              whileInView="show" viewport={{ once: true }} custom={i}
              whileHover={{ borderColor: 'var(--green)', backgroundColor: 'rgba(68,176,21,0.04)' }}
            >
              <div style={{
                width: 36, height: 36,
                background: 'rgba(68,176,21,0.1)',
                border: '1px solid var(--green-dim)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1rem', color: 'var(--green)', fontSize: '1rem',
              }}>
                {p.icon}
              </div>
              <h4 style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--green)', marginBottom: '0.4rem' }}>{p.title}</h4>
              <p style={{ fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.65 }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* ══════════════ CTA ══════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{
            background: 'linear-gradient(135deg,rgba(68,176,21,0.08) 0%,transparent 60%)',
            border: '1px solid var(--green-dim)',
            padding: '2.5rem',
            clipPath: 'polygon(20px 0%,100% 0%,calc(100% - 20px) 100%,0% 100%)',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem',
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: '0.4rem' }}>
              Poznej náš <span style={{ color: 'var(--green)' }}>tým</span>
            </h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
              Zjisti, kdo za Vaunt.cz stojí a jak nás kontaktovat.
            </p>
          </div>
          <Link to="/tym">
            <motion.button
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.75rem 1.75rem',
                background: 'var(--green)', color: '#000',
                fontWeight: 800, fontSize: '0.8rem',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                border: 'none', cursor: 'pointer',
                clipPath: 'polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)',
                whiteSpace: 'nowrap',
              }}
              whileHover={{ backgroundColor: '#56d91a', y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              Poznat tým <FaArrowRight style={{ fontSize: '0.72rem' }} />
            </motion.button>
          </Link>
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-2col { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </div>
  )
}
