import express from 'express';
import mongoose from "mongoose";
import Messages from "./dbModel.js";
// app config
const app = express();
const port = process.env.PORT || 9000;
// middle layers (Password --> EhLS71eo4CvjYQbU)
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
})
// DB Config
const connection_url = "mongodb+srv://admin:EhLS71eo4CvjYQbU@cluster0.fkebv.mongodb.net/webCommunity?retryWrites=true&w=majority"
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Database connected!")).catch(err => console.log(err));

// API EndPoints

app.get("/", (req, res) => res.status(200).send("Hello People, Welcome to the WebCommunity !"));

app.post("/v2/posts", (req, res) => {

    const dbMessages = req.body;

    Messages.create(dbMessages, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
});

app.get("/v2/posts", (req, res) => {
    Messages.find((err, data) => { // Messages.find({filter}, (error handling))
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
})

app.listen(port, () => console.log(`Listening to the Port ${port}`));