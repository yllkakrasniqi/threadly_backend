import * as Queries from './Queries/index.js'
import * as Mutations from './Mutations/index.js'
import * as Resolvers from './Resolvers/index.js'

export const resolvers = {
    Query: {
        ...Queries
    },
    Mutation: {
        ...Mutations
    },
    ...Resolvers
}