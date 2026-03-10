import { useState, CSSProperties } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaDiscord, FaInstagram, FaYoutube, FaSteam } from 'react-icons/fa'
import { RiSwordLine, RiBarChartLine, RiUserSettingsLine } from 'react-icons/ri'
import PageWrapper from '../components/Wrapper'
import { useAuth } from '../context/AuthContext'
import { useSteamStats } from '../hooks/useSteamStats'
import { useSkinImages, SkinEntry } from '../hooks/useSkinImages'
import { supabase } from '../lib/supabase'
import weaponData from '../json/weapon.json'

// ── Types ─────────────────────────────────────────────
type SideTab = 'vybaveni' | 'statistiky' | 'nastaveni'
type GearTab = 'noze' | 'skiny' | 'rukavice' | 'agenti' | 'musickit'
type SkinSub = 'vse' | 'pistole' | 'smg' | 'pusky' | 'sniper' | 'heavy'
interface Weapon { id: number; name: string }

const SIDE_ITEMS: { id: SideTab; label: string; icon: React.ReactNode }[] = [
  { id: 'vybaveni',   label: 'Vybavení',         icon: <RiSwordLine size={20} /> },
  { id: 'statistiky', label: 'Statistiky',        icon: <RiBarChartLine size={20} /> },
  { id: 'nastaveni',  label: 'Nastavení profilu', icon: <RiUserSettingsLine size={20} /> },
]
const GEAR_TABS: { id: GearTab; label: string }[] = [
  { id: 'noze', label: 'Nože' }, { id: 'skiny', label: 'Skiny' },
  { id: 'rukavice', label: 'Rukavice' }, { id: 'agenti', label: 'Agenti' },
  { id: 'musickit', label: 'Music Kit' },
]
const SKIN_SUBS: { id: SkinSub; label: string }[] = [
  { id: 'vse', label: 'Vše' }, { id: 'pistole', label: 'Pistole' },
  { id: 'smg', label: 'SMG' }, { id: 'pusky', label: 'Pušky' },
  { id: 'sniper', label: 'Sniper' }, { id: 'heavy', label: 'Heavy' },
]
const weaponsByCategory: Record<SkinSub, Weapon[]> = {
  vse:     [...weaponData.weapons.pistols, ...weaponData.weapons.smgs, ...weaponData.weapons.rifles, ...weaponData.weapons.heavy] as Weapon[],
  pistole: weaponData.weapons.pistols as Weapon[],
  smg:     weaponData.weapons.smgs as Weapon[],
  pusky:   weaponData.weapons.rifles as Weapon[],
  sniper:  weaponData.weapons.snipers as Weapon[],
  heavy:   weaponData.weapons.heavy as Weapon[],
}

// ── Image URL helpers ─────────────────────────────────
const BASE = 'https://raw.githubusercontent.com/By_Az_H/CS2-Skins-Images/main/output'
function skinImgUrl(paintKitId: number)  { return `${BASE}/${paintKitId}.png` }
function weaponImgUrl(weaponId: number)  { return `${BASE}/${weaponId}.png` }

// Fallback SVG — bílá silueta zbraně
const FALLBACK_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 60'%3E%3Crect x='10' y='22' width='70' height='16' rx='4' fill='%23ffffff22'/%3E%3Crect x='78' y='18' width='32' height='10' rx='3' fill='%23ffffff22'/%3E%3Crect x='30' y='38' width='18' height='14' rx='3' fill='%23ffffff22'/%3E%3Crect x='14' y='26' width='8' height='8' rx='2' fill='%23ffffff33'/%3E%3C/svg%3E`

// ── Weapon Image with fallback ────────────────────────
function WeaponImg({ src, alt, style: imgStyle }: { src: string; alt: string; style?: React.CSSProperties }) {
  const [err, setErr] = useState(false)
  return (
    <img
      src={err ? FALLBACK_SVG : src}
      alt={alt}
      style={imgStyle}
      onError={() => setErr(true)}
    />
  )
}

