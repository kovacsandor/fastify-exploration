import { JSONSchema7 } from "json-schema";

export const postHealthHeadersJsonSchema: JSONSchema7 = {
  properties: {
    "property-in-header": {
      const: "property-in-header",
      type: "string",
    },
  },
  type: "object",
};
