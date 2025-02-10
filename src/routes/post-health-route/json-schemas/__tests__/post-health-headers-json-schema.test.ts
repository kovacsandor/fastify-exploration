import Ajv, { ValidateFunction } from "ajv";
import { beforeAll, describe, expect, test } from "vitest";
import { postHealthHeadersJsonSchema } from "../post-health-headers-json-schema";

const ajv = new Ajv();

describe("post-health-params-json-schema", () => {
  let validate: ValidateFunction;

  beforeAll(() => {
    validate = ajv.compile(postHealthHeadersJsonSchema);
  });

  test("validates a correct data", () => {
    const data = {
      "property-in-header": "property-in-header",
    };

    const isValid = validate(data);

    expect(isValid).toBe(true);

    expect(validate.errors).toBeNull();
  });

  test("validates an incorrect object property value", () => {
    const data = {
      "property-in-header": "invalidValue",
    };

    const isValid = validate(data);

    expect(isValid).toBe(false);
    expect(validate.errors).toEqual([
      {
        instancePath: "/property-in-header",
        schemaPath: "#/properties/property-in-header/const",
        keyword: "const",
        params: { allowedValue: "property-in-header" },
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
