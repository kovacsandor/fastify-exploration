import Ajv, { ValidateFunction } from "ajv";
import { postHeathBodyJsonSchema } from "../post-health-body-json-schema";

const ajv = new Ajv();

describe("post-health-body-json-schema", () => {
  let validate: ValidateFunction;

  beforeAll(() => {
    validate = ajv.compile(postHeathBodyJsonSchema);
  });

  test("validates a correct data", () => {
    const data = {
      propertyInBody: "propertyInBody",
    };

    const isValid = validate(data);

    expect(isValid).toBe(true);
    expect(validate.errors).toBeNull();
  });

  test("validates an incorrect object property", () => {
    const data = {
      invalidProperty: "propertyInBody",
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
      propertyInBody: "invalidValue",
    };

    const isValid = validate(data);

    expect(isValid).toBe(false);
    expect(validate.errors).toEqual([
      {
        instancePath: "/propertyInBody",
        schemaPath: "#/properties/propertyInBody/const",
        keyword: "const",
        params: { allowedValue: "propertyInBody" },
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
