import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import ChatList from "../Section/Chat/ChatList";

const Chat = () => {
  useEffect(() => {
    document.title = "All Chat";
  }, []);
  return (
    <div className="main-sec-tracking">
      <div className="left-side-tarcking">
        <Sidebar />
      </div>
      <div className="Right-side-tarcking">
        <div className="inner-right-side-tracking">
        <ChatList />
        </div>
      </div>
    </div>
  );
};

export default Chat;
