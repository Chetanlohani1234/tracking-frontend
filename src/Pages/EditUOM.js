import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import HeaderBar from "../Common/Headerbar";
import UOMEdit from "../Section/UOM/uomedit";

const EditUOM = () => {
  useEffect(() => {
    document.title = "Edit Team";
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
            <UOMEdit />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUOM;
