import React from "react";
import "./css/SidebarChat.css";
import { Avatar } from "@material-ui/core";

function SidebarChat() {
  return (
    <div className="sidebarChat">
      <Avatar />
      <div className="sidebarChat_info">
        <h2>Room name</h2>
        <p>Last message...</p>
      </div>
    </div>
  );
}

export default SidebarChat;
