export default function Input({ label, className = "", ...props }) {
  return (
    <label className="block">
      {label ? <span className="mb-1.5 block text-sm font-medium text-stone-700">{label}</span> : null}
      <input
        className={`w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-forest-600 focus:ring-4 focus:ring-emerald-700/10 ${className}`}
        {...props}
      />
    </label>
  )
}

export function Select({ label, children, className = "", ...props }) {
  return (
    <label className="block">
      {label ? <span className="mb-1.5 block text-sm font-medium text-stone-700">{label}</span> : null}
      <select
        className={`w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-stone-900 outline-none transition focus:border-forest-600 focus:ring-4 focus:ring-emerald-700/10 ${className}`}
        {...props}
      >
        {children}
      </select>
    </label>
  )
}

export function Textarea({ label, className = "", ...props }) {
  return (
    <label className="block">
      {label ? <span className="mb-1.5 block text-sm font-medium text-stone-700">{label}</span> : null}
      <textarea
        className={`w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-forest-600 focus:ring-4 focus:ring-emerald-700/10 ${className}`}
        {...props}
      />
    </label>
  )
}
