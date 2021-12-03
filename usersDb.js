import mongoose from "mongoose";

const dbSchema = mongoose.Schema({
    username: String
})

export default mongoose.model("Users", dbSchema);