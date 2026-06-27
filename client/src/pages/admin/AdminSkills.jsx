import { useEffect, useState } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { Field, Input, Select, Toggle } from '../../components/admin/Field'
import { skillsApi } from '../../lib/api'
import Button from '../../components/ui/Button'

const CATEGORIES = ['frontend', 'backend', 'database', 'tools', 'ai-tools', 'ai-llm', 'language']

const blank = { name: '', category: 'frontend', iconUrl: '', abbr: '', accent: '', invert: false, order: 0 }

export default function AdminSkills() {
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const load = () => {
    setLoading(true)
    skillsApi.getAll().then(({ data }) => setItems(data)).finally(() => setLoading(false))
  }
  useEffect(load, [])

  const save = async () => {
    setSaving(true)
    try {
      if (editing._id) await skillsApi.update(editing._id, editing)
      else await skillsApi.create(editing)
      setEditing(null)
      load()
    } catch (err) {
      alert(err.response?.data?.message || err.message)
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id) => {
    if (!confirm('Delete this skill?')) return
    await skillsApi.remove(id)
    load()
  }

  const set = (k, v) => setEditing((p) => ({ ...p, [k]: v }))

  return (
    <AdminLayout
      title="Skills"
      subtitle="Manage your tech stack — icons, categories, and order."
      actions={!editing && <Button onClick={() => setEditing({ ...blank })}>+ New Skill</Button>}
    >
      {editing ? (
        <div className="card p-6 rounded-xl flex flex-col gap-4 max-w-2xl">
          <h3 className="font-semibold text-lg">{editing._id ? 'Edit skill' : 'New skill'}</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Name"><Input value={editing.name} onChange={(v) => set('name', v)} /></Field>
            <Field label="Category"><Select value={editing.category} onChange={(v) => set('category', v)} options={CATEGORIES} /></Field>
          </div>
          <Field label="Icon URL" hint="Optional — image URL (e.g. devicon CDN)"><Input value={editing.iconUrl} onChange={(v) => set('iconUrl', v)} placeholder="https://..." /></Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Abbreviation" hint="Used when no icon URL (e.g. 'JWT')"><Input value={editing.abbr} onChange={(v) => set('abbr', v)} /></Field>
            <Field label="Accent Color" hint="Hex for abbr text (e.g. #8B5CF6)"><Input value={editing.accent} onChange={(v) => set('accent', v)} /></Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <Field label="Order"><Input type="number" value={editing.order} onChange={(v) => set('order', Number(v))} /></Field>
            <Toggle value={editing.invert} onChange={(v) => set('invert', v)} label="Invert icon (white-on-dark)" />
          </div>
          <div className="flex gap-2 pt-2 border-t border-line">
            <Button onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save'}</Button>
            <Button variant="secondary" onClick={() => setEditing(null)}>Cancel</Button>
          </div>
        </div>
      ) : loading ? (
        <p className="text-muted text-sm">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-muted text-sm text-center py-12">No skills yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {items.map((s) => (
            <div key={s._id} className="card p-3.5 rounded-xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-page border border-line flex items-center justify-center flex-shrink-0">
                {s.iconUrl ? (
                  <img src={s.iconUrl} alt={s.name} className={`w-5 h-5 object-contain${s.invert ? ' brightness-0 invert' : ''}`} />
                ) : (
                  <span className="text-[10px] font-bold" style={{ color: s.accent || '#8B5CF6' }}>{s.abbr || '?'}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{s.name}</p>
                <p className="text-[10px] text-muted uppercase tracking-wider">{s.category}</p>
              </div>
              <div className="flex gap-1.5">
                <button onClick={() => setEditing(s)} className="px-2.5 py-1 text-xs rounded-lg border border-line hover:border-brand/40 hover:text-brand transition-colors">Edit</button>
                <button onClick={() => remove(s._id)} className="px-2.5 py-1 text-xs rounded-lg border border-line text-muted hover:text-red-400 hover:border-red-400/50 transition-colors">×</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
