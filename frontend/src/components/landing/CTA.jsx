import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import Button from "../ui/Button"

export default function CTA() {
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-forest-900 px-6 py-12 text-center text-white sm:px-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Make Farming Smarter?</h2>
        <p className="mx-auto mt-3 max-w-xl text-emerald-100/80">
          Open the demo workspace and walk through soil analysis, crop advice, fertilizer splits and reports.
        </p>
        <Link to="/dashboard" className="mt-8 inline-flex">
          <Button size="lg" className="bg-white text-forest-900 hover:bg-emerald-50">
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
