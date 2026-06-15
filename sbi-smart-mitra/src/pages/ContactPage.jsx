import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Phone, Mail, MapPin, Clock, Send, MessageSquare,
  CheckCircle, Bot, Globe, Users, HeadphonesIcon,
  ChevronDown, ChevronUp
} from 'lucide-react'

const faqs = [
  { q: 'What is SBI Smart Mitra?', a: 'SBI Smart Mitra is an AI-powered digital banking assistant that helps SBI customers adopt and use digital banking services like YONO, UPI, Net Banking, and more through conversational AI guidance.' },
  { q: 'Is Smart Mitra free to use?', a: 'Yes, SBI Smart Mitra is completely free for all SBI account holders. There are no hidden charges or subscription fees.' },
  { q: 'Which languages does Smart Mitra support?', a: 'Smart Mitra currently supports English and Hindi for both text and voice interactions. More regional languages are being added progressively.' },
  { q: 'Is my banking data safe with Smart Mitra?', a: 'Smart Mitra is built on SBI\'s secure infrastructure. We do not store any sensitive banking credentials. All conversations are encrypted and used only to provide guidance.' },
  { q: 'Can I open a bank account through Smart Mitra?', a: 'Smart Mitra guides you through the process of opening an SBI account online via YONO. The actual account opening happens through SBI\'s official channels.' },
  { q: 'How accurate is the AI banking guidance?', a: 'Our AI is trained on official SBI documentation and guidelines. While we strive for accuracy, always verify critical banking decisions with SBI official channels.' },
]

const contactMethods = [
  { icon: Phone, title: 'Toll Free Helpline', value: '1800 11 2211', sub: '24x7 Available', color: 'from-blue-500 to-blue-700' },
  { icon: Mail, title: 'Email Support', value: 'smartmitra@sbi.co.in', sub: 'Response within 24 hours', color: 'from-orange-500 to-orange-700' },
  { icon: Globe, title: 'Online Portal', value: 'smartmitra.sbi.co.in', sub: 'Always available', color: 'from-green-500 to-green-700' },
  { icon: MapPin, title: 'Headquarters', value: 'State Bank Bhavan, Mumbai', sub: 'Madame Cama Road - 400021', color: 'from-purple-500 to-purple-700' },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setForm({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-[#f8faff] pt-16">
      {/* Header */}
      <div className="bg-sbi-gradient py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-2 mb-4">
              <MessageSquare className="w-4 h-4 text-[#FF8C00]" />
              <span className="text-white text-sm font-medium">Contact Us</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Get in Touch</h1>
            <p className="text-blue-100 max-w-xl mx-auto">
              Have questions about SBI Smart Mitra or need banking assistance? We're here to help.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {contactMethods.map((method, i) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center card-hover"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                <method.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-[#003366] text-sm mb-1">{method.title}</h3>
              <p className="text-[#1F5FAA] font-medium text-sm">{method.value}</p>
              <p className="text-xs text-gray-400 mt-1">{method.sub}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-[#003366] mb-6">Send us a Message</h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-[#003366] mb-2">Message Sent!</h3>
                  <p className="text-gray-500 mb-6">Thank you for reaching out. Our team will respond within 24 hours.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 bg-[#1F5FAA] text-white rounded-xl font-semibold hover:bg-[#003366] transition-colors"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Rajesh Kumar"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#1F5FAA] focus:ring-2 focus:ring-[#1F5FAA]/15"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#1F5FAA] focus:ring-2 focus:ring-[#1F5FAA]/15"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="rajesh@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#1F5FAA] focus:ring-2 focus:ring-[#1F5FAA]/15"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Subject *</label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#1F5FAA] focus:ring-2 focus:ring-[#1F5FAA]/15 bg-white"
                    >
                      <option value="">Select a subject</option>
                      <option>YONO / Mobile Banking Help</option>
                      <option>UPI Setup Assistance</option>
                      <option>Net Banking Activation</option>
                      <option>Loan Query</option>
                      <option>Security / Fraud Report</option>
                      <option>Technical Issue</option>
                      <option>General Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Describe your query in detail..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#1F5FAA] focus:ring-2 focus:ring-[#1F5FAA]/15 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#1F5FAA] text-white rounded-xl font-semibold hover:bg-[#003366] transition-colors shadow-md hover:shadow-blue-300/40"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    Your data is encrypted and secure. We'll respond within 24 hours.
                  </p>
                </form>
              )}
            </div>
          </motion.div>

          {/* FAQ & Support */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Support Hours */}
            <div className="bg-[#E8F0FB] rounded-2xl p-6 border border-blue-100">
              <h3 className="font-bold text-[#003366] mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#1F5FAA]" />
                Support Hours
              </h3>
              <div className="space-y-3">
                {[
                  { day: 'AI Assistant', time: '24/7 — Always Available', highlight: true },
                  { day: 'Phone Support', time: '24/7 — 1800 11 2211', highlight: true },
                  { day: 'Email Support', time: 'Mon–Sat: 9:00 AM – 6:00 PM', highlight: false },
                  { day: 'Chat Support', time: 'Mon–Fri: 8:00 AM – 8:00 PM', highlight: false },
                ].map(s => (
                  <div key={s.day} className={`flex justify-between items-center p-3 rounded-xl ${s.highlight ? 'bg-[#1F5FAA] text-white' : 'bg-white text-gray-600'}`}>
                    <span className="text-sm font-medium">{s.day}</span>
                    <span className={`text-sm font-semibold ${s.highlight ? 'text-[#FF8C00]' : 'text-[#003366]'}`}>{s.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h3 className="font-bold text-[#003366] flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#1F5FAA]" />
                  Frequently Asked Questions
                </h3>
              </div>
              <div className="divide-y divide-gray-50">
                {faqs.map((faq, i) => (
                  <div key={i}>
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-start justify-between gap-3 p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-sm font-semibold text-[#003366]">{faq.q}</span>
                      {openFaq === i
                        ? <ChevronUp className="w-4 h-4 text-[#1F5FAA] shrink-0 mt-0.5" />
                        : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                      }
                    </button>
                    {openFaq === i && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="px-4 pb-4"
                      >
                        <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
