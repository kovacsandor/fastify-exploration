import { JSONSchema7 } from "json-schema";

export const postHeathBodyJsonSchema: JSONSchema7 = {
  additionalProperties: false,
  properties: {
    propertyInBody: {
      const: "propertyInBody",
      type: "string",
    },
  },
  type: "object",
};
