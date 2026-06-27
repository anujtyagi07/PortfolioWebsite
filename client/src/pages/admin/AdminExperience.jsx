import { useEffect, useState } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { Field, Input, Textarea, ListInput } from '../../components/admin/Field'
import { experienceApi } from '../../lib/api'
import Button from '../../components/ui/Button'

const blank = {
  role: '', company: '', type: '', period: '', location: '',
  description: '', highlights: [], tech: [], accent: '', order: 0,
}

export default function AdminExperience() {
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const load = () => {
    setLoading(true)
    experienceApi.getAll().then(({ data }) => setItems(data)).finally(() => setLoading(false))
  }
  useEffect(load, [])

  const save = async () => {
    setSaving(true)
    try {
      if (editing._id) await experienceApi.update(editing._id, editing)
      else await experienceApi.create(editing)
      setEditing(null)
      load()
    } catch (err) {
      alert(err.response?.data?.message || err.message)
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id) => {
    if (!confirm('Delete this experience entry?')) return
    await experienceApi.remove(id)
    load()
  }

  const set = (k, v) => setEditing((p) => ({ ...p, [k]: v }))

  return (
    <AdminLayout
      title="Experience"
      subtitle="Work history, internships, freelance gigs."
      actions={!editing && <Button onClick={() => setEditing({ ...blank })}>+ New Entry</Button>}
    >
      {editing ? (
        <div className="card p-6 rounded-xl flex flex-col gap-4 max-w-3xl">
          <h3 className="font-semibold text-lg">{editing._id ? 'Edit entry' : 'New entry'}</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Role"><Input value={editing.role} onChange={(v) => set('role', v)} /></Field>
            <Field label="Company"><Input value={editing.company} onChange={(v) => set('company', v)} /></Field>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Type" hint="e.g. Internship, Full-time"><Input value={editing.type} onChange={(v) => set('type', v)} /></Field>
            <Field label="Period" hint="e.g. Jan 2024 – Jun 2024"><Input value={editing.period} onChange={(v) => set('period', v)} /></Field>
            <Field label="Location"><Input value={editing.location} onChange={(v) => set('location', v)} /></Field>
          </div>
          <Field label="Description"><Textarea value={editing.description} onChange={(v) => set('description', v)} /></Field>
          <Field label="Highlights"><ListInput values={editing.highlights} onChange={(v) => set('highlights', v)} placeholder="Achievement…" /></Field>
          <Field label="Tech Used"><ListInput values={editing.tech} onChange={(v) => set('tech', v)} placeholder="React, Node.js…" /></Field>
          <Field label="Accent (CSS gradient)" hint="e.g. linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)">
            <Input value={editing.accent} onChange={(v) => set('accent', v)} />
          </Field>
          <Field label="Order"><Input type="number" value={editing.order} onChange={(v) => set('order', Number(v))} /></Field>
          <div className="flex gap-2 pt-2 border-t border-line">
            <Button onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save'}</Button>
            <Button variant="secondary" onClick={() => setEditing(null)}>Cancel</Button>
          </div>
        </div>
      ) : loading ? (
        <p className="text-muted text-sm">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-muted text-sm text-center py-12">No experience entries yet.</p>
      ) : (
        <div className="grid gap-3">
          {items.map((e) => (
            <div key={e._id} className="card p-4 rounded-xl flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h3 className="font-semibold truncate">{e.role}</h3>
                <p className="text-xs text-muted truncate">{e.company} · {e.period}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button variant="secondary" size="sm" onClick={() => setEditing(e)}>Edit</Button>
                <button onClick={() => remove(e._id)} className="px-3 py-1.5 text-xs rounded-lg border border-line text-muted hover:text-red-400 hover:border-red-400/50 transition-colors">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
