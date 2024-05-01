import mongoose from "mongoose";

const Color_Schema = mongoose.Schema({
    _id: { type: String, required: true },
    colorStr: {
      type: String,
      require: true,
    },
}, { autoCreate: false });

const Color = mongoose.model("Color", Color_Schema);

export default Color;
