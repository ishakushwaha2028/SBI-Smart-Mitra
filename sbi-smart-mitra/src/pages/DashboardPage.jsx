import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  AreaChart, Area, RadialBarChart, RadialBar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts'
import {
  CheckCircle, Circle, TrendingUp, Award, Smartphone, Zap,
  Globe, PiggyBank, CreditCard, Shield, Bell, User,
  ArrowUp, ArrowDown, Target, Star, Gift
} from 'lucide-react'

const adoptionServices = [
  { name: 'YONO App', icon: Smartphone, completed: true, score: 20, desc: 'Installed and registered' },
  { name: 'UPI Payments', icon: Zap, completed: true, score: 20, desc: 'VPA created, 5 transactions done' },
  { name: 'Net Banking', icon: Globe, completed: true, score: 15, desc: 'Activated and logged in' },
  { name: 'Mobile Banking', icon: Smartphone, completed: false, score: 15, desc: 'Not yet activated' },
  { name: 'Fixed Deposit', icon: PiggyBank, completed: false, score: 10, desc: 'Complete to earn 10 points' },
  { name: 'Debit Card Online', icon: CreditCard, completed: true, score: 10, desc: 'Activated for online use' },
  { name: 'SBI Alerts', icon: Bell, completed: false, score: 5, desc: 'Register for SMS alerts' },
  { name: 'Security Settings', icon: Shield, completed: false, score: 5, desc: 'Enable 2-factor auth' },
]

const activityData = [
  { month: 'Jan', transactions: 4, logins: 8 },
  { month: 'Feb', transactions: 7, logins: 12 },
  { month: 'Mar', transactions: 12, logins: 18 },
  { month: 'Apr', transactions: 9, logins: 15 },
  { month: 'May', transactions: 15, logins: 22 },
  { month: 'Jun', transactions: 18, logins: 28 },
]

const spendingData = [
  { name: 'UPI Transfers', value: 35, color: '#1F5FAA' },
  { name: 'Bill Payments', value: 25, color: '#FF8C00' },
  { name: 'Shopping', value: 20, color: '#10B981' },
  { name: 'FD Investment', value: 15, color: '#8B5CF6' },
  { name: 'Others', value: 5, color: '#94A3B8' },
]

const recentTx = [
  { type: 'credit', desc: 'Salary Credit', amount: '₹45,000', date: 'Today', icon: ArrowDown },
  { type: 'debit', desc: 'UPI to Rahul', amount: '₹500', date: 'Today', icon: ArrowUp },
  { type: 'debit', desc: 'Electricity Bill', amount: '₹1,250', date: 'Yesterday', icon: ArrowUp },
  { type: 'credit', desc: 'FD Interest', amount: '₹2,340', date: '2 days ago', icon: ArrowDown },
  { type: 'debit', desc: 'Amazon Shopping', amount: '₹3,499', date: '3 days ago', icon: ArrowUp },
]

const recommendations = [
  { icon: PiggyBank, title: 'Open Fixed Deposit', desc: 'Earn 7.5% interest. Invest your idle savings today.', cta: 'Explore FD', color: 'from-emerald-500 to-emerald-700' },
  { icon: Shield, title: 'Enable Security', desc: 'Add 2FA to protect your account from fraud.', cta: 'Secure Now', color: 'from-red-500 to-red-700' },
  { icon: Gift, title: 'YONO Rewards', desc: 'You have 250 reward points. Redeem before expiry!', cta: 'Redeem', color: 'from-purple-500 to-purple-700' },
]

