import { FastifyPluginAsync } from "fastify";
import { fastifyPlugin } from "fastify-plugin";
import { AuthenticatedUserType } from "./types";

declare module "fastify" {
  interface FastifyRequest {
    user?: AuthenticatedUserType;
  }
}

export const authenticateUserHook: FastifyPluginAsync = fastifyPlugin(async (fastify) => {
  fastify.decorateRequest("user", undefined);
  fastify.addHook("onRequest", async (request) => {
    request.user = { id: 1 };
  });
});
