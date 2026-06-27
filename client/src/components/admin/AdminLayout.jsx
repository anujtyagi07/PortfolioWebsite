import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const NAV = [
  { to: '/admin', label: 'Overview', end: true, icon: 'home' },
  { to: '/admin/projects', label: 'Projects', icon: 'grid' },
  { to: '/admin/skills', label: 'Skills', icon: 'sparkles' },
  { to: '/admin/experience', label: 'Experience', icon: 'briefcase' },
  { to: '/admin/education', label: 'Education', icon: 'cap' },
  { to: '/admin/settings', label: 'Settings & Social', icon: 'settings' },
  { to: '/admin/resume', label: 'Resume', icon: 'file' },
]

const ICONS = {
  home: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10" />,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></>,
  sparkles: <path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.813 1.9a2 2 0 0 1 1.287 1.288L12 21l1.9-5.813a2 2 0 0 1 1.287-1.287L21 12l-5.813-1.9a2 2 0 0 1-1.287-1.288z" />,
  briefcase: <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></>,
  cap: <><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
  file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></>,
}

function NavIcon({ name }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name]}
    </svg>
  )
}

export default function AdminLayout({ children, title, subtitle, actions }) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-page text-copy flex">
      {/* Sidebar */}
      <aside className="w-60 border-r border-line bg-card flex flex-col p-4 gap-2 sticky top-0 h-screen">
        <div className="px-2 pb-4 mb-2 border-b border-line">
          <h1 className="font-extrabold text-lg gradient-text">Admin Panel</h1>
          <p className="text-xs text-muted mt-0.5">Portfolio CMS</p>
        </div>

        <nav className="flex flex-col gap-1">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-brand/15 text-brand font-semibold border border-brand/30'
                    : 'text-muted hover:text-copy hover:bg-page'
                }`
              }
            >
              <NavIcon name={item.icon} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto pt-3 border-t border-line flex flex-col gap-2">
          <button
            onClick={() => window.open('/', '_blank')}
            className="text-xs text-muted hover:text-brand transition-colors text-left px-3"
          >
            ↗ View site
          </button>
          <button
            onClick={() => { logout(); navigate('/admin/login') }}
            className="text-xs text-muted hover:text-red-400 transition-colors text-left px-3"
          >
            ⏻ Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        <header className="border-b border-line bg-card/50 px-8 py-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">{title}</h2>
            {subtitle && <p className="text-sm text-muted mt-0.5">{subtitle}</p>}
          </div>
          {actions}
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
