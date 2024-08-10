import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import TeamManagementList from "../Section/TeamManagement/TeamManagementList";
import HeaderBar from "../Common/Headerbar";

const TeamManagement = () => {
  useEffect(() => {
    document.title = "Team Mangement";
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
            <TeamManagementList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamManagement;
