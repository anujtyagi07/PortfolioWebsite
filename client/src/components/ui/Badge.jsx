export default function Badge({ children, variant = 'default', className = '' }) {
  const styles = {
    default: 'bg-brand/10 text-brand border border-brand/20',
    muted: 'bg-card border border-line text-muted',
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
