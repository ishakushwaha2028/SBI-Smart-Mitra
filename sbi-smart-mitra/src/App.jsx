import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import AboutPage from './pages/AboutPage'
import AIAssistantPage from './pages/AIAssistantPage'
import VoiceBankingPage from './pages/VoiceBankingPage'
import DashboardPage from './pages/DashboardPage'
import SecurityPage from './pages/SecurityPage'
import ContactPage from './pages/ContactPage'
import GuidesPage from './pages/GuidesPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/ai-assistant" element={<AIAssistantPage />} />
            <Route path="/voice-banking" element={<VoiceBankingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/guides" element={<GuidesPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
