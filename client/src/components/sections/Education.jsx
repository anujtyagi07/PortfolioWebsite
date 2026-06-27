import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { education as staticEducation } from '../../data/education'
import { useContent } from '../../context/ContentContext'

const ease = [0.22, 1, 0.36, 1]

/* ── Icons ── */
const CertIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6"/>
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
)

const CapIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
)

const BookIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
    <path d="M8 7h8M8 11h6"/>
  </svg>
)

const CheckIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

function getIcon(name) {
  if (name === 'certificate') return CertIcon
  if (name === 'cap') return CapIcon
  return BookIcon
}

/* ── 3D Tilt wrapper — mouse-tracked perspective rotation ── */
function TiltCard({ children, className = '', max = 8, glowColor }) {
  const ref = useRef(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const springConfig = { stiffness: 150, damping: 18, mass: 0.6 }
  const rotateX = useSpring(useTransform(y, [0, 1], [max, -max]), springConfig)
  const rotateY = useSpring(useTransform(x, [0, 1], [-max, max]), springConfig)

  // Glow position tracking
  const glowX = useTransform(x, [0, 1], ['0%', '100%'])
  const glowY = useTransform(y, [0, 1], ['0%', '100%'])

  function handleMove(e) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width)
    y.set((e.clientY - rect.top) / rect.height)
  }

  function handleLeave() {
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1200,
      }}
      className={`relative ${className}`}
    >
      {/* Cursor-tracking radial glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) =>
              `radial-gradient(circle 280px at ${gx} ${gy}, ${glowColor}22, transparent 70%)`
          ),
        }}
      />
      {children}
    </motion.div>
  )
}

/* ── Featured (Coding Ninjas) — large card with rotating gradient border ── */
function FeaturedCard({ edu }) {
  const Icon = getIcon(edu.icon)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease }}
      className="relative group"
    >
      {/* Rotating conic-gradient border */}
      <motion.div
        aria-hidden
        className="absolute -inset-[1.5px] rounded-[20px] opacity-70"
        style={{
          background: `conic-gradient(from 0deg, transparent 60%, ${edu.glowColor} 80%, transparent)`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      <TiltCard glowColor={edu.glowColor} max={6} className="rounded-[18px]">
        <div className="relative card rounded-[18px] p-6 sm:p-8 overflow-hidden">

          {/* Background gradient wash */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.05]"
            style={{ background: edu.accent }}
          />

          {/* Floating "CERTIFIED" stamp */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -25 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -12 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 250, damping: 12 }}
            whileHover={{ rotate: -8, scale: 1.05 }}
            className="absolute top-5 right-5 sm:top-6 sm:right-6"
            style={{ transform: 'translateZ(40px)' }}
          >
            <div
              className="px-3 py-1 rounded-md border-2 text-[10px] font-extrabold tracking-[0.15em] uppercase"
              style={{
                borderColor: edu.glowColor,
                color: edu.glowColor,
                boxShadow: `0 0 20px ${edu.glowColor}33`,
              }}
            >
              ★ Certified
            </div>
          </motion.div>

          {/* Header row */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5, ease }}
            className="flex items-start gap-4 mb-5"
            style={{ transform: 'translateZ(20px)' }}
          >
            <div
              className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-white"
              style={{ background: edu.accent, boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}
            >
              <Icon className="w-7 h-7" />
            </div>
            <div className="flex-1 min-w-0 pr-20 sm:pr-28">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-brand">
                Certification
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-copy leading-tight mt-1">
                {edu.title}
              </h3>
              <p className="text-sm font-semibold mt-1" style={{ color: edu.glowColor }}>
                {edu.school}
              </p>
            </div>
          </motion.div>

          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex flex-wrap gap-2 mb-5"
          >
            {[edu.mode, edu.period, edu.location].filter(Boolean).map((m) => (
              <span
                key={m}
                className="text-[11px] px-2.5 py-1 rounded-full bg-page/60 border border-line text-muted"
              >
                {m}
              </span>
            ))}
          </motion.div>

          {/* Description */}
          {edu.description && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-sm text-muted leading-relaxed mb-5"
            >
              {edu.description}
            </motion.p>
          )}

          {/* Highlights — bullets with check icons that staircase in */}
          {edu.highlights?.length > 0 && (
            <ul className="grid sm:grid-cols-2 gap-x-5 gap-y-2.5 mb-5">
              {edu.highlights.map((h, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.07, duration: 0.35, ease }}
                  className="flex items-start gap-2.5 text-[13px] text-muted leading-relaxed"
                >
                  <motion.span
                    className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5"
                    style={{ background: edu.accent }}
                    animate={{ boxShadow: [`0 0 0 0 ${edu.glowColor}55`, `0 0 0 6px ${edu.glowColor}00`] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: i * 0.2 }}
                  >
                    <CheckIcon className="w-2.5 h-2.5 text-white" />
                  </motion.span>
                  <span>{h}</span>
                </motion.li>
              ))}
            </ul>
          )}

          {/* Tech chips */}
          {edu.tech?.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-1.5 pt-4 border-t border-line/40"
              style={{ transform: 'translateZ(15px)' }}
            >
              {edu.tech.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.95 + i * 0.04, type: 'spring', stiffness: 300 }}
                  whileHover={{ scale: 1.1 }}
                  className="text-[10px] px-2 py-0.5 rounded-md border border-line bg-page/50 text-muted/90 font-medium cursor-default"
                >
                  {t}
                </motion.span>
              ))}
            </motion.div>
          )}
        </div>
      </TiltCard>
    </motion.div>
  )
}

