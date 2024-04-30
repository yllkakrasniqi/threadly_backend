import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import { typeDefs } from './src/schema.js'

const PORT = 4000 

const resolvers = {
    Query: {
        hello() {
            return "Hello World"
        }
    }
}
const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
})

startStandaloneServer(server, {
    listen: { port: PORT }
}).then(() => {
    console.log(`Server listening on ${PORT}`)
})