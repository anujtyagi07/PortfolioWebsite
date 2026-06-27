import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { experience as staticExperience } from '../../data/experience'
import { useContent } from '../../context/ContentContext'

const ease = [0.22, 1, 0.36, 1]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
}

const popItem = {
  hidden: { opacity: 0, x: 14 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease } },
}

const popScale = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.3, ease } },
}

/* ── Single timeline entry ── */
function ExperienceEntry({ exp, index }) {
  const initials = exp.company
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, ease, delay: 0.15 }}
      className="relative pl-12 sm:pl-16 pb-14 last:pb-0"
    >
      {/* Pulsing dot on the timeline */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ type: 'spring', stiffness: 280, damping: 14, delay: 0.2 }}
        className="absolute left-[10px] sm:left-[12px] top-7 w-5 h-5 rounded-full flex items-center justify-center"
        style={{
          background: exp.accent,
          boxShadow:
            '0 0 0 4px rgba(20, 20, 28, 1), 0 0 0 5px rgba(139, 92, 246, 0.35), 0 0 24px rgba(139, 92, 246, 0.5)',
        }}
      >
        {/* Continuous ripple */}
        <motion.span
          aria-hidden
          animate={{ scale: [1, 2.4, 2.4], opacity: [0.5, 0, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: index * 0.5 }}
          className="absolute inset-0 rounded-full"
          style={{ background: exp.accent }}
        />
        {/* Inner highlight */}
        <span className="block w-1.5 h-1.5 rounded-full bg-white/80" />
      </motion.div>

      {/* Card with staggered inner content */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        whileHover={{ y: -3, transition: { duration: 0.2 } }}
        className="relative card rounded-2xl p-5 sm:p-6 overflow-hidden"
      >
        {/* Subtle gradient wash */}
        <div
          className="absolute inset-0 opacity-[0.04] -z-10"
          style={{ background: exp.accent }}
          aria-hidden
        />

        {/* Header row */}
        <motion.div variants={popItem} className="flex items-start gap-4 flex-wrap">
          <div
            className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-white text-sm font-bold tracking-wide"
            style={{ background: exp.accent, boxShadow: '0 6px 20px rgba(0,0,0,0.3)' }}
          >
            {initials}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-bold text-copy leading-tight">
                {exp.role}
              </h3>
              <motion.span
                variants={popScale}
                className="text-[11px] text-brand font-semibold bg-brand/10 border border-brand/25 px-2.5 py-0.5 rounded-full whitespace-nowrap"
              >
                {exp.period}
              </motion.span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-[13px] flex-wrap">
              <span className="text-copy/90 font-semibold">{exp.company}</span>
              {exp.location && (
                <>
                  <span className="text-muted/40">·</span>
                  <span className="text-muted">{exp.location}</span>
                </>
              )}
              {exp.type && (
                <>
                  <span className="text-muted/40">·</span>
                  <span className="text-[10px] text-muted/80 uppercase tracking-wider font-semibold">
                    {exp.type}
                  </span>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Description */}
        {exp.description && (
          <motion.p
            variants={popItem}
            className="text-sm text-muted mt-4 leading-relaxed"
          >
            {exp.description}
          </motion.p>
        )}

        {/* Highlights — staggered bullets with pulsing markers */}
        {exp.highlights?.length > 0 && (
          <motion.ul variants={stagger} className="mt-5 flex flex-col gap-2.5">
            {exp.highlights.map((h, i) => (
              <motion.li
                key={i}
                variants={popItem}
                className="flex items-start gap-3 text-[13px] text-muted leading-relaxed"
              >
                <motion.span
                  className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand mt-1.5"
                  animate={{
                    scale: [1, 1.6, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.3,
                  }}
                />
                <span>{h}</span>
              </motion.li>
            ))}
          </motion.ul>
        )}

        {/* Tech stack chips */}
        {exp.tech?.length > 0 && (
          <motion.div
            variants={stagger}
            className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-line/40"
          >
            {exp.tech.map((t) => (
              <motion.span
                key={t}
                variants={popScale}
                whileHover={{ scale: 1.08, transition: { duration: 0.15 } }}
                className="text-[10px] px-2 py-0.5 rounded-md border border-line bg-page/50 text-muted/90 font-medium cursor-default"
              >
                {t}
              </motion.span>
            ))}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

/* ── Section ── */
export default function Experience() {
  const { experience: liveExperience } = useContent()
  const experience = liveExperience ?? staticExperience

  const timelineRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 70%', 'end 80%'],
  })

  // Animated colored line that grows as user scrolls through the section
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const lineOpacity = useTransform(scrollYProgress, [0, 0.05, 1], [0, 1, 1])

  return (
    <section id="experience" className="relative py-24 overflow-hidden">

      {/* ── Background orbs ── */}
      <motion.div
        aria-hidden
        animate={{ x: [0, 70, 0], y: [0, -50, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full blur-[150px] opacity-10 -z-10"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)' }}
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -60, 0], y: [0, 40, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute bottom-0 -left-32 w-[450px] h-[450px] rounded-full blur-[140px] opacity-[0.08] -z-10"
        style={{ background: 'radial-gradient(circle, #06b6d4, transparent 70%)' }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-semibold uppercase tracking-widest mb-4">
            Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            <span className="text-copy">Where I've </span>
            <motion.span
              animate={{ backgroundPosition: ['0% center', '200% center'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #a78bfa 0%, #ec4899 50%, #a78bfa 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              worked
            </motion.span>
          </h2>
          <p className="text-sm text-muted mt-3 max-w-md">
            7 months of internship experience across two companies — building production MERN apps and shipping real client work.
          </p>
        </motion.div>

        {/* ── Timeline ── */}
        <div ref={timelineRef} className="relative">

          {/* Background line (full height, faded) */}
          <div
            aria-hidden
            className="absolute left-[18px] sm:left-[20px] top-3 bottom-3 w-[2px] bg-line/40"
          />

          {/* Animated progress line — grows with scroll */}
          <motion.div
            aria-hidden
            style={{ height: lineHeight, opacity: lineOpacity }}
            className="absolute left-[18px] sm:left-[20px] top-3 w-[2px] origin-top
                       bg-gradient-to-b from-brand via-pink-500 to-brand/30"
          />

          {/* Glow trailing the progress line */}
          <motion.div
            aria-hidden
            style={{ height: lineHeight, opacity: lineOpacity }}
            className="absolute left-[16px] sm:left-[18px] top-3 w-[6px] origin-top blur-md
                       bg-gradient-to-b from-brand/60 to-transparent"
          />

          {/* Entries */}
          {experience.map((exp, i) => (
            <ExperienceEntry key={exp._id || exp.id} exp={exp} index={i} />
          ))}

          {/* Final marker — "Present" or "..." */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 300 }}
            className="relative pl-12 sm:pl-16 -mt-2"
          >
            <div
              className="absolute left-[14px] sm:left-[16px] top-1 w-3 h-3 rounded-full border-2 border-brand bg-page"
            />
            <span className="text-xs text-muted/70 italic">More to come...</span>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
