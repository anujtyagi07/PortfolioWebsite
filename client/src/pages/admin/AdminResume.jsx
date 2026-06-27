import { useEffect, useRef, useState } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { resumeApi, settingsApi } from '../../lib/api'
import Button from '../../components/ui/Button'

export default function AdminResume() {
  const [resumeUrl, setResumeUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef(null)

  useEffect(() => {
    settingsApi.get().then(({ data }) => setResumeUrl(data.resumeUrl || ''))
  }, [])

  const onPick = (e) => {
    const file = e.target.files?.[0]
    if (file) upload(file)
  }

  const upload = async (file) => {
    if (file.type !== 'application/pdf') {
      setError('Only PDF files are supported.')
      return
    }
    setError('')
    setUploading(true)
    try {
      const { data } = await resumeApi.upload(file)
      setResumeUrl(data.resumeUrl)
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const remove = async () => {
    if (!confirm('Remove the current resume?')) return
    await resumeApi.remove()
    setResumeUrl('')
  }

  return (
    <AdminLayout title="Resume" subtitle="Upload or replace your CV PDF.">
      <div className="card p-6 rounded-xl max-w-2xl flex flex-col gap-5">
        {resumeUrl ? (
          <div className="flex items-center justify-between gap-4 p-4 rounded-lg border border-line bg-page/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand/10 border border-brand/30 flex items-center justify-center text-brand">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-sm">resume.pdf</p>
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-brand hover:underline">View in new tab ↗</a>
              </div>
            </div>
            <button
              onClick={remove}
              className="px-3 py-1.5 text-xs rounded-lg border border-line text-muted hover:text-red-400 hover:border-red-400/50 transition-colors"
            >
              Remove
            </button>
          </div>
        ) : (
          <p className="text-sm text-muted">No resume uploaded yet.</p>
        )}

        <div className="flex flex-col gap-3 pt-3 border-t border-line">
          <p className="text-sm text-copy font-semibold">{resumeUrl ? 'Replace resume' : 'Upload resume'}</p>
          <input
            ref={fileRef}
            type="file"
            accept="application/pdf"
            onChange={onPick}
            className="text-sm text-muted file:mr-3 file:px-3 file:py-1.5 file:rounded-lg file:border file:border-line file:bg-card file:text-copy file:cursor-pointer file:hover:border-brand/40 file:transition-colors"
          />
          {uploading && <p className="text-xs text-brand">Uploading…</p>}
          {error && <p className="text-xs text-red-400">{error}</p>}
          <p className="text-[11px] text-muted/70">PDF only · max 10 MB · uploads as <code className="text-brand">/api/uploads/resume.pdf</code></p>
        </div>
      </div>
    </AdminLayout>
  )
}
