import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Bot, ChevronDown } from 'lucide-react'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'AI Assistant', path: '/ai-assistant' },
  { name: 'Voice Banking', path: '/voice-banking' },
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Guides', path: '/guides' },
  { name: 'Security', path: '/security' },
  { name: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg shadow-blue-900/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-18" style={{height:'68px'}}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-sbi-gradient flex items-center justify-center shadow-lg group-hover:shadow-blue-500/40 transition-shadow">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg text-[#003366]">SBI </span>
              <span className="font-bold text-lg text-[#FF8C00]">Smart Mitra</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'bg-[#1F5FAA] text-white shadow-md'
                    : 'text-[#003366] hover:bg-[#E8F0FB] hover:text-[#1F5FAA]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/ai-assistant"
              className="px-4 py-2 bg-[#FF8C00] text-white rounded-xl text-sm font-semibold hover:bg-orange-600 transition-all shadow-md hover:shadow-orange-300/50 hover:-translate-y-0.5"
            >
              Try AI Assistant
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-[#003366] hover:bg-[#E8F0FB] transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-white/30 shadow-lg"
          >
            <div className="px-5 py-5 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3.5 rounded-xl text-base font-medium transition-all ${
                    location.pathname === link.path
                      ? 'bg-[#1F5FAA] text-white'
                      : 'text-[#003366] hover:bg-[#E8F0FB]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/ai-assistant"
                className="block w-full text-center mt-3 px-4 py-3.5 bg-[#FF8C00] text-white rounded-xl text-base font-semibold"
              >
                Try AI Assistant
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
