import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useContent } from '../../context/ContentContext'

const ease = [0.22, 1, 0.36, 1]

const di = (name, variant = 'original') =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`

/* ── Custom AI / LLM icons ── */
const BrainIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 0 0 6.8 22a4 4 0 0 0 5.2-3v-1.5"/>
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 0 1 17.2 22a4 4 0 0 1-5.2-3v-1.5"/>
    <path d="M9.5 14a2.5 2.5 0 0 1 2.5 2.5"/>
    <path d="M14.5 14a2.5 2.5 0 0 0-2.5 2.5"/>
  </svg>
)

const RagIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="8" cy="6" rx="6" ry="2.5"/>
    <path d="M2 6v10c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V6"/>
    <path d="M2 11c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5"/>
    <path d="M16 14h6"/>
    <path d="M19 11l3 3-3 3"/>
  </svg>
)

const PromptIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.813 1.9a2 2 0 0 1 1.287 1.288L12 21l1.9-5.813a2 2 0 0 1 1.287-1.287L21 12l-5.813-1.9a2 2 0 0 1-1.287-1.288z"/>
    <path d="M5 3v4"/>
    <path d="M19 17v4"/>
    <path d="M3 5h4"/>
    <path d="M17 19h4"/>
  </svg>
)

const VectorDBIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.91a1 1 0 0 0 0-1.83Z"/>
    <path d="M22 12.5 13.06 16.4a2 2 0 0 1-1.66 0L2 12.5"/>
    <path d="M22 17.5 13.06 21.4a2 2 0 0 1-1.66 0L2 17.5"/>
  </svg>
)

const AgentIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8V4H8"/>
    <rect width="16" height="12" x="4" y="8" rx="2"/>
    <path d="M2 14h2"/>
    <path d="M20 14h2"/>
    <path d="M15 13v2"/>
    <path d="M9 13v2"/>
  </svg>
)

/* ── Skill data ── */
const SKILLS = [
  // Frontend
  { name: 'React.js',     category: 'frontend', img: di('react') },
  { name: 'JavaScript',   category: 'frontend', img: di('javascript') },
  { name: 'HTML5',        category: 'frontend', img: di('html5') },
  { name: 'CSS3',         category: 'frontend', img: di('css3') },
  { name: 'Tailwind',     category: 'frontend', img: di('tailwindcss', 'plain') },

  // Backend
  { name: 'Node.js',      category: 'backend', img: di('nodejs') },
  { name: 'Express.js',   category: 'backend', img: di('express'), invert: true },
  { name: 'REST APIs',    category: 'backend', abbr: 'REST' },
  { name: 'JWT',          category: 'backend', abbr: 'JWT' },

  // Database
  { name: 'MongoDB',      category: 'database', img: di('mongodb') },
  { name: 'Mongoose',     category: 'database', abbr: 'Mn' },

  // Tools
  { name: 'Git',          category: 'tools', img: di('git') },
  { name: 'GitHub',       category: 'tools', img: di('github'), invert: true },
  { name: 'VS Code',      category: 'tools', img: di('vscode') },
  { name: 'Postman',      category: 'tools', img: di('postman') },
  { name: 'npm',          category: 'tools', img: di('npm', 'original-wordmark') },

  // AI Tools
  { name: 'Claude AI',    category: 'ai-tools', abbr: 'Cl',  accent: '#f97316' },
  { name: 'ChatGPT',      category: 'ai-tools', abbr: 'GPT', accent: '#10a37f' },
  { name: 'Copilot',      category: 'ai-tools', abbr: 'Co',  accent: '#3b82f6' },

  // AI / LLM
  { name: 'LLM',                category: 'ai-llm', component: BrainIcon },
  { name: 'RAG',                category: 'ai-llm', component: RagIcon },
  { name: 'Prompt Engineering', category: 'ai-llm', component: PromptIcon },
  { name: 'Vector DB',          category: 'ai-llm', component: VectorDBIcon },
  { name: 'Agentic AI',         category: 'ai-llm', component: AgentIcon },
]

const CATEGORIES = [
  { id: 'all',       label: 'All' },
  { id: 'frontend',  label: 'Frontend' },
  { id: 'backend',   label: 'Backend' },
  { id: 'database',  label: 'Database' },
  { id: 'tools',     label: 'Tools' },
  { id: 'ai-tools',  label: 'AI Tools' },
  { id: 'ai-llm',    label: 'AI / LLM' },
]

/* ── Skill tile ── */
function SkillTile({ skill, index }) {
  const Component = skill.component

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.6, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.2 } }}
      transition={{
        type: 'spring',
        stiffness: 220,
        damping: 22,
        delay: index * 0.035,
      }}
      whileHover={{
        y: -6,
        scale: 1.06,
        transition: { type: 'spring', stiffness: 400, damping: 18 },
      }}
      className="relative group"
    >
      {/* Outer glow on hover */}
      <div
        className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-brand/0 via-brand/40 to-pink-500/0
                   opacity-0 group-hover:opacity-60 blur-xl transition-opacity duration-500 -z-10"
        aria-hidden
      />

      {/* Tile */}
      <div className="relative h-full card rounded-2xl p-4 flex flex-col items-center gap-2.5
                      group-hover:border-brand/40 transition-colors duration-300 overflow-hidden">

        {/* Shimmer sweep */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-[60%] -skew-x-12
                     bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
          animate={{ x: ['-120%', '220%'] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            repeatDelay: 4 + (index % 5) * 1.5,
            ease: 'linear',
          }}
        />

        {/* Icon — gentle continuous float + rotate on hover */}
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{
            duration: 3 + (index % 4) * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: (index % 7) * 0.15,
          }}
          whileHover={{
            rotate: [0, -10, 10, -6, 0],
            scale: 1.18,
            transition: { duration: 0.55 },
          }}
          className="w-10 h-10 flex items-center justify-center mt-1"
          style={skill.accent ? { color: skill.accent } : undefined}
        >
          {skill.img && (
            <img
              src={skill.img}
              alt={skill.name}
              className={`w-9 h-9 object-contain${skill.invert ? ' brightness-0 invert' : ''}`}
            />
          )}
          {Component && <Component className="w-9 h-9 text-brand" />}
          {skill.abbr && (
            <span
              className="text-sm font-extrabold leading-none"
              style={{ color: skill.accent || '#8B5CF6' }}
            >
              {skill.abbr}
            </span>
          )}
        </motion.div>

        {/* Name */}
        <span className="text-[11px] font-semibold text-copy text-center leading-tight
                         group-hover:text-brand transition-colors duration-300">
          {skill.name}
        </span>
      </div>
    </motion.div>
  )
}

/* ── Section ── */
export default function Skills() {
  const [filter, setFilter] = useState('all')
  const { skills: liveSkills } = useContent()

  const source = liveSkills
    ? liveSkills.map((s) => ({
        name: s.name,
        category: s.category,
        img: s.iconUrl || undefined,
        abbr: s.abbr || undefined,
        accent: s.accent || undefined,
        invert: s.invert || false,
      }))
    : SKILLS

  const filtered = filter === 'all'
    ? source
    : source.filter((s) => s.category === filter)

  return (
    <section id="skills" className="relative py-24 overflow-hidden">

      {/* ── Animated background orbs ── */}
      <motion.div
        aria-hidden
        animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-[140px] opacity-15 -z-10"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)' }}
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -90, 0], y: [0, -50, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full blur-[140px] opacity-10 -z-10"
        style={{ background: 'radial-gradient(circle, #ec4899, transparent 70%)' }}
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, 60, -40, 0], y: [0, -30, 50, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[400px] h-[400px] rounded-full blur-[160px] opacity-[0.07] -z-10"
        style={{ background: 'radial-gradient(circle, #06b6d4, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="mb-10 text-center"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-semibold uppercase tracking-widest mb-4">
            Skills
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            <span className="text-copy">My toolbox &</span>
            <br />
            <motion.span
              animate={{ backgroundPosition: ['0% center', '200% center'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #a78bfa 0%, #ec4899 25%, #06b6d4 50%, #a78bfa 75%, #ec4899 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              AI workflow
            </motion.span>
          </h2>
          <p className="text-sm text-muted mt-4 max-w-md mx-auto">
            The technologies I work with daily and the AI concepts I'm building into my workflow.
          </p>
        </motion.div>

        {/* ── Filter pills ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors
                          ${filter === cat.id
                            ? 'text-white'
                            : 'text-muted hover:text-copy bg-card border border-line'}`}
            >
              {filter === cat.id && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-brand to-pink-500"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* ── Skills grid with smooth filter transitions ── */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => (
              <SkillTile key={skill.name} skill={skill} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Total count */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-muted/60 mt-8 tabular-nums"
        >
          {filtered.length} {filtered.length === 1 ? 'skill' : 'skills'}
          {filter !== 'all' && (
            <> · <button onClick={() => setFilter('all')} className="text-brand hover:underline">show all</button></>
          )}
        </motion.p>

      </div>
    </section>
  )
}
