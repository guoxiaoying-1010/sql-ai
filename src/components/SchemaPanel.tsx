import { loadSchema } from "@/core/context/schemaLoader";

export function SchemaPanel() {
  const schema = loadSchema();

  return (
    <div className="border p-4 rounded-lg mb-4">
      <h2 className="font-bold mb-3">数据表结构</h2>
      {schema.tables.map((t) => (
        <div key={t.name} className="mb-3">
          <div className="font-semibold text-sm">{t.name}</div>
          <div className="text-xs text-gray-500 ml-2">
            {t.columns.map((c) => (
              <div key={c.name} className="flex justify-between">
                <span>{c.name}</span>
                <span className="text-gray-400">{c.type}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}