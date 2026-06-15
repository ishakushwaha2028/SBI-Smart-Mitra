import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Bot, Mic, BarChart3, Shield, BookOpen, Star,
  ArrowRight, CheckCircle, Users, TrendingUp,
  Smartphone, CreditCard, PiggyBank, Landmark, Zap,
  ChevronRight, Globe
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}
const stagger = { visible: { transition: { staggerChildren: 0.14 } } }

const features = [
  { icon: Bot,      title: 'AI Banking Assistant', desc: 'Intelligent chatbot powered by Gemini AI for instant banking queries and step-by-step guidance.',    color: 'from-blue-500 to-blue-700',    link: '/ai-assistant' },
  { icon: Mic,      title: 'Voice Banking',         desc: 'Speak naturally in English or Hindi to complete any banking task completely hands-free.',            color: 'from-purple-500 to-purple-700', link: '/voice-banking' },
  { icon: BarChart3,title: 'Digital Adoption',      desc: 'Track your entire digital banking journey with a personalized onboarding progress dashboard.',      color: 'from-emerald-500 to-emerald-700',link: '/dashboard' },
  { icon: BookOpen, title: 'Smart Guides',          desc: 'Step-by-step interactive guides for YONO, UPI, Net Banking, FD, Loans and more.',                  color: 'from-orange-500 to-orange-700', link: '/guides' },
  { icon: Shield,   title: 'Fraud Awareness',       desc: 'Real-time scam alerts and actionable security tips to keep your money safe at all times.',          color: 'from-red-500 to-red-700',      link: '/security' },
  { icon: Star,     title: 'Personalized Tips',     desc: 'AI-driven financial recommendations tailored specifically to your banking profile and needs.',       color: 'from-yellow-500 to-yellow-600', link: '/dashboard' },
]

const stats = [
  { value: '50 Cr+',  label: 'SBI Account Holders',  icon: Users },
  { value: '22,000+', label: 'Branches Nationwide',  icon: Landmark },
  { value: '71,000+', label: 'ATMs Across India',    icon: CreditCard },
  { value: '95%',     label: 'Customer Satisfaction', icon: TrendingUp },
]

const services = [
  { icon: Smartphone, name: 'YONO App',       desc: 'All-in-one banking app' },
  { icon: Zap,        name: 'UPI Payments',   desc: 'Instant money transfer' },
  { icon: Globe,      name: 'Net Banking',    desc: 'Bank from anywhere' },
  { icon: PiggyBank,  name: 'Fixed Deposits', desc: 'Grow your savings' },
  { icon: Landmark,   name: 'Home Loans',     desc: 'Best interest rates' },
  { icon: CreditCard, name: 'Debit Card',     desc: 'Worldwide acceptance' },
]

const testimonials = [
  { name: 'Priya Sharma',  role: 'YONO User, Delhi',          text: 'Smart Mitra helped me set up UPI in just minutes. The voice assistant is amazing and works perfectly in Hindi!',                   rating: 5 },
  { name: 'Rajesh Kumar',  role: 'Net Banking User, Mumbai',  text: 'Finally a banking assistant that truly understands my queries. I opened my FD account without visiting a branch!',              rating: 5 },
  { name: 'Anita Patel',   role: 'Senior Citizen, Ahmedabad', text: 'Very easy to use. The AI guided me step by step for everything. My children were also very impressed by how simple it was.',    rating: 5 },
]

