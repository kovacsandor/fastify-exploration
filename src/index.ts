import fastify from "fastify";
import { RoutePostHealthType } from "./types";

const server = fastify();

server.post<RoutePostHealthType>("/health/:propertyInParam", async (request) => {
  console.log("request.body.body.propertyInBody", request.body.propertyInBody);
  console.log("request.headers.headers.propertyInHeader", request.headers["property-in-header"]);
  console.log("request.params.params.propertyInParam", request.params.propertyInParam);
  console.log("request.query.query.propertyInQuery", request.query.propertyInQuery);

  return { propertyInReply: "propertyInReply" };
});

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
