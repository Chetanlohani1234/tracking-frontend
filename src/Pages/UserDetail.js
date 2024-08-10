import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import UserDeatilList from "../Section/User/UserDetailList";
import HeaderBar from "../Common/Headerbar";

const UserDetail = () => {
  useEffect(() => {
    document.title = "User Detail";
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
              <UserDeatilList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetail;
