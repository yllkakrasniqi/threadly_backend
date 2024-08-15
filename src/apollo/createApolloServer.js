import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServer } from "apollo-server-fastify";
import { applyMiddleware } from "graphql-middleware";
import { verifyJwt } from "../utils/index.js";

export const createApolloServer = (middleware, { app, schema }) => {
  const schemaWithPermissions = applyMiddleware(schema, ...middleware);

  return new ApolloServer({
    schema: schemaWithPermissions,
    context: async ( { request, reply }) => {
      const { authorization } = request.headers
      if(!authorization) {
          return {
            request,
            reply,
          };
      }

      const token = authorization.replace("Bearer", "").trim()

      const { id } =  await verifyJwt(token)

      return {
        request,
        reply,
        id,
      };
  
    },
    debug: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer: app.server }),
      {
        serverWillStart: async () => {
          return {
            drainServer: async () => {
              await app.close();
            },
          };
        },
      },
    ],
  });
};
