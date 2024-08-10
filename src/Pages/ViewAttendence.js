import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import ViewAttendenceList from "../Section/Attendence/ViewAttendenceList";
import HeaderBar from "../Common/Headerbar";

const ViewAttendence = () => {
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
            <ViewAttendenceList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAttendence;
