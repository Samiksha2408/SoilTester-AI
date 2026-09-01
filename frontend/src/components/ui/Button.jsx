export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...props
}) {
  const sizes = {
    sm: "px-3.5 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-[15px]",
  }

  const variants = {
    primary:
      "bg-forest-800 text-white hover:bg-forest-900 shadow-sm hover:shadow-md",
    secondary:
      "bg-white text-forest-900 border border-stone-200 hover:border-forest-700/30 hover:bg-mist",
    ghost: "bg-transparent text-stone-700 hover:bg-stone-100",
    danger: "bg-red-700 text-white hover:bg-red-800",
  }

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
