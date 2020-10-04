import React, { useEffect } from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import Chat from "./Components/Chat";
import Pusher from "pusher-js";

function App() {
  useEffect(() => {
    //run this once
    const pusher = new Pusher("aecbddf8ae851a695716", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (data) {
      alert(JSON.stringify(data));
    });
  }, []);

  return (
    <div className="app">
      <div className="app_body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
