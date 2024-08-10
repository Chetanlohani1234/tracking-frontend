import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import ExpenseList from "../Section/Expense/ExpenseList";
import HeaderBar from "../Common/Headerbar";

const Expense = () => {
  useEffect(() => {
    document.title = "All Expenses ";
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
            <ExpenseList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expense;
