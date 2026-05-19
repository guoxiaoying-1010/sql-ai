import { buildContext } from "../context/contextBuilder";
import { runSQLAgent } from "../llm/sqlAgent";
import { validateSQL } from "../validator/sqlValidator";

export async function queryOrchestrator(userInput: string): Promise<string> {
  const context = await buildContext(userInput);

  const sql = await runSQLAgent(userInput, context);

  const valid = validateSQL(sql, context.schema);

  if (!valid) {
    return "无法生成SQL";
  }

  return sql;
}