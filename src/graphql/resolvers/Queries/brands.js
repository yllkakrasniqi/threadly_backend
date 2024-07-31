import Brand from "../../../models/Brand.js";

export const brands = async (parent, args, context) => {
  return Brand.find()
    .then((result) => {
      return result.map((r) => ({ ...r._doc }));
    })
    .catch((err) => {
      console.error(err);
    });
};
