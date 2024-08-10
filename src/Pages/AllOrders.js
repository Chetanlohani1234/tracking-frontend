import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import UserList from "../Section/User/UserList";
import HeaderBar from "../Common/Headerbar";
import AllOrder from "../Section/Order/AllOrder";

const AllOrders = () => {
  useEffect(() => {
    document.title = "All User";
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
              <AllOrder />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllOrders;
