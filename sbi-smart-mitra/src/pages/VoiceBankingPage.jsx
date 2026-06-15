import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mic, MicOff, Volume2, VolumeX, Globe, Sparkles,
  Bot, PlayCircle, StopCircle, RefreshCw, CheckCircle,
  Zap, MessageSquare
} from 'lucide-react'

const VOICE_RESPONSES = {
  'upi': 'UPI setup on YONO is easy! Open the YONO app, go to UPI section, create your Virtual Payment Address, link your SBI account, and set your 6-digit UPI PIN. You are all set to send and receive money instantly!',
  'balance': 'You can check your SBI account balance in multiple ways. Give a missed call to 09223766666, send SMS BAL to the same number, or check on YONO app. All these services are free and available 24 hours a day.',
  'yono': 'To register on YONO SBI, download the app from Play Store or App Store. Click New to YONO and Register. Enter your SBI account number, verify with OTP on your registered mobile, set a 6-digit MPIN, and start banking!',
  'netbanking': 'To activate SBI Net Banking, visit any SBI ATM and select Internet Banking Registration. Enter your debit card and PIN. Choose a username and password. You will receive an OTP to complete activation.',
  'loan': 'To apply for an SBI personal loan online, visit sbi.co.in, go to Loans section, select Personal Loan, fill the application form, upload your PAN, Aadhaar, and salary slip. Get approval within 24 hours!',
  'fd': 'Opening an SBI Fixed Deposit online is simple! Login to onlinesbi.sbi, go to e-Fixed Deposit, enter the amount starting from 1000 rupees, choose your tenure from 7 days to 10 years, and confirm with OTP.',
  'default': 'Namaste! I am SBI Smart Mitra, your voice banking assistant. I can help you with UPI setup, Net Banking activation, YONO registration, Fixed Deposits, Loan applications, and account balance enquiries. Please ask your question!',
}

const DEMO_QUERIES = [
  'How to set up UPI?',
  'Check my balance',
  'YONO registration guide',
  'Activate Net Banking',
  'Apply for a loan',
  'Open Fixed Deposit',
]

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧', voiceLang: 'en-IN' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳', voiceLang: 'hi-IN' },
]

function getVoiceResponse(text) {
  const t = text.toLowerCase()
  if (t.includes('upi') || t.includes('payment')) return VOICE_RESPONSES.upi
  if (t.includes('balance') || t.includes('check')) return VOICE_RESPONSES.balance
  if (t.includes('yono') || t.includes('app')) return VOICE_RESPONSES.yono
  if (t.includes('net') || t.includes('internet') || t.includes('netbanking')) return VOICE_RESPONSES.netbanking
  if (t.includes('loan') || t.includes('borrow')) return VOICE_RESPONSES.loan
  if (t.includes('fd') || t.includes('fixed') || t.includes('deposit')) return VOICE_RESPONSES.fd
  return VOICE_RESPONSES.default
}

