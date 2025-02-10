import Ajv, { ValidateFunction } from "ajv";
import { beforeAll, describe, expect, test } from "vitest";
import { postHealthResponseOkJsonSchema } from "../post-health-response-ok-json-schema";

const ajv = new Ajv();

describe("post-health-response-ok-json-schema", () => {
  let validate: ValidateFunction;

  beforeAll(() => {
    validate = ajv.compile(postHealthResponseOkJsonSchema);
  });

  test("validates a correct data", () => {
    const data = {
      propertyInReply: "propertyInReply",
    };

    const isValid = validate(data);

    expect(isValid).toBe(true);
    expect(validate.errors).toBeNull();
  });

  test("validates an incorrect object property", () => {
    const data = {
      invalidProperty: "propertyInReply",
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
      propertyInReply: "invalidValue",
    };

    const isValid = validate(data);

    expect(isValid).toBe(false);
    expect(validate.errors).toEqual([
      {
        instancePath: "/propertyInReply",
        schemaPath: "#/properties/propertyInReply/const",
        keyword: "const",
        params: { allowedValue: "propertyInReply" },
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
