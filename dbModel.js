import mongoose from 'mongoose';

const dbSchema = mongoose.Schema({
    channel: String,
    message: String,
    email: String,
    userName: String
});

// Collection inside the Database
export default mongoose.model("Messages", dbSchema);