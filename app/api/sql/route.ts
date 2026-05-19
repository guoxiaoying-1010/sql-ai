import OpenAI from "openai";
import { schema } from "@/lib/schema";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  const body = await req.json();

  const completion = await client.chat.completions.create({
    model: "minimax/minimax-m2.5:free",
    messages: [
      {
        role: "system",
        content: `
你是企业级数据仓库SQL生成助手（SQL Agent）。

你必须严格遵守以下数据仓库信息：

=== 数据表结构 ===
${JSON.stringify(schema.tables, null, 2)}

=== 表关系 ===
${JSON.stringify(schema.relations, null, 2)}

=== 业务指标定义 ===
${JSON.stringify(schema.metrics, null, 2)}

=== 强制规则 ===
1. 只能使用提供的表
2. 必须遵守 join 关系
3. 不允许编造字段
4. 不确定时必须返回：无法生成SQL
5. 只输出 SQL，不要解释
        `
      },
      {
        role: "user",
        content: body.prompt
      }
    ],
  });

  return Response.json({
    result: completion.choices[0].message.content
  });
}