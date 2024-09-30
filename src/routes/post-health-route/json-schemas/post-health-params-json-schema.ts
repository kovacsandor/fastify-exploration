import { JSONSchema7 } from "json-schema";

export const postHeathParamsJsonSchema: JSONSchema7 = {
  additionalProperties: false,
  properties: {
    propertyInParam: {
      const: "propertyInParam",
      type: "string",
    },
  },
  type: "object",
};
