export function Field({ label, children, hint }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">{label}</span>
      {children}
      {hint && <span className="block text-[11px] text-muted/70 mt-1">{hint}</span>}
    </label>
  )
}

export function Input({ value = '', onChange, type = 'text', placeholder, ...rest }) {
  return (
    <input
      type={type}
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 rounded-lg border border-line bg-page text-copy text-sm focus:outline-none focus:border-brand transition-colors"
      {...rest}
    />
  )
}

export function Textarea({ value = '', onChange, rows = 3, placeholder, ...rest }) {
  return (
    <textarea
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      className="w-full px-3 py-2 rounded-lg border border-line bg-page text-copy text-sm focus:outline-none focus:border-brand transition-colors resize-y"
      {...rest}
    />
  )
}

export function Select({ value = '', onChange, options = [], ...rest }) {
  return (
    <select
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 rounded-lg border border-line bg-page text-copy text-sm focus:outline-none focus:border-brand transition-colors"
      {...rest}
    >
      {options.map((o) => (
        <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
      ))}
    </select>
  )
}

export function ListInput({ values = [], onChange, placeholder = 'Add item' }) {
  const handle = (i, v) => {
    const next = [...values]
    next[i] = v
    onChange(next)
  }
  const remove = (i) => onChange(values.filter((_, idx) => idx !== i))
  const add = () => onChange([...values, ''])

  return (
    <div className="flex flex-col gap-2">
      {values.map((v, i) => (
        <div key={i} className="flex gap-2">
          <Input value={v} onChange={(val) => handle(i, val)} placeholder={placeholder} />
          <button
            type="button"
            onClick={() => remove(i)}
            className="px-3 py-2 rounded-lg border border-line text-muted hover:text-red-400 hover:border-red-400/50 text-xs transition-colors"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="self-start text-xs text-brand hover:underline"
      >
        + Add item
      </button>
    </div>
  )
}

export function Toggle({ value = false, onChange, label }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className="flex items-center gap-2.5 text-sm text-copy"
    >
      <span
        className={`relative w-9 h-5 rounded-full transition-colors ${value ? 'bg-brand' : 'bg-line'}`}
      >
        <span
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${value ? 'translate-x-[18px]' : 'translate-x-0.5'}`}
        />
      </span>
      {label}
    </button>
  )
}
