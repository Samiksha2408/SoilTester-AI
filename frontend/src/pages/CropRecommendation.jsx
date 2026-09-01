import { useState } from "react"
import Badge from "../components/ui/Badge"
import Button from "../components/ui/Button"
import Card from "../components/ui/Card"
import Disclaimer from "../components/ui/Disclaimer"
import Input, { Select } from "../components/ui/Input"
import LoadingState from "../components/ui/LoadingState"
import { cropRecommendationResult, cropSteps } from "../data/mockData"
import { runSteps } from "../utils/delay"

const initial = {
  soilType: "Loam",
  fieldSize: "4.5",
  season: "Rabi",
  location: "Nashik, Maharashtra",
  targetYield: "4.0",
}

export default function CropRecommendation() {
  const [form, setForm] = useState(initial)
  const [phase, setPhase] = useState("idle")
  const [step, setStep] = useState(0)
  const result = cropRecommendationResult

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function recommend(event) {
    event.preventDefault()
    setPhase("loading")
    await runSteps(cropSteps.length, setStep)
    setPhase("done")
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-stone-900">Crop Recommendation</h2>
        <p className="mt-1 text-stone-500">Match soil, season and yield goals to a demo crop suggestion.</p>
      </div>

      <form onSubmit={recommend} className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <Card>
          <div className="space-y-3">
            <Select label="Soil Type" value={form.soilType} onChange={(e) => update("soilType", e.target.value)}>
              <option>Loam</option>
              <option>Clay</option>
              <option>Sandy</option>
              <option>Silt</option>
            </Select>
            <Input label="Field Size (acres)" type="number" step="0.1" value={form.fieldSize} onChange={(e) => update("fieldSize", e.target.value)} />
            <Select label="Season" value={form.season} onChange={(e) => update("season", e.target.value)}>
              <option>Kharif</option>
              <option>Rabi</option>
              <option>Zaid</option>
            </Select>
            <Input label="Location" value={form.location} onChange={(e) => update("location", e.target.value)} />
            <Input label="Target Yield (tons/acre)" type="number" step="0.1" value={form.targetYield} onChange={(e) => update("targetYield", e.target.value)} />
          </div>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <Button type="submit">Recommend Crop</Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setForm(initial)
                setPhase("idle")
              }}
            >
              Reset
            </Button>
          </div>
        </Card>

        <div>
          {phase === "idle" ? (
            <Card className="flex h-full min-h-64 items-center justify-center text-center">
              <p className="max-w-sm text-sm text-stone-500">
                Submit the form to run a demo recommendation. Later this will call the crop API.
              </p>
            </Card>
          ) : null}
          {phase === "loading" ? <LoadingState steps={cropSteps} activeIndex={step} title="Matching crops" /> : null}
          {phase === "done" ? (
            <Card>
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-stone-900">AI Recommendation</h3>
                <Badge>Demo result</Badge>
              </div>
              <p className="mt-4 text-3xl font-bold text-forest-800">{result.crop}</p>
              <p className="text-sm text-stone-500">{result.variety}</p>
              <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-stone-500">Suitability</dt>
                  <dd className="font-semibold">{result.suitability}%</dd>
                </div>
                <div>
                  <dt className="text-stone-500">Expected yield</dt>
                  <dd className="font-semibold">{result.expectedYield}</dd>
                </div>
                <div>
                  <dt className="text-stone-500">Estimated profit</dt>
                  <dd className="font-semibold">{result.estimatedProfit}</dd>
                </div>
                <div>
                  <dt className="text-stone-500">Recommended fertilizer</dt>
                  <dd className="font-semibold">{result.fertilizer}</dd>
                </div>
              </dl>
              <p className="mt-5 text-sm leading-relaxed text-stone-600">{result.summary}</p>
              <div className="mt-5 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-forest-900">
                Recommendation complete for this demo. Confirm variety choice with local extension guidance.
              </div>
              <Disclaimer />
            </Card>
          ) : null}
        </div>
      </form>
    </div>
  )
}
