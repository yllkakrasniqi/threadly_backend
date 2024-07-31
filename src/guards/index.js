import { isAuthorized } from "./rules/index.js";

export const permissions = {
    Query: {
    },
    Mutation: {
        createProduct: isAuthorized,
        addProductColors: isAuthorized,
        addProductSizes: isAuthorized,
        completeProdColor: isAuthorized,
    }
}