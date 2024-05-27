import Brand from './models/Brand.js'
import Product from './models/Product.js'
import ProdColor from './models/ProdColor.js'
import Color from './models/Color.js'
import ProdImage from './models/ProdImage.js'
import Size from './models/Size.js'
import ProdSizeAmount from './models/ProdSizeAmount.js'

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
            console.log('success')
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
        prodimages() {
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