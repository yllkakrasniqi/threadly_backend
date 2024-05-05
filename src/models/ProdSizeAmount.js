import mongoose from "mongoose";

const ProdSizeAmountSchema = mongoose.Schema({
  prod_color_id: {
    type: mongoose.Schema.ObjectId,
    ref: "ProdColor",
  },
  size_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Size",
  },
  quantity: {
    type: Number,
    default: 0,
  },
});

const ProdSizeAmount = mongoose.model("ProdSizeAmount", ProdSizeAmountSchema);

export default ProdSizeAmount;
