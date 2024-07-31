import mongoose from "mongoose"
import ProdColor from "../../../models/ProdColor.js"
import Product from "../../../models/Product.js"

export const completeProdColor = async (_, args) => {
    const { productID } = args

    const product = await Product.findById(productID)
    if (!product) { 
        throw new Error(`Product with id ${productID} does not exist!`)
    }

    /**
     * Check all colors for the product, if any of them does not have 
     * any image will be deleted from database
     */
    return ProdColor.aggregate([
        {
            $match: { productID: new mongoose.Types.ObjectId(productID)}
        },
        {
            $lookup: {
                from: 'prodimages',
                localField: "_id",
                foreignField: "prod_color_id",
                as: "images",
            }
        },
        {
            $project: {
                _id: 1,
                colorID: 1,
      
                "images.filename": 1,
              },
        }
    ]).then(async result => {
        const index = result.findIndex(ele => ele.images.length > 0)

        if ( index === -1 ) {
            await Product.delete({ _id: productID })
            return { ...product._doc }
        } else {
            const deletedProduct = result.filter(ele => ele.images.length === 0).map(ele => ele._id)
            await ProdColor.deleteMany({ _id: { $in: deletedProduct }})
            return { ...product._doc }
        }
    })
}