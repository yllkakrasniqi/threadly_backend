import Brand from './models/Brand.js'
import Product from './models/Product.js'
import ProdColor from './models/ProdColor.js'
import Color from './models/Color.js'
import ProdImage from './models/ProdImage.js'
import Size from './models/Size.js'
import ProdSizeAmount from './models/ProdSizeAmount.js'

const checkProductColor = (prod_color_id) => {
    return new Promise (async (resolve, reject) => {
        const productImages = await ProdImage.find({ prod_color_id: prod_color_id });
        if (productImages.length === 0) {
            await ProdColor.delete({ _id: prod_color_id });
        }
        resolve(true)
    })
}

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
            return ProdColor.findById(args._id)
            .then(result => {
                return result._doc;
            })
            .catch((err) => {
                console.error(err);
            });
        },
        prodimages(_, args) {
            const prod_color_id = args.prod_color_id
            
            let query = {};
            if(prod_color_id){
                query = {prod_color_id: prod_color_id}
            }

            return ProdImage.find(query)
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
        completeProduct: async (_, args) => {
            const { productID } = args

            const product = await Product.findById(productID)
            if (!product) { 
                throw new Error(`Product with id ${productID} does not exist!`)
            }

            const productColors = await ProdColor.find({ productID: productID })
            const checkProductColors = productColors.map(file => checkProductColor(file._id))
            return Promise.all(checkProductColors)
            .then(async (result) => {
                await Product.updateOne({ _id: productID }, { status: 1 })
                return { ...product._doc }
            })

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