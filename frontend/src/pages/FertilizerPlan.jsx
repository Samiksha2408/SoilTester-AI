import { useState } from "react"
import Badge from "../components/ui/Badge"
import Button from "../components/ui/Button"
import Card from "../components/ui/Card"
import Disclaimer from "../components/ui/Disclaimer"
import Input, { Select } from "../components/ui/Input"
import { fertilizerPlanResult } from "../data/mockData"

export default function FertilizerPlan() {
  const [show, setShow] = useState(false)
  const [crop, setCrop] = useState("Wheat")
  const [soil, setSoil] = useState("Slightly acidic, P low")
  const [size, setSize] = useState("1.8")
  const plan = fertilizerPlanResult

  function submit(event) {
    event.preventDefault()
    setShow(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-stone-900">Fertilizer Plan</h2>
        <p className="mt-1 text-stone-500">
          Stage-wise split application with kg/ha timing and a simple cost sheet. Demo quantities only.
        </p>
      </div>

      <form onSubmit={submit} className="grid gap-4 md:grid-cols-4">
        <Select label="Crop" value={crop} onChange={(e) => setCrop(e.target.value)}>
          <option>Wheat</option>
          <option>Rice</option>
          <option>Maize</option>
        </Select>
        <Select label="Soil condition" value={soil} onChange={(e) => setSoil(e.target.value)}>
          <option>Slightly acidic, P low</option>
          <option>Neutral, balanced</option>
          <option>Alkaline, K low</option>
        </Select>
        <Input label="Field size (ha)" type="number" step="0.1" value={size} onChange={(e) => setSize(e.target.value)} />
        <div className="flex items-end">
          <Button type="submit" className="w-full">
            Generate plan
          </Button>
        </div>
      </form>

      {show ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <p className="text-sm text-stone-500">Recommended fertilizer</p>
              <p className="mt-1 font-bold text-stone-900">{plan.recommendedFertilizer}</p>
            </Card>
            <Card>
              <p className="text-sm text-stone-500">Quantity</p>
              <p className="mt-1 font-bold text-stone-900">{plan.totalQuantityKg} kg total</p>
            </Card>
            <Card>
              <p className="text-sm text-stone-500">Estimated cost</p>
              <p className="mt-1 font-bold text-stone-900">{plan.estimatedCost}</p>
            </Card>
            <Card>
              <p className="text-sm text-stone-500">Low-cost alternative</p>
              <p className="mt-1 text-sm font-semibold text-stone-900">{plan.compostAlternative}</p>
            </Card>
          </div>

          <Card padding={false}>
            <div className="px-5 py-4 sm:px-6">
              <h3 className="font-semibold">Application timing</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-[720px] w-full text-left text-sm">
                <thead className="bg-mist text-xs uppercase tracking-wide text-stone-500">
                  <tr>
                    <th className="px-6 py-3">Stage</th>
                    <th className="px-4 py-3">Timing</th>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Quantity</th>
                    <th className="px-6 py-3">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {plan.applications.map((row) => (
                    <tr key={`${row.stage}-${row.product}`} className="border-t border-stone-100">
                      <td className="px-6 py-3 font-medium">{row.stage}</td>
                      <td className="px-4 py-3">{row.timing}</td>
                      <td className="px-4 py-3">{row.product}</td>
                      <td className="px-4 py-3">{row.quantity}</td>
                      <td className="px-6 py-3 text-stone-500">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <h3 className="font-semibold">Cost sheet</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {plan.costSheet.map((row) => (
                  <li key={row.item} className="flex justify-between border-b border-stone-100 py-2">
                    <span>
                      {row.item} · {row.qty}
                    </span>
                    <span className="font-semibold">{row.cost}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-stone-400">Prices are placeholder demo values.</p>
            </Card>
            <Card>
              <h3 className="font-semibold">Important warnings</h3>
              <ul className="mt-3 space-y-2 text-sm text-stone-600">
                {plan.warnings.map((w) => (
                  <li key={w}>• {w}</li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {plan.citations.map((c) => (
                  <Badge key={c} tone="slate">
                    {c}
                  </Badge>
                ))}
              </div>
              <Disclaimer />
            </Card>
          </div>
        </>
      ) : null}
    </div>
  )
}
