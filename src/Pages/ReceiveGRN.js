import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import HeaderBar from "../Common/Headerbar";
import GRN from "../Section/Receive/grn";

const RoleManagement = () => {
  useEffect(() => {
    document.title = "Receive GRN";
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
              <div className="main-sec-management">
                <GRN />
     
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoleManagement;
