import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Shield, AlertTriangle, CheckCircle, XCircle, Bell,
  Phone, Mail, MessageSquare, CreditCard, Globe,
  Lock, Eye, EyeOff, AlertCircle, Info, ChevronRight,
  TrendingDown, Users, Zap
} from 'lucide-react'

const scamAlerts = [
  {
    type: 'Critical',
    title: 'Fake SBI KYC Update Calls',
    desc: 'Fraudsters are calling SBI customers pretending to be bank officials, asking for OTP/PIN to "update KYC". SBI never asks for such details over phone.',
    date: '2 days ago',
    color: 'from-red-500 to-red-700',
    bgColor: 'bg-red-50 border-red-200',
    icon: Phone,
  },
  {
    type: 'Warning',
    title: 'Phishing Emails with SBI Logo',
    desc: 'Fraudulent emails are circulating with SBI branding, claiming account suspension. These contain malicious links. Always check the sender email domain.',
    date: '5 days ago',
    color: 'from-orange-500 to-orange-700',
    bgColor: 'bg-orange-50 border-orange-200',
    icon: Mail,
  },
  {
    type: 'Warning',
    title: 'WhatsApp "Prize Money" Scam',
    desc: 'Messages claiming SBI account holders have won prizes are circulating on WhatsApp. These are scams to steal personal and banking information.',
    date: '1 week ago',
    color: 'from-yellow-500 to-yellow-600',
    bgColor: 'bg-yellow-50 border-yellow-200',
    icon: MessageSquare,
  },
  {
    type: 'Info',
    title: 'Screen-Sharing App Fraud',
    desc: 'Fraudsters ask victims to install screen-sharing apps like AnyDesk claiming to help with banking issues, then steal credentials and transfer money.',
    date: '2 weeks ago',
    color: 'from-blue-500 to-blue-700',
    bgColor: 'bg-blue-50 border-blue-200',
    icon: Globe,
  },
]

const securityChecklist = [
  { id: 1, text: 'I use a unique, strong password for SBI Net Banking', category: 'Passwords' },
  { id: 2, text: 'I change my banking password every 3 months', category: 'Passwords' },
  { id: 3, text: 'I have enabled SMS/email alerts for all transactions', category: 'Alerts' },
  { id: 4, text: 'I use only official SBI app/website for banking', category: 'Access' },
  { id: 5, text: 'I never share OTP, PIN, or password with anyone', category: 'Privacy' },
  { id: 6, text: 'I have registered my mobile number with SBI', category: 'Account' },
  { id: 7, text: 'I have set appropriate transaction limits on my card', category: 'Limits' },
  { id: 8, text: 'I log out after every Net Banking session', category: 'Access' },
  { id: 9, text: 'I avoid banking on public Wi-Fi networks', category: 'Network' },
  { id: 10, text: 'I regularly check my account statement', category: 'Monitoring' },
]

const safetyTips = [
  { icon: Lock, title: 'Strong Passwords', desc: 'Use 8+ characters with uppercase, lowercase, numbers, and symbols. Never use birthday or simple sequences.', color: 'from-blue-500 to-blue-700' },
  { icon: Bell, title: 'Enable Alerts', desc: 'Register for SMS and email alerts for every transaction. Catch unauthorized activity immediately.', color: 'from-green-500 to-green-700' },
  { icon: Eye, title: 'Monitor Account', desc: 'Check your account statement weekly. Report any unknown transaction within 3 days for full protection.', color: 'from-purple-500 to-purple-700' },
  { icon: Globe, title: 'Use Official Channels', desc: 'Always type onlinesbi.sbi in browser. Never click links in emails or SMS. Download apps only from official stores.', color: 'from-orange-500 to-orange-700' },
  { icon: Phone, title: 'Never Share Details', desc: 'SBI will NEVER ask for OTP, PIN, CVV, or password over phone or email. Hang up if asked.', color: 'from-red-500 to-red-700' },
  { icon: CreditCard, title: 'Card Safety', desc: 'Cover keypad when entering PIN at ATM. Check for skimming devices. Block card immediately if lost.', color: 'from-yellow-500 to-yellow-600' },
]

const dosDonts = {
  dos: [
    'Always use official SBI website: onlinesbi.sbi',
    'Download YONO only from official app stores',
    'Enable transaction alerts via SMS & email',
    'Report suspicious activity: 1800 11 2211',
    'Update SBI registered mobile number promptly',
    'Use strong, unique passwords for banking',
    'Log out completely after Net Banking session',
  ],
  donts: [
    'Never share OTP, PIN, or password with anyone',
    'Never click on banking links in SMS or email',
    'Never do banking on public Wi-Fi',
    'Never install apps suggested by unknown callers',
    'Never respond to "prize won" or "KYC update" messages',
    'Never let others observe you enter your PIN',
    'Never write down your banking passwords',
  ],
}

