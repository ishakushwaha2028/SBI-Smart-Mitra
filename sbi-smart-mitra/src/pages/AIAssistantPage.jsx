import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bot, Send, User, Zap, RefreshCw, Copy, ThumbsUp,
  ThumbsDown, Sparkles, BookOpen, CreditCard, PiggyBank,
  Landmark, Smartphone, Shield, TrendingUp, HelpCircle
} from 'lucide-react'

const QUICK_ACTIONS = [
  { label: 'Setup UPI', icon: Zap, query: 'How do I set up UPI on YONO app?' },
  { label: 'Open FD', icon: PiggyBank, query: 'How to open a Fixed Deposit online with SBI?' },
  { label: 'Net Banking', icon: Landmark, query: 'How to activate SBI Net Banking?' },
  { label: 'YONO Setup', icon: Smartphone, query: 'How do I register on YONO SBI app?' },
  { label: 'Loan Apply', icon: CreditCard, query: 'How to apply for a personal loan through SBI?' },
  { label: 'Security Tips', icon: Shield, query: 'What are the best security practices for SBI online banking?' },
  { label: 'Check Balance', icon: TrendingUp, query: 'How to check my SBI account balance?' },
  { label: 'Account Open', icon: BookOpen, query: 'How to open a new SBI account online?' },
]

const DEMO_RESPONSES = {
  default: [
    {
      content: `Hello! 🙏 I'm **SBI Smart Mitra**, your AI banking companion!

I can help you with:
• 📱 **YONO & Mobile Banking** setup
• 💳 **UPI Registration** and transactions
• 🏦 **Net Banking** activation
• 📈 **Fixed Deposits** & investments
• 🏠 **Loan Applications**
• 🔐 **Security & Fraud** prevention

What would you like help with today?`
    }
  ],
  upi: `Setting up UPI on YONO SBI is quick and easy! Here's how:

**Step 1: Download YONO SBI**
• Download from Play Store / App Store
• Register with your SBI account

**Step 2: Navigate to UPI**
• Open YONO → Tap "UPI"
• Click "Register for UPI"

**Step 3: Create VPA**
• Your Virtual Payment Address (e.g., yourname@sbi)
• Link your SBI account

**Step 4: Set UPI PIN**
• Enter your Debit Card details
• Set a 6-digit UPI PIN

✅ **You're all set!** Start sending/receiving money instantly.

💡 *Pro tip: Keep your UPI PIN confidential. SBI will never ask for it.*`,

  fd: `Opening a Fixed Deposit online with SBI is simple:

**Online FD via Net Banking:**
1. Login to **onlinesbi.sbi**
2. Go to **e-Fixed Deposit → eFixed Deposit**
3. Enter the amount (min ₹1,000)
4. Choose tenure (7 days to 10 years)
5. Select interest payout option
6. Confirm with OTP

**Current SBI FD Rates (2024):**
| Tenure | General | Senior Citizen |
|--------|---------|----------------|
| 1-2 yr | 6.80% | 7.30% |
| 2-3 yr | 7.00% | 7.50% |
| 5+ yr | 6.50% | 7.50% |

✅ FD created instantly — no branch visit needed!`,

  netbanking: `Activating SBI Net Banking is straightforward:

**Method 1: Via ATM**
1. Visit any SBI ATM
2. Select "Internet Banking Registration"
3. Enter your Debit Card & PIN
4. Choose username & password
5. Activate via OTP sent to registered mobile

**Method 2: Via Branch**
1. Submit Internet Banking form at branch
2. Receive temporary credentials by post
3. Login at onlinesbi.sbi and reset password

**First Login Steps:**
• Go to **onlinesbi.sbi**
• Enter Username & Password
• Verify with OTP
• Set new secure password

🔐 *Always use official website: onlinesbi.sbi*`,
}

