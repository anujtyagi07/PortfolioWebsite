import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'

export default function AdminBlog() {
  return (
    <div className="min-h-screen bg-page">
      <header className="border-b border-line bg-card px-6 py-4 flex items-center gap-4">
        <Link to="/admin" className="text-muted hover:text-brand text-sm transition-colors">
          ← Dashboard
        </Link>
        <h1 className="font-bold">Blog Posts</h1>
      </header>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted text-sm">Manage articles and drafts</p>
          <Button size="sm">+ New Post</Button>
        </div>
        <p className="text-muted text-sm text-center py-12">
          CRUD functionality will be implemented in Phase 2.
        </p>
      </div>
    </div>
  )
}
