import { JSONSchema7 } from "json-schema";

export const postHeathHeadersJsonSchema: JSONSchema7 = {
  properties: {
    "property-in-header": {
      const: "property-in-header",
      type: "string",
    },
  },
  type: "object",
};