export default function VoiceBankingPage() {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [response, setResponse] = useState('')
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0])
  const [status, setStatus] = useState('idle') // idle | listening | processing | speaking
  const [history, setHistory] = useState([])
  const [micSupported, setMicSupported] = useState(true)
  const recognitionRef = useRef(null)
  const synthRef = useRef(window.speechSynthesis)

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setMicSupported(false)
    }
    return () => {
      synthRef.current?.cancel()
      recognitionRef.current?.abort()
    }
  }, [])

  const startListening = () => {
    if (!micSupported) return
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = selectedLang.voiceLang
    recognition.continuous = false
    recognition.interimResults = true

    recognition.onstart = () => {
      setStatus('listening')
      setIsListening(true)
      setTranscript('')
    }

    recognition.onresult = (e) => {
      const t = Array.from(e.results).map(r => r[0].transcript).join('')
      setTranscript(t)
    }

    recognition.onend = () => {
      setIsListening(false)
      if (transcript || recognitionRef.current?._transcript) {
        processVoice(transcript || recognitionRef.current?._transcript || '')
      } else {
        setStatus('idle')
      }
    }

    recognition.onerror = () => {
      setIsListening(false)
      setStatus('idle')
    }

    recognitionRef.current = recognition
    recognition.start()
  }

  const stopListening = () => {
    recognitionRef.current?.stop()
    setIsListening(false)
  }

  const processVoice = (text) => {
    if (!text.trim()) { setStatus('idle'); return }
    setStatus('processing')
    setTimeout(() => {
      const resp = getVoiceResponse(text)
      setResponse(resp)
      setHistory(prev => [{ query: text, response: resp, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }, ...prev.slice(0, 4)])
      speakResponse(resp)
    }, 800)
  }

  const speakResponse = (text) => {
    synthRef.current?.cancel()
    setStatus('speaking')
    setIsSpeaking(true)
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = selectedLang.voiceLang
    utterance.rate = 0.9
    utterance.pitch = 1
    utterance.onend = () => {
      setIsSpeaking(false)
      setStatus('idle')
    }
    utterance.onerror = () => {
      setIsSpeaking(false)
      setStatus('idle')
    }
    synthRef.current?.speak(utterance)
  }

  const stopSpeaking = () => {
    synthRef.current?.cancel()
    setIsSpeaking(false)
    setStatus('idle')
  }

  const tryDemoQuery = (query) => {
    setTranscript(query)
    processVoice(query)
  }

  const reset = () => {
    stopSpeaking()
    stopListening()
    setTranscript('')
    setResponse('')
    setStatus('idle')
  }

  return (
    <div className="min-h-screen bg-[#f8faff] pt-16">
      {/* Header */}
      <div className="bg-sbi-gradient py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-2 mb-4">
              <Mic className="w-4 h-4 text-[#FF8C00]" />
              <span className="text-white text-sm font-medium">Voice Banking Assistant</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Bank with Your Voice
            </h1>
            <p className="text-blue-100 max-w-xl mx-auto">
              Speak naturally in English or Hindi. Get instant banking guidance through AI voice responses.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Voice Interface */}
          <div className="lg:col-span-2 space-y-6">
            {/* Language & Controls */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-[#003366] mb-1">Select Language</h3>
                  <div className="flex gap-2">
                    {LANGUAGES.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => setSelectedLang(lang)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          selectedLang.code === lang.code
                            ? 'bg-[#1F5FAA] text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-[#E8F0FB]'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={reset}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm hover:bg-gray-200 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset
                </button>
              </div>
            </div>

            {/* Voice Visualizer */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
              {/* Status indicator */}
              <div className="mb-6">
                <AnimatePresence mode="wait">
                  {status === 'idle' && (
                    <motion.p key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-400 text-sm">
                      Press the microphone to start speaking
                    </motion.p>
                  )}
                  {status === 'listening' && (
                    <motion.p key="listening" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#1F5FAA] text-sm font-medium animate-pulse">
                      🎙️ Listening... speak now
                    </motion.p>
                  )}
                  {status === 'processing' && (
                    <motion.p key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#FF8C00] text-sm font-medium">
                      ⚡ Processing your query...
                    </motion.p>
                  )}
                  {status === 'speaking' && (
                    <motion.p key="speaking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-600 text-sm font-medium">
                      🔊 Smart Mitra is speaking...
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Mic Button */}
              <div className="relative flex items-center justify-center mb-8">
                {isListening && (
                  <>
                    <div className="absolute w-36 h-36 rounded-full border-2 border-[#1F5FAA]/20 animate-ping" />
                    <div className="absolute w-28 h-28 rounded-full border-2 border-[#1F5FAA]/30 animate-ping" style={{ animationDelay: '0.2s' }} />
                  </>
                )}
                {isSpeaking && (
                  <>
                    <div className="absolute w-36 h-36 rounded-full border-2 border-green-400/30 animate-ping" />
                    <div className="absolute w-28 h-28 rounded-full border-2 border-green-400/20 animate-ping" style={{ animationDelay: '0.3s' }} />
                  </>
                )}

                <button
                  onClick={isListening ? stopListening : (isSpeaking ? stopSpeaking : startListening)}
                  className={`relative w-24 h-24 rounded-full shadow-xl flex items-center justify-center transition-all transform hover:scale-105 ${
                    isListening
                      ? 'bg-red-500 hover:bg-red-600 shadow-red-300'
                      : isSpeaking
                      ? 'bg-green-500 hover:bg-green-600 shadow-green-300'
                      : 'bg-sbi-gradient shadow-blue-300'
                  }`}
                  disabled={!micSupported && status !== 'speaking'}
                >
                  {isListening ? (
                    <MicOff className="w-10 h-10 text-white" />
                  ) : isSpeaking ? (
                    <VolumeX className="w-10 h-10 text-white" />
                  ) : (
                    <Mic className="w-10 h-10 text-white" />
                  )}
                </button>
              </div>

              {/* Transcript */}
              {transcript && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-4 bg-[#E8F0FB] rounded-xl text-left"
                >
                  <p className="text-xs text-[#1F5FAA] font-semibold mb-1 flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" /> You said:
                  </p>
                  <p className="text-[#003366] font-medium">"{transcript}"</p>
                </motion.div>
              )}

              {/* Response */}
              <AnimatePresence>
                {response && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-gradient-to-br from-[#f0f7ff] to-white rounded-xl border border-blue-100 text-left"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 bg-sbi-gradient rounded-lg flex items-center justify-center">
                        <Bot className="w-3.5 h-3.5 text-white" />
                      </div>
                      <p className="text-xs text-[#1F5FAA] font-semibold">Smart Mitra Response:</p>
                      {isSpeaking && (
                        <div className="flex gap-0.5 ml-auto">
                          {[1, 2, 3, 4, 5].map(i => (
                            <div
                              key={i}
                              className="w-1 bg-[#1F5FAA] rounded-full animate-pulse"
                              style={{ height: `${8 + Math.random() * 12}px`, animationDelay: `${i * 0.1}s` }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{response}</p>
                    {!isSpeaking && (
                      <button
                        onClick={() => speakResponse(response)}
                        className="mt-3 flex items-center gap-2 text-xs text-[#1F5FAA] hover:text-[#003366] font-medium transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        Replay Audio
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {!micSupported && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-yellow-700">
                  ⚠️ Your browser doesn't support speech recognition. Use the demo queries below or try Chrome/Edge.
                </div>
              )}
            </div>

            {/* Demo Queries */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#003366] mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FF8C00]" />
                Try These Voice Queries
              </h3>
              <div className="flex flex-wrap gap-2">
                {DEMO_QUERIES.map(q => (
                  <button
                    key={q}
                    onClick={() => tryDemoQuery(q)}
                    disabled={status === 'listening' || status === 'processing'}
                    className="px-4 py-2 bg-[#E8F0FB] text-[#1F5FAA] rounded-xl text-sm font-medium hover:bg-[#1F5FAA] hover:text-white transition-colors disabled:opacity-50"
                  >
                    "{q}"
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Features */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#003366] mb-4">Voice Banking Features</h3>
              <div className="space-y-3">
                {[
                  { icon: Mic, text: 'Speech Recognition', desc: 'Natural language understanding' },
                  { icon: Volume2, text: 'Text-to-Speech', desc: 'Clear voice responses' },
                  { icon: Globe, text: 'Multi-language', desc: 'English & Hindi support' },
                  { icon: Zap, text: 'Instant Response', desc: 'AI-powered answers' },
                  { icon: CheckCircle, text: 'No Typing Needed', desc: 'Hands-free banking' },
                ].map((f) => (
                  <div key={f.text} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#E8F0FB] rounded-lg flex items-center justify-center shrink-0">
                      <f.icon className="w-4 h-4 text-[#1F5FAA]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#003366]">{f.text}</p>
                      <p className="text-xs text-gray-400">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Voice History */}
            {history.length > 0 && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-bold text-[#003366] mb-4 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#1F5FAA]" />
                  Recent Queries
                </h3>
                <div className="space-y-3">
                  {history.map((h, i) => (
                    <div key={i} className="p-3 bg-[#f8faff] rounded-xl">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-semibold text-[#1F5FAA]">"{h.query}"</p>
                        <span className="text-xs text-gray-400">{h.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-2">{h.response}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tips */}
            <div className="bg-[#E8F0FB] rounded-2xl p-5 border border-blue-100">
              <h4 className="font-bold text-[#003366] mb-3 text-sm">💡 Voice Tips</h4>
              <ul className="space-y-2 text-xs text-gray-600">
                <li>• Speak clearly and at a normal pace</li>
                <li>• Use Chrome or Edge for best results</li>
                <li>• Allow microphone permission when asked</li>
                <li>• Ask specific questions for better answers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