const totalScore = adoptionServices.filter(s => s.completed).reduce((acc, s) => acc + s.score, 0)
const maxScore = adoptionServices.reduce((acc, s) => acc + s.score, 0)

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-[#f8faff] pt-16">
      {/* Header */}
      <div className="bg-sbi-gradient py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/15 border-2 border-white/30 rounded-2xl flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Welcome, Rajesh Kumar</h1>
                <p className="text-blue-200 text-sm">Account: XXXX XXXX 4821 • Savings Account</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span className="text-green-300 text-xs">Account Active</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-white/15 border border-white/20 rounded-2xl px-5 py-3 text-center">
                <p className="text-2xl font-bold text-white">₹1,24,500</p>
                <p className="text-blue-200 text-xs">Available Balance</p>
              </div>
              <div className="bg-white/15 border border-white/20 rounded-2xl px-5 py-3 text-center">
                <p className="text-2xl font-bold text-[#FF8C00]">{totalScore}</p>
                <p className="text-blue-200 text-xs">Adoption Score</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 w-fit">
          {['overview', 'adoption', 'activity'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all capitalize ${
                activeTab === tab ? 'bg-[#1F5FAA] text-white shadow-md' : 'text-gray-500 hover:text-[#1F5FAA]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Digital Score', value: `${totalScore}/${maxScore}`, icon: Award, color: 'from-blue-500 to-blue-700', sub: '+15 this month' },
                { label: 'UPI Transactions', value: '47', icon: Zap, color: 'from-orange-500 to-orange-700', sub: 'This month' },
                { label: 'Services Active', value: `${adoptionServices.filter(s => s.completed).length}/${adoptionServices.length}`, icon: CheckCircle, color: 'from-emerald-500 to-emerald-700', sub: 'Completed' },
                { label: 'Security Level', value: 'Good', icon: Shield, color: 'from-purple-500 to-purple-700', sub: 'Enable 2FA for Excellent' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-[#003366]">{stat.value}</p>
                  <p className="text-xs font-semibold text-gray-500 mt-0.5">{stat.label}</p>
                  <p className="text-xs text-[#FF8C00] mt-1">{stat.sub}</p>
                </motion.div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Activity Chart */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-bold text-[#003366] mb-4">Banking Activity</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={activityData}>
                    <defs>
                      <linearGradient id="colorTx" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1F5FAA" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#1F5FAA" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorLogin" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF8C00" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#FF8C00" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="transactions" stroke="#1F5FAA" fill="url(#colorTx)" name="Transactions" />
                    <Area type="monotone" dataKey="logins" stroke="#FF8C00" fill="url(#colorLogin)" name="Logins" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Spending Breakdown */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-bold text-[#003366] mb-4">Spending Breakdown</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={spendingData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" paddingAngle={3}>
                      {spendingData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => `${v}%`} />
                    <Legend iconType="circle" iconSize={8} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Transactions & Recommendations */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Transactions */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-bold text-[#003366] mb-4 flex items-center justify-between">
                  Recent Transactions
                  <span className="text-xs text-[#1F5FAA] cursor-pointer hover:underline">View All</span>
                </h3>
                <div className="space-y-3">
                  {recentTx.map((tx, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${tx.type === 'credit' ? 'bg-green-100' : 'bg-red-50'}`}>
                        <tx.icon className={`w-4 h-4 ${tx.type === 'credit' ? 'text-green-600' : 'text-red-400'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#003366] truncate">{tx.desc}</p>
                        <p className="text-xs text-gray-400">{tx.date}</p>
                      </div>
                      <p className={`text-sm font-bold ${tx.type === 'credit' ? 'text-green-600' : 'text-red-500'}`}>
                        {tx.type === 'credit' ? '+' : '-'}{tx.amount}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-bold text-[#003366] mb-4 flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#FF8C00]" />
                  Personalized Recommendations
                </h3>
                <div className="space-y-3">
                  {recommendations.map((rec, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#f8faff] border border-gray-50">
                      <div className={`w-9 h-9 bg-gradient-to-br ${rec.color} rounded-xl flex items-center justify-center shrink-0`}>
                        <rec.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#003366]">{rec.title}</p>
                        <p className="text-xs text-gray-500 leading-tight">{rec.desc}</p>
                      </div>
                      <button className="shrink-0 px-3 py-1.5 bg-[#1F5FAA] text-white rounded-lg text-xs font-medium hover:bg-[#003366] transition-colors">
                        {rec.cta}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'adoption' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Score Card */}
            <div className="bg-sbi-gradient rounded-2xl p-6 text-white">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative w-36 h-36 shrink-0">
                  <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="10" />
                    <circle
                      cx="60" cy="60" r="50"
                      fill="none" stroke="#FF8C00" strokeWidth="10"
                      strokeDasharray={`${(totalScore / maxScore) * 314} 314`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-3xl font-black text-white">{totalScore}</p>
                    <p className="text-xs text-blue-200">/ {maxScore}</p>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Digital Adoption Score</h2>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="px-3 py-1 bg-[#FF8C00] rounded-full text-sm font-bold">Good Progress!</div>
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-green-300 text-sm">+15 this month</span>
                  </div>
                  <p className="text-blue-100 text-sm max-w-md">
                    You've activated {adoptionServices.filter(s => s.completed).length} out of {adoptionServices.length} digital services. Complete the remaining services to reach a perfect score!
                  </p>
                </div>
              </div>
            </div>

            {/* Services Progress */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#003366] mb-5 flex items-center gap-2">
                <Target className="w-5 h-5 text-[#1F5FAA]" />
                Service Completion Progress
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {adoptionServices.map((svc, i) => (
                  <motion.div
                    key={svc.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                      svc.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      svc.completed ? 'bg-green-500' : 'bg-gray-200'
                    }`}>
                      <svc.icon className={`w-5 h-5 ${svc.completed ? 'text-white' : 'text-gray-400'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-[#003366] text-sm">{svc.name}</p>
                        {svc.completed && <CheckCircle className="w-4 h-4 text-green-500" />}
                      </div>
                      <p className="text-xs text-gray-500">{svc.desc}</p>
                    </div>
                    <div className={`text-sm font-bold ${svc.completed ? 'text-green-600' : 'text-gray-400'}`}>
                      +{svc.score}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'activity' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#003366] mb-4">Banking Activity (Last 6 Months)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={activityData}>
                  <defs>
                    <linearGradient id="colorTx2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1F5FAA" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#1F5FAA" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorLogin2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF8C00" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#FF8C00" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="transactions" stroke="#1F5FAA" fill="url(#colorTx2)" name="Transactions" strokeWidth={2} />
                  <Area type="monotone" dataKey="logins" stroke="#FF8C00" fill="url(#colorLogin2)" name="App Logins" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#003366] mb-5">All Transactions</h3>
              <div className="space-y-3">
                {[...recentTx, ...recentTx].map((tx, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${tx.type === 'credit' ? 'bg-green-100' : 'bg-red-50'}`}>
                      <tx.icon className={`w-4 h-4 ${tx.type === 'credit' ? 'text-green-600' : 'text-red-400'}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#003366]">{tx.desc}</p>
                      <p className="text-xs text-gray-400">{tx.date} • UPI/Online</p>
                    </div>
                    <p className={`text-sm font-bold ${tx.type === 'credit' ? 'text-green-600' : 'text-red-500'}`}>
                      {tx.type === 'credit' ? '+' : '-'}{tx.amount}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
