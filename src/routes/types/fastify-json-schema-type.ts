import { FastifySchema } from "fastify";
import { JSONSchema7 } from "json-schema";

export type FastifyJsonSchemaType = FastifyJsonSchemaResponseType & FastifyJsonSchemaRequestType;

type FastifyJsonSchemaRequestType = {
  readonly [K in RequestKeyType]: JSONSchema7;
};

type FastifyJsonSchemaResponseType = {
  readonly [K in ResponseKeyType]: FastifyJsonSchemaResponseStatusCodesType;
};

type FastifyJsonSchemaResponseStatusCodesType = {
  readonly [errorCode: number]: JSONSchema7;
};

type RequestKeyType = keyof Omit<FastifySchema, ResponseKeyType>;
type ResponseKeyType = keyof Pick<FastifySchema, "response">;
