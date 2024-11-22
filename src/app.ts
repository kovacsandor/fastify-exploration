import { FastifyPluginCallback } from "fastify";
import fastifyPlugin from "fastify-plugin";
import {
  authenticateUserPlugin,
  connectDatabasePlugin,
  ConnectDatabasePluginOptionsType,
  logErrorsPlugin,
} from "./plugins";
import { postHeathRoute, RoutePostHealthOptionsType } from "./routes";

type AppOptionsType = ConnectDatabasePluginOptionsType & RoutePostHealthOptionsType;

const callback: FastifyPluginCallback<AppOptionsType> = async (
  fastifyInstance,
  { connectionString, propertyInOptions },
): Promise<void> => {
  fastifyInstance.register(connectDatabasePlugin, { connectionString });

  fastifyInstance.register(authenticateUserPlugin);
  fastifyInstance.register(logErrorsPlugin);

  fastifyInstance.register(postHeathRoute, { propertyInOptions });
};

export const app: FastifyPluginCallback<AppOptionsType> = fastifyPlugin(callback);
