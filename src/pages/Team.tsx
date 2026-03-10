import { motion } from 'framer-motion'
import { FaInstagram, FaDiscord, FaEnvelope } from 'react-icons/fa'
import PageWrapper from '../components/Wrapper'

interface Member {
  name: string
  rank: string
  rankColor: string
  img: string
  instagram: string
  discordUrl: string
  email: string
}

const members: Member[] = [
  {
    name: 'BlobyCZ',
    rank: 'Majitel',
    rankColor: '#fd0000',
    img: 'https://img.karaoketexty.sk/img/profiles/big/mnnpa-371823.png',
    instagram: 'blobycz',
    discordUrl: 'https://discord.com/users/1178258199590228078',
    email: 'bloby@vaunt.cz',
  },
  {
    name: 'TagzTurtlee',
    rank: 'Majitel',
    rankColor: '#fd0000',
    img: 'https://media.tenor.com/ipJTKU45oEcAAAAe/nostalgiasedge-shocked.png',
    instagram: 'tagzturtlee_builder',
    discordUrl: 'https://discord.com/users/614161616543416320',
    email: 'tagzturtlee@vaunt.cz',
  },
  {
    name: 'R4D3K',
    rank: 'Vedení',
    rankColor: '#ff0000ad',
    img: "https://cdn.discordapp.com/avatars/901597798506561606/a_c8aee9a8690f50e2fd768e0ccee4067c.gif?size=512",
    instagram: 'radek._.z',
    discordUrl: 'https://discord.com/users/901597798506561606',
    email: 'r4d3k@vaunt.cz'
  }
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Team() {
  return (
    <PageWrapper>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ padding: '2rem 0 2rem' }}
      >
        <div style={s.sectionLabel}>
          <span style={s.labelLine} />
          Lidé za projektem
        </div>
        <h1 style={s.heroTitle}>
          A<span style={{ color: 'var(--green)', textShadow: 'var(--green-glow)' }}>-Tým</span>
        </h1>
        <p style={s.subtitle}>„Staráme se o všechno."</p>
      </motion.section>

      <hr style={s.divider} />

      <div style={s.grid}>
        {members.map((m, i) => (
          <motion.div
            key={m.name}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -6, boxShadow: '0 0 28px rgba(127,255,0,0.28), 0 0 72px rgba(127,255,0,0.10)' }}
            style={s.card}
          >
            <div style={s.avatarWrap}>
              <motion.img
                src={m.img}
                alt={m.name}
                style={s.avatar}
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.3 }}
                onError={(e) => { (e.target as HTMLImageElement).style.background = '#1a1a1a' }}
              />
              <span style={{ ...s.rank, color: m.rankColor, borderColor: m.rankColor }}>
                {m.rank}
              </span>
            </div>

            <h2 style={s.name}>{m.name}</h2>

            <div style={s.links}>
              <a href={`https://instagram.com/${m.instagram}`} target="_blank" rel="noreferrer" style={s.link}>
                <FaInstagram size={15} />
                @{m.instagram}
              </a>
              <a href={m.discordUrl} target="_blank" rel="noreferrer" style={s.link}>
                <FaDiscord size={15} />
                Discord
              </a>
              <a href={`mailto:${m.email}`} style={s.link}>
                <FaEnvelope size={14} />
                {m.email}
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <footer style={s.footer}>
        <p style={s.footerText}>
          VAUNT.cz je nezávislá česká komunita. Nespadáme pod Steam ani Valve.<br />
          © 2026 VAUNT.cz — Všechna práva vyhrazena.
        </p>
      </footer>

    </PageWrapper>
  )
}

const s: Record<string, React.CSSProperties> = {
  sectionLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    fontFamily: 'var(--font-display)',
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'var(--green)',
    marginBottom: '1.2rem',
  },
  labelLine: {
    display: 'block',
    width: 20,
    height: 2,
    background: 'var(--green)',
    borderRadius: 99,
    boxShadow: 'var(--green-glow-sm)',
  },
  heroTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(3rem,10vw,7rem)',
    fontWeight: 900,
    lineHeight: 0.92,
    letterSpacing: '-0.01em',
    textTransform: 'uppercase',
  },
  subtitle: {
    color: 'var(--text-sub)',
    marginTop: '1rem',
    fontSize: '1.1rem',
    fontStyle: 'italic',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid var(--border)',
    margin: '2rem 0',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginTop: '1rem',
  },
  card: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '2.5rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.25rem',
    textAlign: 'center',
    transition: 'border-color 0.3s',
    cursor: 'default',
  },
  avatarWrap: {
    position: 'relative',
    display: 'inline-flex',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid var(--green)',
    boxShadow: '0 0 24px rgba(127,255,0,0.3)',
    background: 'var(--surface-2)',
  },
  rank: {
    position: 'absolute',
    bottom: 2,
    right: -6,
    fontFamily: 'var(--font-display)',
    fontSize: '0.62rem',
    fontWeight: 800,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    background: 'var(--bg)',
    border: '1.5px solid',
    borderRadius: 99,
    padding: '0.18rem 0.6rem',
    whiteSpace: 'nowrap',
  },
  name: {
    fontFamily: 'var(--font-display)',
    fontSize: '2rem',
    fontWeight: 900,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    color: 'var(--text)',
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.45rem',
    width: '100%',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.55rem',
    fontSize: '0.875rem',
    fontWeight: 500,
    color: 'var(--text-sub)',
    padding: '0.55rem 0.75rem',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid transparent',
    transition: 'all 0.2s',
    textDecoration: 'none',
  },
  footer: {
    borderTop: '1px solid var(--border)',
    marginTop: '4rem',
    paddingTop: '2rem',
    textAlign: 'center',
  },
  footerText: {
    fontSize: '0.78rem',
    color: 'var(--text-muted)',
    lineHeight: 1.8,
  },
}