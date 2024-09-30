import { FastifyPluginAsync } from "fastify";
import { postHeathJsonschema } from "./json-schemas";
import { RoutePostHealthType } from "./types";

export const postHeathRoute: FastifyPluginAsync = async (fastifyInstance) => {
  fastifyInstance.post<RoutePostHealthType>(
    "/health/:propertyInParam",
    { schema: postHeathJsonschema },
    async (request) => {
      console.log("request.body.propertyInBody", request.body?.propertyInBody);
      console.log("request.headers.property-in-header", request.headers["property-in-header"]);
      console.log("request.params.propertyInParam", request.params?.propertyInParam);
      console.log("request.query.propertyInQuery", request.query?.propertyInQuery);
      console.log("request.user", request.user);

      return { propertyInReply: "propertyInReply" };
    },
  );
};
