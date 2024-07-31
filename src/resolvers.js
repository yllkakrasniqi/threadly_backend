import Brand from './models/Brand.js'
import Product from './models/Product.js'
import ProdColor from './models/ProdColor.js'
import Color from './models/Color.js'
import ProdImage from './models/ProdImage.js'
import Size from './models/Size.js'
import ProdSizeAmount from './models/ProdSizeAmount.js'

import mongoose from "mongoose";

export const resolvers = {
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
        colors() {
            return Color.find()
            .then(result => {
                return result.map(r => ({ ...r._doc }))
            })
            .catch((err) => {
                console.error(err);
            });
        },
        prodcolors() {
            return ProdColor.find()
            .then(result => {
                return result.map(r => ({ ...r._doc }))
            })
            .catch((err) => {
                console.error(err);
            });
        },
        prodcolor(_, args) {
            return ProdColor.findById(args.id)
            .then(result => {
                return result._doc;
            })
            .catch((err) => {
                console.error(err);
            });
        },
        prodimages(_, args) {
            return ProdImage.find()
            .then(result => {
                return result.map(r => ({ ...r._doc }))
            })
            .catch((err) => {
                console.error(err);
            });
        },
        prodimage(_, args) {
            return ProdImage.findById(args._id)
            .then(result => {
                return result._doc;
            })
            .catch((err) => {
                console.error(err);
            });
        },
        prodsizeamount(_, args) {
            return ProdSizeAmount.findById(args._id)
            .then(result => {
                return result._doc;
            })
            .catch((err) => {
                console.error(err);
            });
        },
    },
    Mutation: {
        createProduct: async (_, args) => {
            const { brandID, name, type, price, gender } = args

            const newProduct = new Product({
                brandID,
                name,
                type,
                price, 
                gender
            })
            return newProduct.save()
            .then(result => {
                return { ...result._doc }
            })
            .catch(err => console.log(err))
        },
        addProductColors: async (_, args) => {
            const { productID, colors } = args

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
        },
        completeProdColor: async (_, args) => {
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

        },
        addProductSizes: async (_, args) => {
            const { productID, amount, standard, sizes } = args

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
        prodcolors(parent) {
            return ProdColor.find({productID: parent._id})
            .then(result => {
                return result.map(r => ({ ...r._doc }))
            })
            .catch((err) => {
                console.error(err);
            });
        }
    },
    Color: {
        prodcolors(parent) {
            return ProdColor.find({colorID: parent._id})
            .then(result => {
                return result.map(r => ({ ...r._doc }))
            })
            .catch((err) => {
                console.error(err);
            });
        }
    },
    ProdColor: {
        product(parent) {
            return Product.findById(parent.productID)
            .then(result => {
                return result._doc
            })
            .catch((err) => {
                console.error(err);
            });
        },
        color(parent) {
            return Color.findById(parent.colorID)
            .then(result => {
                return result._doc
            })
            .catch((err) => {
                console.error(err);
            });
        },
        prodimages(parent) {
            return ProdImage.find({prod_color_id: parent._id})
            .then(result => {
                return result.map(r => ({ ...r._doc }))
            })
            .catch((err) => {
                console.error(err);
            });
        },
        prodsizeamounts(parent) {
            return ProdSizeAmount.find({prod_color_id: parent._id})
            .then(result => {
                return result.map(r => ({ ...r._doc }))
            })
            .catch((err) => {
                console.error(err);
            });
        }
    },
    ProdImage: {
        prodcolor(parent) {
            return ProdColor.findById(parent.prod_color_id)
            .then(result => {
                if(result._doc){
                    return result._doc
                } else {
                    return
                }
            })
            .catch((err) => {
                console.error(err);
            });
        }
    },
    ProdSizeAmount: {
        prodcolor(parent) {
            return ProdColor.findById(parent.prod_color_id)
            .then(result => {
                if(result._doc){
                    return result._doc
                } else {
                    return
                }
            })
            .catch((err) => {
                console.error(err);
            });
        },
        size(parent) {
            return Size.findById(parent.size_id)
            .then(result => {
                if(result._doc){
                    return result._doc
                } else {
                    return
                }
            })
            .catch((err) => {
                console.error(err);
            });
        }
    }
}