import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DataService from "../../services/data.service";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";

const LeaveStatusList = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [leave, setLeave] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editPopUP, setEditPopUp] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [currentItemId, setCurrentItemId] = useState(null);
  const [name, setName] = useState("");
  const [employeeId, setemployeeId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [btnloading, setbtnloading] = useState(false);
  const [viewPopUp, setViewPopUp] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    getLeave();
  }, []);

  const userId = JSON.parse(localStorage.getItem("userId"));

  const getLeave = () => {
    setLoading(true);
    DataService.getAllLeave()
      .then((data) => {
        setData(data.data.data);
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

  const handleEditClick = (id) => {
    setCurrentItemId(id);
    getLeaveById(id);
    setEditPopUp(true);
  };
  const handleViewClick = (id) => {
    setViewPopUp(true);
    getLeaveById(id);
  };
  const getLeaveById = (id) => {
    DataService.getAllLeaveById(id).then((data) => {
      setLeave(data.data.data);
      setName(data?.data?.data?.name);
      setemployeeId(data?.data?.data?.employeeId);
      setStartDate(data?.data?.data?.startDate);
      setEndDate(data?.data?.data?.endDate);
      setSelectedOption(data?.data?.data?.status);
      setReason(data?.data?.data?.reason);
      setRejectReason(data?.data?.data?.rejectReason);
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   const data = {};
  //   data.status = selectedOption;
  //   data.reason = reason;
  //   DataService.updateLeaveStatus(data, currentItemId, userId).then(
  //     () => {
  //       toast.success("Status Updated Successfully!!");
  //       getLeave();
  //       setEditPopUp(false);
  //     },
  //     (error) => {
  //       const resMessage =
  //         (error.response &&
  //           error.response.data &&
  //           error.response.data.message) ||
  //         error.message ||
  //         error.toString();
  //       setLoading(false);
  //       toast.error(resMessage, {});
  //     }
  //   );
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setbtnloading(true);
    const data = {
      status: selectedOption,
      rejectReason: rejectReason,
    };

    DataService.updateLeaveStatus(data, currentItemId, userId).then(
      (response) => {
        if (response.data.success) {
          toast.success("Status Updated Successfully!!");
        } else {
          toast.error(response.data.message || "An error occurred");
        }
        getLeave();
        setEditPopUp(false);
        setbtnloading(false);
        setRejectReason("");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        setbtnloading(false);
        toast.error(resMessage, {});
      }
    );
  };

  const deleteLeave = (userId) => {
    DataService.deleteLeave(userId).then(
      () => {
        toast.success("Leave deleted successfully", {});
        getLeave();
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

  return (
    <>
      <ToastContainer />
      <div className="main-sec-dashboard">
        <div className="top-bar-content">
          <h2>All Leaves</h2>
        </div>

        <table className="table ">
          <thead>
            <tr className="senior_div">
              <th>S.No.</th>
              <th>Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th className="action-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
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
                    {user?.startDate
                      ? moment(user.startDate).format("DD/MM/YYYY")
                      : "N/A"}
                  </td>
                  <td>
                    {user?.endDate
                      ? moment(user.endDate).format("DD/MM/YYYY")
                      : "N/A"}
                  </td>
                  {/* <td>
                    {user?.status === "Pending"
                      ? user.adminApprovalStatus
                      : user.status}
                  </td> */}
                  <td>
                    {user?.status === "Pending"
                      ? user.adminApprovalStatus
                      : user.status === "Rejected"
                      ? user.tlApprovalStatus === "Rejected"
                        ? "Rejected by TL"
                        : user.adminApprovalStatus === "Rejected"
                        ? "Rejected by Admin"
                        : user.hrApprovalStatus === "Rejected"
                        ? "Rejected by HR"
                        : user.status
                      : user.status}
                  </td>
                  <td className="actionButtons action-end">
                    <div className="action-icon">
                      <i
                        className="fas fa-eye"
                        onClick={() => handleViewClick(user?._id)}
                      ></i>
                      <i
                        className="fa fa-edit edit-icon"
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
                <td colSpan="6">No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* ######################################### edit leave Status PopUp ######################################################  */}

      {editPopUP && (
        <div className="main-sec-popup">
          <div className="inner-sec-popup">
            <div className="top-hedind-sec-popup">
              <h2>Edit Leave Status</h2>
            </div>
            <div className="edit-leave-popup">
              <table class="table ">
                <tbody>
                  <tr>
                    <td>Name :</td>
                    <td>{name}</td>
                  </tr>
                  <tr>
                    <td>Employee Id :</td>
                    <td>{employeeId}</td>
                  </tr>
                  <tr>
                    <td>start Date :</td>
                    <td>{moment(startDate).format("DD/MM/YYYY")}</td>
                  </tr>
                  <tr>
                    <td>End Date :</td>
                    <td>{moment(endDate).format("DD/MM/YYYY")}</td>
                  </tr>
                  <tr>
                    <td>Leave Reason :</td>
                    <td>{reason}</td>
                  </tr>

                  <tr>
                    <td>status :</td>
                    <select
                      className="select-option-border"
                      value={selectedOption}
                      onChange={(e) => setSelectedOption(e.target.value)}
                    >
                      <option value="">Select an option</option>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </tr>
                  {selectedOption === "Rejected" && (
                    <tr>
                      <td>Reject Reason :</td>
                      <input
                        className="input-field-border"
                        type="text"
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                      ></input>
                    </tr>
                  )}
                </tbody>
              </table>
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
      {/* ######################################### edit leave Status PopUp ######################################################  */}

      {viewPopUp && (
        <div className="main-sec-popup">
          <div className="inner-sec-popup">
            <div className="top-hedind-sec-popup">
              <h2>View Leave Status</h2>
            </div>
            <div className="edit-leave-popup">
              <table class="table ">
                <tbody>
                  <tr>
                    <td>Name :</td>
                    <td>{name}</td>
                  </tr>
                  <tr>
                    <td>Employee Id :</td>
                    <td>{employeeId}</td>
                  </tr>
                  <tr>
                    <td>start Date :</td>
                    <td>{moment(startDate).format("DD/MM/YYYY")}</td>
                  </tr>
                  <tr>
                    <td>End Date :</td>
                    <td>{moment(endDate).format("DD/MM/YYYY")}</td>
                  </tr>
                  <tr>
                    <td>Leave Reason :</td>
                    <td>{reason}</td>
                  </tr>

                  <tr>
                    <td>Main Status :</td>
                    <td>{leave?.status}</td>
                  </tr>
                  <tr>
                    <td>Admin Status :</td>
                    <td>{leave?.adminApprovalStatus}</td>
                  </tr>
                  <tr>
                    <td>HR Status :</td>
                    <td>{leave?.hrApprovalStatus}</td>
                  </tr>
                  <tr>
                    <td>TL Status :</td>
                    <td>{leave?.tlApprovalStatus}</td>
                  </tr>

                  {leave?.rejectReason && (
                    <tr>
                      <td>Reject Reason :</td>
                      <td>{leave.rejectReason}</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="bottom-pop-btn">
                <button
                  className="main-btn"
                  onClick={() => setViewPopUp(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                This action will delete all details about the Leave,
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

export default LeaveStatusList;
