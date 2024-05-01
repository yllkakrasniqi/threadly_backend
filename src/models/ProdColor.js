import mongoose from "mongoose";

const ProdColor_Schema = mongoose.Schema({
  productID: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    require: true,
  },
  colorID: {
    type: String,
    ref: "Color",
    require: true,
  },
});

const ProdColor = mongoose.model("ProdColor", ProdColor_Schema);

export default ProdColor;
