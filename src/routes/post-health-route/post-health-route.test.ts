import fastify from "fastify";
import { authenticateUserPlugin } from "../../plugins";
import { postHeathRoute } from "./post-health-route";
import { RoutePostHealthReplyType } from "./types";

describe("post-health-route", () => {
  test("returns correct response", async () => {
    const fastifyInstance = fastify();

    fastifyInstance.register(authenticateUserPlugin);
    fastifyInstance.register(postHeathRoute);

    const spy = jest.spyOn(console, "log").mockImplementation();

    const { json } = await fastifyInstance.inject({
      method: "POST",
      url: "/health/propertyInParam",
      payload: {
        propertyInBody: "propertyInBody",
      },
      headers: {
        "property-in-header": "property-in-header",
      },
      query: {
        propertyInQuery: "propertyInQuery",
      },
    });

    expect(spy).toHaveBeenCalledWith("request.body.propertyInBody", "propertyInBody");
    expect(spy).toHaveBeenCalledWith("request.headers.property-in-header", "property-in-header");
    expect(spy).toHaveBeenCalledWith("request.params.propertyInParam", "propertyInParam");
    expect(spy).toHaveBeenCalledWith("request.query.propertyInQuery", "propertyInQuery");
    expect(spy).toHaveBeenCalledWith("request.user", { id: 1 });

    const response = json<RoutePostHealthReplyType>();

    expect(response).toEqual({ propertyInReply: "propertyInReply" });
  });
});
