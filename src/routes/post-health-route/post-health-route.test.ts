import fastify, { FastifyInstance } from "fastify";
import { authenticateUserPlugin } from "../../plugins";
import { postHeathRoute } from "./post-health-route";
import { RoutePostHealthReplyType } from "./types/route-post-health-reply-type";

describe("post-health-route", () => {
  let fastifyInstance: FastifyInstance;
  let spy: jest.SpyInstance;

  beforeAll(() => {
    fastifyInstance = fastify();

    fastifyInstance.register(authenticateUserPlugin);
    fastifyInstance.register(postHeathRoute, { propertyInOptions: "propertyInOptions" });
    spy = jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    spy.mockClear();
  });

  test("returns correct response", async () => {
    const { json } = await fastifyInstance.inject({
      method: "POST",
      url: "/health/propertyInParam",
      payload: {},
    });

    const response = json<RoutePostHealthReplyType>();

    expect(response).toEqual({ propertyInReply: "propertyInReply" });
  });

  test("logs expected outputs", async () => {
    await fastifyInstance.inject({
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

    expect(spy).toHaveBeenCalledWith("propertyInOptions", "propertyInOptions");
    expect(spy).toHaveBeenCalledWith("request.body.propertyInBody", "propertyInBody");
    expect(spy).toHaveBeenCalledWith("request.headers.property-in-header", "property-in-header");
    expect(spy).toHaveBeenCalledWith("request.params.propertyInParam", "propertyInParam");
    expect(spy).toHaveBeenCalledWith("request.query.propertyInQuery", "propertyInQuery");
    expect(spy).toHaveBeenCalledWith("request.user", { id: 1 });
  });

  test("validates request", async () => {
    const { json } = await fastifyInstance.inject({
      method: "POST",
      url: "/health/propertyInParam",
      payload: {
        propertyInBody: "invalid value",
      },
    });

    const response = json();

    const expectation = {
      statusCode: 400,
      code: "FST_ERR_VALIDATION",
      error: "Bad Request",
      message: "body/propertyInBody must be equal to constant",
    };

    expect(response).toEqual(expectation);
  });
});
