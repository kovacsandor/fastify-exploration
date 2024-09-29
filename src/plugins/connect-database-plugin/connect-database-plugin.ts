import fastifyPostgres, { PostgresPluginOptions } from "@fastify/postgres";
import { FastifyPluginAsync } from "fastify";
import { fastifyPlugin } from "fastify-plugin";

export const connectDatabasePlugin: FastifyPluginAsync = fastifyPlugin(async (fastifyInstance) => {
  const options: PostgresPluginOptions = {
    connectionString: process.env.POSTGRES_CONNECTION_STRING,
  };

  fastifyInstance.register(fastifyPostgres, options);
});
