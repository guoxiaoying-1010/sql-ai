export interface Column {
  name: string;
  type?: string;
  desc?: string;
}

export interface Table {
  name: string;
  desc?: string;
  columns: Column[];
}

export interface Relation {
  left: string;
  right: string;
  type?: string;
}

export interface Schema {
  tables: Table[];
  relations: Relation[];
}

export interface Metric {
  name: string;
  definition: string;
}

export interface Context {
  schema: Schema;
  metrics: Metric[];
  relations: Relation[];
}