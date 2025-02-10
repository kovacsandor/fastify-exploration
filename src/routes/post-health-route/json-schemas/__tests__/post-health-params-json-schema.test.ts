import Ajv, { ValidateFunction } from "ajv";
import { beforeAll, describe, expect, test } from "vitest";
import { postHealthParamsJsonSchema } from "../post-health-params-json-schema";

const ajv = new Ajv();

describe("post-health-params-json-schema", () => {
  let validate: ValidateFunction;

  beforeAll(() => {
    validate = ajv.compile(postHealthParamsJsonSchema);
  });

  test("validates a correct data", () => {
    const data = {
      propertyInParam: "propertyInParam",
    };

    const isValid = validate(data);

    expect(isValid).toBe(true);
    expect(validate.errors).toBeNull();
  });

  test("validates an incorrect object property", () => {
    const data = {
      invalidProperty: "propertyInParam",
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
      propertyInParam: "invalidValue",
    };

    const isValid = validate(data);

    expect(isValid).toBe(false);
    expect(validate.errors).toEqual([
      {
        instancePath: "/propertyInParam",
        schemaPath: "#/properties/propertyInParam/const",
        keyword: "const",
        params: { allowedValue: "propertyInParam" },
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
