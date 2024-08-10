import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import HeaderBar from "../Common/Headerbar";
import EditCategory from "../Section/Categories/EditCategory";

const CategoryEdit = () => {
  useEffect(() => {
    document.title = "Edit Category ";
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
              <EditCategory />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryEdit;
