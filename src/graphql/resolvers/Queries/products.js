import Product from "../../../models/Product.js";

export const products = async (parent, args, context) => {
  return Product.find()
    .then((result) => {
      return result.map((r) => ({ ...r._doc }));
    })
    .catch((err) => {
      console.error(err);
    });
};
