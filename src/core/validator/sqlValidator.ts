import { Schema } from "../types";

export function validateSQL(sql: string, schema: Schema): boolean {
  if (!sql || sql.includes("无法生成SQL")) {
    return false;
  }

  const tables = schema.tables.map((t) => t.name);
  const hasValidTable = tables.some((t) => sql.toLowerCase().includes(t.toLowerCase()));

  return hasValidTable;
}