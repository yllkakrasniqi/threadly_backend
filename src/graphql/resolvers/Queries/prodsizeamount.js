import ProdSizeAmount from "../../../models/ProdSizeAmount.js";

export const prodsizeamount = async (parent, args, context) => {
  return ProdSizeAmount.findById(args._id)
    .then((result) => {
      return result._doc;
    })
    .catch((err) => {
      console.error(err);
    });
};
