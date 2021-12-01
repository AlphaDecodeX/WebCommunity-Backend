import express from 'express';
import mongoose from "mongoose";
import messagesDb from "./messagesDb.js";
import Cors from 'cors';
import channelsDb from './channelsDb.js';

// app config
const app = express();
const port = process.env.PORT || 8001;

// middle layers (Password --> EhLS71eo4CvjYQbU)
app.use(express.json());
app.use(Cors());

// DB Config
const connection_url = "mongodb+srv://admin:EhLS71eo4CvjYQbU@cluster0.fkebv.mongodb.net/webCommunity?retryWrites=true&w=majority"
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Database connected!")).catch(err => console.log(err));

// API EndPoints

// Initializing User specific Database after SignUp
app.post('/signUpUser', (req, res) => {
    const data = req.body; // {username: "", channels: ["", ""]}

    for (let channel in data.channels) {
        console.log(data.channels[channel]);
        messagesDb.findOneAndUpdate(
            { channel: data.channels[channel] },
            { "$push": { globalMessages: { username: data.username } } },
            (err, data) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).send(data);
                }
            }
        );
    }

});

// Creating Channels.....
app.post('/createChannel', (req, res) => {
    const data = req.body; // {channel: ""}

    messagesDb.create({
        channel: data.channel
    }, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})

// Getting Messages data

app.get('/getChannelMessages', (req, res) => {
    const data = req.body; // {channel: ""}
    messagesDb.find({ channel: data.channel }, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})

// Sending a Message

// app.post('/postChannelMessages', (req, res) => {
//     const data = req.body; 
//     // {channel: "", username: "", message: "", date: "", timestamp: ""}
//     const dataToBeInserted = {
//         channel: data.channel,
//         globalMessages: [
//             {}
//         ]
//     }
//     messagesDb.create()        
// })

app.listen(port, () => console.log(`Listening to the Port ${port}`));