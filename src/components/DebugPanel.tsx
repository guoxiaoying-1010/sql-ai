"use client";

import { useState, useEffect } from "react";
import { buildContext } from "@/core/context/contextBuilder";

export function DebugPanel() {
  const [show, setShow] = useState(false);
  const [context, setContext] = useState<any>(null);

  useEffect(() => {
    if (show && !context) {
      buildContext("").then(setContext);
    }
  }, [show]);

  if (!show) {
    return (
      <button
        onClick={() => setShow(true)}
        className="fixed bottom-4 right-4 px-3 py-2 bg-gray-200 rounded text-sm"
      >
        调试
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-3/4 h-3/4 overflow-auto">
        <div className="flex justify-between mb-4">
          <h2 className="font-bold">调试面板</h2>
          <button onClick={() => setShow(false)} className="text-red-500">
            关闭
          </button>
        </div>

        {context && (
          <pre className="text-xs bg-gray-100 p-4 overflow-auto">
            {JSON.stringify(context, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}