/* ── Standard education card ── */
function EduCard({ edu, index, compact = false }) {
  const Icon = getIcon(edu.icon)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateZ: -2 }}
      whileInView={{ opacity: 1, y: 0, rotateZ: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease, delay: 0.15 + index * 0.1 }}
      className="group"
    >
      <TiltCard glowColor={edu.glowColor} max={10}>
        <div className="relative card rounded-2xl p-5 sm:p-6 overflow-hidden h-full">

          {/* Subtle gradient wash */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.04]"
            style={{ background: edu.accent }}
          />

          {/* Top accent bar */}
          <div
            aria-hidden
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: edu.accent }}
          />

          {/* Icon */}
          <motion.div
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white mb-4"
            style={{ background: edu.accent, boxShadow: '0 6px 18px rgba(0,0,0,0.3)' }}
          >
            <Icon className="w-5 h-5" />
          </motion.div>

          {/* Content */}
          <div style={{ transform: 'translateZ(20px)' }}>
            <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: edu.glowColor }}>
              {edu.type === 'degree' ? 'Degree' : 'School'}
            </span>
            <h3 className={`font-bold text-copy leading-tight mt-1 ${compact ? 'text-sm sm:text-base' : 'text-lg'}`}>
              {edu.title}
            </h3>
            <p className="text-[13px] text-copy/80 font-semibold mt-1">{edu.school}</p>

            {edu.description && !compact && (
              <p className="text-xs text-muted mt-2 leading-relaxed">{edu.description}</p>
            )}

            {/* Meta row */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {[edu.period, edu.mode, edu.location, edu.grade].filter(Boolean).map((m) => (
                <span
                  key={m}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-page/60 border border-line text-muted"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  )
}

/* ── Section ── */
export default function Education() {
  const { education: liveEducation } = useContent()
  const education = liveEducation ?? staticEducation

  const featured = education.find((e) => e.featured)
  const degree = education.find((e) => e.type === 'degree')
  const schools = education.filter((e) => e.type === 'school')

  return (
    <section id="education" className="relative py-24 overflow-hidden">

      {/* ── Background — different from Experience: amber + green orbs + dot grid ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] -z-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, 80, 0], y: [0, 50, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute top-0 -left-32 w-[500px] h-[500px] rounded-full blur-[150px] opacity-[0.09] -z-10"
        style={{ background: 'radial-gradient(circle, #f59e0b, transparent 70%)' }}
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -70, 0], y: [0, -40, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute bottom-0 -right-32 w-[450px] h-[450px] rounded-full blur-[140px] opacity-[0.08] -z-10"
        style={{ background: 'radial-gradient(circle, #10b981, transparent 70%)' }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="mb-12 text-center"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            Education
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            <span className="text-copy">My </span>
            <motion.span
              animate={{ backgroundPosition: ['0% center', '200% center'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              style={{
                backgroundImage: 'linear-gradient(90deg, #f59e0b 0%, #10b981 50%, #f59e0b 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              learning journey
            </motion.span>
          </h2>
          <p className="text-sm text-muted mt-3 max-w-md mx-auto">
            From classrooms to certifications — the foundation behind the work.
          </p>
        </motion.div>

        {/* ── Featured certification — Coding Ninjas ── */}
        {featured && (
          <div className="mb-6">
            <FeaturedCard edu={featured} />
          </div>
        )}

        {/* ── Degree — BTech ── */}
        {degree && (
          <div className="mb-6">
            <EduCard edu={degree} index={0} />
          </div>
        )}

        {/* ── Schools — Class 12 + Class 10 side-by-side ── */}
        {schools.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-6">
            {schools.map((edu, i) => (
              <EduCard key={edu._id || edu.id} edu={edu} index={i + 1} compact />
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
