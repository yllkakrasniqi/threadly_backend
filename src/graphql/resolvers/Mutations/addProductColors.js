import ProdColor from "../../../models/ProdColor.js";
import Product from "../../../models/Product.js";

export const addProductColors = async (_, args) => {
    const { productID, colors } = args.input

    const product = await Product.findById(productID);
    if (!product) {
        throw new Error(`Product with id ${productID} does not exist!`)
    }

    let newProductColors = []
    colors.map(color => {
        newProductColors.push({
            productID: productID,
            colorID: color
        })
    })

    return ProdColor.insertMany(newProductColors)
    .then(result => {
        return result.map(r => ({ ...r._doc }))
    })
    .catch(err => console.log(err))
}