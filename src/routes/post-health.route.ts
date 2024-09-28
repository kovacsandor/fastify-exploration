import { FastifyPluginAsync } from "fastify";
import { RoutePostHealthType } from "../types";

export const postHeathRoute: FastifyPluginAsync = async (fastify) => {
  fastify.post<RoutePostHealthType>("/health/:propertyInParam", async (request) => {
    console.log("request.body.propertyInBody", request.body.propertyInBody);
    console.log("request.headers.property-in-header", request.headers["property-in-header"]);
    console.log("request.params.propertyInParam", request.params.propertyInParam);
    console.log("request.query.propertyInQuery", request.query.propertyInQuery);

    return { propertyInReply: "propertyInReply" };
  });
};
