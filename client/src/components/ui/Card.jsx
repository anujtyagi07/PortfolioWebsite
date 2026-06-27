export default function Card({ children, className = '', hover = false, ...props }) {
  return (
    <div
      className={`
        card p-6
        ${hover ? 'hover:border-brand/50 hover:shadow-lg hover:shadow-brand/5 transition-all duration-300 cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}
