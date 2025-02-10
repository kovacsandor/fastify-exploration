import { JSONSchema7 } from "json-schema";

export const postHealthQueryStringJsonSchema: JSONSchema7 = {
  additionalProperties: false,
  properties: {
    propertyInQuery: {
      const: "propertyInQuery",
      type: "string",
    },
  },
  type: "object",
};
