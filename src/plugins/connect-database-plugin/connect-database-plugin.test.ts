import { PostgreSqlContainer, StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import fastify from "fastify";
import { connectDatabasePlugin } from "./connect-database-plugin";

describe("connect-database-plugin", () => {
  let postgreSqlContainer: PostgreSqlContainer;
  let startedContainer: StartedPostgreSqlContainer;

  beforeAll(async () => {
    postgreSqlContainer = new PostgreSqlContainer();

    startedContainer = await postgreSqlContainer.start();

    process.env = {
      ...process.env,
      POSTGRES_CONNECTION_STRING: startedContainer.getConnectionUri(),
    };
  });

  afterAll(async () => {
    await startedContainer.stop();
  });

  test("connects to database, decorates fastify instance with pg client", async () => {
    const fastifyInstance = fastify();
    fastifyInstance.register(connectDatabasePlugin);

    const route = "/test-route";

    fastifyInstance.register(async (fastify) => {
      fastify.get(route, async () => {
        const queryString = /* sql */ `
          SELECT
            *
          FROM
            information_schema.tables
          LIMIT
            1
        `;

        const { rows } = await fastify.pg.query(queryString);

        return rows;
      });
    });

    const { json } = await fastifyInstance.inject({
      method: "GET",
      url: route,
    });

    const response = json();

    await fastifyInstance.close();

    expect(response).toHaveLength(1);
  });
});