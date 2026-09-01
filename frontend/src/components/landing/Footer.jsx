import { Globe, Mail, Sprout } from "lucide-react"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-stone-200 bg-white px-4 py-12 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2 font-bold text-forest-950">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest-800 text-white">
              <Sprout className="h-4 w-4" />
            </span>
            SmartAgriAI
          </div>
          <p className="text-sm leading-relaxed text-stone-500">
            An AI-assisted agriculture workspace for soil, crops, nutrients and farm reports. Demo data only until
            the backend is connected.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-stone-900">Quick Links</p>
          <ul className="mt-3 space-y-2 text-sm text-stone-500">
            <li>
              <a href="#home" className="hover:text-forest-800">
                Home
              </a>
            </li>
            <li>
              <a href="#how-it-works" className="hover:text-forest-800">
                How it works
              </a>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-forest-800">
                Open app
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-stone-900">Features</p>
          <ul className="mt-3 space-y-2 text-sm text-stone-500">
            <li>Soil analysis</li>
            <li>Crop recommendation</li>
            <li>Fertilizer planning</li>
            <li>AI assistant</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-stone-900">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-stone-500">
            <li>hello@smartagriai.demo</li>
            <li>Campus project desk</li>
            <li>India</li>
          </ul>
          <div className="mt-4 flex gap-3 text-stone-400">
            <a aria-label="Email" href="mailto:hello@smartagriai.demo" className="hover:text-forest-800">
              <Mail className="h-4 w-4" />
            </a>
            <a aria-label="Project site placeholder" href="#contact" className="hover:text-forest-800">
              <Globe className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl border-t border-stone-100 pt-6 text-xs text-stone-400">
        © {new Date().getFullYear()} SmartAgriAI. Academic demonstration. Not a certified agronomy service.
      </p>
    </footer>
  )
}
