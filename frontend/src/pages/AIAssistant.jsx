import { Send, Sparkles } from "lucide-react"
import { useRef, useState } from "react"
import Button from "../components/ui/Button"
import { aiResponses, aiSuggestedQuestions } from "../data/mockData"
import { delay } from "../utils/delay"

function replyFor(text) {
  const q = text.toLowerCase()
  if (q.includes("crop") || q.includes("grow")) return aiResponses.crop
  if (q.includes("soil")) return aiResponses.soil
  if (q.includes("fertilizer") || q.includes("fertiliser")) return aiResponses.fertilizer
  if (q.includes("weather") || q.includes("forecast")) return aiResponses.weather
  return aiResponses.default
}

export default function AIAssistant() {
  const [input, setInput] = useState("")
  const [busy, setBusy] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "ai",
      text: "Hello. I am the SmartAgriAI demo assistant. Ask about crops, soil, fertilizer or weather.",
    },
  ])
  const listRef = useRef(null)

  async function send(text) {
    const content = (text || input).trim()
    if (!content || busy) return
    setInput("")
    const userMsg = { id: `u-${Date.now()}`, role: "user", text: content }
    setMessages((prev) => [...prev, userMsg])
    setBusy(true)
    await delay(700)
    setMessages((prev) => [
      ...prev,
      { id: `a-${Date.now()}`, role: "ai", text: replyFor(content) },
    ])
    setBusy(false)
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" })
    })
  }

  return (
    <div className="flex min-h-[calc(100svh-8.5rem)] flex-col">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-stone-900">AI Assistant</h2>
        <p className="mt-1 text-sm text-stone-500">Mock replies for now. `sendAIMessage()` is ready for the backend.</p>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {aiSuggestedQuestions.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => send(q)}
            className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-left text-xs font-medium text-stone-600 hover:border-forest-600"
          >
            {q}
          </button>
        ))}
      </div>

      <div
        ref={listRef}
        className="scrollbar-thin flex-1 space-y-3 overflow-y-auto rounded-2xl border border-stone-200 bg-white p-4"
      >
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[min(100%,36rem)] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.role === "user" ? "bg-forest-800 text-white" : "bg-mist text-stone-800"
              }`}
            >
              {m.role === "ai" ? (
                <p className="mb-1 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-forest-700">
                  <Sparkles className="h-3 w-3" />
                  Assistant
                </p>
              ) : null}
              {m.text}
            </div>
          </div>
        ))}
        {busy ? <p className="text-xs text-stone-400">Thinking…</p> : null}
      </div>

      <form
        className="mt-4 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          send()
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a farming question"
          className="min-w-0 flex-1 rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-forest-600"
        />
        <Button type="submit" disabled={busy}>
          <Send className="h-4 w-4" />
          Send
        </Button>
      </form>
    </div>
  )
}
