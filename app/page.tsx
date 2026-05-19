"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generateSQL = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/sql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResult(data.result);
    } catch (err) {
      setResult("生成失败");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-6">SQL AI Assistant</h1>

      <textarea
        className="w-full h-40 border rounded-lg p-4"
        placeholder="请输入你的SQL需求..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={generateSQL}
        disabled={loading}
        className="mt-4 px-6 py-3 bg-black text-white rounded-lg disabled:opacity-50"
      >
        {loading ? "生成中..." : "生成 SQL"}
      </button>

      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </main>
  );
}