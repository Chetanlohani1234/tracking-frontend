import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import UserList from "../Section/User/UserList";
import HeaderBar from "../Common/Headerbar";
import Items from "../Section/Items/Items";


const AllItems = () => {
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
              <Items />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllItems;
