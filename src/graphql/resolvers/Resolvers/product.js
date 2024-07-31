import Brand from "../../../models/Brand.js";
import ProdColor from "../../../models/ProdColor.js";

export const Product = {
  brand(parent) {
    return Brand.findById(parent.brandID)
      .then((result) => {
        return result._doc;
      })
      .catch((err) => {
        console.error(err);
      });
  },
  prodcolors(parent) {
    return ProdColor.find({ productID: parent._id })
      .then((result) => {
        return result.map((r) => ({ ...r._doc }));
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
