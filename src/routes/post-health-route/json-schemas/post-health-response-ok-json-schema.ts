import { JSONSchema7 } from "json-schema";

export const postHealthResponseOkJsonSchema: JSONSchema7 = {
  additionalProperties: false,
  properties: {
    propertyInReply: {
      const: "propertyInReply",
      type: "string",
    },
  },
  type: "object",
};