function getResponse(query) {
  const q = query.toLowerCase()
  if (q.includes('upi')) return DEMO_RESPONSES.upi
  if (q.includes('fd') || q.includes('fixed deposit')) return DEMO_RESPONSES.fd
  if (q.includes('net banking') || q.includes('internet banking')) return DEMO_RESPONSES.netbanking
  if (q.includes('yono')) return `**YONO SBI Registration Guide:**\n\n1. Download **YONO SBI** from Play Store/App Store\n2. Click "New to YONO? Register"\n3. Enter your **SBI Account Number**\n4. Verify with OTP on registered mobile\n5. Set your MPIN (6 digits)\n6. Login and explore 300+ services!\n\n✅ YONO gives you banking, insurance, shopping, travel booking — all in one app!\n\n💡 *Available in English, Hindi, and 12+ regional languages*`
  if (q.includes('loan') || q.includes('personal loan')) return `**SBI Personal Loan Application:**\n\n**Eligibility:**\n• Age: 21-60 years\n• Min Income: ₹15,000/month\n• Employment: Salaried/Self-employed\n\n**How to Apply Online:**\n1. Visit **sbi.co.in** → Loans\n2. Select Personal Loan → Apply Online\n3. Fill application form\n4. Upload documents (PAN, Aadhaar, Salary Slip)\n5. Get instant approval decision\n\n**Interest Rates:** Starting from 11.15% p.a.\n**Loan Amount:** ₹25,000 to ₹20 Lakhs\n\n✅ Approval in 24 hours for eligible customers!`
  if (q.includes('balance')) return `**Ways to Check SBI Balance:**\n\n📱 **YONO App:** Login → Dashboard shows balance\n💻 **Net Banking:** onlinesbi.sbi → Account Summary\n📲 **Missed Call:** Give missed call to **09223766666**\n💬 **SMS:** SMS "BAL" to 09223766666\n🏧 **ATM:** Insert card → Balance Enquiry\n\n✅ Missed call service is free and available 24/7!`
  if (q.includes('account') || q.includes('open')) return `**Open SBI Account Online (YONO):**\n\n1. Download YONO SBI app\n2. Tap "Open Account"\n3. Select Account Type (Savings/Current)\n4. Complete Video KYC\n5. Upload Aadhaar & PAN\n6. Account opened in **2 minutes!**\n\n**Account Types:**\n• Basic Savings (Zero Balance)\n• Regular Savings\n• Salary Account\n\n✅ No branch visit needed with Video KYC!`
  if (q.includes('security') || q.includes('fraud') || q.includes('safe')) return `**SBI Security Best Practices:**\n\n🔐 **Passwords:**\n• Use strong unique passwords\n• Change every 90 days\n• Never share with anyone\n\n⚠️ **SBI Will Never:**\n• Ask for your OTP or PIN\n• Request card details via phone/email\n• Ask you to transfer money for security\n\n🛡️ **Stay Safe:**\n• Always use official SBI website/app\n• Enable transaction alerts\n• Register for SBI SHIELD\n• Report fraud: 1800 11 2211\n\n✅ When in doubt, call SBI at **1800 11 2211**`
  return `Thank you for your question! Here's what I can help you with:\n\n**Popular SBI Services I Can Guide You Through:**\n• UPI & YONO Setup\n• Net Banking Activation\n• Fixed Deposit Creation\n• Loan Applications\n• Account Opening\n• Security & Fraud Prevention\n\nPlease ask a specific question or use the quick action buttons below for instant guidance! 😊\n\n*For urgent banking support, call SBI: **1800 11 2211** (24x7 Toll Free)*`
}

