import { FastifyJsonSchemaType } from "../../types";
import { postHealthBodyJsonSchema } from "./post-health-body-json-schema";
import { postHealthHeadersJsonSchema } from "./post-health-headers-json-schema";
import { postHealthParamsJsonSchema } from "./post-health-params-json-schema";
import { postHealthQueryStringJsonSchema } from "./post-health-query-string-json-schema";
import { postHealthResponseOkJsonSchema } from "./post-health-response-ok-json-schema";

export const postHealthJsonschema: FastifyJsonSchemaType = {
  body: postHealthBodyJsonSchema,
  headers: postHealthHeadersJsonSchema,
  params: postHealthParamsJsonSchema,
  querystring: postHealthQueryStringJsonSchema,
  response: {
    200: postHealthResponseOkJsonSchema,
  },
};
