import OpenAI from "openai";
import { Context } from "../types";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY!,
});

export async function runSQLAgent(userInput: string, context: Context): Promise<string> {
  const completion = await client.chat.completions.create({
    model: "minimax/minimax-m2.5:free",
    messages: [
      {
        role: "system",
        content: `
你是企业级数据分析SQL Agent。

你必须遵循：

=== Schema ===
${JSON.stringify(context.schema.tables, null, 2)}

=== Relations ===
${JSON.stringify(context.relations, null, 2)}

=== Metrics ===
${JSON.stringify(context.metrics, null, 2)}

规则：
1. 只能使用schema中字段
2. 必须遵守join关系
3. 优先使用metrics定义
4. 不允许编造字段
5. 不确定返回：无法生成SQL
6. 只输出SQL，不要解释
        `
      },
      {
        role: "user",
        content: userInput
      }
    ]
  });

  return completion.choices[0].message.content || "无法生成SQL";
}