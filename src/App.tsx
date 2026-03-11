import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "../pages/Home";
import About from "../pages/About";
import Team from "../pages/Team";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";

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
