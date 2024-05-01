import mongoose from "mongoose";

const BrandSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Please enter the Brand name'],
  },
});

const Brand = mongoose.model("Brand", BrandSchema);

export default Brand