// ── Weapon Card (picker) ──────────────────────────────
function WeaponCard({ weapon, paintKitId, count, onClick }: {
  weapon: Weapon; paintKitId?: number; count: number; onClick?: () => void
}) {
  const imgUrl = paintKitId ? skinImgUrl(paintKitId) : weaponImgUrl(weapon.id)

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: 'var(--green-glow)', borderColor: 'rgba(127,255,0,0.4)' }}
      style={{ ...s.weaponCard, cursor: onClick ? 'pointer' : 'default' }}
      onClick={onClick}
    >
      <div style={s.weaponImgWrap}>
        <WeaponImg src={imgUrl} alt={weapon.name} style={s.weaponImg} />
        <div style={s.weaponImgGlow} />
      </div>
      <div style={s.weaponCardBody}>
        <div style={s.weaponName}>{weapon.name}</div>
        {count > 0 && <div style={s.skinCount}>{count} skinů</div>}
      </div>
    </motion.div>
  )
}

// ── Skin Card ─────────────────────────────────────────
function SkinCardImg({ skin, weaponId }: { skin: SkinEntry; weaponId: number }) {
  const { profile } = useAuth()
  const [saving,   setSaving]   = useState(false)
  const [equipped, setEquipped] = useState(false)
  const [errMsg,   setErrMsg]   = useState<string | null>(null)

  // "★ Karambit | Fade" → "Fade"
  const displayName = skin.name.includes(' | ')
    ? skin.name.split(' | ').slice(1).join(' | ')
    : skin.name

  // Use By_Az_H repo URL with paint_kit_id
  const imgUrl = skinImgUrl(skin.paint_kit_id)

  const handleVybavit = async () => {
    if (!profile?.steam_id) { setErrMsg('Nejsi přihlášen'); return }
    setSaving(true)
    setErrMsg(null)
    const { error } = await supabase
      .from('user_loadout')
      .upsert(
        { steam_id: profile.steam_id, weapon_id: weaponId, paint_kit: skin.paint_kit_id },
        { onConflict: 'steam_id,weapon_id' }
      )
    setSaving(false)
    if (error) {
      setErrMsg('Chyba uložení')
    } else {
      setEquipped(true)
      setTimeout(() => setEquipped(false), 3000)
    }
  }

  return (
    <motion.div
      whileHover={{ y: -5, borderColor: equipped ? 'rgba(127,255,0,0.6)' : 'rgba(127,255,0,0.25)' }}
      style={{ ...s.skinCard, borderColor: equipped ? 'rgba(127,255,0,0.5)' : 'var(--border)', boxShadow: equipped ? 'var(--green-glow)' : 'none' }}
    >
      <div style={s.skinImgWrap}>
        <WeaponImg src={imgUrl} alt={displayName} style={s.skinImg} />
        <div style={s.skinImgGlow} />
      </div>
      <div style={s.skinCardBody}>
        {skin.rarity && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.3rem' }}>
            <span style={{ ...s.rarityDot, background: skin.rarity.color }} />
            <span style={{ fontSize: '0.6rem', color: skin.rarity.color, fontFamily: 'var(--font-display)', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>{skin.rarity.name}</span>
          </div>
        )}
        <div style={s.skinName}>{displayName}</div>
        {errMsg && <div style={{ fontSize: '0.63rem', color: '#ff6060', margin: '0.25rem 0' }}>{errMsg}</div>}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleVybavit}
          disabled={saving}
          style={equipped ? s.btnEquipped : s.btnVybavit}
        >
          {saving ? '⏳' : equipped ? '✓ Vybaveno' : 'Vybavit'}
        </motion.button>
      </div>
    </motion.div>
  )
}

