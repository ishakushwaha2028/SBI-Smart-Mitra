import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { GoogleGenerativeAI } from '@google/generative-ai'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'] }))
app.use(express.json())

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY')

// System prompt for SBI Smart Mitra
const SYSTEM_PROMPT = `You are SBI Smart Mitra, an AI-powered digital banking assistant for State Bank of India (SBI). 
Your role is to:
1. Help customers with SBI digital services (YONO, UPI, Net Banking, FD, Loans, etc.)
2. Provide step-by-step guidance for banking tasks
3. Answer questions about SBI products and services
4. Educate users about digital banking safety
5. Support both English and Hindi queries

Guidelines:
- Always be helpful, professional and warm
- Provide accurate, up-to-date SBI information
- Never ask for sensitive data like passwords or OTP
- For complex issues, recommend calling 1800 11 2211
- Keep responses concise but complete
- Use emojis sparingly for better readability

SBI Key Services:
- YONO SBI: All-in-one banking app
- UPI: Instant payment system
- Net Banking: onlinesbi.sbi
- FD rates: Up to 7.5% for senior citizens
- Toll-free: 1800 11 2211`

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body

    if (!message) {
      return res.status(400).json({ error: 'Message is required' })
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
        { role: 'model', parts: [{ text: 'Understood. I am SBI Smart Mitra, ready to assist SBI customers with digital banking services.' }] },
        ...history.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        }))
      ],
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.7,
      }
    })

    const result = await chat.sendMessage(message)
    const response = result.response.text()

    res.json({ response, success: true })
  } catch (error) {
    console.error('Gemini AI Error:', error)
    // Fallback response
    res.json({
      response: "I'm having trouble connecting to AI services. For banking help, please call SBI at 1800 11 2211 or visit onlinesbi.sbi.",
      success: false
    })
  }
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'SBI Smart Mitra API', version: '1.0.0' })
})

// Banking info endpoints
app.get('/api/fd-rates', (req, res) => {
  res.json({
    rates: [
      { tenure: '7-45 days', general: '3.50%', senior: '4.00%' },
      { tenure: '46-179 days', general: '4.50%', senior: '5.00%' },
      { tenure: '180-210 days', general: '5.75%', senior: '6.25%' },
      { tenure: '211-365 days', general: '6.00%', senior: '6.50%' },
      { tenure: '1-2 years', general: '6.80%', senior: '7.30%' },
      { tenure: '2-3 years', general: '7.00%', senior: '7.50%' },
      { tenure: '3-5 years', general: '6.75%', senior: '7.25%' },
      { tenure: '5-10 years', general: '6.50%', senior: '7.50%' },
    ],
    lastUpdated: new Date().toISOString()
  })
})

app.listen(PORT, () => {
  console.log(`✅ SBI Smart Mitra API running on http://localhost:${PORT}`)
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`)
})
