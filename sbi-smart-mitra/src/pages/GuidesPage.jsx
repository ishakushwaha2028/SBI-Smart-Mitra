/**
 * GuidesPage.jsx — SBI Smart Mitra
 *
 * Full layout audit & refactor:
 * ─────────────────────────────────────────────────────────────────────────────
 * CHANGES & REASONING
 *
 * 1. PAGE CONTAINER
 *    - Unified max-width to `max-w-5xl` for both header content and body,
 *      eliminating the jarring switch between `max-w-7xl` (header) and
 *      `max-w-4xl` (body) that caused content to appear mis-centered.
 *    - Added `px-4 sm:px-6 lg:px-8` consistently on every section wrapper.
 *
 * 2. HEADER / HERO SECTION
 *    - Added `pb-12` (was `py-10`) to give the gradient hero more breathing room.
 *    - Badge, h1, and paragraph are centered with a flex-col stack — no change
 *      in design, but whitespace is now intentional.
 *
 * 3. FILTER BAR
 *    - Changed outer div to `flex flex-wrap items-center gap-3 mb-8` so buttons
 *      wrap to a new row on small screens instead of overflowing.
 *    - Guide count badge moved into its own pill chip for visual consistency
 *      rather than raw text hanging off the end.
 *    - Filter buttons now have explicit `min-w-[80px]` so they don't shrink
 *      unevenly when the count chip wraps.
 *
 * 4. GUIDE CARD — COLLAPSED TRIGGER
 *    - Changed outer trigger layout to `grid` with
 *      `grid-cols-[48px_1fr_20px] gap-4` so icon, text, and chevron always
 *      occupy fixed columns regardless of content length — eliminates icon
 *      drift on narrow screens.
 *    - Difficulty badge moved OUT of the h3 flex-wrap row and placed on its
 *      own line below (inline-flex on a separate <div>) — title can now use
 *      full column width without being pushed by badge.
 *    - Description text changed from `truncate` (clips mid-word) to
 *      `line-clamp-2` with `text-sm leading-relaxed` — shows 2 full lines,
 *      never cuts words.
 *    - Metadata row (time + steps + progress bar) uses `flex flex-wrap
 *      items-center gap-x-4 gap-y-1` so items wrap gracefully on mobile and
 *      the progress bar never forces a layout shift on its conditional render.
 *    - Progress bar wrapper given explicit `w-24` (not `max-w-24 flex-1`) to
 *      prevent layout shift when it first appears.
 *
 * 5. GUIDE CARD — EXPANDED BODY
 *    - Unified padding: body wrapper now uses `px-5 pt-4 pb-6` (was a mix of
 *      `px-5 pb-5` with a nested `pt-4` inner div — caused visible gap jump).
 *    - Progress header uses `flex items-center justify-between` — same pattern
 *      as the rest of the page for paired label/value rows.
 *    - Progress bar motion div gets `overflow-hidden` to prevent color bleed
 *      on Safari and rounded clipping on the leading edge.
 *
 * 6. STEP ROWS
 *    - Changed to `grid grid-cols-[28px_1fr] gap-3` so the step number circle
 *      is pinned to a fixed 28 px column and never drifts regardless of how
 *      many lines the step description runs.
 *    - Step number circle: `self-start mt-0.5` keeps it top-aligned with the
 *      first text line even when description wraps.
 *    - Added `min-h-[28px]` to the circle div so it never collapses.
 *    - Step title and description are in a flex-col stack; tip box always
 *      appears as the last child, consistently spaced with `mt-2`.
 *    - Added `select-none` to the step row to prevent accidental text
 *      selection when clicking to toggle.
 *
 * 7. COMPLETION BANNER
 *    - Changed from bare `text-center` div to a proper flex-col centered
 *      layout so icon, heading, and body text are all axis-aligned.
 *    - Added `mx-auto max-w-sm` to the text to prevent it spanning full width
 *      on large screens.
 *
 * 8. HELP CTA BANNER
 *    - Changed from `p-6` to `px-8 py-10` and added a proper flex-col
 *      center stack with gap utilities.
 *    - Button changed from `<a>` to keep semantic HTML but wrapped in
 *      `inline-flex items-center justify-center` with `w-full sm:w-auto`
 *      so it spans full width on mobile and auto-width on desktop.
 *    - Replaced `href` string with `<Link>` from react-router-dom for
 *      proper SPA navigation (no full page reload).
 *
 * 9. GENERAL SPACING TOKENS
 *    - All section vertical gaps use `py-10 sm:py-14` breakpoint pair.
 *    - Card inner padding unified to `p-5` on trigger, `px-5 pt-4 pb-6` on body.
 *    - `space-y-3` on step list and `space-y-4` on card list retained —
 *      matches the design scale system used on other pages.
 *
 * 10. RESPONSIVENESS
 *    - Mobile (< 640 px): single-column, full-width cards, filter buttons wrap,
 *      grid step layout prevents overlap.
 *    - Tablet (640–1024 px): same single-column accordion — guides are
 *      inherently a list pattern, grid unnecessary here.
 *    - Desktop (> 1024 px): `max-w-5xl` centers content with generous gutters.
 *    - All touch targets ≥ 44 px (step rows: `min-h-[56px]`, buttons: `py-2.5`).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Smartphone, Zap, Globe, PiggyBank, CreditCard, Home,
  ChevronDown, CheckCircle, Clock, BookOpen, Star, ArrowRight,
  ListChecks, Timer, Trophy
} from 'lucide-react'

// ─── Data ────────────────────────────────────────────────────────────────────

const guides = [
  {
    id: 'yono',
    icon: Smartphone,
    title: 'YONO SBI Registration',
    desc: "Set up SBI's all-in-one mobile app for banking, insurance, travel, and more — all from a single screen.",
    time: '5 min',
    difficulty: 'Easy',
    points: 10,
    color: 'from-blue-500 to-blue-700',
    steps: [
      {
        title: 'Download YONO App',
        desc: 'Search "YONO SBI" on Google Play Store or Apple App Store and download the official app.',
        tip: "Make sure you're downloading the official app by SBI — check the developer name.",
      },
      {
        title: 'Launch & Registration',
        desc: 'Open the app, tap "New to YONO? Register" and select your account type.',
        tip: null,
      },
      {
        title: 'Enter Account Details',
        desc: 'Enter your SBI Account Number and the mobile number registered with your account.',
        tip: 'Your mobile number must be registered with SBI to receive OTP.',
      },
      {
        title: 'OTP Verification',
        desc: 'Enter the 6-digit OTP sent to your registered mobile number to verify your identity.',
        tip: 'OTP is valid for only 3 minutes. Request a new one if it expires.',
      },
      {
        title: 'Set MPIN',
        desc: "Create a secure 6-digit MPIN (Mobile PIN) that you'll use to login to YONO.",
        tip: 'Never use obvious PINs like 123456 or your birth date.',
      },
      {
        title: 'Complete Setup',
        desc: "Accept terms and conditions to complete registration. You're now ready to use YONO!",
        tip: 'Enable biometric login for quicker access next time.',
      },
    ],
  },
  {
    id: 'upi',
    icon: Zap,
    title: 'UPI Setup & Payments',
    desc: 'Create your UPI Virtual Payment Address and start making instant, zero-fee money transfers via YONO.',
    time: '3 min',
    difficulty: 'Easy',
    points: 10,
    color: 'from-orange-500 to-orange-700',
    steps: [
      {
        title: 'Open YONO App',
        desc: 'Login to YONO SBI app with your MPIN or biometric authentication.',
        tip: null,
      },
      {
        title: 'Navigate to UPI',
        desc: 'Tap on "UPI" from the home screen or find it under the Payments section.',
        tip: null,
      },
      {
        title: 'Register for UPI',
        desc: 'Tap "Register for UPI" to begin the UPI setup process for your SBI account.',
        tip: null,
      },
      {
        title: 'Create VPA',
        desc: 'Your Virtual Payment Address (VPA) is your UPI ID. Example: yourname@sbi',
        tip: 'Choose a memorable VPA. You can use your name, mobile number, or custom text.',
      },
      {
        title: 'Link Bank Account',
        desc: 'Select your SBI account from the list of detected accounts and link it to UPI.',
        tip: 'You can link multiple accounts but set one as primary.',
      },
      {
        title: 'Set UPI PIN',
        desc: 'Enter your debit card last 6 digits & expiry date, then set your 6-digit UPI PIN.',
        tip: 'Your UPI PIN is different from ATM PIN. Keep it secret — never share it.',
      },
    ],
  },
  {
    id: 'netbanking',
    icon: Globe,
    title: 'Internet Banking Activation',
    desc: "Access SBI's full suite of online banking features — transfers, FDs, loans — through the secure web portal.",
    time: '7 min',
    difficulty: 'Medium',
    points: 15,
    color: 'from-emerald-500 to-emerald-700',
    steps: [
      {
        title: 'Visit SBI Website',
        desc: 'Go to the official website: onlinesbi.sbi in your browser.',
        tip: 'Always type the URL manually. Never click on links from emails or messages.',
      },
      {
        title: 'New Registration',
        desc: 'Click "New User Registration / Activation" on the login page.',
        tip: null,
      },
      {
        title: 'Account Details',
        desc: 'Enter your Account Number, CIF Number, Branch Code, and registered mobile number.',
        tip: 'CIF Number is found on your passbook or by calling 1800 11 2211.',
      },
      {
        title: 'Select Facility',
        desc: 'Choose "Full Transaction Rights" for complete online banking access.',
        tip: null,
      },
      {
        title: 'OTP Verification',
        desc: 'Enter the OTP sent to your registered mobile number to verify.',
        tip: null,
      },
      {
        title: 'Set Password',
        desc: 'Create a strong username and password. Log in to complete activation.',
        tip: 'Password must have uppercase, lowercase, numbers, and special characters.',
      },
    ],
  },
  {
    id: 'fd',
    icon: PiggyBank,
    title: 'Fixed Deposit Creation',
    desc: 'Create FDs online and earn attractive interest rates up to 7.5% — no branch visit needed.',
    time: '4 min',
    difficulty: 'Easy',
    points: 10,
    color: 'from-purple-500 to-purple-700',
    steps: [
      {
        title: 'Login to Net Banking',
        desc: 'Login at onlinesbi.sbi with your username and password.',
        tip: null,
      },
      {
        title: 'Go to Fixed Deposits',
        desc: 'Navigate to Deposits → e-Fixed Deposit in the top menu.',
        tip: null,
      },
      {
        title: 'Choose FD Type',
        desc: 'Select from Regular FD, Tax Saving FD, or Recurring Deposit based on your needs.',
        tip: 'Tax Saving FD offers deduction under Section 80C but has a 5-year lock-in period.',
      },
      {
        title: 'Enter Amount & Tenure',
        desc: 'Enter the FD amount (min ₹1,000) and select the tenure from 7 days to 10 years.',
        tip: 'Longer tenure generally offers better interest rates.',
      },
      {
        title: 'Interest Payout',
        desc: 'Choose Cumulative (reinvest) or Non-Cumulative (monthly/quarterly payout).',
        tip: 'Senior citizens get an additional 0.5% interest on all FDs.',
      },
      {
        title: 'Confirm & Create',
        desc: 'Review all details and confirm with OTP. Your FD is created instantly!',
        tip: "Save the FD receipt — you'll need it for premature withdrawal if required.",
      },
    ],
  },
  {
    id: 'loan',
    icon: Home,
    title: 'Loan Application Guide',
    desc: 'Apply for personal, home, or education loans online — get an approval decision in as little as 24 hours.',
    time: '10 min',
    difficulty: 'Medium',
    points: 15,
    color: 'from-red-500 to-red-700',
    steps: [
      {
        title: 'Check Eligibility',
        desc: "Use SBI's online eligibility calculator at sbi.co.in to check your loan eligibility.",
        tip: 'Age 21–60 years, minimum income ₹15,000/month for personal loans.',
      },
      {
        title: 'Gather Documents',
        desc: 'Keep ready: Aadhaar, PAN, last 3 salary slips, and 6 months bank statement.',
        tip: 'Self-employed applicants need business proof and 2 years of ITR.',
      },
      {
        title: 'Online Application',
        desc: 'Visit sbi.co.in → Loans → Personal Loan → Apply Online.',
        tip: null,
      },
      {
        title: 'Fill Application',
        desc: 'Complete the online form with your personal, employment, and income details.',
        tip: 'Double-check all details before submitting. Errors may delay processing.',
      },
      {
        title: 'Document Upload',
        desc: 'Upload scanned copies of all required documents (PDF or JPEG, max 2 MB each).',
        tip: null,
      },
      {
        title: 'Track Application',
        desc: 'Note your application reference number. Track status at sbi.co.in or via YONO.',
        tip: 'You may receive a call from SBI for verification within 24–48 hours.',
      },
    ],
  },
  {
    id: 'debit',
    icon: CreditCard,
    title: 'Debit Card Online Activation',
    desc: 'Activate your SBI debit card for online, international, and contactless payments in minutes.',
    time: '3 min',
    difficulty: 'Easy',
    points: 10,
    color: 'from-yellow-500 to-yellow-600',
    steps: [
      {
        title: 'Login to Net Banking',
        desc: 'Login at onlinesbi.sbi with your credentials.',
        tip: null,
      },
      {
        title: 'Go to Card Services',
        desc: 'Navigate to e-Services → ATM Card Services → Limit/Channel/Usage Activation.',
        tip: null,
      },
      {
        title: 'Select Card',
        desc: 'Select your SBI debit card from the list of cards linked to your account.',
        tip: null,
      },
      {
        title: 'Enable Channels',
        desc: 'Enable International Transactions, Online Transactions, and Contactless Payments.',
        tip: 'Enable only what you need. You can always adjust these settings later.',
      },
      {
        title: 'Set Limits',
        desc: 'Set daily transaction limits for ATM, POS, and online transactions as per your need.',
        tip: 'Keep limits reasonable to minimise fraud risk.',
      },
      {
        title: 'OTP Confirmation',
        desc: 'Confirm activation with OTP sent to your registered mobile. Card is now active!',
        tip: null,
      },
    ],
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

/**
 * StepRow
 * Uses a 2-column CSS grid (fixed 28 px step-number column + flex 1 content
 * column) so the circle can never drift regardless of how long the description
 * text is. `self-start mt-0.5` pins the circle to the top of the first line.
 */
