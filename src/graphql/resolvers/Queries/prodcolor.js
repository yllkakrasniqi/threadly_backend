import ProdColor from "../../../models/ProdColor.js";

export const prodcolor = async (parent, args, context) => {
  return ProdColor.findById(args.id)
    .then((result) => {
      return result._doc;
    })
    .catch((err) => {
      console.error(err);
    });
};
