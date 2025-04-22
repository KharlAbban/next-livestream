import { type SchemaTypeDefinition } from "sanity";
import { user_schema } from "./user_schema";
import { follow_schema } from "./follow_schema";
import { block_schema } from "./block_schema";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [user_schema, follow_schema, block_schema],
};
