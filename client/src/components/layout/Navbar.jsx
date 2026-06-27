import { Fragment, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'
import Button from '../ui/Button'
import { NAV_LINKS } from '../../config/constants'

const NAV_ICONS = {
  '/': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  '/#about': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  ),
  '/#skills': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  '/#projects': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
  '/#experience': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    </svg>
  ),
  '/#education': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  ),
  '/#services': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/>
      <polyline points="2 17 12 22 22 17"/>
      <polyline points="2 12 12 17 22 12"/>
    </svg>
  ),
  'https://github.com/anujtyagi': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  ),
  '/api/uploads/resume.pdf': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="12" y1="18" x2="12" y2="12"/>
      <polyline points="9 15 12 18 15 15"/>
    </svg>
  ),
  '/#contact': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
}

function LimelightLink({ href, label, isActive, external }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative px-3 py-1.5 text-sm font-medium transition-colors duration-200"
      style={{ color: isActive || hovered ? 'var(--color-copy)' : 'var(--color-muted)' }}
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            layoutId="limelight"
            className="absolute inset-0 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{ background: 'var(--color-card)' }}
          >
            <span
              className="absolute inset-x-0 top-0 h-px rounded-full"
              style={{ background: 'linear-gradient(90deg, transparent, #8B5CF6, transparent)', opacity: 0.9 }}
            />
            <span
              className="absolute inset-x-1/4 top-0 h-4 rounded-full blur-md"
              style={{ background: '#8B5CF6', opacity: 0.35 }}
            />
          </motion.span>
        )}
      </AnimatePresence>

      {isActive && (
        <motion.span
          layoutId="active-dot"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}

      <span className="relative z-10">{label}</span>
    </a>
  )
}

function SidebarIcon({ href, label, icon, isActive, external, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="relative flex items-center"
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.12 + index * 0.04, duration: 0.2 }}
    >
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative w-8 h-8 flex items-center justify-center rounded-lg transition-colors duration-200"
        style={{ color: isActive || hovered ? '#8B5CF6' : 'var(--color-muted)' }}
      >
        <AnimatePresence>
          {(hovered || isActive) && (
            <motion.span
              className="absolute inset-0 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{ background: 'var(--color-card)' }}
            >
              <span
                className="absolute inset-x-0 top-0 h-px rounded-full"
                style={{ background: 'linear-gradient(90deg, transparent, #8B5CF6, transparent)', opacity: 0.9 }}
              />
              <span
                className="absolute inset-x-1/4 top-0 h-4 rounded-full blur-md"
                style={{ background: '#8B5CF6', opacity: 0.35 }}
              />
            </motion.span>
          )}
        </AnimatePresence>
        <span className="relative z-10">{icon}</span>
      </a>

      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute left-full ml-2.5 px-2 py-1 rounded-lg text-xs font-medium whitespace-nowrap pointer-events-none z-10"
            style={{
              background: 'var(--color-card)',
              border: '1px solid var(--color-line)',
              color: 'var(--color-copy)',
            }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  return (
    <>
      {/* ── Mobile header — always visible on < md ── */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-page/80 backdrop-blur-md border-b border-line/40">
        <div className="px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-lg font-bold tracking-tight group">
            <span className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-brand/10 border border-brand/20 group-hover:bg-brand/20 transition-colors">
              <span className="gradient-text font-extrabold text-sm">AT</span>
            </span>
            <span className="text-copy group-hover:text-brand transition-colors">Anuj Tyagi</span>
          </Link>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="relative w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg border border-line bg-card hover:border-brand transition-colors"
            >
              <motion.span
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
                transition={{ duration: 0.2 }}
                className="block w-4 h-0.5 bg-copy rounded-full origin-center"
              />
              <motion.span
                animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                className="block w-4 h-0.5 bg-copy rounded-full"
              />
              <motion.span
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
                transition={{ duration: 0.2 }}
                className="block w-4 h-0.5 bg-copy rounded-full origin-center"
              />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden bg-page/95 backdrop-blur-md border-b border-line"
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted hover:text-brand hover:bg-brand/5 transition-colors"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand/50" />
                    {link.label}
                    {link.external && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto opacity-40">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                    )}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Desktop sticky top nav — always in document flow, fades out on scroll ── */}
      <motion.header
        animate={scrolled
          ? { opacity: 0, y: -8, transition: { duration: 0.25, ease: 'easeOut' } }
          : { opacity: 1, y: 0, transition: { duration: 0.3 } }
        }
        style={{ pointerEvents: scrolled ? 'none' : 'auto' }}
        className="hidden md:block sticky top-0 z-50"
      >
        <div className="container-max section-padding py-0 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-lg font-bold tracking-tight group">
            <span className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-brand/10 border border-brand/20 group-hover:bg-brand/20 transition-colors">
              <span className="gradient-text font-extrabold text-sm">AT</span>
            </span>
            <span className="text-copy hidden sm:inline group-hover:text-brand transition-colors">
              Anuj Tyagi
            </span>
          </Link>

          <nav className="flex items-center gap-1 px-2 py-1.5 rounded-xl border bg-card/60 backdrop-blur-sm border-line/60">
            {NAV_LINKS.filter(l => l.inPill).map(link => (
              <LimelightLink
                key={link.href}
                href={link.href}
                label={link.label}
                isActive={location.pathname === link.href}
                external={link.external}
              />
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button as="a" href="/#contact" size="sm">
              Hire Me
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>
      </motion.header>

      {/* ── Desktop sidebar pill — fixed, appears on scroll ── */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            key="sidebar-pill"
            initial={{ opacity: 0, x: -60, y: '-50%' }}
            animate={{ opacity: 1, x: 0, y: '-50%', transition: { type: 'spring', stiffness: 300, damping: 28 } }}
            exit={{ opacity: 0, x: -60, y: '-50%', transition: { duration: 0.2, ease: 'easeIn' } }}
            className="hidden md:flex fixed left-4 z-50 flex-col items-center gap-2 px-2 py-3 rounded-2xl border border-line/80 bg-card/90 backdrop-blur-md"
            style={{ top: '50%', boxShadow: '0 0 30px rgba(139,92,246,0.12), 0 8px 32px rgba(0,0,0,0.25)' }}
          >
            <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08, duration: 0.2 }}>
              <Link to="/" className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand/10 border border-brand/20 hover:bg-brand/20 transition-colors" title="Home">
                <span className="gradient-text font-extrabold text-sm">AT</span>
              </Link>
            </motion.div>

            <div className="w-4 h-px bg-line" />

            {NAV_LINKS.map((link, i) => {
              const prev = NAV_LINKS[i - 1]
              const showDivider = i > 0 && prev.group !== link.group
              return (
                <Fragment key={link.href}>
                  {showDivider && <div className="w-4 h-px bg-line" />}
                  <SidebarIcon
                    href={link.href}
                    label={link.label}
                    icon={NAV_ICONS[link.href]}
                    isActive={location.pathname === link.href}
                    external={link.external}
                    index={i}
                  />
                </Fragment>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
