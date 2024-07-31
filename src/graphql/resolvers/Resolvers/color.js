import ProdColor from "../../../models/ProdColor.js";

export const Color = {
  prodcolors(parent) {
    return ProdColor.find({ colorID: parent._id })
      .then((result) => {
        return result.map((r) => ({ ...r._doc }));
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
