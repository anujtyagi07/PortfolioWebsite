import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SITE as STATIC_SITE, SOCIAL as STATIC_SOCIAL } from '../../config/constants'
import { useContent } from '../../context/ContentContext'

const DEFAULT_RESUME_PATH = '/api/uploads/resume.pdf'

const ease = [0.22, 1, 0.36, 1]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.55, ease, delay },
})

/* ── Icons ── */
const GitHubIcon = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

const LinkedInIcon = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const TwitterIcon = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const InstagramIcon = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const MailIcon = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
)

const PhoneIcon = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
  </svg>
)

const PinIcon = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const ArrowUpIcon = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
)

const DownloadIcon = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

const FileIcon = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="9" y1="13" x2="15" y2="13" />
    <line x1="9" y1="17" x2="13" y2="17" />
  </svg>
)

const ExternalIcon = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

const ArrowRightIcon = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

/* ── Single social icon button ── */
function SocialIcon({ href, label, icon: Icon, external = true }) {
  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      aria-label={label}
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 320, damping: 18 }}
      className="group relative flex items-center justify-center w-10 h-10 rounded-xl border border-line bg-card/50 text-muted hover:text-brand hover:border-brand/50 transition-colors duration-200"
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'radial-gradient(circle at center, rgba(139,92,246,0.18), transparent 70%)' }}
      />
      <Icon className="relative w-[18px] h-[18px]" />
    </motion.a>
  )
}

