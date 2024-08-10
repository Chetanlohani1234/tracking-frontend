import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import DashboardList from "../Section/dashboard/dashboardList";
import HeaderBar from "../Common/Headerbar";

const Dashboard = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    document.title = "Dashboard";
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
              <DashboardList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
