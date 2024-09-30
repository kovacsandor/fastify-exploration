import { FastifyJsonSchemaType } from "../../types";
import { postHeathBodyJsonSchema } from "./post-health-body-json-schema";
import { postHeathHeadersJsonSchema } from "./post-health-headers-json-schema";
import { postHeathParamsJsonSchema } from "./post-health-params-json-schema";
import { postHeathQueryStringJsonSchema } from "./post-health-query-string-json-schema";
import { postHeathResponseOkJsonSchema } from "./post-health-response-ok-json-schema";

export const postHeathJsonschema: FastifyJsonSchemaType = {
  body: postHeathBodyJsonSchema,
  headers: postHeathHeadersJsonSchema,
  params: postHeathParamsJsonSchema,
  querystring: postHeathQueryStringJsonSchema,
  response: {
    200: postHeathResponseOkJsonSchema,
  },
};
