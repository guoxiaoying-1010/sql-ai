import OpenAI from "openai";

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
        content:
          "你是资深数据工程师，请将需求转换为 Hive SQL，只返回 SQL。",
      },
      {
        role: "user",
        content: body.prompt,
      },
    ],
  });

  return Response.json({
    result: completion.choices[0].message.content,
  });
}