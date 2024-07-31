import Color from "../../../models/Color.js";
import ProdImage from "../../../models/ProdImage.js";
import ProdSizeAmount from "../../../models/ProdSizeAmount.js";
import Product from "../../../models/Product.js";

export const ProdColor = {
  product(parent) {
    return Product.findById(parent.productID)
      .then((result) => {
        return result._doc;
      })
      .catch((err) => {
        console.error(err);
      });
  },
  color(parent) {
    return Color.findById(parent.colorID)
      .then((result) => {
        return result._doc;
      })
      .catch((err) => {
        console.error(err);
      });
  },
  prodimages(parent) {
    return ProdImage.find({ prod_color_id: parent._id })
      .then((result) => {
        return result.map((r) => ({ ...r._doc }));
      })
      .catch((err) => {
        console.error(err);
      });
  },
  prodsizeamounts(parent) {
    return ProdSizeAmount.find({ prod_color_id: parent._id })
      .then((result) => {
        return result.map((r) => ({ ...r._doc }));
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
