import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../data/projects'

const ease = [0.22, 1, 0.36, 1]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease, delay },
})

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}

const infoCards = [
  {
    key: 'problem',
    label: 'Problem',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
  },
  {
    key: 'solution',
    label: 'Solution',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
  },
  {
    key: 'result',
    label: 'Result',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
]

export default function ProjectDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted text-lg">Project not found.</p>
        <button
          onClick={() => navigate('/#projects')}
          className="text-sm text-brand hover:underline"
        >
          ← Back to projects
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero banner */}
      <div
        className="relative w-full h-64 sm:h-80 flex items-end overflow-hidden"
        style={{ background: project.coverGradient }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white/10 text-[140px] sm:text-[180px] font-black leading-none select-none">
            {project.title[0]}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-page to-transparent" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 -mt-10 relative">
        {/* Back button */}
        <motion.button
          {...fadeUp(0)}
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs text-muted hover:text-copy transition-colors mb-8"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back to projects
        </motion.button>

        {/* Title block */}
        <motion.div {...fadeUp(0.05)} className="mb-3">
          {project.featured && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-brand/10 border border-brand/30 text-brand px-2 py-0.5 rounded-full mb-3">
              ★ Featured Project
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-copy tracking-tight leading-tight">
            {project.title}
          </h1>
          <p className="text-brand/80 font-medium mt-1">{project.tagline}</p>
        </motion.div>

        {/* Description */}
        <motion.p {...fadeUp(0.1)} className="text-muted leading-relaxed mb-8">
          {project.description}
        </motion.p>

        {/* Action links */}
        <motion.div {...fadeUp(0.12)} className="flex flex-wrap gap-3 mb-10">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-line bg-card text-sm font-medium text-copy hover:border-brand/50 hover:text-brand transition-colors"
            >
              <GitHubIcon /> View on GitHub
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-line/40 bg-card/40 text-sm font-medium text-muted/40 cursor-not-allowed">
              <GitHubIcon /> GitHub — coming soon
            </span>
          )}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand text-white text-sm font-semibold hover:bg-brand/90 transition-colors"
            >
              <ExternalIcon /> Live Demo
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-line/40 bg-card/40 text-sm font-medium text-muted/40 cursor-not-allowed">
              <ExternalIcon /> Live Demo — coming soon
            </span>
          )}
        </motion.div>

        {/* Info cards */}
        <div className="flex flex-col gap-4 mb-10">
          {infoCards.map(({ key, label, icon }, i) => (
            <motion.div
              key={key}
              {...fadeUp(0.15 + i * 0.07)}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className="card rounded-xl p-5 flex gap-4 items-start"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center mt-0.5">
                {icon}
              </div>
              <div>
                <h2 className="text-xs font-semibold text-brand uppercase tracking-wider mb-1.5">{label}</h2>
                <p className="text-sm text-muted leading-relaxed">{project[key]}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech stack */}
        <motion.div {...fadeUp(0.35)} className="card rounded-xl p-5">
          <h2 className="text-xs font-semibold text-copy uppercase tracking-wider mb-3">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 rounded-lg border border-line bg-page text-sm text-copy font-medium hover:border-brand/50 hover:text-brand transition-colors"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
