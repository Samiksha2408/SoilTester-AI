export default function Card({ children, className = "", hover = false, padding = true }) {
  return (
    <div
      className={`rounded-2xl border border-stone-200/80 bg-white shadow-[var(--shadow-card)] ${
        hover ? "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]" : ""
      } ${padding ? "p-5 sm:p-6" : ""} ${className}`}
    >
      {children}
    </div>
  )
}
