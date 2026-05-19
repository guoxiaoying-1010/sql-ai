import { queryOrchestrator } from "@/core/orchestrator/queryOrchestrator";

export async function POST(req: Request) {
  const body = await req.json();

  const sql = await queryOrchestrator(body.prompt);

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      let i = 0;
      const interval = setInterval(() => {
        if (i >= sql.length) {
          clearInterval(interval);
          controller.close();
          return;
        }
        controller.enqueue(encoder.encode(sql[i]));
        i++;
      }, 10);
    }
  });

  return new Response(stream);
}