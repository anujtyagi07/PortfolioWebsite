import { useEffect, useState } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { Field, Input, Textarea, Toggle } from '../../components/admin/Field'
import { settingsApi } from '../../lib/api'
import Button from '../../components/ui/Button'

export default function AdminSettings() {
  const [data, setData] = useState(null)
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState(null)

  useEffect(() => {
    settingsApi.get().then(({ data }) => setData(data))
  }, [])

  const save = async () => {
    setSaving(true)
    try {
      const { data: updated } = await settingsApi.update(data)
      setData(updated)
      setSavedAt(new Date().toLocaleTimeString())
    } catch (err) {
      alert(err.response?.data?.message || err.message)
    } finally {
      setSaving(false)
    }
  }

  const set = (k, v) => setData((p) => ({ ...p, [k]: v }))

  if (!data) return <AdminLayout title="Settings"><p className="text-muted text-sm">Loading…</p></AdminLayout>

  return (
    <AdminLayout
      title="Settings & Social"
      subtitle="Site info, contact details, and social links."
      actions={
        <div className="flex items-center gap-3">
          {savedAt && <span className="text-xs text-emerald-400">Saved {savedAt}</span>}
          <Button onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save Changes'}</Button>
        </div>
      }
    >
      <div className="grid lg:grid-cols-2 gap-6 max-w-5xl">
        <section className="card p-6 rounded-xl flex flex-col gap-4">
          <h3 className="font-semibold text-lg">Site info</h3>
          <Field label="Name"><Input value={data.name} onChange={(v) => set('name', v)} /></Field>
          <Field label="Role"><Input value={data.role} onChange={(v) => set('role', v)} /></Field>
          <Field label="Tagline"><Textarea value={data.tagline} onChange={(v) => set('tagline', v)} rows={2} /></Field>
          <Field label="Location"><Input value={data.location} onChange={(v) => set('location', v)} /></Field>
          <Toggle value={data.available} onChange={(v) => set('available', v)} label="Available for work (shows pill in footer)" />
        </section>

        <section className="card p-6 rounded-xl flex flex-col gap-4">
          <h3 className="font-semibold text-lg">Contact</h3>
          <Field label="Email"><Input type="email" value={data.email} onChange={(v) => set('email', v)} /></Field>
          <Field label="Phone" hint="Will create a tel: link in the footer"><Input value={data.phone} onChange={(v) => set('phone', v)} placeholder="+91 00000 00000" /></Field>
        </section>

        <section className="card p-6 rounded-xl flex flex-col gap-4 lg:col-span-2">
          <h3 className="font-semibold text-lg">Social links</h3>
          <p className="text-xs text-muted -mt-2">Leave blank to hide an icon. Enter the full URL.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="GitHub"><Input value={data.github} onChange={(v) => set('github', v)} placeholder="https://github.com/..." /></Field>
            <Field label="LinkedIn"><Input value={data.linkedin} onChange={(v) => set('linkedin', v)} placeholder="https://linkedin.com/in/..." /></Field>
            <Field label="Twitter / X"><Input value={data.twitter} onChange={(v) => set('twitter', v)} placeholder="https://twitter.com/..." /></Field>
            <Field label="Instagram"><Input value={data.instagram} onChange={(v) => set('instagram', v)} placeholder="https://instagram.com/..." /></Field>
          </div>
        </section>
      </div>
    </AdminLayout>
  )
}
