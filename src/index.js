import fastify from "fastify";
import { createApolloServer } from "./apollo/createApolloServer.js";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { config } from './config.js';
import { connectDB } from "./db/index.js";
import { permissions } from "./guards/index.js";
import { typeDefs, resolvers } from "./graphql/index.js";

const PORT = config.app.port;

export const startApolloServer = async () => {
  const app = fastify();

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  // Enable CORS for http://localhost:3000
  app.addHook("onRequest", async (request, reply) => {
    reply.header("Access-Control-Allow-Origin", config.app.cors_origin);
  });

  const server = createApolloServer([permissions], { app, schema });
  await server.start();

  await connectDB();

  app.register(server.createHandler());
  await app.listen(PORT);
};

const boostrap = async () => {
  try {
    await startApolloServer();
    console.log(
      `[Apollo Server]: Up and Running at http://localhost:${PORT}/graphql 🚀`
    );
  } catch (error) {
    console.log("[Apollo Server]: Process exiting ...");
    console.log(`[Apollo Server]: ${error}`);
    process.exit(1);
  }
};

boostrap();
