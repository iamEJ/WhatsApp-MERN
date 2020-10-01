import React from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar";

function App() {
  return (
    <div className="app">
      <div className="app_body">
        <Sidebar />
        <div>
          This is the chat
          {/* <Chat /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
