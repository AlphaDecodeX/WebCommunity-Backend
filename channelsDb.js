import mongoose from "mongoose";

const dbSchema = mongoose.Schema({
    channels: [String]
})

export default mongoose.model("Channels", dbSchema);