export default function SecurityPage() {
  const [checkedItems, setCheckedItems] = useState([])
  const [showChecklist, setShowChecklist] = useState(false)

  const toggleCheck = (id) => {
    setCheckedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const score = Math.round((checkedItems.length / securityChecklist.length) * 100)
  const scoreLevel = score >= 80 ? { text: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' }
    : score >= 60 ? { text: 'Good', color: 'text-blue-600', bg: 'bg-blue-100' }
    : score >= 40 ? { text: 'Fair', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    : { text: 'Needs Attention', color: 'text-red-600', bg: 'bg-red-100' }

  return (
    <div className="min-h-screen bg-[#f8faff] pt-16">
      {/* Header */}
      <div className="bg-sbi-gradient py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-2 mb-4">
              <Shield className="w-4 h-4 text-[#FF8C00]" />
              <span className="text-white text-sm font-medium">Security & Fraud Awareness</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Stay Safe with SBI Digital Banking
            </h1>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Real-time fraud alerts, security tips, and best practices to keep your money safe.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Fraud Alerts */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-[#003366]">Active Fraud Alerts</h2>
              </div>
              <div className="space-y-4">
                {scamAlerts.map((alert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-5 rounded-2xl border ${alert.bgColor}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 bg-gradient-to-br ${alert.color} rounded-xl flex items-center justify-center shrink-0`}>
                        <alert.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-bold text-[#003366]">{alert.title}</h3>
                          <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                            alert.type === 'Critical' ? 'bg-red-200 text-red-700'
                            : alert.type === 'Warning' ? 'bg-orange-200 text-orange-700'
                            : 'bg-blue-200 text-blue-700'
                          }`}>
                            {alert.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{alert.desc}</p>
                        <p className="text-xs text-gray-400 mt-2">{alert.date}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Safety Tips */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-[#1F5FAA]" />
                </div>
                <h2 className="text-xl font-bold text-[#003366]">Security Best Practices</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {safetyTips.map((tip, i) => (
                  <motion.div
                    key={tip.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-br ${tip.color} rounded-xl flex items-center justify-center mb-3`}>
                      <tip.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-[#003366] mb-2">{tip.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{tip.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Dos and Donts */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                <h3 className="font-bold text-green-700 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Safe Banking DOs
                </h3>
                <ul className="space-y-2">
                  {dosDonts.dos.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
                <h3 className="font-bold text-red-700 mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  Safety DON'Ts
                </h3>
                <ul className="space-y-2">
                  {dosDonts.donts.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Security Score */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#003366] mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#1F5FAA]" />
                Your Security Score
              </h3>

              <div className="text-center mb-4">
                <div className="relative w-24 h-24 mx-auto">
                  <svg className="w-24 h-24 -rotate-90" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="32" fill="none" stroke="#f0f0f0" strokeWidth="8" />
                    <circle
                      cx="40" cy="40" r="32"
                      fill="none" stroke="#1F5FAA" strokeWidth="8"
                      strokeDasharray={`${(score / 100) * 201} 201`}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-2xl font-black text-[#003366]">{score}%</p>
                  </div>
                </div>
                <p className={`font-bold mt-2 ${scoreLevel.color}`}>{scoreLevel.text}</p>
              </div>

              <button
                onClick={() => setShowChecklist(!showChecklist)}
                className="w-full py-2.5 px-4 border border-[#1F5FAA] text-[#1F5FAA] rounded-xl text-sm font-semibold hover:bg-[#E8F0FB] transition-colors"
              >
                {showChecklist ? 'Hide Checklist' : 'Take Security Checklist'}
              </button>

              {showChecklist && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 space-y-2"
                >
                  {securityChecklist.map(item => (
                    <label
                      key={item.id}
                      className="flex items-start gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50"
                    >
                      <div
                        onClick={() => toggleCheck(item.id)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          checkedItems.includes(item.id) ? 'bg-green-500 border-green-500' : 'border-gray-300'
                        }`}
                      >
                        {checkedItems.includes(item.id) && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>
                      <span className={`text-xs ${checkedItems.includes(item.id) ? 'text-gray-400 line-through' : 'text-gray-600'}`}>
                        {item.text}
                      </span>
                    </label>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Emergency Contacts */}
            <div className="bg-red-50 rounded-2xl p-5 border border-red-200">
              <h3 className="font-bold text-red-700 mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Report Fraud Immediately
              </h3>
              <div className="space-y-3">
                <div className="bg-white rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-0.5">SBI Toll Free</p>
                  <p className="text-lg font-bold text-[#003366]">1800 11 2211</p>
                </div>
                <div className="bg-white rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-0.5">Cyber Crime</p>
                  <p className="text-lg font-bold text-[#003366]">1930</p>
                </div>
                <div className="bg-white rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-0.5">Block Card (SMS)</p>
                  <p className="text-sm font-bold text-[#003366]">BLOCK 1234 to 567676</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#003366] mb-4">Fraud Prevention Stats</h3>
              <div className="space-y-4">
                {[
                  { label: 'Phishing Attempts Blocked', value: '2.3L+', icon: TrendingDown, color: 'text-red-500' },
                  { label: 'Customers Educated', value: '50L+', icon: Users, color: 'text-blue-500' },
                  { label: 'Alerts Sent Daily', value: '10,000+', icon: Bell, color: 'text-orange-500' },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#003366]">{stat.value}</p>
                      <p className="text-xs text-gray-400">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
