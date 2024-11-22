import fastifyPostgres, { PostgresPluginOptions } from "@fastify/postgres";
import { FastifyPluginAsync } from "fastify";
import { fastifyPlugin } from "fastify-plugin";
import { ConnectDatabasePluginOptionsType } from "./types";

const callback: FastifyPluginAsync<ConnectDatabasePluginOptionsType> = async (
  fastifyInstance,
  { connectionString },
): Promise<void> => {
  const options: PostgresPluginOptions = {
    connectionString,
  };

  fastifyInstance.register(fastifyPostgres, options);
};

export const connectDatabasePlugin: FastifyPluginAsync<ConnectDatabasePluginOptionsType> = fastifyPlugin(callback);
