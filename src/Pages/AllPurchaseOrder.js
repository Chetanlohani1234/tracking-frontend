import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import UserList from "../Section/User/UserList";
import HeaderBar from "../Common/Headerbar";
import AllPo from "../Section/PurchaseOrder/allPo";


const AllPurchaseOrder = () => {
  useEffect(() => {
    document.title = "All Purchase Order";
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
              <AllPo />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllPurchaseOrder;
