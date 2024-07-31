import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import fastify from "fastify";

import { connectDB } from './src/db/index.js'
// import { typeDefs } from './src/schema.js'
// import { resolvers } from './src/resolvers.js'
import { createApolloServer } from './src/apollo/createApolloServer.js'
import { permissions } from './src/guards/index.js'
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs, resolvers } from './src/graphql/index.js'

const PORT = 4000 

export const startApolloServer = async () => {
    const app = fastify()

    const schema = makeExecutableSchema({
        typeDefs,
        resolvers,
    })

    const server = createApolloServer([permissions], {app, schema})
    await server.start()

    await connectDB()

    app.register(server.createHandler())
    await app.listen(PORT)
}


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

// // const server = new ApolloServer({
// //     typeDefs: typeDefs,
// //     resolvers: resolvers
// // })

// const app = fastify()

// const schema = {
//     typeDefs: typeDefs,
//     resolvers: resolvers
// }

// const server = createApolloServer([permissions], { app, schema })

// // server.start().then(() => {
// //     connectDB().then(() => {
// //         app.register(server.createHandler())
// //         app.listen(PORT).then(() => console.log(`Server listening on ${PORT}`) )
// //     })
// // })

// startStandaloneServer(server, {
//     listen: { port: PORT }
// }).then(() => {
//     connectDB().then(() => {
//         console.log(`Server listening on ${PORT}`)
//     })
// })