import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import HolidayList from "../Section/Holiday/holidayList";
import HeaderBar from "../Common/Headerbar";

const Holiday = () => {
  useEffect(() => {
    document.title = "All Holiday";
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
            <HolidayList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Holiday;
