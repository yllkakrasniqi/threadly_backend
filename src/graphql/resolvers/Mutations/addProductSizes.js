import ProdColor from "../../../models/ProdColor.js";
import ProdSizeAmount from "../../../models/ProdSizeAmount.js";
import Product from "../../../models/Product.js";
import Size from "../../../models/Size.js";


export const addProductSizes = async (_, args) => {
    const { productID, amount, standard, sizes } = args.input

    const product = await Product.findById(productID)
    if (!product) { 
        throw new Error(`Product with id ${productID} does not exist!`)
    }

    /**
     *  Get all colors from table ProdColor in which you can
     *  find the product with productID that is given in url
     */
    const prodColors = await ProdColor.find({ productID: productID });
    if (prodColors.length === 0) {
        /**
         * If nothing is found show error than no product exist with
         * that ID because an product does not exist if you can not
         * found it in any color
         */
        throw new Error(`Product with id ${productID} does not exist!`)
    }

    /**
     * Get all the SizeIDs for the selected sizes. 
     * After that fill the prodSizeAmount array with each product
     * color with selected sizes and amount
     */
    const sizeArray = await Size.find( { name: { $in: sizes } } )

    let prodSizeAmount = [];
    for(const prodColor of prodColors){
        sizeArray.map(ele => {
            prodSizeAmount.push({
                prod_color_id: prodColor._id,
                size_id: ele._id,
                quantity: amount,
            })
        })
    }

    return ProdSizeAmount.insertMany(prodSizeAmount)
    .then(result => {
        return result.map(r => ({ ...r._doc }))
    })
}