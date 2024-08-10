import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import UserList from "../Section/User/UserList";
import HeaderBar from "../Common/Headerbar";
import Items from "../Section/Items/Items";
import SubCategory from "../Section/Categories/SubCategory";


const AllSubCategory = () => {
  useEffect(() => {
    document.title = "All SubCategory";
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
              <SubCategory />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllSubCategory;
