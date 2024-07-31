import Product from "../../../models/Product.js";

export const Brand = {
  products(parent) {
    return Product.find({ brandID: parent._id })
      .then((result) => {
        return result.map((r) => ({ ...r._doc }));
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
