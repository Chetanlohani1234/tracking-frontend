import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import ViewTeamPerformanceList from "../Section/TeamManagement/ViewTeamPerformaceList";
import HeaderBar from "../Common/Headerbar";

const ViewTeamPerformance = () => {
  useEffect(() => {
    document.title = "Team Performance";
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
            <ViewTeamPerformanceList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTeamPerformance;
