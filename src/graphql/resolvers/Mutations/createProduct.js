import Product from "../../../models/Product.js";

export const createProduct = async (_, args) => {
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
};
  