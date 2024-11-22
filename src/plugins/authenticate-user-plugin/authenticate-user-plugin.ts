import { FastifyPluginAsync } from "fastify";
import { fastifyPlugin } from "fastify-plugin";
import { AuthenticatedUserType } from "./types";

declare module "fastify" {
  interface FastifyRequest {
    user?: AuthenticatedUserType;
  }
}

export const authenticateUserPlugin: FastifyPluginAsync = fastifyPlugin(async (fastifyInstance): Promise<void> => {
  fastifyInstance.decorateRequest("user", undefined);
  fastifyInstance.addHook("onRequest", async (request) => {
    request.user = { id: 1 };
  });
});
