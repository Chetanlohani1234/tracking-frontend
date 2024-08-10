import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import ViewTeamList from "../Section/TeamManagement/ViewTeamList";
import HeaderBar from "../Common/Headerbar";

const ViewTeam = () => {
  useEffect(() => {
    document.title = "View Team";
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
            <ViewTeamList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTeam;
