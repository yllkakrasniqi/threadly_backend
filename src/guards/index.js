import { isAuthorized } from "./rules/index.js";

export const permissions = {
    Query: {
        colors: isAuthorized,
        brands: isAuthorized
    },
    Mutation: {
        createProduct: isAuthorized
    }
}