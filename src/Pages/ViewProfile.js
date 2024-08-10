import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import ViewProfileList from "../Section/Profile/ViewProfileList";
import HeaderBar from "../Common/Headerbar";

const ViewProfile = () => {
  useEffect(() => {
    document.title = "View Profile";
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
            <ViewProfileList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
