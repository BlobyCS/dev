import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/Home'
import AboutPage from './pages/About'
import TeamPage from './pages/Team'
import DashboardPage from './pages/Dashboard'
import ProfilePage from './pages/Profile'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/"          element={<HomePage />} />
          <Route path="/o-nas"     element={<AboutPage />} />
          <Route path="/tym"       element={<TeamPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/p/:slug"   element={<ProfilePage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}