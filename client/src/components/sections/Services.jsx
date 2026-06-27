import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion'
import Button from '../ui/Button'

const ease = [0.22, 1, 0.36, 1]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease, delay },
})

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
}

const popItem = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease } },
}

const SERVICES = [
  {
    id: 'fullstack',
    title: 'Full-Stack Web Applications',
    accent: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
    glowColor: '#8b5cf6',
  },
  {
    id: 'landing',
    title: 'Landing Pages & Portfolios',
    accent: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
    glowColor: '#ec4899',
  },
  {
    id: 'business',
    title: 'Business & Marketing Websites',
    accent: 'linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)',
    glowColor: '#06b6d4',
  },
  {
    id: 'api',
    title: 'REST API Development',
    accent: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
    glowColor: '#10b981',
  },
  {
    id: 'ai',
    title: 'AI-Powered Web Features',
    accent: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
    glowColor: '#f59e0b',
  },
  {
    id: 'admin',
    title: 'Admin Dashboards & CMS',
    accent: 'linear-gradient(135deg, #a855f7 0%, #d946ef 100%)',
    glowColor: '#a855f7',
  },
]

const PROCESS = [
  { n: 1, label: 'Discover', desc: 'Quick call, scope, and fit.' },
  { n: 2, label: 'Design', desc: 'Wireframe, design system, and tech plan.' },
  { n: 3, label: 'Build', desc: 'MERN stack, AI-assisted, daily updates.' },
  { n: 4, label: 'Ship', desc: 'Deploy, hand off, and post-launch support.' },
]

/* ── 3D Tilt wrapper — mirrors Education's TiltCard ── */
function TiltCard({ children, className = '', max = 10, glowColor }) {
  const ref = useRef(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const springConfig = { stiffness: 150, damping: 18, mass: 0.6 }
  const rotateX = useSpring(useTransform(y, [0, 1], [max, -max]), springConfig)
  const rotateY = useSpring(useTransform(x, [0, 1], [-max, max]), springConfig)

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

/* ── Service card — title only, Education-style treatment ── */
function ServiceCard({ service, index }) {
  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateZ: -3, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, rotateZ: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        type: 'spring',
        stiffness: 180,
        damping: 18,
        mass: 0.8,
        delay: 0.08 + (index % 3) * 0.09,
      }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <TiltCard glowColor={service.glowColor} max={12}>
        <div className="relative card rounded-2xl p-6 sm:p-7 overflow-hidden h-full min-h-[140px] flex items-center">

          {/* Rotating conic gradient border ring — hover only */}
          <div
            aria-hidden
            className="service-ring"
            style={{ '--ring-color': service.glowColor }}
          />

          {/* Subtle gradient wash */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.04] group-hover:opacity-[0.09] transition-opacity duration-500"
            style={{ background: service.accent }}
          />

          {/* Top accent bar — grows from 38% to full width on hover */}
          <div
            aria-hidden
            className="absolute top-0 left-0 h-[2px] w-[38%] group-hover:w-full transition-all duration-700 ease-out"
            style={{ background: service.accent }}
          />

          {/* Diagonal shimmer sweep — on hover */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
          >
            <div
              className="absolute -inset-y-4 -left-1/3 w-1/3 -translate-x-full skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/10 to-transparent
                         transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                         group-hover:translate-x-[420%]"
            />
          </div>

          {/* Big index watermark — slides up & fades in on hover */}
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-2 right-3 text-[80px] font-black leading-none tracking-tighter
                       text-transparent bg-clip-text opacity-0 translate-y-3
                       group-hover:opacity-[0.18] group-hover:translate-y-0
                       transition-all duration-500 select-none"
            style={{ backgroundImage: service.accent }}
          >
            {num}
          </span>

          {/* Service name */}
          <h3
            className="relative text-lg sm:text-xl font-bold text-copy leading-snug tracking-tight pr-10"
            style={{ transform: 'translateZ(24px)' }}
          >
            {service.title}
          </h3>

          {/* Chevron — flies in from right on hover */}
          <motion.div
            aria-hidden
            className="absolute right-5 top-1/2 -translate-y-1/2 grid place-content-center w-7 h-7 rounded-full border border-line bg-page/70 backdrop-blur-sm opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400"
            style={{
              transform: 'translateZ(30px) translateY(-50%)',
              color: service.glowColor,
              borderColor: `${service.glowColor}55`,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.div>
        </div>
      </TiltCard>
    </motion.div>
  )
}

function ProcessStrip() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.6'],
  })
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div ref={ref} className="mt-20 lg:mt-24">
      <motion.h3
        {...fadeUp(0)}
        className="text-sm font-semibold text-copy uppercase tracking-wider mb-8 text-center"
      >
        How I work
      </motion.h3>

      <div className="relative">
        {/* Animated connecting line — desktop only */}
        <svg
          className="hidden lg:block absolute left-0 right-0 top-5 -z-0 w-full h-1 pointer-events-none"
          viewBox="0 0 1000 4"
          preserveAspectRatio="none"
          aria-hidden
        >
          <line x1="80" y1="2" x2="920" y2="2" stroke="var(--color-line)" strokeWidth="1" strokeDasharray="4 4" />
          <motion.line
            x1="80" y1="2" x2="920" y2="2"
            stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round"
            style={{ pathLength }}
          />
        </svg>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative"
        >
          {PROCESS.map((step) => (
            <motion.div
              key={step.n}
              variants={popItem}
              className="flex flex-col items-center text-center gap-2 px-2"
            >
              <motion.div
                className="relative w-10 h-10 rounded-full bg-page border border-brand/30 flex items-center justify-center text-brand font-semibold text-sm"
                whileHover={{ scale: 1.08 }}
              >
                <motion.span
                  className="absolute inset-0 rounded-full border border-brand/40"
                  animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: step.n * 0.3 }}
                />
                {step.n}
              </motion.div>
              <span className="text-sm font-semibold text-copy mt-1">{step.label}</span>
              <span className="text-xs text-muted leading-relaxed max-w-[180px]">{step.desc}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

function ClosingCTA() {
  return (
    <motion.div
      {...fadeUp(0.1)}
      className="relative card rounded-2xl p-8 sm:p-10 lg:p-12 mt-20 lg:mt-24 overflow-hidden text-center"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
        style={{ background: 'radial-gradient(ellipse at center, #8b5cf6 0%, transparent 65%)' }}
        aria-hidden
      />
      <h3 className="text-2xl sm:text-3xl font-extrabold text-copy tracking-tight">
        Have a project in mind?
      </h3>
      <p className="mt-3 text-sm sm:text-base text-muted max-w-xl mx-auto">
        Tell me about it — I usually reply within 24 hours.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button as="a" href="/#contact" size="lg">
          Start a Project
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Button>
        <Button as="a" href="/#projects" variant="secondary" size="lg">
          View Work
        </Button>
      </div>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section
      id="services"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute left-0 top-1/3 w-[500px] h-[500px] rounded-full blur-[140px] opacity-10 -z-10"
        style={{ background: 'radial-gradient(ellipse, #8b5cf6 0%, transparent 70%)' }}
        aria-hidden
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-semibold uppercase tracking-widest mb-4">
            Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-copy tracking-tight">
            Services I offer
          </h2>
          <p className="mt-3 text-muted text-base sm:text-lg max-w-2xl">
            From a single landing page to a full-stack product — clear scope, clean code, and AI-assisted delivery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        <ProcessStrip />
        <ClosingCTA />
      </div>
    </section>
  )
}
