import Product from "../../../models/Product.js";

export const product = async (parent, args, context) => {
  return Product.findById(args.id)
    .then((result) => {
      return result._doc;
    })
    .catch((err) => {
      console.error(err);
    });
};