/* ── Contact line (icon + label + value) ── */
function ContactLine({ icon: Icon, href, label, value, external = false }) {
  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      whileHover={{ x: 3 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      className="group flex items-start gap-3 text-sm text-muted hover:text-copy transition-colors"
    >
      <span className="flex-shrink-0 w-9 h-9 rounded-lg border border-line bg-page/40 flex items-center justify-center text-brand group-hover:border-brand/40 transition-colors">
        <Icon className="w-4 h-4" />
      </span>
      <span className="flex flex-col">
        <span className="text-[10px] uppercase tracking-widest text-muted/60 font-semibold">
          {label}
        </span>
        <span className="text-[13px] text-copy/90 group-hover:text-brand transition-colors break-all">
          {value}
        </span>
      </span>
    </motion.a>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  const { settings } = useContent()

  const SITE = {
    ...STATIC_SITE,
    ...(settings || {}),
  }
  const SOCIAL = {
    ...STATIC_SOCIAL,
    github: settings?.github ?? STATIC_SOCIAL.github,
    linkedin: settings?.linkedin ?? STATIC_SOCIAL.linkedin,
    twitter: settings?.twitter ?? STATIC_SOCIAL.twitter,
    instagram: settings?.instagram ?? STATIC_SOCIAL.instagram,
  }
  const RESUME_PATH = settings?.resumeUrl || DEFAULT_RESUME_PATH

  const socials = [
    SOCIAL.github && { href: SOCIAL.github, label: 'GitHub', icon: GitHubIcon },
    SOCIAL.linkedin && { href: SOCIAL.linkedin, label: 'LinkedIn', icon: LinkedInIcon },
    SOCIAL.twitter && { href: SOCIAL.twitter, label: 'Twitter / X', icon: TwitterIcon },
    SOCIAL.instagram && { href: SOCIAL.instagram, label: 'Instagram', icon: InstagramIcon },
    SITE.email && {
      href: `mailto:${SITE.email}`,
      label: 'Email',
      icon: MailIcon,
      external: false,
    },
  ].filter(Boolean)

  return (
    <footer className="relative border-t border-line bg-card mt-auto overflow-hidden">

      {/* Animated gradient hairline at the top */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(139,92,246,0.6), transparent)',
        }}
      />

      {/* Faint background orb */}
      <motion.div
        aria-hidden
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.07]"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)' }}
      />

      <div className="container-max section-padding py-14 lg:py-16 relative">

        {/* ── Top CTA strip ── */}
        <motion.div
          {...fadeUp(0)}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-10 mb-10 border-b border-line/60"
        >
          <div className="flex flex-col gap-3">
            {SITE.available && (
              <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold uppercase tracking-widest w-fit">
                <span className="relative flex w-1.5 h-1.5">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </span>
                Available for work
              </span>
            )}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-copy leading-tight max-w-xl">
              Let's build something{' '}
              <span className="gradient-text">worth shipping.</span>
            </h2>
          </div>

          <motion.a
            href={`mailto:${SITE.email}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand text-white text-sm font-semibold hover:bg-brand/90 transition-colors w-fit shadow-[0_0_30px_-8px_rgba(139,92,246,0.6)]"
          >
            Start a Project
            <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.a>
        </motion.div>

        {/* ── Main grid: Brand · Sitemap · Get in touch ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Brand column */}
          <motion.div {...fadeUp(0.05)} className="lg:col-span-5 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2.5 w-fit">
              <span className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-brand/10 border border-brand/20">
                <span className="gradient-text font-extrabold text-base">AT</span>
              </span>
              <span className="text-xl font-extrabold gradient-text tracking-tight">
                {SITE.name}
              </span>
            </Link>
            <p className="text-sm text-muted leading-relaxed max-w-sm">
              {SITE.tagline}
            </p>
            {SITE.location && (
              <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                <PinIcon className="w-3.5 h-3.5 text-brand" />
                {SITE.location}
              </span>
            )}
          </motion.div>

          {/* Resume column */}
          <motion.div {...fadeUp(0.1)} className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-copy mb-4">
              Resume
            </h3>

            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              className="relative group rounded-2xl border border-line bg-page/40 p-4 overflow-hidden"
            >
              {/* Hover gradient wash */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    'radial-gradient(circle at 30% 0%, rgba(139,92,246,0.18), transparent 70%)',
                }}
              />

              <div className="relative flex items-center gap-3 mb-4">
                <motion.div
                  whileHover={{ rotate: [0, -6, 6, 0] }}
                  transition={{ duration: 0.5 }}
                  className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand/10 border border-brand/30 flex items-center justify-center text-brand"
                >
                  <FileIcon className="w-5 h-5" />
                </motion.div>
                <div>
                  <p className="text-sm font-semibold text-copy">My CV — PDF</p>
                  <p className="text-[11px] text-muted">Updated regularly</p>
                </div>
              </div>

              {/* Primary: Download (forces save via download attr) */}
              <motion.a
                href={RESUME_PATH}
                download
                whileHover="hover"
                whileTap={{ scale: 0.97 }}
                className="relative flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-brand text-white text-sm font-semibold shadow-[0_0_24px_-8px_rgba(139,92,246,0.7)] overflow-hidden"
              >
                {/* Shine sweep on hover */}
                <motion.span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full"
                  variants={{
                    hover: { translateX: '100%', transition: { duration: 0.7, ease: 'easeOut' } },
                  }}
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
                  }}
                />
                <motion.span
                  variants={{
                    hover: {
                      y: [0, 3, 0],
                      transition: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' },
                    },
                  }}
                  className="relative flex items-center"
                >
                  <DownloadIcon className="w-4 h-4" />
                </motion.span>
                <span className="relative">Download PDF</span>
              </motion.a>

              {/* Secondary: open in new tab */}
              <a
                href={RESUME_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted hover:text-brand transition-colors"
              >
                Or view in new tab
                <ExternalIcon className="w-3 h-3" />
              </a>
            </motion.div>
          </motion.div>

          {/* Get in touch column */}
          <motion.div {...fadeUp(0.15)} className="lg:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-copy mb-4">
              Get in touch
            </h3>
            <div className="flex flex-col gap-3">
              {SITE.email && (
                <ContactLine
                  icon={MailIcon}
                  href={`mailto:${SITE.email}`}
                  label="Email"
                  value={SITE.email}
                />
              )}
              {SITE.phone && (
                <ContactLine
                  icon={PhoneIcon}
                  href={`tel:${SITE.phone.replace(/\s+/g, '')}`}
                  label="Phone"
                  value={SITE.phone}
                />
              )}
              {SOCIAL.github && (
                <ContactLine
                  icon={GitHubIcon}
                  href={SOCIAL.github}
                  label="GitHub"
                  value={SOCIAL.github.replace(/^https?:\/\//, '')}
                  external
                />
              )}
              {SOCIAL.linkedin && (
                <ContactLine
                  icon={LinkedInIcon}
                  href={SOCIAL.linkedin}
                  label="LinkedIn"
                  value={SOCIAL.linkedin.replace(/^https?:\/\//, '')}
                  external
                />
              )}
            </div>
          </motion.div>
        </div>

        {/* ── Social icon row ── */}
        {socials.length > 0 && (
          <motion.div
            {...fadeUp(0.2)}
            className="mt-12 pt-8 border-t border-line/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5"
          >
            <span className="text-xs uppercase tracking-widest text-muted/70 font-semibold">
              Connect with me
            </span>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <SocialIcon
                  key={s.label}
                  href={s.href}
                  label={s.label}
                  icon={s.icon}
                  external={s.external !== false}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Bottom strip ── */}
        <div className="mt-10 pt-6 border-t border-line/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>
            © {year} {SITE.name}. Built with{' '}
            <span className="text-brand font-semibold">React</span> +{' '}
            <span className="text-brand font-semibold">Tailwind</span>.
          </p>

          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="group inline-flex items-center gap-1.5 text-muted hover:text-brand transition-colors"
          >
            Back to top
            <span className="flex items-center justify-center w-6 h-6 rounded-md border border-line group-hover:border-brand/50 transition-colors">
              <ArrowUpIcon className="w-3 h-3 transition-transform group-hover:-translate-y-0.5" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}
