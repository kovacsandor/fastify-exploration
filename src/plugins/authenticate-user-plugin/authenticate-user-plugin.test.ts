import fastify from "fastify";
import { describe, expect, test } from "vitest";
import { authenticateUserPlugin } from "./authenticate-user-plugin";
import { AuthenticatedUserType } from "./types";

describe("authenticate-user-plugin", () => {
  test("decorates request object with authenticated user", async () => {
    const fastifyInstance = fastify();
    fastifyInstance.register(authenticateUserPlugin);

    const route = "/test-route";

    fastifyInstance.register(async (fastify) => {
      fastify.get(route, async (request) => {
        return request.user;
      });
    });

    const { json } = await fastifyInstance.inject({
      method: "GET",
      url: route,
    });

    const response = json<AuthenticatedUserType>();

    expect(response).toEqual({ id: 1 });
  });

  test("decorates request object with authenticated user on a specific route", async () => {
    const fastifyInstance = fastify();

    const routePrivate = "/test-route-private";
    const routePublic = "/test-route-public";

    fastifyInstance.register(async (fastify) => {
      fastify.register(authenticateUserPlugin);
      fastify.get(routePrivate, async (request) => {
        return request.user;
      });
    });

    fastifyInstance.register(async (fastify) => {
      fastify.get(routePublic, async (request) => {
        return { id: request.user?.id };
      });
    });

    const privateInject = await fastifyInstance.inject({
      method: "GET",
      url: routePrivate,
    });

    const responsePrivate = privateInject.json<AuthenticatedUserType>();

    const publicInject = await fastifyInstance.inject({
      method: "GET",
      url: routePublic,
    });

    const responsePublic = publicInject.json<AuthenticatedUserType>();

    expect(responsePrivate).toEqual({ id: 1 });
    expect(responsePublic).toEqual({});
  });
});
