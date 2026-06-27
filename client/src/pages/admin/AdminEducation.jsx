import { useEffect, useState } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { Field, Input, Textarea, ListInput, Select, Toggle } from '../../components/admin/Field'
import { educationApi } from '../../lib/api'
import Button from '../../components/ui/Button'

const TYPES = ['course', 'degree', 'school']
const ICONS = ['certificate', 'cap', 'book']

const blank = {
  type: 'course', featured: false,
  title: '', school: '', mode: '', period: '', location: '', grade: '',
  description: '', highlights: [], tech: [],
  accent: '', glowColor: '', icon: 'certificate', order: 0,
}

export default function AdminEducation() {
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const load = () => {
    setLoading(true)
    educationApi.getAll().then(({ data }) => setItems(data)).finally(() => setLoading(false))
  }
  useEffect(load, [])

  const save = async () => {
    setSaving(true)
    try {
      if (editing._id) await educationApi.update(editing._id, editing)
      else await educationApi.create(editing)
      setEditing(null)
      load()
    } catch (err) {
      alert(err.response?.data?.message || err.message)
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id) => {
    if (!confirm('Delete this education entry?')) return
    await educationApi.remove(id)
    load()
  }

  const set = (k, v) => setEditing((p) => ({ ...p, [k]: v }))

  return (
    <AdminLayout
      title="Education"
      subtitle="Courses, degrees, and schools."
      actions={!editing && <Button onClick={() => setEditing({ ...blank })}>+ New Entry</Button>}
    >
      {editing ? (
        <div className="card p-6 rounded-xl flex flex-col gap-4 max-w-3xl">
          <h3 className="font-semibold text-lg">{editing._id ? 'Edit entry' : 'New entry'}</h3>
          <div className="grid sm:grid-cols-3 gap-4 items-center">
            <Field label="Type"><Select value={editing.type} onChange={(v) => set('type', v)} options={TYPES} /></Field>
            <Field label="Icon"><Select value={editing.icon} onChange={(v) => set('icon', v)} options={ICONS} /></Field>
            <Toggle value={editing.featured} onChange={(v) => set('featured', v)} label="Featured (highlighted card)" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Title"><Input value={editing.title} onChange={(v) => set('title', v)} /></Field>
            <Field label="School / Institution"><Input value={editing.school} onChange={(v) => set('school', v)} /></Field>
          </div>
          <div className="grid sm:grid-cols-4 gap-4">
            <Field label="Mode"><Input value={editing.mode} onChange={(v) => set('mode', v)} placeholder="Online / Offline" /></Field>
            <Field label="Period"><Input value={editing.period} onChange={(v) => set('period', v)} placeholder="2021 – 2025" /></Field>
            <Field label="Location"><Input value={editing.location} onChange={(v) => set('location', v)} /></Field>
            <Field label="Grade"><Input value={editing.grade} onChange={(v) => set('grade', v)} placeholder="87% / 8.5 CGPA" /></Field>
          </div>
          <Field label="Description"><Textarea value={editing.description} onChange={(v) => set('description', v)} /></Field>
          <Field label="Highlights"><ListInput values={editing.highlights} onChange={(v) => set('highlights', v)} /></Field>
          <Field label="Tech / Subjects"><ListInput values={editing.tech} onChange={(v) => set('tech', v)} /></Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Accent (CSS gradient)"><Input value={editing.accent} onChange={(v) => set('accent', v)} /></Field>
            <Field label="Glow Color (hex)"><Input value={editing.glowColor} onChange={(v) => set('glowColor', v)} placeholder="#f59e0b" /></Field>
          </div>
          <Field label="Order"><Input type="number" value={editing.order} onChange={(v) => set('order', Number(v))} /></Field>
          <div className="flex gap-2 pt-2 border-t border-line">
            <Button onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save'}</Button>
            <Button variant="secondary" onClick={() => setEditing(null)}>Cancel</Button>
          </div>
        </div>
      ) : loading ? (
        <p className="text-muted text-sm">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-muted text-sm text-center py-12">No education entries yet.</p>
      ) : (
        <div className="grid gap-3">
          {items.map((e) => (
            <div key={e._id} className="card p-4 rounded-xl flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold truncate">{e.title}</h3>
                  {e.featured && <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand/15 text-brand uppercase tracking-wider font-semibold">Featured</span>}
                  <span className="text-[10px] px-1.5 py-0.5 rounded border border-line text-muted uppercase tracking-wider font-semibold">{e.type}</span>
                </div>
                <p className="text-xs text-muted truncate">{e.school} · {e.period}</p>
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
