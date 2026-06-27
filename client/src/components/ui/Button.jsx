const variants = {
  primary: 'bg-brand hover:bg-brand-hover text-white shadow-sm hover:shadow-md hover:shadow-brand/20',
  secondary: 'bg-card border border-line hover:border-brand text-copy hover:text-brand',
  ghost: 'text-muted hover:text-brand hover:bg-brand/5',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  as: Tag = 'button',
  className = '',
  ...props
}) {
  return (
    <Tag
      className={`
        inline-flex items-center gap-2 font-medium rounded-lg
        transition-all duration-200 cursor-pointer
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </Tag>
  )
}
