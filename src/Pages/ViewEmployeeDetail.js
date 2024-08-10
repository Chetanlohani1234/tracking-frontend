import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import ViewEmployeeDetailList from "../Section/Project/ViewEmployeeDetailsList";
import HeaderBar from "../Common/Headerbar";

const ViewEmployeeDetails = () => {
  useEffect(() => {
    document.title = "Employee Details";
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
            <ViewEmployeeDetailList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployeeDetails;
