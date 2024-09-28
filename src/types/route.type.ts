import { RouteGenericInterface } from "fastify";

export type RouteType<T extends RouteGenericInterface> = {
  readonly [K in keyof T]: keyof T extends keyof RouteGenericInterface ? T[K] : never;
};
