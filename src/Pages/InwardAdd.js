import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import UserList from "../Section/User/UserList";
import HeaderBar from "../Common/Headerbar";
import AddInward from "../Section/Inward/AddInward";



const InwardAdd = () => {
  useEffect(() => {
    document.title = "All Item";
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
              <AddInward />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InwardAdd;
