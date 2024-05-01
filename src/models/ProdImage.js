import mongoose from "mongoose";

const ProdImage_Schema = mongoose.Schema(
  {
    _id: {
      type: String,
      require: true,
    },
    filename: {
      type: String,
      require: true,
    },
    path: {
      type: String,
      require: true,
    },
    prod_color_id: { type: mongoose.Schema.ObjectId, ref: "ProdColor" },
  },
  { autoCreate: false }
);

const ProdImage = mongoose.model("ProdImage", ProdImage_Schema);

export default ProdImage;
