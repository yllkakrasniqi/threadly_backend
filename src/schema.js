export const typeDefs = `#graphql
    type Brand {
        _id: ID!,
        name: String!,

        products: [Product!]
    }
    type Product {
        _id: ID!,
        brandID: ID!,
        name: String!,
        type: String!,
        price: Float!,
        gender: String!,
        status: Int!,

        brand: Brand!,
        prodcolors: [ProdColor!]!
    },
    type Color {
        _id:  ID!,
        colorStr: String!,

        prodcolos: [ProdColor!]
    }
    type ProdColor {
        _id: ID!,
        productID: ID!,
        colorID: ID!,
        
        product: Product!,
        color: Color!,
        prodimages: [ProdImage!]!,
        prodsizeamounts: [ProdSizeAmount!]!
    }
    type Size {
        _id: ID!,
        name: String!,
        description: String!,
        standard: String,

        prodsizeamounts: [ProdSizeAmount!]
    },
    type ProdImage {
        _id: ID!,
        prod_color_id: ID!,
        filename: String!,
        path: String!,

        product: Product!,
    }
    type ProdSizeAmount {
        _id: ID!,
        prod_color_id: ID!,
        size_id: ID!,
        quantity: Int!,
        
        prodcolor: ProdColor!
    },
    type Query {
        hello: String!
    }

`