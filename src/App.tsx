import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Team from './pages/Team'
import Profile from './pages/Profile'
import NotFound from './pages/404'
import Cursor from './components/Cursor'
import Home from './pages/Home'

export default function App() {
  const location = useLocation()

  return (
    <>
      <Navbar />
      <Cursor />
      <main style={{ paddingTop: 'var(--nav-h)' }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="#" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
    </>
  )
}