// ── Vybavení Panel ────────────────────────────────────
function VybaveniPanel() {
  const [gearTab, setGearTab]           = useState<GearTab>('noze')
  const [skinSub, setSkinSub]           = useState<SkinSub>('vse')
  const [search,  setSearch]            = useState('')
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null)

  const { loading: skinsLoading, getSkinsForWeapon, agents, musicKits } = useSkinImages()

  const knives = weaponData.weapons.knives as Weapon[]
  const gloves = weaponData.weapons.gloves as Weapon[]

  const filteredWeapons = weaponsByCategory[skinSub].filter(w =>
    w.name.toLowerCase().includes(search.toLowerCase())
  )
  const weaponSkins = selectedWeapon
    ? getSkinsForWeapon(selectedWeapon.name).filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase())
      )
    : []

  const resetTab = (tab: GearTab) => { setGearTab(tab); setSearch(''); setSelectedWeapon(null) }

  return (
    <div>
      {/* Top tabs */}
      <div style={s.gearTabs}>
        {GEAR_TABS.map(t => (
          <button key={t.id} onClick={() => resetTab(t.id)}
            style={gearTab === t.id ? s.gearTabActive : s.gearTab}>{t.label}</button>
        ))}
      </div>

      {/* Skiny sub-menu */}
      <AnimatePresence>
        {gearTab === 'skiny' && !selectedWeapon && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={s.subTabs}>
            {SKIN_SUBS.map(sub => (
              <button key={sub.id} onClick={() => { setSkinSub(sub.id); setSearch('') }}
                style={skinSub === sub.id ? s.subTabActive : s.subTab}>{sub.label}</button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Breadcrumb */}
      <AnimatePresence>
        {selectedWeapon && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={s.breadcrumb}>
            <button onClick={() => { setSelectedWeapon(null); setSearch('') }} style={s.breadcrumbBack}>← Zpět</button>
            <span style={s.breadcrumbSep}>/</span>
            <span style={{ color: 'var(--green)', fontWeight: 800, fontFamily: 'var(--font-display)', fontSize: '0.82rem' }}>{selectedWeapon.name}</span>
            <span style={s.breadcrumbCount}>{weaponSkins.length} skinů</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search */}
      <input style={s.searchInput}
        placeholder={selectedWeapon ? `Hledat skin pro ${selectedWeapon.name}...` : 'Hledat...'}
        value={search} onChange={e => setSearch(e.target.value)} />

      {skinsLoading && (gearTab === 'skiny' || gearTab === 'noze' || gearTab === 'rukavice') && (
        <div style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em', padding: '0.5rem 0 0.75rem', fontSize: '0.72rem' }}>
          Načítám databázi skinů...
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div key={gearTab + skinSub + String(selectedWeapon?.id)}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }} style={{ marginTop: '0.75rem' }}>

          {gearTab === 'noze' && (
            <div style={s.cardGrid}>
              {knives.filter(k => k.name.toLowerCase().includes(search.toLowerCase())).map(knife => {
                const kSkins = getSkinsForWeapon(knife.name)
                return (
                  <WeaponCard key={knife.id} weapon={knife}
                    count={kSkins.length}
                    onClick={kSkins.length ? () => { setSelectedWeapon(knife); setSearch('') } : undefined} />
                )
              })}
            </div>
          )}

          {/* NOŽE — skin grid */}
          {gearTab === 'noze' && selectedWeapon && (
            <div style={s.skinCardGrid}>
              {weaponSkins.map(skin => (
                <SkinCardImg key={skin.id} skin={skin} weaponId={selectedWeapon.id} />
              ))}
            </div>
          )}

          {/* SKINY — weapon picker */}
          {gearTab === 'skiny' && !selectedWeapon && (
            <div style={s.cardGrid}>
              {filteredWeapons.map(weapon => {
                const wSkins = getSkinsForWeapon(weapon.name)
                return (
                  <WeaponCard key={weapon.id} weapon={weapon}
                    count={wSkins.length}
                    onClick={() => { setSelectedWeapon(weapon); setSearch('') }} />
                )
              })}
            </div>
          )}

          {/* SKINY — skin grid */}
          {gearTab === 'skiny' && selectedWeapon && (
            <div style={s.skinCardGrid}>
              {weaponSkins.length === 0 && !skinsLoading
                ? <div style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-display)', fontSize: '0.8rem', letterSpacing: '0.1em', padding: '2rem 0' }}>Žádné skiny nenalezeny</div>
                : weaponSkins.map(skin => (
                    <SkinCardImg key={skin.id} skin={skin} weaponId={selectedWeapon.id} />
                  ))
              }
            </div>
          )}

          {/* RUKAVICE */}
          {gearTab === 'rukavice' && !selectedWeapon && (
            <div style={s.cardGrid}>
              {gloves.filter(g => g.name.toLowerCase().includes(search.toLowerCase())).map(glove => {
                const gSkins = getSkinsForWeapon(glove.name)
                return (
                  <WeaponCard key={glove.id} weapon={glove}
                    count={gSkins.length}
                    onClick={gSkins.length ? () => { setSelectedWeapon(glove); setSearch('') } : undefined} />
                )
              })}
            </div>
          )}

          {/* RUKAVICE — skin grid */}
          {gearTab === 'rukavice' && selectedWeapon && (
            <div style={s.skinCardGrid}>
              {weaponSkins.map(skin => (
                <SkinCardImg key={skin.id} skin={skin} weaponId={selectedWeapon.id} />
              ))}
            </div>
          )}

          {/* AGENTI */}
          {gearTab === 'agenti' && (
            <div style={s.cardGrid}>
              {agents
                .filter(a => a.name.toLowerCase().includes(search.toLowerCase()))
                .map(agent => (
                  <motion.div key={agent.id}
                    whileHover={{ y: -4, boxShadow: 'var(--green-glow)', borderColor: 'rgba(127,255,0,0.4)' }}
                    style={s.weaponCard}>
                    <div style={s.weaponImgWrap}>
                      <WeaponImg src={agent.image} alt={agent.name} style={s.weaponImg} />
                      <div style={s.weaponImgGlow} />
                    </div>
                    <div style={s.weaponCardBody}>
                      {agent.rarity && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.25rem' }}>
                          <span style={{ ...s.rarityDot, background: agent.rarity.color }} />
                          <span style={{ fontSize: '0.58rem', color: agent.rarity.color, fontFamily: 'var(--font-display)', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>{agent.rarity.name}</span>
                        </div>
                      )}
                      <div style={s.weaponName}>{agent.name}</div>
                      {agent.team && <div style={s.skinCount}>{agent.team.name}</div>}
                    </div>
                  </motion.div>
                ))}
            </div>
          )}

          {/* MUSIC KITY */}
          {gearTab === 'musickit' && (
            <div style={s.cardGrid}>
              {musicKits
                .filter(m => m.name.toLowerCase().includes(search.toLowerCase()))
                .map(kit => (
                  <motion.div key={kit.id}
                    whileHover={{ y: -4, boxShadow: 'var(--green-glow)', borderColor: 'rgba(127,255,0,0.4)' }}
                    style={s.weaponCard}>
                    <div style={{ ...s.weaponImgWrap, background: '#08050d' }}>
                      <WeaponImg src={kit.image} alt={kit.name} style={{ ...s.weaponImg, objectFit: 'cover' as const, borderRadius: 6 }} />
                      <div style={{ ...s.weaponImgGlow, background: 'rgba(160,80,255,0.18)' }} />
                    </div>
                    <div style={s.weaponCardBody}>
                      {kit.exclusive && (
                        <div style={{ fontSize: '0.58rem', color: '#FFD700', fontFamily: 'var(--font-display)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '0.25rem' }}>★ Exclusive</div>
                      )}
                      <div style={s.weaponName}>{kit.name}</div>
                      {kit.artist && <div style={s.skinCount}>{kit.artist}</div>}
                    </div>
                  </motion.div>
                ))}
            </div>
          )}

        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ── Statistiky Panel ──────────────────────────────────
function StatistikyPanel() {
  const { stats, loading } = useSteamStats()
  const cards = stats ? [
    { num: stats.kills.toLocaleString('cs'),          label: 'Kills',        icon: '🎯' },
    { num: stats.deaths.toLocaleString('cs'),         label: 'Deaths',       icon: '💀' },
    { num: stats.hours_played,                        label: 'Hodin ve hře', icon: '⏱️' },
    { num: stats.kd_ratio,                            label: 'K/D Ratio',    icon: '📊' },
    { num: stats.matches_played.toLocaleString('cs'), label: 'Zápasů',       icon: '🏆' },
    { num: stats.win_rate,                            label: 'Win Rate',     icon: '✅' },
    { num: stats.headshots.toLocaleString('cs'),      label: 'Headshoty',    icon: '🎯' },
    { num: stats.kills > 0 ? `${Math.round((stats.headshots/stats.kills)*100)}%` : '—', label: 'HS %', icon: '💡' },
  ] : Array(8).fill(null).map((_, i) => ({ num: '—', label: ['Kills','Deaths','Hodin','K/D','Zápasů','Win Rate','Headshoty','HS %'][i], icon: '—' }))

  return (
    <div>
      <div style={s.sectionLabel}><span style={s.labelLine} />Steam Statistiky</div>
      {loading
        ? <div style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}>Načítám...</div>
        : <div style={s.statsGrid}>
            {cards.map((c, i) => (
              <motion.div key={c.label} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }} whileHover={{ y: -4, boxShadow: '0 0 40px rgba(127,255,0,0.25)' }} style={s.statCard}>
                <div style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>{c.icon}</div>
                <div style={s.statNum}>{c.num}</div>
                <div style={s.statLabel}>{c.label}</div>
              </motion.div>
            ))}
          </div>
      }
      <div style={{ marginTop: '2rem' }}>
        <div style={s.sectionLabel}><span style={s.labelLine} />Komunita</div>
        <div style={s.socialsCard}>
          {[
            { icon: <FaDiscord size={14}/>, label: 'Discord', href: 'https://discord.gg/vaunt' },
            { icon: <FaInstagram size={14}/>, label: 'Instagram', href: '#' },
            { icon: <FaYoutube size={14}/>, label: 'YouTube', href: '#' },
            { icon: <FaSteam size={14}/>, label: 'Steam', href: '#' },
          ].map(item => (
            <a key={item.label} href={item.href} target="_blank" rel="noreferrer" style={s.socialLink}>
              {item.icon} {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Nastavení Panel ───────────────────────────────────
function NastaveniPanel() {
  const { profile, refreshProfile } = useAuth()
  const [slug,    setSlug]    = useState(profile?.username ?? '')
  const [tradeUrl, setTradeUrl] = useState('')
  const [privacy, setPrivacy] = useState<'public'|'private'>('public')
  const [saving,  setSaving]  = useState(false)
  const [saved,   setSaved]   = useState(false)

  const handleSave = async () => {
    if (!profile) return
    setSaving(true)
    await supabase.from('profiles').update({ username: slug }).eq('id', profile.id)
    await refreshProfile()
    setSaving(false); setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={s.sectionLabel}><span style={s.labelLine} />Nastavení profilu</div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={s.settingsCard}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          {profile?.avatar_url
            ? <img src={profile.avatar_url} alt="" style={s.settingsAvatar} />
            : <div style={s.settingsAvatarPlaceholder}><FaSteam size={28} color="var(--green)" /></div>}
          <div>
            <div style={s.settingsName}>{profile?.display_name ?? 'Steam uživatel'}</div>
            <div style={s.steamIdRow}>
              <span style={s.steamIdLabel}>SteamID64:</span>
              <span style={s.steamIdValue}>{profile?.steam_id ?? '—'}</span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 }} style={s.settingsCard}>
        <div style={s.fieldLabel}>Vlastní URL profilu</div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={s.prefixWrap}>
            <span style={s.prefix}>vaunt.cz/profile/</span>
            <input style={s.slugInput} value={slug}
              onChange={e => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
              placeholder="tvujnick" maxLength={24} />
          </div>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={handleSave} style={saved ? s.btnSaved : s.btnPrimary} disabled={saving}>
            {saved ? '✓ Uloženo' : saving ? 'Ukládám...' : 'Uložit'}
          </motion.button>
        </div>
        {slug && <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          → <span style={{ color: 'var(--green)' }}>vaunt.cz/profile/{slug}</span>
        </div>}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }} style={s.settingsCard}>
        <div style={s.fieldLabel}>Soukromí profilu</div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {(['public','private'] as const).map(opt => (
            <button key={opt} onClick={() => setPrivacy(opt)}
              style={privacy === opt ? s.btnPrimary : s.btnOutline}>
              {opt === 'public' ? '🌍 Veřejný' : '🔒 Soukromý'}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.21 }} style={s.settingsCard}>
        <div style={s.fieldLabel}>Trade URL</div>
        <input
          style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '0.88rem', padding: '0.65rem 0.9rem', outline: 'none', width: '100%', boxSizing: 'border-box' as const }}
          placeholder="https://steamcommunity.com/tradeoffer/new/?partner=..."
          value={tradeUrl} onChange={e => setTradeUrl(e.target.value)} />
        <div style={{ marginTop: '0.4rem', fontSize: '0.73rem', color: 'var(--text-muted)' }}>
          Slouží pro obchodování skinů na VAUNT serverech.
        </div>
      </motion.div>
    </div>
  )
}

// ── Main Dashboard ────────────────────────────────────
export default function Dashboard() {
  const { profile } = useAuth()
  const [activeTab, setActiveTab] = useState<SideTab>('vybaveni')

  return (
    <PageWrapper>
      <div style={s.root}>

        <aside style={s.sidebar}>
          <div style={s.sideProfile}>
            {profile?.avatar_url
              ? <img src={profile.avatar_url} alt="" style={s.sideAvatar} />
              : <div style={s.sideAvatarPlaceholder}><FaSteam size={16} color="var(--green)" /></div>}
            <div style={{ minWidth: 0 }}>
              <div style={s.sideName}>{profile?.display_name ?? 'Hráč'}</div>
              {profile?.username && <div style={s.sideSlug}>/{profile.username}</div>}
            </div>
          </div>
          <div style={s.sideDivider} />
          <nav style={s.sideNav}>
            {SIDE_ITEMS.map(item => {
              const active = activeTab === item.id
              return (
                <motion.button key={item.id} onClick={() => setActiveTab(item.id)} whileHover={{ x: 2 }}
                  style={{ ...s.sideItem, color: active ? '#7fff00' : 'var(--text-sub)', background: active ? 'rgba(127,255,0,0.08)' : 'transparent', borderLeft: active ? '2px solid #7fff00' : '2px solid transparent', textShadow: active ? '0 0 12px rgba(127,255,0,0.5)' : 'none' }}>
                  <span style={{ opacity: active ? 1 : 0.55 }}>{item.icon}</span>
                  {item.label}
                </motion.button>
              )
            })}
          </nav>
          <div style={{ ...s.sideDivider, marginTop: 'auto' }} />
          <div style={s.sideFooter}>VAUNT.cz · CS2</div>
        </aside>

        <main style={s.content}>
          <div style={s.contentHeader}>
            <h1 style={s.contentTitle}>{SIDE_ITEMS.find(i => i.id === activeTab)?.label}</h1>
            {profile?.username && (
              <div style={s.contentMeta}>vaunt.cz/profile/<span style={{ color: 'var(--green)' }}>{profile.username}</span></div>
            )}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
              {activeTab === 'vybaveni'   && <VybaveniPanel />}
              {activeTab === 'statistiky' && <StatistikyPanel />}
              {activeTab === 'nastaveni'  && <NastaveniPanel />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <footer style={s.footer}>
        <p style={s.footerText}>VAUNT.cz je nezávislá česká komunita. Nespadáme pod Steam ani Valve.</p>
      </footer>
    </PageWrapper>
  )
}

// ── Styles ────────────────────────────────────────────
const s: Record<string, CSSProperties> = {
  root:          { display: 'flex', gap: 0, minHeight: 'calc(100vh - var(--nav-h) - 6rem)', alignItems: 'flex-start' },
  sidebar:       { width: 220, flexShrink: 0, background: 'var(--surface)', borderRight: '1px solid var(--border)', borderRadius: 'var(--radius) 0 0 var(--radius)', padding: '1.25rem 0 1rem', position: 'sticky', top: 'calc(var(--nav-h) + 3rem)', display: 'flex', flexDirection: 'column', minHeight: '65vh' },
  sideProfile:   { display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0 1rem', marginBottom: '1rem' },
  sideAvatar:    { width: 34, height: 34, borderRadius: '50%', border: '1.5px solid var(--green)', boxShadow: 'var(--green-glow-sm)', flexShrink: 0 },
  sideAvatarPlaceholder: { width: 34, height: 34, borderRadius: '50%', border: '1.5px solid var(--border)', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  sideName:      { fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.82rem', letterSpacing: '0.04em', color: 'var(--text)', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 130 },
  sideSlug:      { fontSize: '0.68rem', color: 'var(--green)', marginTop: 2 },
  sideDivider:   { height: 1, background: 'var(--border)', margin: '0 0 0.6rem' },
  sideNav:       { display: 'flex', flexDirection: 'column', gap: 2, padding: '0 0.4rem', flex: 1 },
  sideItem:      { display: 'flex', alignItems: 'center', gap: '0.6rem', fontFamily: 'var(--font-display)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.7rem 0.75rem', borderRadius: 'var(--radius-sm)', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%', transition: 'all 0.15s' },
  sideFooter:    { padding: '0.75rem 1rem 0', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' },
  content:       { flex: 1, padding: '0 0 0 2rem', minWidth: 0 },
  contentHeader: { marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' },
  contentTitle:  { fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,4vw,2.5rem)', fontWeight: 900, letterSpacing: '0.04em', textTransform: 'uppercase', lineHeight: 1 },
  contentMeta:   { marginTop: '0.3rem', fontSize: '0.75rem', color: 'var(--text-sub)' },
  gearTabs:      { display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.85rem' },
  gearTab:       { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.45rem 0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-sub)', cursor: 'pointer' },
  gearTabActive: { fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.45rem 0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(127,255,0,0.5)', background: 'rgba(127,255,0,0.1)', color: '#7fff00', cursor: 'pointer' },
  subTabs:       { display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginBottom: '0.85rem' },
  subTab:        { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.3rem 0.65rem', borderRadius: 99, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer' },
  subTabActive:  { fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.3rem 0.65rem', borderRadius: 99, border: '1px solid rgba(127,255,0,0.5)', background: 'rgba(127,255,0,0.1)', color: '#7fff00', cursor: 'pointer' },
  breadcrumb:    { display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' },
  breadcrumbBack:{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--green)', background: 'rgba(127,255,0,0.08)', border: '1px solid rgba(127,255,0,0.25)', borderRadius: 'var(--radius-sm)', padding: '0.3rem 0.75rem', cursor: 'pointer' },
  breadcrumbSep: { color: 'var(--text-muted)', fontSize: '0.75rem' },
  breadcrumbCount: { fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em' },
  searchInput:   { width: '100%', maxWidth: 320, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '0.88rem', padding: '0.55rem 0.85rem', outline: 'none', boxSizing: 'border-box', marginBottom: '0.5rem' },
  // Weapon cards (picker grid)
  cardGrid:      { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.85rem' },
  weaponCard:    { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', transition: 'all 0.2s' },
  weaponImgWrap: { background: '#050505', height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '0.75rem', position: 'relative' as const },
  weaponImg:     { width: '100%', height: '100%', objectFit: 'contain' as const, position: 'relative' as const, zIndex: 1, filter: 'drop-shadow(0 6px 14px rgba(127,255,0,0.28))' },
  weaponImgGlow: { position: 'absolute' as const, bottom: 4, left: '15%', right: '15%', height: 14, background: 'rgba(127,255,0,0.18)', borderRadius: '50%', filter: 'blur(9px)', zIndex: 0, pointerEvents: 'none' as const },
  weaponImgFallback: { fontSize: '2rem', opacity: 0.3 },
  weaponCardBody:{ padding: '0.65rem 0.75rem' },
  weaponName:    { fontFamily: 'var(--font-display)', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: 'var(--text)', lineHeight: 1.2 },
  skinCount:     { fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: 3 },
  skinId:        { fontSize: '0.63rem', color: 'var(--text-muted)', marginTop: 4 },
  // Skin cards (skin grid)
  skinCardGrid:  { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.75rem' },
  skinCard:      { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', transition: 'all 0.2s', cursor: 'default' },
  skinImgWrap:   { background: '#050505', height: 130, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.75rem', overflow: 'hidden', position: 'relative' as const },
  skinImg:       { width: '100%', height: '100%', objectFit: 'contain' as const, position: 'relative' as const, zIndex: 1, filter: 'drop-shadow(0 8px 18px rgba(127,255,0,0.32))' },
  skinImgGlow:   { position: 'absolute' as const, bottom: 4, left: '10%', right: '10%', height: 16, background: 'rgba(127,255,0,0.2)', borderRadius: '50%', filter: 'blur(10px)', zIndex: 0, pointerEvents: 'none' as const },
  skinCardBody:  { padding: '0.65rem 0.75rem' },
  rarityDot:     { width: 7, height: 7, borderRadius: '50%', display: 'inline-block', flexShrink: 0 },
  skinName:      { fontSize: '0.78rem', color: 'var(--text)', fontWeight: 600, lineHeight: 1.3 },
  // Stats
  sectionLabel:  { display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '1rem' },
  labelLine:     { display: 'block', width: 16, height: 2, background: 'var(--green)', borderRadius: 99 },
  statsGrid:     { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' },
  statCard:      { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.4rem 1.2rem', boxShadow: 'var(--green-glow)', transition: 'box-shadow 0.3s', cursor: 'default' },
  statNum:       { fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 900, color: 'var(--green)', textShadow: 'var(--green-glow-sm)', lineHeight: 1 },
  statLabel:     { fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-sub)', marginTop: '0.3rem' },
  socialsCard:   { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' },
  socialLink:    { display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-display)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.38rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--surface-2)', color: 'var(--text-sub)', textDecoration: 'none' },
  // Settings
  settingsCard:  { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.35rem' },
  settingsAvatar:{ width: 60, height: 60, borderRadius: '50%', border: '2px solid var(--green)', boxShadow: 'var(--green-glow-sm)', flexShrink: 0 },
  settingsAvatarPlaceholder: { width: 60, height: 60, borderRadius: '50%', border: '2px solid var(--border)', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  settingsName:  { fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 900, letterSpacing: '0.04em' },
  steamIdRow:    { display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem', flexWrap: 'wrap' },
  steamIdLabel:  { fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em', textTransform: 'uppercase' },
  steamIdValue:  { fontSize: '0.75rem', color: 'var(--green)', fontFamily: 'var(--font-body)', fontWeight: 600 },
  fieldLabel:    { fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.65rem' },
  prefixWrap:    { display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden', background: 'var(--surface-2)', flex: 1, minWidth: 200 },
  prefix:        { fontFamily: 'var(--font-display)', fontSize: '0.78rem', fontWeight: 700, color: 'var(--green)', padding: '0 0.6rem', background: 'rgba(127,255,0,0.06)', borderRight: '1px solid var(--border)', whiteSpace: 'nowrap' },
  slugInput:     { flex: 1, background: 'transparent', border: 'none', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '0.88rem', padding: '0.6rem 0.65rem', outline: 'none' },
  btnPrimary:    { fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.6rem 1.2rem', borderRadius: 'var(--radius-sm)', background: '#7fff00', color: '#050505', border: 'none', cursor: 'pointer', boxShadow: 'var(--green-glow-sm)', whiteSpace: 'nowrap' },
  btnSaved:      { fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.6rem 1.2rem', borderRadius: 'var(--radius-sm)', background: '#1a3d00', color: '#7fff00', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' },
  btnOutline:    { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.6rem 1.2rem', borderRadius: 'var(--radius-sm)', background: 'transparent', color: 'var(--text-sub)', border: '1px solid var(--border)', cursor: 'pointer' },
  btnVybavit:    { fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.45rem 0.9rem', borderRadius: 'var(--radius-sm)', background: 'transparent', color: 'var(--green)', border: '1.5px solid rgba(127,255,0,0.5)', cursor: 'pointer', width: '100%', transition: 'all 0.15s' },
  btnEquipped:   { fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.45rem 0.9rem', borderRadius: 'var(--radius-sm)', background: '#7fff00', color: '#050505', border: '1.5px solid #7fff00', cursor: 'pointer', width: '100%' },
  footer:        { borderTop: '1px solid var(--border)', marginTop: '4rem', paddingTop: '1.75rem', textAlign: 'center' },
  footerText:    { fontSize: '0.73rem', color: 'var(--text-muted)', lineHeight: 1.8 },
}