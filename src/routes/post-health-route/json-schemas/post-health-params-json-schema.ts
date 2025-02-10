import { JSONSchema7 } from "json-schema";

export const postHealthParamsJsonSchema: JSONSchema7 = {
  additionalProperties: false,
  properties: {
    propertyInParam: {
      const: "propertyInParam",
      type: "string",
    },
  },
  type: "object",
};
