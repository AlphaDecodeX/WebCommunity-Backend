import mongoose from 'mongoose';

const dbSchema = mongoose.Schema({
    channel: String, // Intraday, Swing, Investing .....
    globalMessages: [
        {
            username: String,
            messages: [
                {
                    date: String,
                    timeStamp: String,
                    message: String
                }
            ]
        }
    ],
});

// Collection inside the Database
export default mongoose.model("Messages", dbSchema);