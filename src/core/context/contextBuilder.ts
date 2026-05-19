import { loadSchema } from "./schemaLoader";
import { loadMetrics } from "./semanticLayer";
import { Context } from "../types";

export async function buildContext(userInput: string): Promise<Context> {
  const schema = loadSchema();
  const metrics = loadMetrics();

  return {
    schema,
    metrics,
    relations: schema.relations
  };
}