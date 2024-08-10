import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DataService from "../../services/data.service";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import greenbar from "../../Images/greenbar.png";

const ExpenseList = () => {
  const params = useParams();
  const [addExpensePopUp, setAddExpensePopUp] = useState(false);
  const [editExpensePopUp, setEditExpensePopUp] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [btnloading, setbtnloading] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllExpense();
  }, []);

  const userId = JSON.parse(localStorage.getItem("userId"));

  const getAllExpense = () => {
    setLoading(true);
    DataService.getAllExpense()
      .then((data) => {
        setData(data?.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        toast.error(resMessage, {});
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setbtnloading(true);

    if (!date) {
      toast.error(" Date is required");
      setbtnloading(false);
      return;
    }
    if (!amount) {
      toast.error(" Amount is required");
      setbtnloading(false);
      return;
    }
    if (amount <= 0) {
      toast.error("Amount must be greater than 0");
      setbtnloading(false);
      return;
    }
    if (!description) {
      toast.error(" Description is required");
      setbtnloading(false);
      return;
    }
    const data = {
      date: date,
      amount: amount,
      description: description,
    };
    DataService.addExpense(data, userId).then(
      () => {
        toast.success("Expense Added Successfully!!!");
        getAllExpense();
        setAddExpensePopUp(false);
        setDate("");
        setAmount("");
        setDescription("");
        setbtnloading(false);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(resMessage);
        setbtnloading(false);
      }
    );
  };

  const handleEditClick = (id) => {
    setCurrentItemId(id);
    getExpenseId(id);
    setEditExpensePopUp(true);
  };

  const getExpenseId = (id) => {
    DataService.getExpenseById(id)
      .then((data) => {
        setDate(data?.data?.data?.date);
        setAmount(data?.data?.data?.amount);
        setDescription(data?.data?.data?.description);
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        toast.error(resMessage, {});
      });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setbtnloading(true);
    if (!date) {
      toast.error(" Date is required");
      setbtnloading(false);
      return;
    }
    if (!amount) {
      toast.error(" Amount is required");
      setbtnloading(false);
      return;
    }
    if (amount <= 0) {
      toast.error("Amount must be greater than 0");
      setbtnloading(false);
      return;
    }
    if (!description) {
      toast.error(" Description is required");
      setbtnloading(false);
      return;
    }



    const data = {};
    data.date = date;
    data.amount = amount;
    data.description = description;
    DataService.updateExpenseById(data, currentItemId, userId).then(
      () => {
        toast.success("Expenses Updated Successfully!!", {
          position: "top-right",
        });
        getAllExpense();
        setEditExpensePopUp(false);
        setDate("");
        setAmount("");
        setDescription("");
        setbtnloading(false);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setbtnloading(false);
        toast.error(resMessage, {});
      }
    );
  };

  const deleteExpense = (item) => {
    setLoading(true);
    DataService.deleteExpense(item).then(
      () => {
        toast.success("Expenses deleted successfully!", {});
        setLoading(false);
        getAllExpense();
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.msg) ||
          error.message ||
          error.toString();
        setLoading(false);
      }
    );
  };

  const confirmDelete = (userId) => {
    setDeleteUserId(userId);
  };

  const cancelDelete = () => {
    setDeleteUserId(null);
  };

  const executeDelete = () => {
    if (deleteUserId) {
      deleteExpense(deleteUserId);
      setDeleteUserId(null);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="main-sec-dashboard">
        <div className="top-bar-content top-bar-flex">
          <h2>All Expenses</h2>
          <button className="main-btn" onClick={() => setAddExpensePopUp(true)}>
            Add New Expense
          </button>
        </div>
        <div className="main-sec-expense">
          <div className="inner-sec-expense">
            <div className="box-sec-expense">
              <p className="current_balance">Current Balance</p>
              <div className="inner-box-sec-expense">
                <p className="dollar_value">$56500</p>
                <div className="bar_img">
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    src={greenbar}
                  />
                </div>
              </div>
              <p className="percentage_value">+19%</p>
            </div>
            <div className="box-sec-expense sky">
              <p className="current_balance"> Total Income</p>
              <div className="inner-box-sec-expense">
                <p className="dollar_value">$56500</p>
                <div className="bar_img">
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    src={greenbar}
                  />
                </div>
              </div>
              <p className="percentage_value">+19%</p>
            </div>
            <div className="box-sec-expense">
              <p className="current_balance">Current Balance</p>
              <div className="inner-box-sec-expense">
                <p className="dollar_value">$56500</p>
                <div className="bar_img">
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    src={greenbar}
                  />
                </div>
              </div>
              <p className="percentage_value">+19%</p>
            </div>
          </div>
        </div>
        <div className="main-sec-expense-table">
          <table className="table ">
            <thead>
              <tr className="senior_div">
                <th>S.No.</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Date</th>
                <th className="action-end">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              )}
              {data &&
                data.length > 0 &&
                data?.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item?.description}</td>
                    <td>{item?.amount}</td>
                    <td>{moment(item?.date)?.format("DD-MM-YYYY")}</td>
                    <td className="action-end action-icon">
                      <i
                        className="fa fa-edit action-link edit-icon"
                        onClick={() => handleEditClick(item?._id)}
                      ></i>
                      <i
                        onClick={() => confirmDelete(item._id)}
                        class="fas fa-trash delete-icon"
                      ></i>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* ######################################## add expense popUp ################################################### */}

        {addExpensePopUp && (
          <div className="main-sec-popup">
            <div className="inner-sec-popup">
              <div className="top-hedind-sec-popup">
                <h2>Add Expense</h2>
              </div>
              <div className="label-main-sec">
                <div className="label-field">
                  <label>
                    Select Date <span className="red-required">* </span>
                  </label>
                </div>
                <div className="label-field">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Date"
                    max={today}
                  />
                </div>
                <div className="label-field">
                  <label>
                    Amount <span className="red-required">* </span>
                  </label>
                </div>
                <div className="label-field">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                  />
                </div>
                <div className="label-field">
                  <label>
                    Description <span className="red-required">* </span>
                  </label>
                </div>
                <div className="label-field">
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                  />
                </div>
                <div className="bottom-pop-btn">
                  <button
                    className="main-btn"
                    onClick={() => setAddExpensePopUp(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="main-btn"
                    onClick={handleSubmit}
                    disabled={btnloading}
                  >
                    {btnloading ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* ######################################## Edit expense popUp ################################################### */}

        {editExpensePopUp && (
          <div className="main-sec-popup">
            <div className="inner-sec-popup">
              <div className="top-hedind-sec-popup">
                <h2>Edit Expense</h2>
              </div>
              <div className="label-main-sec">
                <div className="label-field">
                  <label>
                    Select Date <span className="red-required">* </span>
                  </label>
                </div>
                <div className="label-field">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    max={today}
                    placeholder="Date"
                  />
                </div>
                <div className="label-field">
                  <label>
                    Amount <span className="red-required">* </span>
                  </label>
                </div>
                <div className="label-field">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                  />
                </div>
                <div className="label-field">
                  <label>
                    Description <span className="red-required">* </span>
                  </label>
                </div>
                <div className="label-field">
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                  />
                </div>
                <div className="bottom-pop-btn">
                  <button
                    className="main-btn"
                    onClick={handleSubmitForm}
                    disabled={btnloading}
                  >
                    {btnloading ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      "Save"
                    )}
                  </button>
                  <button
                    className="main-btn"
                    onClick={() => setEditExpensePopUp(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ############################################## delete holiday Pop   ################################## */}

        {deleteUserId && (
          <div className="main_email_outer">
            <div className="delete_div_a">
              <div className="delete_div">
                <i
                  id="exclamation_sign"
                  className="fas fa-exclamation-triangle"
                ></i>
                <h3>Are you sure?</h3>
                <p>
                  This action will delete all details about the Expense,
                  <br />
                  You won’t be able to revert this!
                </p>
                <div className="button_div">
                  <button
                    onClick={executeDelete}
                    type="button"
                    className="btn btn-danger"
                  >
                    Yes, delete it
                  </button>
                  <button
                    onClick={cancelDelete}
                    type="button"
                    className="btn btn-outline-danger"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ExpenseList;
