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
        _id:  String!,
        colorStr: String!,

        prodcolors: [ProdColor!]
    }
    type ProdColor {
        _id: ID!,
        productID: ID!,
        colorID: String!,
        
        product: Product!,
        color: Color!,
        prodimages: [ProdImage!]!,
        prodsizeamounts: [ProdSizeAmount!]!
    }
    type ProdImage {
        _id: ID!,
        prod_color_id: ID!,
        filename: String!,
        path: String!,

        prodcolor: ProdColor,
    }
    type Size {
        _id: ID!,
        name: String!,
        description: String!,
        standard: String,

        prodsizeamounts: [ProdSizeAmount!]
    }
    type ProdSizeAmount {
        _id: ID!,
        prod_color_id: ID!,
        size_id: ID!,
        quantity: Int!,
        
        prodcolor: ProdColor!
        size: Size!
    }
    type Query {
        hello: String!,
        brands: [Brand!],
        products: [Product!],
        product(id: ID!): Product,
        colors: [Color!],
        prodcolors: [ProdColor!],
        prodcolor(id: ID!): ProdColor,
        prodimages(prod_color_id: ID): [ProdImage!],
        prodimage(id: ID!): ProdImage,
        prodsizeamount(id: ID!): ProdSizeAmount,
    }
    type Mutation {
        createProduct (brandID: ID!, name: String!, type: String!, price: Float!, gender: String! ): Product
        completeProduct (productID: ID!): Product!
        addProductColors (productID: ID!, colors: [ID!]! ): [ProdColor!]
    }

`