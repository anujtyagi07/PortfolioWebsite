import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { projects as staticProjects } from '../../data/projects'
import { useContent } from '../../context/ContentContext'

const ease = [0.22, 1, 0.36, 1]
const PAGE_SIZE = 3

/* ── Icons ── */
function GitHubIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}

/* ── Glass card (Smit-Prajapati pattern) ── */
function ProjectCard({ project }) {
  const circles = [
    { size: 110, offset: 8,  z: 15, delay: '0s'   },
    { size: 80,  offset: 14, z: 30, delay: '0.3s'  },
    { size: 54,  offset: 20, z: 50, delay: '0.6s'  },
    { size: 34,  offset: 25, z: 75, delay: '0.9s'  },
  ]

  return (
    /* Perspective wrapper */
    <div className="group w-full [perspective:1000px]">
      {/* Card surface — 3D tilt on hover */}
      <div
        className="relative h-[340px] rounded-[28px] transition-all duration-500 ease-in-out
                   [transform-style:preserve-3d]
                   group-hover:[transform:rotate3d(1,1,0,18deg)]
                   group-hover:[box-shadow:rgba(0,0,0,0.35)_30px_50px_25px_-40px,rgba(139,92,246,0.12)_0px_25px_30px_0px]"
        style={{
          background: 'linear-gradient(135deg, #1c1c27 0%, #0d0d14 100%)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.45)',
        }}
      >
        {/* ① Inner glass border — floats 20px forward */}
        <div
          className="absolute inset-[6px] rounded-[22px] border-b border-l border-white/[0.12]
                     bg-gradient-to-b from-white/[0.07] to-transparent backdrop-blur-[2px]
                     [transform-style:preserve-3d]"
          style={{ transform: 'translate3d(0,0,20px)' }}
        />

        {/* ② Cover gradient — slight forward lift */}
        <div
          className="absolute top-0 left-0 right-0 h-[140px] rounded-t-[28px]"
          style={{
            background: project.coverGradient,
            transform: 'translate3d(0,0,4px)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 rounded-t-[28px]" />
          <span className="absolute inset-0 flex items-center justify-center text-white/[0.08] text-[90px] font-black select-none leading-none">
            {project.title[0]}
          </span>
        </div>

        {/* ③ Decorative circles — top-right, stacked at depth */}
        <div className="absolute top-0 right-0 [transform-style:preserve-3d]">
          {circles.map((c, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/[0.05] shadow-[rgba(100,100,111,0.15)_-8px_8px_18px_0px]
                         transition-all duration-500"
              style={{
                width: c.size,
                height: c.size,
                top: c.offset,
                right: c.offset,
                transform: `translate3d(0,0,${c.z}px)`,
                transitionDelay: c.delay,
              }}
            />
          ))}
        </div>

        {/* ④ Featured badge — floats high */}
        {project.featured && (
          <div
            className="absolute top-3 left-3 transition-all duration-500"
            style={{ transform: 'translate3d(0,0,50px)' }}
          >
            <span className="text-[10px] font-semibold bg-black/40 backdrop-blur-sm border border-white/20 text-white/90 px-2.5 py-0.5 rounded-full">
              ★ Featured
            </span>
          </div>
        )}

        {/* ⑤ Text content — floats at 28px */}
        <div
          className="absolute inset-0 flex flex-col p-5 [transform-style:preserve-3d]"
          style={{ transform: 'translate3d(0,0,28px)' }}
        >
          {/* Spacer for cover */}
          <div className="h-[110px]" />

          <div className="flex-1 flex flex-col">
            <h3 className="font-bold text-white text-[15px] leading-snug">{project.title}</h3>
            <p className="text-[11px] text-purple-400 font-medium mt-0.5">{project.tagline}</p>
            <p className="text-[11px] text-zinc-400 mt-2 leading-relaxed line-clamp-2">
              {project.description}
            </p>

            {/* Tech chips */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {project.techStack.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="text-[9px] px-1.5 py-0.5 rounded-md border border-white/[0.08] bg-white/[0.04] text-zinc-400 font-medium"
                >
                  {t}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="text-[9px] px-1.5 py-0.5 rounded-md border border-white/[0.08] bg-white/[0.04] text-zinc-500">
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>
          </div>

          {/* ⑥ Action row — buttons pop forward on hover */}
          <div className="flex items-center justify-between pt-3 border-t border-white/[0.07] mt-2">
            {/* Icon buttons — float forward on card hover */}
            <div className="flex gap-2">
              <a
                href={project.githubUrl || undefined}
                target={project.githubUrl ? '_blank' : undefined}
                rel="noreferrer"
                onClick={(e) => !project.githubUrl && e.preventDefault()}
                className={`grid h-[30px] w-[30px] place-content-center rounded-full bg-white
                           shadow-[rgba(0,0,0,0.5)_0px_7px_5px_-5px]
                           transition-all duration-300
                           group-hover:[transform:translate3d(0,0,50px)]
                           group-hover:[box-shadow:rgba(0,0,0,0.2)_-5px_20px_10px_0px]
                           [transition-delay:300ms]
                           ${project.githubUrl ? 'hover:bg-purple-500 cursor-pointer' : 'opacity-30 cursor-not-allowed'}`}
              >
                <span className={project.githubUrl ? 'text-black hover:text-white' : 'text-black/30'}>
                  <GitHubIcon />
                </span>
              </a>
              <a
                href={project.liveUrl || undefined}
                target={project.liveUrl ? '_blank' : undefined}
                rel="noreferrer"
                onClick={(e) => !project.liveUrl && e.preventDefault()}
                className={`grid h-[30px] w-[30px] place-content-center rounded-full bg-white
                           shadow-[rgba(0,0,0,0.5)_0px_7px_5px_-5px]
                           transition-all duration-300
                           group-hover:[transform:translate3d(0,0,50px)]
                           group-hover:[box-shadow:rgba(0,0,0,0.2)_-5px_20px_10px_0px]
                           [transition-delay:500ms]
                           ${project.liveUrl ? 'hover:bg-purple-500 cursor-pointer' : 'opacity-30 cursor-not-allowed'}`}
              >
                <span className={project.liveUrl ? 'text-black hover:text-white' : 'text-black/30'}>
                  <ExternalIcon />
                </span>
              </a>
            </div>

            {/* View more — also floats forward */}
            <Link
              to={`/projects/${project.slug}`}
              className="flex items-center gap-1 text-[11px] font-bold text-white/70 hover:text-white
                         transition-all duration-300 hover:[transform:translate3d(0,0,10px)]"
            >
              View more
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Page transition variants ── */
const pageVariants = {
  initial: (dir) => ({
    opacity: 0,
    x: dir > 0 ? 80 : -80,
    filter: 'blur(6px)',
  }),
  animate: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.45, ease },
  },
  exit: (dir) => ({
    opacity: 0,
    x: dir > 0 ? -80 : 80,
    filter: 'blur(6px)',
    transition: { duration: 0.3, ease },
  }),
}

/* ── Section ── */
export default function Projects() {
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(1)

  const { projects: liveProjects } = useContent()
  const projects = liveProjects ?? staticProjects
  const totalPages = Math.max(1, Math.ceil(projects.length / PAGE_SIZE))

  const currentProjects = projects.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  function goTo(newPage) {
    if (newPage === page) return
    setDirection(newPage > page ? 1 : -1)
    setPage(newPage)
  }

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-0 top-1/3 w-[600px] h-[600px] rounded-full blur-[160px] opacity-[0.07] -z-10"
        style={{ background: 'radial-gradient(ellipse, #8b5cf6 0%, transparent 70%)' }}
        aria-hidden
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-semibold uppercase tracking-widest mb-4">
            Projects
          </span>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-copy tracking-tight">
              Things I've built
            </h2>
            <span className="text-xs text-muted tabular-nums">
              Page {page + 1} of {totalPages}
            </span>
          </div>
        </motion.div>

        {/* Cards grid with page animation */}
        <div className="relative min-h-[360px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {currentProjects.map((project, i) => (
                <motion.div
                  key={project._id || project.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease, delay: i * 0.1 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-10">
          {/* Prev */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => goTo(page - 1)}
            disabled={page === 0}
            className="w-9 h-9 rounded-full border border-line flex items-center justify-center
                       text-muted hover:text-copy hover:border-brand/50
                       disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </motion.button>

          {/* Page dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <motion.button
                key={i}
                onClick={() => goTo(i)}
                animate={{
                  width: i === page ? 24 : 7,
                  backgroundColor: i === page ? '#8B5CF6' : '#3f3f50',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="h-[7px] rounded-full"
              />
            ))}
          </div>

          {/* Next */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => goTo(page + 1)}
            disabled={page === totalPages - 1}
            className="w-9 h-9 rounded-full border border-line flex items-center justify-center
                       text-muted hover:text-copy hover:border-brand/50
                       disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </motion.button>
        </div>

      </div>
    </section>
  )
}
