import { JSONSchema7 } from "json-schema";

export const postHeathResponseOkJsonSchema: JSONSchema7 = {
  additionalProperties: false,
  properties: {
    propertyInReply: {
      const: "propertyInReply",
      type: "string",
    },
  },
  type: "object",
};