function MessageContent({ content }) {
  const lines = content.split('\n')
  return (
    <div className="text-sm leading-relaxed space-y-1">
      {lines.map((line, i) => {
        if (line.startsWith('**') && line.endsWith('**')) {
          return <p key={i} className="font-bold text-[#003366]">{line.slice(2, -2)}</p>
        }
        if (line.startsWith('• ')) {
          return <p key={i} className="flex gap-2"><span className="text-[#FF8C00] mt-0.5">•</span><span>{line.slice(2).replace(/\*\*(.*?)\*\*/g, '$1')}</span></p>
        }
        if (line.startsWith('#')) {
          return <p key={i} className="font-semibold">{line.replace(/^#+\s/, '')}</p>
        }
        if (line.trim() === '') return <div key={i} className="h-1" />
        // Bold inline
        const parts = line.split(/(\*\*.*?\*\*)/)
        return (
          <p key={i}>
            {parts.map((part, j) =>
              part.startsWith('**') ? <strong key={j} className="font-bold">{part.slice(2, -2)}</strong> : part
            )}
          </p>
        )
      })}
    </div>
  )
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'bot',
      content: `Hello! 🙏 I'm **SBI Smart Mitra**, your AI banking companion!\n\nI can help you with:\n• 📱 **YONO & Mobile Banking** setup\n• 💳 **UPI Registration** and transactions\n• 🏦 **Net Banking** activation\n• 📈 **Fixed Deposits** & investments\n• 🏠 **Loan Applications**\n• 🔐 **Security & Fraud** prevention\n\nWhat would you like help with today?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const sendMessage = async (text) => {
    const query = text || input.trim()
    if (!query) return
    setInput('')

    const userMsg = {
      id: Date.now(),
      role: 'user',
      content: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages(prev => [...prev, userMsg])
    setIsTyping(true)

    // Simulate AI response delay
    await new Promise(r => setTimeout(r, 1200 + Math.random() * 800))

    const response = getResponse(query)
    setIsTyping(false)
    setMessages(prev => [...prev, {
      id: Date.now() + 1,
      role: 'bot',
      content: response,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }])
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearChat = () => {
    setMessages([{
      id: 1,
      role: 'bot',
      content: `Hello! 🙏 I'm **SBI Smart Mitra**, your AI banking companion!\n\nWhat would you like help with today?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }])
  }

  return (
    <div className="min-h-screen bg-[#f8faff] pt-16">
      {/* Header */}
      <div className="bg-sbi-gradient py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/15 border border-white/25 rounded-2xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold text-white">SBI Smart Mitra AI</h1>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-blue-200 text-sm">Powered by Gemini AI • Online</span>
                </div>
              </div>
            </div>
            <p className="text-blue-100 max-w-xl mx-auto text-sm">
              Your intelligent banking companion for all SBI digital services — available 24/7 in English and Hindi
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-5">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#003366] mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#FF8C00]" />
                Quick Actions
              </h3>
              <div className="space-y-2">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => sendMessage(action.query)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#E8F0FB] text-left transition-colors group"
                  >
                    <div className="w-8 h-8 bg-[#E8F0FB] group-hover:bg-[#1F5FAA] rounded-lg flex items-center justify-center transition-colors">
                      <action.icon className="w-4 h-4 text-[#1F5FAA] group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-sm text-gray-700 font-medium">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#E8F0FB] rounded-2xl p-5 border border-blue-100">
              <div className="flex items-center gap-2 mb-3">
                <HelpCircle className="w-4 h-4 text-[#1F5FAA]" />
                <h4 className="font-bold text-[#003366] text-sm">Need Human Help?</h4>
              </div>
              <p className="text-xs text-gray-600 mb-3">Connect with SBI customer support for complex queries</p>
              <div className="space-y-2">
                <div className="bg-white rounded-lg px-3 py-2 text-xs text-[#003366] font-medium">📞 1800 11 2211 (Free)</div>
                <div className="bg-white rounded-lg px-3 py-2 text-xs text-[#003366] font-medium">💬 Live Chat on YONO</div>
              </div>
            </div>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col" style={{ height: '65vh' }}>
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-sbi-gradient rounded-xl flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  </div>
                  <div>
                    <p className="font-bold text-[#003366] text-sm">SBI Smart Mitra</p>
                    <p className="text-xs text-gray-400">AI Banking Assistant</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={clearChat}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
                    title="Clear chat"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        msg.role === 'bot' ? 'bg-sbi-gradient' : 'bg-[#E8F0FB]'
                      }`}>
                        {msg.role === 'bot'
                          ? <Bot className="w-4 h-4 text-white" />
                          : <User className="w-4 h-4 text-[#1F5FAA]" />
                        }
                      </div>
                      <div className={`max-w-md ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                        <div className={msg.role === 'bot' ? 'chat-bubble-bot p-3.5' : 'chat-bubble-user p-3.5'}>
                          <MessageContent content={msg.content} />
                        </div>
                        <span className="text-xs text-gray-400 px-1">{msg.time}</span>
                        {msg.role === 'bot' && (
                          <div className="flex gap-1">
                            <button className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-green-500 transition-colors">
                              <ThumbsUp className="w-3 h-3" />
                            </button>
                            <button className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-red-400 transition-colors">
                              <ThumbsDown className="w-3 h-3" />
                            </button>
                            <button className="p-1 rounded hover:bg-gray-100 text-gray-400 transition-colors">
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-xl bg-sbi-gradient flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="chat-bubble-bot p-3.5">
                      <div className="flex gap-1 items-center h-4">
                        {[0, 1, 2].map(i => (
                          <div
                            key={i}
                            className="w-2 h-2 bg-[#1F5FAA] rounded-full typing-dot"
                            style={{ animationDelay: `${i * 0.2}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-100">
                <div className="flex gap-3 items-end">
                  <div className="flex-1 relative">
                    <textarea
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask about UPI, YONO, Net Banking, Loans, FD..."
                      className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1F5FAA] focus:ring-2 focus:ring-[#1F5FAA]/15 resize-none"
                      rows={1}
                      style={{ minHeight: '44px', maxHeight: '120px' }}
                    />
                  </div>
                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || isTyping}
                    className="w-11 h-11 bg-[#1F5FAA] disabled:bg-gray-200 text-white rounded-xl flex items-center justify-center hover:bg-[#003366] transition-colors shadow-md disabled:shadow-none shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center flex items-center justify-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Powered by Gemini AI • Responses are for guidance only
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
