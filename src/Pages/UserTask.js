import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import SingleUserTaskList from "../Section/SingleUserTaskList/SingleUserList";
import HeaderBar from "../Common/Headerbar";

const UserTask = () => {
  useEffect(() => {
    document.title = "All Users Tasks";
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
            <SingleUserTaskList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTask;
