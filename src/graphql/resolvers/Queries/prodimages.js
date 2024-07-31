import ProdImage from "../../../models/ProdImage.js";

export const prodimages = async (parent, args, context) => {
  return ProdImage.find()
    .then((result) => {
      return result.map((r) => ({ ...r._doc }));
    })
    .catch((err) => {
      console.error(err);
    });
};
