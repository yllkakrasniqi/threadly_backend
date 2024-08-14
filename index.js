import fastify from "fastify";

import { connectDB } from "./src/db/index.js";
import { createApolloServer } from "./src/apollo/createApolloServer.js";
import { permissions } from "./src/guards/index.js";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs, resolvers } from "./src/graphql/index.js";
// import cors from '@fastify/cors';
import cors from '@fastify/cors'

const PORT = 4000;

export const startApolloServer = async () => {
  const app = fastify();

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  // Enable CORS for http://localhost:3000
  app.addHook("onRequest", async (request, reply) => {
    reply.header("Access-Control-Allow-Origin", "http://localhost:3000");
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
      "[Apollo Server]: Up and Running at http://localhost:4000/graphql 🚀"
    );
  } catch (error) {
    console.log("[Apollo Server]: Process exiting ...");
    console.log(`[Apollo Server]: ${error}`);
    process.exit(1);
  }
};

boostrap();
