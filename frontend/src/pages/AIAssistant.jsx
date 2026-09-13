import { useState } from "react";
import { Bot, Send, Loader2 } from "lucide-react";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { sendAIMessage } from "../services/api";

export default function AIAssistant() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [topic, setTopic] = useState("General Agriculture");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const userMessage = message.trim();

    if (!userMessage || loading) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await sendAIMessage({
        message: userMessage,
        context: topic,
      });

      setMessages((previous) => [
        ...previous,
        {
          user: userMessage,
          bot: result.response,
        },
      ]);

      setMessage("");
    } catch (err) {
      console.error("AI Assistant error:", err);
      setError(err.message || "Failed to get an AI response.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-stone-900">AI Assistant</h2>

        <p className="mt-1 text-stone-500">
          Ask questions related to farming, soil, crops, and fertilizers.
        </p>
      </div>

      <Card>
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-xl bg-emerald-100 p-3">
            <Bot className="h-6 w-6 text-forest-700" />
          </div>

          <div>
            <h3 className="font-semibold text-stone-900">
              SmartAgriAI Assistant
            </h3>

            <p className="text-sm text-stone-500">
              Ask your agriculture-related questions and get AI-powered
              guidance.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mb-5 min-h-40 space-y-4 rounded-xl bg-stone-50 p-4">
          {messages.length === 0 ? (
            <div className="flex min-h-32 items-center justify-center text-center text-sm text-stone-500">
              Start a conversation by asking an agriculture-related question.
            </div>
          ) : (
            messages.map((item, index) => (
              <div key={index} className="space-y-3">
                <div className="ml-auto max-w-[85%] rounded-xl bg-forest-800 px-4 py-3 text-sm text-white">
                  {item.user}
                </div>

                <div className="max-w-[85%] rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700">
                  {item.bot}
                </div>
              </div>
            ))
          )}

          {loading && (
            <div className="max-w-[85%] rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-500">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Thinking...</span>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700">
              Topic
            </label>

            <select
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-forest-600"
            >
              <option>General Agriculture</option>
              <option>Soil Health</option>
              <option>Crop Recommendation</option>
              <option>Fertilizer</option>
              <option>Weather</option>
              <option>Pest and Disease</option>
              <option>Irrigation</option>
            </select>
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Ask your farming question..."
              maxLength={2000}
              className="min-w-0 flex-1 rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-forest-600"
            />

            <Button type="submit" disabled={loading || !message.trim()}>
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
