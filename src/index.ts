import fastify from "fastify";
import { app } from "./app";

const start = async () => {
  const fastifyInstance = fastify();
  fastifyInstance.register(app, {
    connectionString: process.env.POSTGRES_CONNECTION_STRING,
    propertyInOptions: "propertyInOptions",
  });

  const port = Number(process.env.PORT) || 8080;

  try {
    const address = await fastifyInstance.listen({ port });
    console.log(`Server listening at ${address}`);
  } catch (err) {
    fastifyInstance.log.error(err);
    process.exit(1);
  }
};

start();
