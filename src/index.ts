import fastify from "fastify";
import { postHeathRoute } from "./routes/post-health.route";

const server = fastify();

server.register(postHeathRoute);

const start = async () => {
  const port = Number(process.env.PORT) || 8080;

  try {
    const address = await server.listen({ port });
    console.log(`Server listening at ${address}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
