import { FastifyPluginAsync } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { authenticateUserPlugin, connectDatabasePlugin, logErrorsPlugin } from "./plugins";
import { postHeathRoute } from "./routes";

export const app: FastifyPluginAsync = fastifyPlugin(async (fastifyInstance) => {
  fastifyInstance.register(connectDatabasePlugin);

  fastifyInstance.register(authenticateUserPlugin);
  fastifyInstance.register(logErrorsPlugin);

  fastifyInstance.register(postHeathRoute);
});
