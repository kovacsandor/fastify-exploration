import { FastifyPluginAsync } from "fastify";
import { authenticateUserPlugin } from "../../plugins";
import { postHealthJsonschema } from "./json-schemas";
import { RoutePostHealthOptionsType } from "./types";
import { RoutePostHealthType } from "./types/route-post-health-type";

export const postHealthRoute: FastifyPluginAsync<RoutePostHealthOptionsType> = async (
  fastifyInstance,
  { propertyInOptions },
): Promise<void> => {
  fastifyInstance.register(authenticateUserPlugin);
  fastifyInstance.post<RoutePostHealthType>(
    "/health/:propertyInParam",
    { schema: postHealthJsonschema },
    async (request) => {
      console.log("propertyInOptions", propertyInOptions);
      console.log("request.body.propertyInBody", request.body?.propertyInBody);
      console.log("request.headers.property-in-header", request.headers["property-in-header"]);
      console.log("request.params.propertyInParam", request.params?.propertyInParam);
      console.log("request.query.propertyInQuery", request.query?.propertyInQuery);
      console.log("request.user", request.user);

      return { propertyInReply: "propertyInReply" };
    },
  );
};
