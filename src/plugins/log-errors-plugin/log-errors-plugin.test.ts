import fastify from "fastify";
import { describe, expect, test, vitest } from "vitest";
import { logErrorsPlugin } from "./log-errors-plugin";

describe("log-errors-plugin", () => {
  test("logs errors", async () => {
    const fastifyInstance = fastify();
    fastifyInstance.register(logErrorsPlugin);

    const route = "/test-route";
    const error = new Error("test");

    fastifyInstance.register(async (fastify) => {
      fastify.get(route, async () => {
        throw error;
      });
    });

    const spy = vitest.spyOn(console, "error").mockImplementation(() => {});

    await fastifyInstance.inject({
      method: "GET",
      url: route,
    });

    expect(spy).toHaveBeenCalledWith(error);
  });
});
