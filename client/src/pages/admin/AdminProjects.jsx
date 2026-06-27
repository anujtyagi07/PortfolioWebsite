import { useEffect, useState } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { Field, Input, Textarea, ListInput, Toggle } from '../../components/admin/Field'
import { projectsApi } from '../../lib/api'
import Button from '../../components/ui/Button'

const blank = {
  title: '', slug: '', tagline: '', description: '',
  problem: '', solution: '', result: '',
  techStack: [], images: [],
  liveUrl: '', githubUrl: '',
  featured: false, order: 0, coverGradient: '',
}

export default function AdminProjects() {
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const load = () => {
    setLoading(true)
    projectsApi.getAll().then(({ data }) => setItems(data)).finally(() => setLoading(false))
  }
  useEffect(load, [])

  const save = async () => {
    setSaving(true)
    try {
      if (editing._id) await projectsApi.update(editing._id, editing)
      else await projectsApi.create(editing)
      setEditing(null)
      load()
    } catch (err) {
      alert(err.response?.data?.message || err.message)
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id) => {
    if (!confirm('Delete this project?')) return
    await projectsApi.remove(id)
    load()
  }

  const set = (k, v) => setEditing((p) => ({ ...p, [k]: v }))

  return (
    <AdminLayout
      title="Projects"
      subtitle="Add, edit, or remove case studies."
      actions={
        !editing && <Button onClick={() => setEditing({ ...blank })}>+ New Project</Button>
      }
    >
      {editing ? (
        <div className="card p-6 rounded-xl flex flex-col gap-4 max-w-3xl">
          <h3 className="font-semibold text-lg">{editing._id ? 'Edit project' : 'New project'}</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Title"><Input value={editing.title} onChange={(v) => set('title', v)} /></Field>
            <Field label="Slug" hint="URL-friendly, lowercase, no spaces"><Input value={editing.slug} onChange={(v) => set('slug', v)} /></Field>
          </div>
          <Field label="Tagline"><Input value={editing.tagline} onChange={(v) => set('tagline', v)} /></Field>
          <Field label="Description"><Textarea value={editing.description} onChange={(v) => set('description', v)} /></Field>
          <Field label="Problem"><Textarea value={editing.problem} onChange={(v) => set('problem', v)} rows={2} /></Field>
          <Field label="Solution"><Textarea value={editing.solution} onChange={(v) => set('solution', v)} rows={2} /></Field>
          <Field label="Result"><Textarea value={editing.result} onChange={(v) => set('result', v)} rows={2} /></Field>
          <Field label="Tech Stack"><ListInput values={editing.techStack} onChange={(v) => set('techStack', v)} placeholder="React, Node.js…" /></Field>
          <Field label="Images (URLs)"><ListInput values={editing.images} onChange={(v) => set('images', v)} placeholder="https://..." /></Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Live URL"><Input value={editing.liveUrl} onChange={(v) => set('liveUrl', v)} placeholder="https://..." /></Field>
            <Field label="GitHub URL"><Input value={editing.githubUrl} onChange={(v) => set('githubUrl', v)} placeholder="https://..." /></Field>
          </div>
          <Field label="Cover Gradient (CSS)" hint="e.g. linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)">
            <Input value={editing.coverGradient} onChange={(v) => set('coverGradient', v)} />
          </Field>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <Field label="Order"><Input type="number" value={editing.order} onChange={(v) => set('order', Number(v))} /></Field>
            <Toggle value={editing.featured} onChange={(v) => set('featured', v)} label="Featured (show on home)" />
          </div>
          <div className="flex gap-2 pt-2 border-t border-line">
            <Button onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save'}</Button>
            <Button variant="secondary" onClick={() => setEditing(null)}>Cancel</Button>
          </div>
        </div>
      ) : loading ? (
        <p className="text-muted text-sm">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-muted text-sm text-center py-12">No projects yet. Click "+ New Project" to add one.</p>
      ) : (
        <div className="grid gap-3">
          {items.map((p) => (
            <div key={p._id} className="card p-4 rounded-xl flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold truncate">{p.title}</h3>
                  {p.featured && <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand/15 text-brand uppercase tracking-wider font-semibold">Featured</span>}
                </div>
                <p className="text-xs text-muted truncate">{p.tagline}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button variant="secondary" size="sm" onClick={() => setEditing(p)}>Edit</Button>
                <button onClick={() => remove(p._id)} className="px-3 py-1.5 text-xs rounded-lg border border-line text-muted hover:text-red-400 hover:border-red-400/50 transition-colors">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
