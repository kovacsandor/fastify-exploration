import Ajv, { ValidateFunction } from "ajv";
import { postHeathQueryStringJsonSchema } from "../post-health-query-string-json-schema";

const ajv = new Ajv();

describe("post-health-query-string-json-schema", () => {
  let validate: ValidateFunction;

  beforeAll(() => {
    validate = ajv.compile(postHeathQueryStringJsonSchema);
  });

  test("validates a correct data", () => {
    const data = {
      propertyInQuery: "propertyInQuery",
    };

    const isValid = validate(data);

    expect(isValid).toBe(true);
    expect(validate.errors).toBeNull();
  });

  test("validates an incorrect object property", () => {
    const data = {
      invalidProperty: "propertyInQuery",
    };

    const isValid = validate(data);

    expect(isValid).toBe(false);
    expect(validate.errors).toEqual([
      {
        instancePath: "",
        schemaPath: "#/additionalProperties",
        keyword: "additionalProperties",
        params: { additionalProperty: "invalidProperty" },
        message: "must NOT have additional properties",
      },
    ]);
  });

  test("validates an incorrect object property value", () => {
    const data = {
      propertyInQuery: "invalidValue",
    };

    const isValid = validate(data);

    expect(isValid).toBe(false);
    expect(validate.errors).toEqual([
      {
        instancePath: "/propertyInQuery",
        schemaPath: "#/properties/propertyInQuery/const",
        keyword: "const",
        params: { allowedValue: "propertyInQuery" },
        message: "must be equal to constant",
      },
    ]);
  });

  test("validates that the data is not an object", () => {
    const data = "string";
    const isValid = validate(data);

    expect(isValid).toBe(false);
    expect(validate.errors).toEqual([
      {
        instancePath: "",
        schemaPath: "#/type",
        keyword: "type",
        params: { type: "object" },
        message: "must be object",
      },
    ]);
  });
});
