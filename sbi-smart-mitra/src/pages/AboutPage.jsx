import { motion } from 'framer-motion'
import {
  Bot, Mic, BarChart3, Shield, BookOpen, Zap, Globe,
  CheckCircle, Target, Users, Award, TrendingUp, Star,
  Code2, Brain, Layers, ArrowRight, GitBranch
} from 'lucide-react'

const techStack = [
]

const problemStatements = [
  'Millions of SBI customers remain unfamiliar with digital banking services like YONO, UPI, and Net Banking',
  'Language barrier prevents rural and semi-urban customers from using digital banking',
  'Lack of personalized guidance leads to incomplete digital adoption journeys',
  'Rising cyber fraud targeting SBI customers due to lack of awareness',
  'Elderly and first-time users struggle with complex banking interfaces',
]

const solutions = [
  { icon: Bot, title: 'AI-Powered Guidance', desc: 'Gemini AI chatbot provides instant, personalized answers to banking queries in simple language' },
  { icon: Mic, title: 'Voice Banking', desc: 'Speech-to-text and text-to-speech support in English and Hindi eliminates typing barriers' },
  { icon: BarChart3, title: 'Adoption Tracker', desc: 'Gamified digital adoption dashboard motivates customers to complete their digital banking journey' },
  { icon: BookOpen, title: 'Interactive Guides', desc: 'Step-by-step guides with progress tracking for every SBI digital service' },
  { icon: Shield, title: 'Fraud Prevention', desc: 'Real-time fraud alerts, security scoring, and awareness campaigns keep customers safe' },
  { icon: Star, title: 'Personalization', desc: 'AI-driven product recommendations based on user profile and banking behavior' },
]

const impactStats = [
  { value: '10 Cr+', label: 'Target Customers', icon: Users },
  { value: '95%', label: 'Digital Adoption Rate Target', icon: TrendingUp },
  { value: '7+', label: 'Languages Supported', icon: Globe },
  { value: '24/7', label: 'AI Availability', icon: Zap },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f8faff] pt-16">
      {/* Header */}
      <div className="bg-sbi-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">About SBI Smart Mitra</h1>
            <p className="text-blue-100 text-lg max-w-3xl mx-auto">
              An AI-powered digital banking adoption platform designed to bridge the gap between traditional banking customers and SBI's comprehensive suite of digital services.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Vision & Mission */}
        <section>
          <div className="grid lg:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-sbi-gradient rounded-3xl p-8 text-white"
            >
              <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center mb-5">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-blue-100 leading-relaxed">
                To make every SBI customer digitally empowered — regardless of age, language, or technical background — by providing AI-guided, personalized digital banking assistance that is accessible, secure, and available 24/7.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
            >
              <div className="w-12 h-12 bg-orange-gradient rounded-2xl flex items-center justify-center mb-5">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#003366] mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                Accelerate SBI's digital transformation by leveraging Artificial Intelligence to guide customers through YONO, UPI, Net Banking, and all digital services with personalized, step-by-step assistance in their preferred language, while keeping them safe from digital fraud.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Problem Statement */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1.5 bg-red-50 text-red-600 rounded-full text-sm font-semibold mb-4">Problem Statement</span>
              <h2 className="text-3xl font-bold text-[#003366]">The Digital Banking Gap in India</h2>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {problemStatements.map((problem, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-red-50 rounded-xl border border-red-100">
                    <div className="w-6 h-6 bg-red-200 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-red-700 text-xs font-bold">{i + 1}</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{problem}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Solutions */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-semibold mb-4">Our Solutions</span>
              <h2 className="text-3xl font-bold text-[#003366]">How Smart Mitra Solves It</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {solutions.map((sol, i) => (
                <motion.div
                  key={sol.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 card-hover"
                >
                  <div className="w-12 h-12 bg-sbi-gradient rounded-2xl flex items-center justify-center mb-4">
                    <sol.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-[#003366] mb-2">{sol.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{sol.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Impact Stats */}
        <section className="bg-[#003366] rounded-3xl p-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white">Expected Impact</h2>
            <p className="text-blue-200 mt-2">Projected outcomes from Smart Mitra implementation</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-white/10 rounded-2xl p-5"
              >
                <div className="w-10 h-10 bg-[#FF8C00] rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-blue-200 text-xs mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1.5 bg-[#E8F0FB] text-[#1F5FAA] rounded-full text-sm font-semibold mb-4"></span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {techStack.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center card-hover"
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${tech.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <Code2 className="w-5 h-5 text-white" />
                  </div>
                  <p className="font-bold text-[#003366] text-sm">{tech.name}</p>
                  <p className="text-xs text-[#FF8C00] font-medium">{tech.category}</p>
                  <p className="text-xs text-gray-400 mt-1">{tech.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  )
}
