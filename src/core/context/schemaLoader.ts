import schemaData from "@/data/schema.json";
import { Schema } from "../types";

export function loadSchema(): Schema {
  return schemaData as Schema;
}