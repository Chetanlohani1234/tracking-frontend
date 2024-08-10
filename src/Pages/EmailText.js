import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import EmailTextList from "../Section/EmailTextList/EmailTextList";
import HeaderBar from "../Common/Headerbar";

const EmialText = () => {
  useEffect(() => {
    document.title = "Email";
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
            <EmailTextList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmialText;
