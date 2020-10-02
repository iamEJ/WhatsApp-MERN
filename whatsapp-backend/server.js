// importing all the stuff
import express from "express";

// app config
const app = express();
const port = process.env.PORT || 9000;
// middleware

// DB config

// ???

// api routes
app.get("/", (request, response) => response.status(200).send("Hello world"));
// listener
app.listen(port, () => console.log(`Listening on local port: ${port}`));
