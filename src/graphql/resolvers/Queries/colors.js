import Color from "../../../models/Color.js";

export const colors = async (parent, args, context) => {
  return Color.find()
    .then((result) => {
      return result.map((r) => ({ ...r._doc }));
    })
    .catch((err) => {
      console.error(err);
    });
};
