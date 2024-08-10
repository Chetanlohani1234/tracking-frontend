import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import ViewProjectList from "../Section/Project/ViewProjectList";
import HeaderBar from "../Common/Headerbar";

const ViewProject = () => {
  useEffect(() => {
    document.title = "Project Details";
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
            <ViewProjectList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProject;
