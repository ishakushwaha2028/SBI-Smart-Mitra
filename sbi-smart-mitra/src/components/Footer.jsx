import { Link } from 'react-router-dom'
import { Bot, Phone, Mail, MapPin, Shield, Share2, AtSign, PlayCircle, Rss } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#003366] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-[#FF8C00]" />
              </div>
              <div>
                <span className="font-bold text-lg">SBI </span>
                <span className="font-bold text-lg text-[#FF8C00]">Smart Mitra</span>
              </div>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed mb-6">
              AI-powered digital banking assistant helping millions of Indians embrace digital banking with confidence.
            </p>
            <div className="flex gap-3">
              {[Share2, AtSign, PlayCircle, Rss].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#FF8C00] transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'AI Assistant', path: '/ai-assistant' },
                { name: 'Voice Banking', path: '/voice-banking' },
                { name: 'Dashboard', path: '/dashboard' },
                { name: 'Banking Guides', path: '/guides' },
                { name: 'Security Center', path: '/security' },
                { name: 'About Solution', path: '/about' },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-blue-200 hover:text-[#FF8C00] text-sm transition-colors leading-relaxed">
                    → {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SBI Services */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">SBI Digital Services</h4>
            <ul className="space-y-3">
              {['YONO App', 'SBI UPI', 'Net Banking', 'Mobile Banking', 'FD Online', 'Loan Application', 'Debit Card', 'Insurance'].map((s) => (
                <li key={s}>
                  <span className="text-blue-200 text-sm hover:text-[#FF8C00] cursor-pointer transition-colors leading-relaxed">→ {s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#FF8C00] mt-1 shrink-0" />
                <div>
                  <p className="text-sm text-white font-medium">1800 11 2211</p>
                  <p className="text-xs text-blue-200 mt-0.5">Toll Free (24x7)</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#FF8C00] mt-1 shrink-0" />
                <div>
                  <p className="text-sm text-white font-medium">smartmitra@sbi.co.in</p>
                  <p className="text-xs text-blue-200 mt-0.5">Email Support</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FF8C00] mt-1 shrink-0" />
                <div>
                  <p className="text-sm text-white font-medium">State Bank Bhavan</p>
                  <p className="text-xs text-blue-200 mt-0.5">Madame Cama Road, Mumbai 400021</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-blue-200">
            <Shield className="w-4 h-4 text-[#FF8C00]" />
            <span>Secured by SBI Digital Banking Infrastructure</span>
          </div>
          <p className="text-sm text-blue-200">
            © 2024 SBI Smart Mitra. Built for SBI Hackathon. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-blue-300">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Use</span>
            <span className="hover:text-white cursor-pointer transition-colors">Disclaimer</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
