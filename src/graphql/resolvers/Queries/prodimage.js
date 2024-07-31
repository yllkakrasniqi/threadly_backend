import ProdImage from "../../../models/ProdImage.js";

export const prodimage = async (parent, args, context) => {
  return ProdImage.findById(args._id)
    .then((result) => {
      return result._doc;
    })
    .catch((err) => {
      console.error(err);
    });
};
