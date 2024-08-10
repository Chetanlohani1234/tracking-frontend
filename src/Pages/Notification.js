import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import AllNotiFicationList from "../Section/NotiFication/NotiFicationList";
import HeaderBar from "../Common/Headerbar";

const AllNotiFication = () => {
  useEffect(() => {
    document.title = "All Notifications";
  }, []);
  return (
    <>
      <div className="main-sec-tracking">
        <HeaderBar />
        <div className="main-sec-tracking-flex">
          <div className="left-side-tarcking">
            <Sidebar />
          </div>
          <div className="Right-side-tarcking">
            <div className="inner-right-side-tracking">
              <AllNotiFicationList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllNotiFication;
