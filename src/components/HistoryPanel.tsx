"use client";

import { useState, useEffect } from "react";
import { getHistory, HistoryItem } from "@/core/history/store";

export function HistoryPanel() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHistory(getHistory());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border p-4 rounded-lg">
      <h2 className="font-bold mb-3">查询历史</h2>
      {history.length === 0 ? (
        <div className="text-gray-400 text-sm">暂无历史</div>
      ) : (
        history.map((item) => (
          <div
            key={item.id}
            className="border-b py-2 text-sm cursor-pointer hover:bg-gray-50"
          >
            <div className="truncate">{item.prompt}</div>
            <div className="text-gray-400 text-xs">
              {item.time.toLocaleTimeString()}
            </div>
          </div>
        ))
      )}
    </div>
  );
}