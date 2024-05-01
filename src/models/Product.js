import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  brandID: { type: mongoose.Schema.ObjectId, ref: "Brand", require: true },
  name: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  gender: {
    type: String,
    maxlength: 1,
  },
  status: {
    type: Number,
    maxlength: 1,
  },
});

const Product = mongoose.model("Product", ProductSchema);

export default Product
