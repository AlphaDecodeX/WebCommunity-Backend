import express from 'express';
import mongoose from "mongoose";

// app config
const app = express();
const port = process.env.PORT || 9000;

// middle layers

// DB Config

// API EndPoints

app.get("/", (req, res) => res.status(200).send("Hello People, Welcome to the WebCommunity !"));

app.listen(port, () => console.log(`Listening to the Port ${port}`));