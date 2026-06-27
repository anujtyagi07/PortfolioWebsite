import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

/* Subtle 3D tilt + cursor-follow spotlight wrapper */
function TiltSpotlight({ children, className = '', max = 6, glowColor = '#8B5CF6' }) {
  const ref = useRef(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const springConfig = { stiffness: 160, damping: 20, mass: 0.6 }
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
  function handleLeave() { x.set(0.5); y.set(0.5) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      className={`relative group/tilt ${className}`}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover/tilt:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) => `radial-gradient(circle 220px at ${gx} ${gy}, ${glowColor}26, transparent 70%)`
          ),
        }}
      />
      {children}
    </motion.div>
  )
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease, delay },
})

const slideFrom = (x, delay = 0) => ({
  initial: { opacity: 0, x },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.65, ease, delay },
})

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
}

const popItem = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease } },
}

const chipVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.28, ease } },
}

const di = (name, variant = 'original') =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`

const STACK_CATEGORIES = [
  {
    label: 'Frontend',
    items: [
      { name: 'React.js',   img: di('react') },
      { name: 'JavaScript', img: di('javascript') },
      { name: 'HTML5',      img: di('html5') },
      { name: 'CSS3',       img: di('css3') },
      { name: 'Tailwind',   img: di('tailwindcss', 'plain') },
    ],
  },
  {
    label: 'Backend',
    items: [
      { name: 'Node.js',    img: di('nodejs') },
      { name: 'Express.js', img: di('express'), invert: true },
      { name: 'REST APIs',  abbr: 'REST' },
      { name: 'JWT',        abbr: 'JWT' },
    ],
  },
  {
    label: 'Database',
    items: [
      { name: 'MongoDB',  img: di('mongodb') },
      { name: 'Mongoose', abbr: 'Mn' },
    ],
  },
  {
    label: 'Tools',
    items: [
      { name: 'Git',     img: di('git') },
      { name: 'GitHub',  img: di('github'), invert: true },
      { name: 'VS Code', img: di('vscode') },
      { name: 'Postman', img: di('postman') },
      { name: 'npm',     img: di('npm', 'original-wordmark') },
    ],
  },
  {
    label: 'AI Tools',
    items: [
      { name: 'Claude AI', abbr: 'Cl' },
      { name: 'ChatGPT',   abbr: 'GPT' },
      { name: 'Copilot',   abbr: 'Co' },
    ],
  },
]

const SERVICES = [
  'Full-stack MERN applications',
  'Responsive business websites',
  'API development & integration',
  'Admin dashboards',
  'Portfolio & landing pages',
  'Freelance client projects',
  'AI-assisted web experiences',
]

const EXPERIENCE = [
  {
    role: 'Full Stack Developer Intern',
    company: 'Technobull India',
    duration: '6 months',
    desc: 'Hospitality-sector web projects — full-stack MERN development in a production environment.',
  },
  {
    role: 'Web Developer Intern',
    company: 'Unlink Technologies',
    duration: '1 month',
    desc: 'Real-world development exposure and collaborative team workflows.',
  },
]

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute right-0 top-1/4 w-[500px] h-[500px] rounded-full blur-[140px] opacity-10 -z-10"
        style={{ background: 'radial-gradient(ellipse, #8b5cf6 0%, transparent 70%)' }}
        aria-hidden
      />

      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-semibold uppercase tracking-widest mb-4">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-copy tracking-tight">
            The developer behind the work
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Left column — slides in from left ── */}
          <motion.div {...slideFrom(-30, 0.1)} className="flex flex-col gap-8">

            {/* Bio — staggered paragraphs */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="flex flex-col gap-4 text-muted leading-relaxed"
            >
              <motion.p variants={popItem}>
                I'm <span className="text-copy font-semibold">Anuj Tyagi</span>, a MERN Stack Developer who builds modern full-stack web applications with a strong focus on clean UI, scalable backend architecture, and fast development using <span className="text-brand font-medium">AI-powered workflows</span>.
              </motion.p>
              <motion.p variants={popItem}>
                I have <span className="text-copy font-medium">7 months of internship experience</span> across two companies, giving me hands-on exposure to production codebases, real-world timelines, and collaborative team environments.
              </motion.p>
              <motion.p variants={popItem}>
                Beyond coding, I enjoy improving product UI/UX, optimising application performance, and building projects that solve practical problems with clean and maintainable architecture.
              </motion.p>
            </motion.div>

            {/* Experience — staggered cards */}
            <div className="flex flex-col gap-3">
              <motion.h3 {...fadeUp(0.1)} className="text-sm font-semibold text-copy uppercase tracking-wider">
                Experience
              </motion.h3>
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                className="flex flex-col gap-3"
              >
                {EXPERIENCE.map((exp) => (
                  <motion.div
                    key={exp.company}
                    variants={popItem}
                    whileHover={{ y: -4, transition: { duration: 0.25, ease } }}
                    className="group/exp"
                  >
                    <TiltSpotlight max={4} glowColor="#8B5CF6">
                      <div className="card rounded-xl p-4 flex gap-4 items-start relative overflow-hidden">
                        {/* Left accent rail — slides in on hover */}
                        <span
                          aria-hidden
                          className="absolute left-0 top-2 bottom-2 w-[2px] rounded-full bg-brand origin-top scale-y-0 group-hover/exp:scale-y-100 transition-transform duration-500 ease-out"
                        />
                        <motion.div
                          className="flex-shrink-0 w-9 h-9 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center mt-0.5"
                          whileHover={{ rotate: -8, scale: 1.08 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 14 }}
                          style={{ transform: 'translateZ(20px)' }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="7" width="20" height="14" rx="2"/>
                            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                          </svg>
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <span className="text-sm font-semibold text-copy">{exp.role}</span>
                            <span className="text-xs text-brand font-medium bg-brand/10 px-2 py-0.5 rounded-full">{exp.duration}</span>
                          </div>
                          <span className="text-xs text-brand/80 font-medium">{exp.company}</span>
                          <p className="text-xs text-muted mt-1 leading-relaxed">{exp.desc}</p>
                        </div>
                        {/* Chevron — slides in from right on hover */}
                        <span
                          aria-hidden
                          className="absolute right-3 top-1/2 -translate-y-1/2 grid place-content-center w-6 h-6 rounded-full text-brand opacity-0 -translate-x-2 group-hover/exp:opacity-100 group-hover/exp:translate-x-0 transition-all duration-400"
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6" />
                          </svg>
                        </span>
                      </div>
                    </TiltSpotlight>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Education */}
            <div className="flex flex-col gap-3">
              <motion.h3 {...fadeUp(0.15)} className="text-sm font-semibold text-copy uppercase tracking-wider">
                Education
              </motion.h3>
              <motion.div
                {...fadeUp(0.2)}
                whileHover={{ y: -4, transition: { duration: 0.25, ease } }}
              >
                <TiltSpotlight max={4} glowColor="#8B5CF6">
                  <div className="card rounded-xl p-4 flex gap-4 items-start">
                    <motion.div
                      className="flex-shrink-0 w-9 h-9 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center mt-0.5"
                      whileHover={{ rotate: 10, scale: 1.08 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 14 }}
                      style={{ transform: 'translateZ(20px)' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                      </svg>
                    </motion.div>
                    <div>
                      <span className="text-sm font-semibold text-copy">BTech — Computer Science & Engineering</span>
                      <p className="text-xs text-brand/80 font-medium mt-0.5">Meerut Institute of Engineering and Technology</p>
                    </div>
                  </div>
                </TiltSpotlight>
              </motion.div>
            </div>

          </motion.div>

          {/* ── Right column — slides in from right ── */}
          <motion.div {...slideFrom(30, 0.15)} className="flex flex-col gap-8">

            {/* Tech stack — staggered chips per category */}
            <motion.div {...fadeUp(0.1)}>
              <TiltSpotlight max={3} glowColor="#8B5CF6">
                <div className="card rounded-2xl p-6">
                  <h3 className="text-sm font-semibold text-copy uppercase tracking-wider mb-5">Tech Stack</h3>
                  <div className="flex flex-col gap-4">
                    {STACK_CATEGORIES.map((cat) => (
                      <div key={cat.label}>
                        <span className="block text-[10px] font-semibold text-muted uppercase tracking-widest mb-2">
                          {cat.label}
                        </span>
                        <motion.div
                          variants={stagger}
                          initial="hidden"
                          whileInView="show"
                          viewport={{ once: true }}
                          className="flex flex-wrap gap-2"
                        >
                          {cat.items.map((tech) => (
                            <motion.div
                              key={tech.name}
                              variants={chipVariant}
                              whileHover={{
                                scale: 1.12,
                                rotate: [-1.5, 1.5, 0],
                                y: -2,
                                boxShadow: '0 6px 18px -8px rgba(139,92,246,0.55)',
                              }}
                              transition={{ type: 'spring', stiffness: 400, damping: 14 }}
                              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-line bg-page text-xs text-copy font-medium hover:border-brand/60 hover:text-brand transition-colors cursor-default"
                            >
                              {tech.img ? (
                                <img
                                  src={tech.img}
                                  alt={tech.name}
                                  className={`w-3.5 h-3.5 object-contain${tech.invert ? ' brightness-0 invert' : ''}`}
                                />
                              ) : (
                                <span className="text-[9px] font-bold text-brand leading-none">{tech.abbr}</span>
                              )}
                              {tech.name}
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </div>
              </TiltSpotlight>
            </motion.div>

            {/* AI workflow — pulsing icon */}
            <motion.div
              {...fadeUp(0.15)}
              whileHover={{ y: -4, transition: { duration: 0.25, ease } }}
            >
              <TiltSpotlight max={4} glowColor="#A78BFA">
                <div className="relative card rounded-2xl p-6 overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-5 -z-10 rounded-2xl"
                    style={{ background: 'linear-gradient(135deg, #8b5cf6, transparent)' }}
                  />
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div
                      animate={{ scale: [1, 1.14, 1], rotate: [0, 6, -6, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-8 h-8 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center"
                      style={{ transform: 'translateZ(20px)' }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                      </svg>
                    </motion.div>
                    <h3 className="text-sm font-semibold text-copy">AI-Powered Workflow</h3>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">
                    I actively integrate AI tools into my development workflow to speed up delivery, generate better UI implementations, and rapidly prototype full-stack applications — without sacrificing code quality or structure.
                  </p>
                </div>
              </TiltSpotlight>
            </motion.div>

            {/* What I Build — staggered list */}
            <motion.div {...fadeUp(0.2)}>
              <TiltSpotlight max={3} glowColor="#8B5CF6">
                <div className="card rounded-2xl p-6">
                  <h3 className="text-sm font-semibold text-copy uppercase tracking-wider mb-4">What I Build</h3>
                  <motion.ul
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="flex flex-col gap-2"
                  >
                    {SERVICES.map((item) => (
                      <motion.li
                        key={item}
                        variants={popItem}
                        whileHover={{ x: 6 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                        className="group/build flex items-center gap-3 text-sm text-muted hover:text-copy cursor-default transition-colors"
                      >
                        <motion.span
                          className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand/60 group-hover/build:bg-brand group-hover/build:scale-150 transition-all"
                          animate={{ scale: [1, 1.4, 1] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 1.5 }}
                        />
                        {item}
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </TiltSpotlight>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