export default function LandingPage() {
  return (
    <div className="overflow-hidden">

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center bg-sbi-gradient pt-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400/20 rounded-full animate-blob" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-orange-400/15 rounded-full animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-300/10 rounded-full animate-blob animation-delay-4000" />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <motion.div initial="hidden" animate="visible" variants={stagger}>

              <motion.h1 variants={fadeUp}
                className="text-4xl sm:text-5xl xl:text-6xl font-bold text-white leading-tight mb-7">
                Your AI-Powered
                <span className="block text-[#FF8C00] mt-1">Banking Companion</span>
                <span className="block mt-1">for Digital India</span>
              </motion.h1>

              <motion.p variants={fadeUp}
                className="text-blue-100 text-lg leading-relaxed mb-10 max-w-lg">
                SBI Smart Mitra bridges the gap between traditional banking and digital transformation —
                guiding every SBI customer through YONO, UPI, Net Banking, and beyond with
                AI-powered simplicity.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-10">
                <Link to="/ai-assistant"
                  className="flex items-center gap-2 px-7 py-4 bg-[#FF8C00] text-white rounded-xl font-semibold text-base hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5">
                  <Bot className="w-5 h-5" />
                  Chat with Mitra
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/voice-banking"
                  className="flex items-center gap-2 px-7 py-4 bg-white/15 text-white border border-white/30 rounded-xl font-semibold text-base hover:bg-white/25 transition-all backdrop-blur-sm">
                  <Mic className="w-5 h-5" />
                  Voice Banking
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-7">
                {['Free Service', 'Multi-language', 'Available 24/7'].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-blue-100">
                    <CheckCircle className="w-4 h-4 text-[#FF8C00]" />
                    <span className="text-sm font-medium">{f}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — Chat card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-md">
                <div className="glass rounded-3xl p-7 shadow-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-sbi-gradient rounded-2xl flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-[#003366] text-base">SBI Smart Mitra</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <p className="text-xs text-gray-500">AI Assistant • Online</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-5">
                    <div className="chat-bubble-bot px-4 py-3.5 text-sm max-w-xs">
                      नमस्ते! 🙏 I'm your SBI Smart Mitra. How can I help you with digital banking today?
                    </div>
                    <div className="chat-bubble-user px-4 py-3.5 text-sm max-w-xs ml-auto">
                      How do I set up UPI on YONO app?
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {['UPI Guide', 'Check Balance', 'Open FD'].map((action) => (
                      <span key={action}
                        className="px-3.5 py-2 bg-[#E8F0FB] text-[#1F5FAA] rounded-lg text-xs font-semibold cursor-pointer hover:bg-[#1F5FAA] hover:text-white transition-colors">
                        {action}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-6 -right-6 glass rounded-2xl p-3.5 shadow-xl"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">Adoption Score</p>
                      <p className="text-sm font-bold text-green-600">78 / 100</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div key={stat.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="text-center">
                <div className="w-14 h-14 bg-[#E8F0FB] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-7 h-7 text-[#1F5FAA]" />
                </div>
                <p className="text-3xl font-bold text-[#003366]">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 bg-[#f8faff]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-5 py-2 bg-[#E8F0FB] text-[#1F5FAA] rounded-full text-sm font-semibold mb-5">
              Core Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#003366] mb-5">
              Everything You Need for Digital Banking
            </h2>
            <p className="text-gray-500 text-base max-w-2xl mx-auto leading-relaxed">
              Comprehensive AI-powered tools designed to make every SBI digital service
              accessible and easy to use for all customers.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {features.map((feature, i) => (
              <motion.div key={feature.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                <Link to={feature.link}
                  className="flex flex-col h-full bg-white rounded-2xl p-7 shadow-sm border border-gray-100 card-hover group">
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#003366] mb-3">{feature.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5 flex-1">{feature.desc}</p>
                  <div className="flex items-center gap-1 text-[#1F5FAA] text-sm font-semibold group-hover:gap-2 transition-all mt-auto">
                    Explore <ChevronRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-5 py-2 bg-orange-50 text-[#FF8C00] rounded-full text-sm font-semibold mb-5">
              SBI Digital Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#003366] mb-5">
              One Platform, All SBI Services
            </h2>
            <p className="text-gray-500 text-base max-w-2xl mx-auto leading-relaxed">
              Get guided assistance for every SBI digital service through our AI-powered platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {services.map((svc, i) => (
              <motion.div key={svc.name}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                className="text-center p-6 rounded-2xl border border-gray-100 hover:border-[#1F5FAA]/30 hover:bg-[#E8F0FB]/50 transition-all cursor-pointer group">
                <div className="w-14 h-14 bg-[#E8F0FB] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#1F5FAA] transition-colors">
                  <svc.icon className="w-7 h-7 text-[#1F5FAA] group-hover:text-white transition-colors" />
                </div>
                <p className="font-semibold text-[#003366] text-sm mb-1">{svc.name}</p>
                <p className="text-xs text-gray-400">{svc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-24 bg-[#f8faff]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-5 py-2 bg-[#E8F0FB] text-[#1F5FAA] rounded-full text-sm font-semibold mb-5">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#003366]">
              Start Your Digital Banking Journey
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {[
              { step: '01', title: 'Create Profile',  desc: 'Tell us about your banking needs and current digital service usage.',             icon: Users },
              { step: '02', title: 'Get Guidance',    desc: 'AI Mitra provides personalized step-by-step guidance for each service.',         icon: Bot },
              { step: '03', title: 'Track Progress',  desc: 'Monitor your digital adoption score on the interactive dashboard.',              icon: BarChart3 },
              { step: '04', title: 'Stay Secure',     desc: 'Receive fraud alerts and security tips to protect your account.',                icon: Shield },
            ].map((step, i) => (
              <motion.div key={step.step}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }} viewport={{ once: true }}
                className="relative bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                <span className="text-6xl font-black text-[#E8F0FB] absolute top-5 right-5 leading-none select-none">
                  {step.step}
                </span>
                <div className="w-14 h-14 bg-sbi-gradient rounded-2xl flex items-center justify-center mb-5">
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-[#003366] text-base mb-3">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-5 py-2 bg-yellow-50 text-yellow-700 rounded-full text-sm font-semibold mb-5">
              Customer Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#003366]">
              Trusted by SBI Customers
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {testimonials.map((t, i) => (
              <motion.div key={t.name}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }} viewport={{ once: true }}
                className="bg-[#f8faff] rounded-2xl p-7 border border-gray-100 flex flex-col">
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">"{t.text}"</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-11 h-11 bg-sbi-gradient rounded-full flex items-center justify-center text-white font-bold shrink-0">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-[#003366] text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-sbi-gradient relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-400/10 rounded-full translate-y-1/2 -translate-x-1/4" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block px-5 py-2 bg-white/15 border border-white/25 text-white rounded-full text-sm font-semibold mb-7">
              Get Started Today
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-7 leading-tight">
              Ready to Go Digital with SBI?
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Join millions of SBI customers who have embraced digital banking with the help of
              Smart Mitra. It's free, safe, and available 24/7.
            </p>
            <div className="flex flex-wrap gap-5 justify-center">
              <Link to="/ai-assistant"
                className="flex items-center gap-2 px-9 py-4 bg-[#FF8C00] text-white rounded-xl font-semibold text-lg hover:bg-orange-600 transition-all shadow-xl hover:-translate-y-0.5">
                <Bot className="w-5 h-5" />
                Start Free Consultation
              </Link>
              <Link to="/guides"
                className="flex items-center gap-2 px-9 py-4 bg-white/15 border border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-white/25 transition-all">
                <BookOpen className="w-5 h-5" />
                Browse Guides
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