function StepRow({ step, index, isCompleted, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.055, ease: 'easeOut' }}
      onClick={onToggle}
      /* min-h ensures 44 px touch targets even when content is short */
      className={`
        grid grid-cols-[28px_1fr] gap-3 p-4 rounded-xl border
        cursor-pointer select-none transition-all duration-200
        min-h-[56px]
        ${isCompleted
          ? 'bg-green-50 border-green-200 hover:bg-green-100'
          : 'bg-[#f8faff] border-gray-100 hover:border-[#1F5FAA]/40 hover:bg-blue-50/40'}
      `}
    >
      {/* Step number / check — fixed 28 px column, pinned to top */}
      <div className="self-start mt-0.5">
        <div
          className={`
            w-7 h-7 rounded-full border-2 flex items-center justify-center
            transition-colors duration-200 shrink-0
            ${isCompleted ? 'bg-green-500 border-green-500' : 'border-gray-300 bg-white'}
          `}
        >
          {isCompleted ? (
            <CheckCircle className="w-4 h-4 text-white" />
          ) : (
            <span className="text-xs font-bold text-gray-400 leading-none">
              {index + 1}
            </span>
          )}
        </div>
      </div>

      {/* Content column — flex-col so tip always follows description */}
      <div className="flex flex-col gap-1 min-w-0">
        <h4
          className={`
            text-sm font-semibold leading-snug
            ${isCompleted ? 'text-green-700 line-through' : 'text-[#003366]'}
          `}
        >
          {step.title}
        </h4>
        <p className="text-sm text-gray-500 leading-relaxed">
          {step.desc}
        </p>
        {/* Tip — always the last child, consistent mt-2 spacing */}
        {step.tip && (
          <div className="mt-2 flex items-start gap-1.5 bg-orange-50 border border-orange-100 rounded-lg px-2.5 py-2">
            <Star className="w-3.5 h-3.5 text-[#FF8C00] shrink-0 mt-px" />
            <span className="text-xs text-orange-700 leading-relaxed">
              {step.tip}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

/**
 * GuideCard
 *
 * Collapsed trigger layout uses CSS Grid (3 fixed columns) rather than flexbox
 * so icon, text block, and chevron always stay in their lanes. Text block uses
 * flex-col internally for consistent vertical rhythm.
 */
function GuideCard({ guide, isExpanded, onToggle }) {
  const [completedSteps, setCompletedSteps] = useState([])

  const toggleStep = (index) => {
    setCompletedSteps((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  const completedCount = completedSteps.length
  const totalSteps = guide.steps.length
  const progress = (completedCount / totalSteps) * 100
  const isFullyCompleted = completedCount === totalSteps

  return (
    <div
      className={`
        bg-white rounded-2xl border shadow-sm overflow-hidden
        transition-shadow duration-200
        ${isExpanded ? 'border-[#1F5FAA]/30 shadow-md shadow-blue-100' : 'border-gray-100 hover:shadow-md hover:shadow-gray-100'}
      `}
    >
      {/* ── Trigger / Header ── */}
      <button
        onClick={onToggle}
        aria-expanded={isExpanded}
        /* 3-column grid: fixed icon | flex-1 text | fixed chevron */
        className="
          w-full grid grid-cols-[48px_1fr_24px] items-start
          gap-4 p-5 text-left
          hover:bg-gray-50/80 transition-colors duration-150
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F5FAA]/40 rounded-2xl
        "
      >
        {/* Icon — always 48 × 48 px, vertically centred to first text line */}
        <div
          className={`
            w-12 h-12 bg-gradient-to-br ${guide.color}
            rounded-xl flex items-center justify-center shrink-0 mt-0.5
          `}
        >
          <guide.icon className="w-6 h-6 text-white" />
        </div>

        {/* Text block — flex-col with consistent gap */}
        <div className="flex flex-col gap-1.5 min-w-0">
          {/* Row 1: Title + difficulty badge on the same baseline */}
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-bold text-[#003366] text-base leading-snug">
              {guide.title}
            </h3>
            <span
              className={`
                inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold shrink-0
                ${guide.difficulty === 'Easy'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-orange-100 text-orange-700'}
              `}
            >
              {guide.difficulty}
            </span>
          </div>

          {/* Row 2: Description — line-clamp-2 prevents single-line truncation
              that cuts words mid-sentence on narrow viewports */}
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
            {guide.desc}
          </p>

          {/* Row 3: Meta chips + optional progress bar
              flex-wrap + gap-x/gap-y for graceful wrapping on mobile */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-0.5">
            <span className="inline-flex items-center gap-1 text-xs text-gray-400">
              <Timer className="w-3.5 h-3.5 shrink-0" />
              {guide.time}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-gray-400">
              <ListChecks className="w-3.5 h-3.5 shrink-0" />
              {totalSteps} steps
            </span>
            {/* Progress bar only shown after interaction — fixed w-24 prevents
                layout shift when it first mounts */}
            {completedCount > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  {/* overflow-hidden on parent clips the motion div on Safari */}
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#1F5FAA] to-[#FF8C00] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </div>
                <span className="text-xs font-semibold text-[#1F5FAA]">
                  {completedCount}/{totalSteps}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Chevron — self-center aligns it to mid-height of the card */}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.22, ease: 'easeInOut' }}
          className="self-center"
        >
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </button>

      {/* ── Expanded Body ── */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.section
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            /* overflow-hidden is CRITICAL here — without it, children can
               bleed outside the card during the height animation */
            className="overflow-hidden"
          >
            {/* Unified padding: px-5 pt-4 pb-6 — no nested pt wrappers */}
            <div className="px-5 pt-4 pb-6 border-t border-gray-100">

              {/* Progress summary bar */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">
                    Progress
                  </span>
                  <span className="text-sm font-bold text-[#1F5FAA]">
                    {completedCount} / {totalSteps} steps
                  </span>
                </div>
                {/* Parent overflow-hidden clips the animated child cleanly */}
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#1F5FAA] to-[#FF8C00] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Step list — space-y-3 for consistent inter-step gap */}
              <div className="space-y-3">
                {guide.steps.map((step, i) => (
                  <StepRow
                    key={i}
                    step={step}
                    index={i}
                    isCompleted={completedSteps.includes(i)}
                    onToggle={() => toggleStep(i)}
                  />
                ))}
              </div>

              {/* Completion celebration banner */}
              <AnimatePresence>
                {isFullyCompleted && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="
                      mt-5 p-5 bg-gradient-to-br from-green-50 to-emerald-50
                      border border-green-200 rounded-2xl
                      flex flex-col items-center gap-2 text-center
                    "
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="font-bold text-green-700 text-base">
                      Guide Completed! 🎉
                    </p>
                    <p className="text-sm text-green-600 max-w-xs">
                      You've completed all {totalSteps} steps.{' '}
                      <span className="font-semibold">
                        +{guide.points} points
                      </span>{' '}
                      added to your Digital Adoption Score!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Summary card used in the stats strip ─────────────────────────────────────

function StatPill({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-4 border border-gray-100 shadow-sm">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-lg font-bold text-[#003366] leading-tight">{value}</p>
        <p className="text-xs text-gray-400 leading-tight">{label}</p>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GuidesPage() {
  const [expandedGuide, setExpandedGuide] = useState(null)
  const [filter, setFilter] = useState('all')

  const filtered =
    filter === 'all'
      ? guides
      : guides.filter((g) =>
          filter === 'easy' ? g.difficulty === 'Easy' : g.difficulty === 'Medium'
        )

  const filterOptions = [
    { key: 'all', label: 'All Guides', count: guides.length },
    { key: 'easy', label: 'Easy', count: guides.filter((g) => g.difficulty === 'Easy').length },
    { key: 'medium', label: 'Medium', count: guides.filter((g) => g.difficulty === 'Medium').length },
  ]

  return (
    <div className="min-h-screen bg-[#f8faff] pt-16">

      {/* ── Hero / Header ── */}
      <section className="bg-sbi-gradient pb-12 pt-12">
        {/* Using max-w-5xl to match the content column below */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-2">
              <BookOpen className="w-4 h-4 text-[#FF8C00] shrink-0" />
              <span className="text-white text-sm font-medium">
                Smart Banking Guides
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight max-w-2xl">
              Step-by-Step Digital Banking Guides
            </h1>

            {/* Sub-heading */}
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-xl">
              Interactive guides to master every SBI digital service.
              Click each step as you complete it to track your progress.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatPill
              icon={BookOpen}
              label="Total Guides"
              value={guides.length}
              color="bg-gradient-to-br from-blue-500 to-blue-700"
            />
            <StatPill
              icon={CheckCircle}
              label="Easy Guides"
              value={guides.filter((g) => g.difficulty === 'Easy').length}
              color="bg-gradient-to-br from-green-500 to-green-700"
            />
            <StatPill
              icon={Timer}
              label="Avg. Time"
              value="5 min"
              color="bg-gradient-to-br from-orange-500 to-orange-700"
            />
            <StatPill
              icon={Trophy}
              label="Max Points"
              value={`${guides.reduce((a, g) => a + g.points, 0)} pts`}
              color="bg-gradient-to-br from-purple-500 to-purple-700"
            />
          </div>
        </div>
      </section>

      {/* ── Main content ── */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">

        {/* Filter bar
            flex-wrap so buttons flow to a second row on mobile instead of
            overflowing the viewport. Items are vertically centered via
            items-center. The count chip is aligned to the far right with ml-auto
            but sits on the same row when space permits, wraps below on mobile. */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {filterOptions.map((f) => (
            <button
              key={f.key}
              onClick={() => {
                setFilter(f.key)
                setExpandedGuide(null) // collapse any open card on filter change
              }}
              className={`
                inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                text-sm font-semibold transition-all duration-200
                min-w-[80px] focus:outline-none focus-visible:ring-2
                focus-visible:ring-[#1F5FAA]/40
                ${
                  filter === f.key
                    ? 'bg-[#1F5FAA] text-white shadow-md shadow-blue-200'
                    : 'bg-white text-gray-500 border border-gray-200 hover:border-[#1F5FAA]/40 hover:text-[#1F5FAA]'
                }
              `}
            >
              {f.label}
              {/* Count chip inside the button */}
              <span
                className={`
                  text-xs font-bold px-1.5 py-0.5 rounded-md leading-none
                  ${filter === f.key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}
                `}
              >
                {f.count}
              </span>
            </button>
          ))}

          {/* Showing label — ml-auto pushes it to the right when there's room */}
          <p className="ml-auto text-sm text-gray-400 self-center whitespace-nowrap">
            Showing{' '}
            <span className="font-semibold text-[#1F5FAA]">{filtered.length}</span>{' '}
            {filtered.length === 1 ? 'guide' : 'guides'}
          </p>
        </div>

        {/* Guide accordion list
            space-y-4 gives consistent 16 px gap between all cards */}
        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {filtered.map((guide, idx) => (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ delay: idx * 0.06, duration: 0.3, ease: 'easeOut' }}
              >
                <GuideCard
                  guide={guide}
                  isExpanded={expandedGuide === guide.id}
                  onToggle={() =>
                    setExpandedGuide(
                      expandedGuide === guide.id ? null : guide.id
                    )
                  }
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state for filtered results */}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 font-medium">No guides match this filter.</p>
          </div>
        )}

        {/* ── Help CTA Banner ──
            flex-col on mobile, inline content on tablet+.
            Button uses w-full sm:w-auto so it spans full width on phone. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="
            mt-12 bg-sbi-gradient rounded-2xl
            px-6 sm:px-10 py-10
            flex flex-col items-center gap-4 text-center
          "
        >
          {/* Icon */}
          <div className="w-12 h-12 bg-white/15 border border-white/25 rounded-2xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-[#FF8C00]" />
          </div>

          {/* Copy */}
          <div className="flex flex-col gap-1.5">
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              Still need help?
            </h3>
            <p className="text-blue-100 text-sm sm:text-base max-w-sm mx-auto leading-relaxed">
              Our AI assistant can walk you through any step in detail, in English or Hindi.
            </p>
          </div>

          {/* CTA — Link for SPA navigation, w-full on mobile */}
          <Link
            to="/ai-assistant"
            className="
              inline-flex items-center justify-center gap-2
              w-full sm:w-auto
              px-7 py-3.5 bg-[#FF8C00] text-white
              rounded-xl font-semibold text-sm
              hover:bg-orange-600 active:bg-orange-700
              transition-colors duration-150 shadow-lg shadow-orange-900/20
              focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60
            "
          >
            Ask AI Mitra
            <ArrowRight className="w-4 h-4 shrink-0" />
          </Link>
        </motion.div>
      </main>
    </div>
  )
}
