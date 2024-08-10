import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import UserList from "../Section/User/UserList";
import HeaderBar from "../Common/Headerbar";
import AllSuppliers from "../Section/Suppliers/AllSuppliers";

const AllSupplier = () => {
  useEffect(() => {
    document.title = "All Supplier";
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
              <AllSuppliers />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllSupplier;
