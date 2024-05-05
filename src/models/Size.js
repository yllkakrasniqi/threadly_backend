import mongoose from "mongoose";

const SizeSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
    },
    standard: {
        type: String,
        maxlength: 2
    },
});

const Size = mongoose.model("Size", SizeSchema);

export default Size