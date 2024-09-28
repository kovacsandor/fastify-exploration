import { FastifyPluginAsync } from "fastify";
import { fastifyPlugin } from "fastify-plugin";

export const logErrorsHook: FastifyPluginAsync = fastifyPlugin(async (fastify) => {
  fastify.addHook("onError", async (request, reply, error) => {
    console.error(error);
  });
});
