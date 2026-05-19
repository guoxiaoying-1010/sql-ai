import { queryOrchestrator } from "@/core/orchestrator/queryOrchestrator";

export async function POST(req: Request) {
  const body = await req.json();

  const result = await queryOrchestrator(body.prompt);

  return Response.json({
    result
  });
}