import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { contentApi } from '../../lib/api'

const CARDS = [
  { to: '/admin/projects', label: 'Projects', desc: 'Add, edit, or remove case studies', key: 'projects' },
  { to: '/admin/skills', label: 'Skills', desc: 'Manage tech skills with icons & categories', key: 'skills' },
  { to: '/admin/experience', label: 'Experience', desc: 'Edit work history & internships', key: 'experience' },
  { to: '/admin/education', label: 'Education', desc: 'Degrees, courses, and schools', key: 'education' },
  { to: '/admin/settings', label: 'Settings & Social', desc: 'Site info, contact, social links', key: 'settings' },
  { to: '/admin/resume', label: 'Resume', desc: 'Upload or replace your CV PDF', key: 'resume' },
]

export default function AdminDashboard() {
  const [counts, setCounts] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    contentApi.getAll()
      .then(({ data }) => {
        setCounts({
          projects: data.projects?.length || 0,
          skills: data.skills?.length || 0,
          experience: data.experience?.length || 0,
          education: data.education?.length || 0,
          settings: data.settings ? 1 : 0,
          resume: data.settings?.resumeUrl ? 1 : 0,
        })
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <AdminLayout title="Overview" subtitle="Manage your portfolio content from one place.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CARDS.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="group card p-5 rounded-xl hover:border-brand/40 transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-copy group-hover:text-brand transition-colors">{card.label}</h3>
              {!loading && counts[card.key] !== undefined && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-brand/10 text-brand font-semibold border border-brand/20">
                  {card.key === 'resume' ? (counts.resume ? 'Uploaded' : 'None') : counts[card.key]}
                </span>
              )}
            </div>
            <p className="text-xs text-muted leading-relaxed">{card.desc}</p>
            <span className="inline-flex items-center gap-1 text-xs text-brand mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
              Manage →
            </span>
          </Link>
        ))}
      </div>
    </AdminLayout>
  )
}
