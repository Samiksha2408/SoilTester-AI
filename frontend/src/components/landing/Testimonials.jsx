import { sampleTestimonials } from "../../data/mockData"
import Card from "../ui/Card"

export default function Testimonials() {
  return (
    <section className="px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <p className="text-sm font-semibold text-forest-700">Sample voices</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-forest-950">
            How the product should feel
          </h2>
          <p className="mt-3 text-sm text-stone-500">
            These are demonstration quotes for the project UI. They are not real customers or verified reviews.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {sampleTestimonials.map((item) => (
            <Card key={item.name}>
              <p className="text-sm leading-relaxed text-stone-600">“{item.quote}”</p>
              <div className="mt-5 border-t border-stone-100 pt-4">
                <p className="text-sm font-semibold text-stone-900">{item.name}</p>
                <p className="text-xs text-stone-500">{item.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
