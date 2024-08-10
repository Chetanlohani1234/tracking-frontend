import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import LeaveStatusList from "../Section/LeaveStatus/LeaveStatusList";
import HeaderBar from "../Common/Headerbar";

const LeaveStatus = () => {
  useEffect(() => {
    document.title = "All Leaves";
  }, []);
  return (
    <div className="main-sec-tracking">
      <HeaderBar/>
      <div className="main-sec-tracking-flex">
        <div className="left-side-tarcking">
          <Sidebar />
        </div>
        <div className="Right-side-tarcking">
          <div className="inner-right-side-tracking">
            <LeaveStatusList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveStatus;
