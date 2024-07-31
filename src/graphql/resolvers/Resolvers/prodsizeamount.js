import ProdColor from "../../../models/ProdColor.js";
import Size from "../../../models/Size.js";

export const ProdSizeAmount = {
  prodcolor(parent) {
    return ProdColor.findById(parent.prod_color_id)
      .then((result) => {
        if (result._doc) {
          return result._doc;
        } else {
          return;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  },
  size(parent) {
    return Size.findById(parent.size_id)
      .then((result) => {
        if (result._doc) {
          return result._doc;
        } else {
          return;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
