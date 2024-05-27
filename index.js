import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import { connectDB } from './src/db/index.js'
import { typeDefs } from './src/schema.js'
import { resolvers } from './src/resolvers.js'

const PORT = 4000 

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
})

startStandaloneServer(server, {
    listen: { port: PORT }
}).then(() => {
    connectDB().then(() => {
        console.log(`Server listening on ${PORT}`)
    })
})