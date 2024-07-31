import ProdColor from "../../../models/ProdColor.js";

export const ProdImage = {
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
};
