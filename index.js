import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import { typeDefs } from './src/schema.js'
import { connectDB } from './src/db/index.js'

import Brand from './src/models/Brand.js'
import Product from './src/models/Product.js'

const PORT = 4000 

const resolvers = {
    Query: {
        hello() {
            return "Hello World"
        },
        brands() {
            return Brand.find()
            .then(result => {
                return result.map(r => ({ ...r._doc }))
            })
            .catch((err) => {
                console.error(err);
            });
        },
        products() {
            return Product.find()
            .then(result => {
                return result.map(r => ({ ...r._doc }))
            })
            .catch((err) => {
                console.error(err);
            });
        },
        product(_, args) {
            return Product.findById(args.id)
            .then(result => {
                return result._doc;
            })
            .catch((err) => {
                console.error(err);
            });
        },
    },
    Brand: {
        products(parent) {
            return Product.find({brandID: parent._id})
            .then(result => {
                return result.map(r => ({ ...r._doc }))
            })
            .catch((err) => {
                console.error(err);
            });
        }
    },
    Product: {
        brand(parent) {
            return Brand.findById(parent.brandID)
            .then(result => {
                return result._doc
            })
            .catch((err) => {
                console.error(err);
            });
        },
    },
}
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