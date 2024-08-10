import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import LeaveRoleManagement from "../Section/Role-Management/LeaveRoleManagement";
import HolidayRole from "../Section/Role-Management/HolidayRole";
import UserRoleManagement from "../Section/Role-Management/UserRoleManagement";
import ExpenseRoleManagement from "../Section/Role-Management/ExpenseRoleManagement";
import AddTeamRoleManagement from "../Section/Role-Management/AddTeamRoleManagement";
import HeaderBar from "../Common/Headerbar";

const RoleManagement = () => {
  useEffect(() => {
    document.title = "Role Management";
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
                <div class="top-bar-content">
                  <h2>Role Management</h2>
                </div>
                <div className="role-management-main-box">
                  <div className="inner-box-rolemanagement">
                    <LeaveRoleManagement />
                  </div>
                  <div className="inner-box-rolemanagement">
                    <HolidayRole />
                  </div>
                  <div className="inner-box-rolemanagement">
                    <UserRoleManagement />
                  </div>
                  <div className="inner-box-rolemanagement">
                    <ExpenseRoleManagement />
                  </div>
                  <div className="inner-box-rolemanagement">
                    <AddTeamRoleManagement />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoleManagement;
