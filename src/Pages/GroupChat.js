import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import GroupChatList from "../Section/Chat/GroupChatList";
import HeaderBar from "../Common/Headerbar";

const GroupChat = () => {
  useEffect(() => {
    document.title = "All Chat";
  }, []);
  return (
    <div className="main-sec-tracking">
      <HeaderBar />
      <div className="main-sec-tracking-flex">
        <div className="left-side-tarcking">
          <Sidebar />
        </div>
        <div className="Right-side-tarcking">
          <div className="inner-right-side-tracking">
            <GroupChatList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupChat;
