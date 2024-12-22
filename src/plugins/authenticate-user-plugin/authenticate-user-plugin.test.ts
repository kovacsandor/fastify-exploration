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
});
