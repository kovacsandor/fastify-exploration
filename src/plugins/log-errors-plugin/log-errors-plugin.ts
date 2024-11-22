import { FastifyPluginAsync } from "fastify";
import { fastifyPlugin } from "fastify-plugin";

export const logErrorsPlugin: FastifyPluginAsync = fastifyPlugin(async (fastifyInstance): Promise<void> => {
  fastifyInstance.addHook("onError", async (request, reply, error) => {
    console.error(error);
  });
});
