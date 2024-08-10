import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import AttendenceList from "../Section/Attendence/AttendenceList";
import HeaderBar from "../Common/Headerbar";

const Attendence = () => {
  useEffect(() => {
    document.title = "All Attendence";
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
            <AttendenceList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendence;
