import { buildContext } from "../context/contextBuilder";
import { runSQLAgent } from "../llm/sqlAgent";
import { validateSQL } from "../validator/sqlValidator";
import { addHistory } from "../history/store";

export async function queryOrchestrator(userInput: string): Promise<string> {
  const context = await buildContext(userInput);

  const sql = await runSQLAgent(userInput, context);

  const valid = validateSQL(sql, context.schema);

  const result = valid ? sql : "无法生成SQL";
  addHistory(userInput, result);

  return result;
}