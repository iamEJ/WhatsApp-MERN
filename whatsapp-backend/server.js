// importing all the stuff
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors";

// app config
const app = express();
const port = process.env.PORT || 9000;

//pusher info
const pusher = new Pusher({
  appId: "",
  key: "",
  secret: "",
  cluster: "eu",
  encrypted: true,
});

// middleware
app.use(express.json());

app.use(cors());

// DB config
const connection_url = "mongodbURL"; // get from mongodb

mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("DB connected");

  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log("Error trigering Pusher");
    }
  });
});
// ???

// api routes
app.get("/", (request, response) => response.status(200).send("Hello world"));

app.get("/api/v1/messages/sync", (request, response) => {
  Messages.find((error, data) => {
    if (error) {
      response.status(500).send(error);
    } else {
      response.status(200).send(data);
    }
  });
});

app.post("/api/v1/messages/new", (request, response) => {
  const dbMessage = request.body;

  Messages.create(dbMessage, (error, data) => {
    if (error) {
      response.status(500).send(error);
    } else {
      response.status(201).send(`new message created: \n ${data}`);
    }
  });
});
// listener
app.listen(port, () => console.log(`Listening on local port: ${port}`));
