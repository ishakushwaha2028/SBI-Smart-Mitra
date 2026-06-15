# 🏦 SBI Smart Mitra — AI Banking Assistant

> **SBI Hackathon 2024** | AI-powered digital banking adoption platform

![SBI Smart Mitra](https://img.shields.io/badge/SBI-Smart%20Mitra-1F5FAA?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Gemini AI](https://img.shields.io/badge/Gemini-AI-4285F4?style=for-the-badge&logo=google)

## 🎯 Overview

SBI Smart Mitra is an AI-powered digital banking companion designed to help millions of SBI customers adopt digital banking services through personalized, conversational AI guidance in English and Hindi.

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🤖 AI Chatbot | Gemini AI-powered banking assistant |
| 🎙️ Voice Banking | English & Hindi speech recognition |
| 📊 Dashboard | Digital adoption tracking & analytics |
| 📚 Smart Guides | Step-by-step interactive banking guides |
| 🛡️ Security Center | Fraud alerts & security scoring |
| 💡 Recommendations | Personalized SBI product suggestions |

## 🚀 Quick Start

### Frontend (React)
```bash
cd sbi-smart-mitra
npm install
npm run dev
```
App runs at: **http://localhost:5173**

### Backend (Node.js + Express)
```bash
cd server
npm install
cp .env.example .env
# Add your GEMINI_API_KEY to .env
npm run dev
```
API runs at: **http://localhost:5000**

## 🛠️ Tech Stack

**Frontend:**
- React 19 + Vite
- Tailwind CSS v4
- Framer Motion (animations)
- Recharts (data visualization)
- React Router DOM
- Web Speech API (voice)

**Backend:**
- Node.js + Express.js
- Google Gemini AI API
- MongoDB (database)
- JWT Authentication

## 📁 Project Structure

```
sbi-smart-mitra/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── AIAssistantPage.jsx
│   │   ├── VoiceBankingPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── GuidesPage.jsx
│   │   ├── SecurityPage.jsx
│   │   └── ContactPage.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── server/
│   ├── index.js
│   ├── package.json
│   └── .env.example
└── README.md
```

## 🎨 Design System

| Color | Hex | Usage |
|-------|-----|-------|
| SBI Blue | `#1F5FAA` | Primary actions |
| SBI Dark | `#003366` | Headers, text |
| SBI Orange | `#FF8C00` | Accents, CTAs |
| SBI Light | `#E8F0FB` | Backgrounds |

## 🔑 Getting Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com)
2. Create a new API key
3. Add it to `server/.env` as `GEMINI_API_KEY`

## 📞 SBI Official Contacts

- **Toll Free:** 1800 11 2211 (24x7)
- **Website:** [onlinesbi.sbi](https://onlinesbi.sbi)
- **YONO:** Download from Play Store / App Store

---

Built with ❤️ for **SBI Hackathon 2024** | Digital India Initiative
