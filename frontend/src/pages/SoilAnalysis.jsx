import { AlertTriangle, FileUp, X } from "lucide-react"
import { useState } from "react"
import Badge from "../components/ui/Badge"
import Button from "../components/ui/Button"
import Card from "../components/ui/Card"
import Disclaimer from "../components/ui/Disclaimer"
import Input from "../components/ui/Input"
import LoadingState from "../components/ui/LoadingState"
import { analysisSteps, soilAnalysisResult, soilDefaults } from "../data/mockData"
import { runSteps } from "../utils/delay"

export default function SoilAnalysis() {
  const [fileName, setFileName] = useState("")
  const [form, setForm] = useState(soilDefaults)
  const [phase, setPhase] = useState("idle")
  const [step, setStep] = useState(0)

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function analyze(event) {
    event.preventDefault()
    setPhase("loading")
    setStep(0)
    await runSteps(analysisSteps.length, setStep)
    setPhase("done")
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-stone-900">Soil Analysis</h2>
        <p className="mt-1 max-w-2xl text-stone-500">
          Upload your soil report or enter soil information to analyze your soil health.
        </p>
      </div>

      <form onSubmit={analyze} className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Card>
          <h3 className="font-semibold text-stone-900">Upload report</h3>
          <p className="mt-1 text-sm text-stone-500">PDF, CSV or image. Files stay in the browser for this demo.</p>
          <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-mist/60 px-4 py-10 text-center hover:border-forest-600">
            <FileUp className="mb-2 h-6 w-6 text-forest-700" />
            <span className="text-sm font-medium text-stone-800">Drop a file or browse</span>
            <span className="mt-1 text-xs text-stone-500">Accepted: .pdf, .csv, .png, .jpg</span>
            <input
              type="file"
              accept=".pdf,.csv,image/*"
              className="hidden"
              onChange={(event) => setFileName(event.target.files?.[0]?.name || "")}
            />
          </label>
          {fileName ? (
            <div className="mt-3 flex items-center justify-between rounded-xl bg-mist px-3 py-2 text-sm">
              <span className="truncate pr-3">{fileName}</span>
              <button type="button" onClick={() => setFileName("")} aria-label="Remove file">
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : null}
        </Card>

        <Card>
          <h3 className="font-semibold text-stone-900">Manual inputs</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Input label="Nitrogen" type="number" value={form.nitrogen} onChange={(e) => update("nitrogen", e.target.value)} />
            <Input label="Phosphorus" type="number" value={form.phosphorus} onChange={(e) => update("phosphorus", e.target.value)} />
            <Input label="Potassium" type="number" value={form.potassium} onChange={(e) => update("potassium", e.target.value)} />
            <Input label="pH" type="number" step="0.1" value={form.ph} onChange={(e) => update("ph", e.target.value)} />
            <Input label="Moisture" type="number" value={form.moisture} onChange={(e) => update("moisture", e.target.value)} />
            <Input label="Organic Carbon" type="number" step="0.01" value={form.organicCarbon} onChange={(e) => update("organicCarbon", e.target.value)} />
          </div>
          <Button type="submit" className="mt-5 w-full sm:w-auto">
            Analyze Soil
          </Button>
        </Card>
      </form>

      {phase === "loading" ? <LoadingState steps={analysisSteps} activeIndex={step} title="Analyzing soil" /> : null}

      {phase === "done" ? (
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <p className="text-sm text-stone-500">Soil health score</p>
            <p className="mt-2 text-5xl font-extrabold text-forest-800">{soilAnalysisResult.healthScore}</p>
            <p className="mt-1 text-sm font-medium text-stone-700">{soilAnalysisResult.condition}</p>
            <p className="mt-4 text-sm leading-relaxed text-stone-500">{soilAnalysisResult.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {soilAnalysisResult.citations.map((c) => (
                <Badge key={c} tone="slate">
                  {c}
                </Badge>
              ))}
            </div>
          </Card>
          <Card className="lg:col-span-2">
            <h3 className="font-semibold">Nutrient levels</h3>
            <div className="mt-4 space-y-3">
              {soilAnalysisResult.nutrients.map((n) => (
                <div key={n.key}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium text-stone-700">
                      {n.name} · {n.value}
                      {n.unit ? ` ${n.unit}` : ""}
                    </span>
                    <span className="text-xs text-stone-500">{n.status}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-stone-100">
                    <div className="h-full rounded-full bg-forest-600" style={{ width: `${n.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="font-semibold">Recommendations</h3>
            <ul className="mt-3 space-y-2 text-sm text-stone-600">
              {soilAnalysisResult.recommendations.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </Card>
          <Card className="lg:col-span-2">
            <h3 className="flex items-center gap-2 font-semibold">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              Warnings
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-stone-600">
              {soilAnalysisResult.warnings.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
            <Disclaimer />
          </Card>
        </div>
      ) : null}
    </div>
  )
}
