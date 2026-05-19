"use client";

import { useState } from "react";
import { SchemaPanel } from "@/components/SchemaPanel";
import { HistoryPanel } from "@/components/HistoryPanel";
import { DebugPanel } from "@/components/DebugPanel";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!input.trim()) return;
    setOutput("");
    setLoading(true);

    try {
      const res = await fetch("/api/sql", {
        method: "POST",
        body: JSON.stringify({ prompt: input })
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader!.read();
        if (done) break;
        setOutput((prev) => prev + decoder.decode(value));
      }
    } catch (err) {
      setOutput("生成失败");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">SQL AI Assistant</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <textarea
            className="w-full h-32 border rounded-lg p-4"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入SQL需求..."
          />

          <button
            onClick={run}
            disabled={loading}
            className="mt-4 px-6 py-3 bg-black text-white rounded-lg disabled:opacity-50"
          >
            {loading ? "生成中..." : "生成 SQL"}
          </button>

          {output && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <pre className="whitespace-pre-wrap">{output}</pre>
            </div>
          )}
        </div>

        <div>
          <SchemaPanel />
          <HistoryPanel />
        </div>
      </div>

      <DebugPanel />
    </main>
  );
}