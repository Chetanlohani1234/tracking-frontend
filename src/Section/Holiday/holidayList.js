import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DataService from "../../services/data.service";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";

const HolidayList = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addHolidayPopUP, setAddHolidayPopUP] = useState(false);
  const [editPopUP, setEditPopUp] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [name, setName] = useState("");
  const [holidayDate, setHolidayDate] = useState("");
  const [holidayName, setHolidayName] = useState("");
  const [date, setDate] = useState("");
  const [btnloading, setbtnloading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    getHoliday();
  }, []);

  const userId = JSON.parse(localStorage.getItem("userId"));

  const getHoliday = () => {
    setListLoading(true);
    DataService.getAllHoliday()
      .then((data) => {
        setData(data.data.data);
        setListLoading(false);
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setListLoading(false);
        toast.error(resMessage, {});
      });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setbtnloading(true);

    const data = {};
    data.name = name;
    data.date = holidayDate;

    DataService.addHoliday(data, userId).then(
      () => {
        toast.success("Holiday Added Successfully!!!");
        getHoliday();
        setAddHolidayPopUP(false);
        setHolidayDate("");
        setName("");
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
        setLoading(false);
        toast.error(resMessage, {});
      }
    );
  };

  const handleEditClick = (id) => {
    setCurrentItemId(id);
    getHolidayById(id);
    setEditPopUp(true);
  };

  const getHolidayById = (id) => {
    DataService.getHolidayById(id)
      .then((data) => {
        setAllData(data?.data?.data);
        setHolidayName(data?.data?.data?.name);
        setDate(data?.data?.data?.date);
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
    setLoading(true);
    setbtnloading(true);

    const data = {};
    data.name = holidayName;
    data.date = date;

    DataService.updateHolidayById(data, currentItemId, userId).then(
      () => {
        toast.success("Holiday Updated Successfully!!!");
        getHoliday();
        setEditPopUp(false);
        setbtnloading(false);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response?.data &&
            error.response.data?.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        setbtnloading(false);
        toast.error(resMessage, {});
      }
    );
  };

  const deleteLeave = (userId) => {
    DataService.deleteHoliday(userId).then(
      () => {
        toast.success("Holiday deleted successfully", {});
        getHoliday();
        setLoading(false);
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.msg) ||
          error.message ||
          error.toString();
        toast.error(resMessage, {});
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
      deleteLeave(deleteUserId);
      setDeleteUserId(null);
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <ToastContainer />
      <div className="main-sec-dashboard">
        <div className="top-bar-content top-bar-flex">
          <h2>All Holidays</h2>
          <button className="main-btn" onClick={() => setAddHolidayPopUP(true)}>
            Add Holiday
          </button>
        </div>
        <div className="main-sec-holiday">
          <table className="table">
            <thead>
              <tr className="senior_div">
                <th>S.No.</th>
                <th>Title</th>
                <th>Date</th>

                <th className="action-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {listLoading && (
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              )}
              {data && data.length > 0 ? (
                data.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="users_img_get">{user.name}</div>
                    </td>
                    <td>
                      {user?.date
                        ? moment(user.date).format("DD/MM/YYYY")
                        : "N/A"}
                    </td>
                    <td className="actionButtons action-end">
                      <div className="action-icon">
                        <i
                          className="fa fa-edit action-link edit-icon"
                          onClick={() => handleEditClick(user?._id)}
                        ></i>
                        <i
                          onClick={() => confirmDelete(user._id)}
                          className="fas fa-trash delete-icon"
                        ></i>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No Holiday found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ################################## Add holiday popup ################################################ */}

      {addHolidayPopUP && (
        <div className="main-sec-popup">
          <div className="inner-sec-popup">
            <div className="top-hedind-sec-popup">
              <h2>Add Holiday</h2>
            </div>
            <div className="label-main-sec">
              <form onSubmit={handleAddSubmit}>
                <div className="label-field">
                  <label>
                    Holiday <span className="red-required">* </span>
                  </label>
                </div>
                <div className="label-field">
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Holiday"
                  />
                </div>
                <div className="label-field">
                  <label>
                    Select Date <span className="red-required">* </span>
                  </label>
                </div>
                <div className="label-field">
                  <input
                    required
                    type="date"
                    value={holidayDate}
                    onChange={(e) => setHolidayDate(e.target.value)}
                    min={getCurrentDate()}
                    placeholder="Date"
                  />
                </div>
                <div className="bottom-pop-btn">
                  <button
                    className="main-btn"
                    disabled={btnloading}
                    type="submit"
                  >
                    {btnloading ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      "Add"
                    )}
                  </button>
                  <button
                    className="main-btn"
                    onClick={() => setAddHolidayPopUP(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ################################## edit holiday popup ################################################ */}
      {editPopUP && (
        <div className="main-sec-popup">
          <div className="inner-sec-popup">
            <div className="top-hedind-sec-popup">
              <h2>Edit Holiday</h2>
            </div>
            <div className="label-main-sec">
              <div className="label-field">
                <label>
                  Holiday <span className="red-required">* </span>
                </label>
              </div>
              <div className="label-field">
                <input
                  type="text"
                  value={holidayName}
                  onChange={(e) => setHolidayName(e.target.value)}
                  placeholder="Holiday"
                />
              </div>
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
                />
              </div>
              <div className="bottom-pop-btn">
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
                <button
                  className="main-btn"
                  onClick={() => setEditPopUp(false)}
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
                This action will delete all details about the holiday,
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
    </>
  );
};

export default HolidayList;
