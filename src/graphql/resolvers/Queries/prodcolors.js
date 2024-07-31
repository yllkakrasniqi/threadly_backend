import ProdColor from "../../../models/ProdColor.js";

export const prodcolors = async (parent, args, context) => {
  return ProdColor.find()
    .then((result) => {
      return result.map((r) => ({ ...r._doc }));
    })
    .catch((err) => {
      console.error(err);
    });
};
