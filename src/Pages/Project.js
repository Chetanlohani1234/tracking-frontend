import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import ProjectList from "../Section/Project/ProjectList";
import HeaderBar from "../Common/Headerbar";

const Project = () => {
  useEffect(() => {
    document.title = "All Project";
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
            <ProjectList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
