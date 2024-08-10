import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataService from "../../services/data.service";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";

const SingleUserTaskList = () => {
  const imgRef = useRef();
  const [data, setData] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addUserPopUp, setAddUserPopUp] = useState(false);
  const [editProjectPopUp, setEditProjectPopUp] = useState(false);
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [name, setName] = useState("");
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState("");
  const [btnloading, setbtnloading] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [selectRequestStatus, setSelectRequestStatus] = useState("");
  const [reason, setReason] = useState("");
  const [selectTaskStatus, setSelectTaskStatus] = useState("");

  const userId = JSON.parse(localStorage.getItem("userId"));

  useEffect(() => {
    window.scrollTo(0, 0);
    getSingletask();
    getAllUser();
  }, []);

  const getSingletask = () => {
    setLoading(true);
    DataService.singleAllTasks()
      .then((data) => {
        setData(data.data.data);
        console.log(data.data.data);
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
  const getAllUser = () => {
    DataService.getAllUserONly()
      .then((data) => {
        setAllUser(data.data.data);
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

  // const handleSelectChange = (event) => {
  //   const selectedValues = Array.from(
  //     event.target.selectedOptions,
  //     (option) => option.value
  //   );
  //   setSelectedOptions(selectedValues);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setbtnloading(true);
    const data = {
      title: name,
      startDate: startDay,
      dueDate: endDay,
      description: description,
      assignedTo: selectedOptions,
    };

    DataService.singleTaskAdd(data).then(
      () => {
        toast.success("Project Added Successfully!!!");
        getSingletask();
        setAddUserPopUp(false);
        setbtnloading(false);
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.msg) ||
          error.message ||
          error.toString();
        setbtnloading(false);
        toast.error(resMessage);
      }
    );
  };

  const deleteProject = (item) => {
    DataService.deleteSimpleTaskById(item).then(
      () => {
        toast.success("Task deleted successfully", {
          position: "top-right",
        });
        getSingletask();
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
      deleteProject(deleteUserId);
      setDeleteUserId(null);
    }
  };

  const handleEditFun = (id) => {
    setProjectId(id);
    getProjectByid(id);
    setEditProjectPopUp(true);
  };

  const getProjectByid = (id) => {
    DataService.getSimpleTaskById(id)
      .then((data) => {
        setName(data.data.data?.title);
        setSelectedOptions(data.data.data?.assignedTo[0]);
        setStartDay(data.data.data?.startDate);
        setEndDay(data.data.data?.dueDate);
        setDescription(data?.data?.data?.description);
        setReason(data?.data?.data?.note);
        setSelectRequestStatus(data?.data?.data?.requestStatus);
        setSelectTaskStatus(data?.data?.data?.status);
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
  const handleUpadeProject = (e) => {
    e.preventDefault();
    setbtnloading(true);
    const data = {};
    data.title = name;
    data.startDate = startDay;
    data.dueDate = endDay;
    data.description = description;
    data.assignedTo = selectedOptions;
    data.requestStatus = selectRequestStatus;
    data.status = selectTaskStatus;
    data.note = reason;

    DataService.updateSingleTask(projectId, data).then(
      () => {
        toast.success("Task Updated Successfully!!!");
        getSingletask();
        setEditProjectPopUp(false);
        setEditProjectPopUp(false);
        setbtnloading(false);
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.msg) ||
          error.message ||
          error.toString();
        setbtnloading(false);
        toast.error(resMessage, {});
      }
    );
  };
  const handleCancel = () => {
    setName("");
    setStartDay("");
    setSelectedOptions("");
    setEndDay("");
    setDescription("");
    setEditProjectPopUp(false);
  };

  return (
    <>
      <ToastContainer />
      <div className="main-sec-dashboard">
        <div className="top-bar-content top-bar-flex">
          <h2>All Users Tasks</h2>

          <div className="right-side-btn-user">
            <div className="add_user_div" onClick={() => setAddUserPopUp(true)}>
              <button type="button" className="main-btn">
                Add New Task
              </button>
            </div>
          </div>
        </div>

        <div className="tabel-height">
          <table className="table ">
            <thead>
              <tr className="senior_div">
                <th> Employee Name</th>
                <th>Title</th>
                <th>description</th>

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
              {data &&
                data.length > 0 &&
                data
                  ?.filter((item) => !item.project)
                  .map((item, index) => (
                    <tr key={item._id}>
                      <td>{item.assignedTo[0]?.name}</td>
                      <td>{item.title}</td>
                      <td>
                        {item.description?.split(" ")?.slice(0, 8)?.join(" ")}
                      </td>
                      {/* <td>{item.name.split(" ").slice(0, 5).join(" ")}</td> */}

                      <td>{moment(item?.dueDate)?.format("DD-MM-YYYY")}</td>
                      <td>{item?.status}</td>
                      <td className="actionButtons action-end">
                        <div className="action-icon">
                          <i
                            className="fa fa-edit edit-icon"
                            onClick={() => handleEditFun(item?._id)}
                          ></i>
                          <i
                            onClick={() => confirmDelete(item._id)}
                            className="fa fa-trash delete-icon"
                          ></i>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* ############################## add Project PopUp #################################################### */}

      {addUserPopUp && (
        <div className="main-sec-popup">
          <div className="inner-sec-popup add-project-main-popUp">
            <div className="top-hedind-sec-popup">
              <h2>Add New Task</h2>
            </div>
            <div className="add-project-popUP">
              <form onSubmit={handleSubmit}>
                <div className="add-project-form">
                  <div className="left-side-add-task-form">
                    <div className="label-field">
                      <label>Title <span className="red-required">* </span></label>
                    </div>
                    <div className="label-field">
                      <input
                        required
                        type="text"
                        placeholder="add title"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="label-field">
                      <label>Start date <span className="red-required">* </span></label>
                    </div>
                    <div className="label-field">
                      <input
                        required
                        type="date"
                        value={startDay}
                        onChange={(e) => setStartDay(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="right-side-add-task-form">
                    <div className="label-field">
                      <div className="lebel-select-name">
                        <label>Select Member <span className="red-required">* </span></label>
                      </div>
                      <select
                        required
                        value={selectedOptions}
                        onChange={(e) => setSelectedOptions(e.target.value)}
                        className="form-select"
                      >
                        <option>Select an option</option>
                        {allUser && allUser.length > 0
                          ? allUser
                              .filter((user) => user.status === "active")
                              .map((item, i) => (
                                <>
                                  <option value={item?._id}>
                                    {item?.name} ({item?.position})
                                  </option>
                                </>
                              ))
                          : ""}
                      </select>
                    </div>
                    <div className="label-field">
                      <label>End date <span className="red-required">* </span></label>
                    </div>
                    <div className="label-field">
                      <input
                        required
                        type="date"
                        value={endDay}
                        onChange={(e) => setEndDay(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="label-field">
                  <label>Description <span className="red-required">* </span></label>
                </div>
                <div className="label-field">
                  <textarea
                    required
                    placeholder="add description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="bottom-btn-sec-popup">
                  <div className="add-user-popup-btn">
                    <button
                      type="button"
                      className="main-btn margin-btn"
                      onClick={() => setAddUserPopUp(false)}
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="add-user-popup-btn">
                    <button
                      className="main-btn margin-btn"
                      // onClick={handleSubmit}
                      disabled={btnloading}
                      type="submit"
                    >
                      {btnloading ? (
                        <span className="spinner-border spinner-border-sm"></span>
                      ) : (
                        "Add Task"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ##################################### edit project Popup ############################################## */}

      {editProjectPopUp && (
        <div className="main-sec-popup">
          <div className="inner-sec-popup add-project-main-popUp">
            <div className="top-hedind-sec-popup">
              <h2>Edit Team Task</h2>
            </div>
            <div className="all-field-team11">
              <div className="label-field">
                <label>Title <span className="red-required">* </span></label>
              </div>
              <div className="label-field">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Title"
                />
              </div>
              <div className="label-field">
                <label>Description <span className="red-required">* </span></label>
              </div>
              <div className="label-field">
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                />
              </div>
              <div className="label-field">
                <label>Start Date <span className="red-required">* </span></label>
              </div>
              <div className="label-field">
                <input
                  type="date"
                  value={startDay}
                  onChange={(e) => setStartDay(e.target.value)}
                />
              </div>
              <div className="label-field">
                <label>End Date <span className="red-required">* </span></label>
              </div>
              <div className="label-field">
                <input
                  type="date"
                  value={endDay}
                  onChange={(e) => setEndDay(e.target.value)}
                />
              </div>

              <div className="label-field">
                <label>Request Status <span className="red-required">* </span></label>
              </div>
              <div className="label-field">
                <select
                  value={selectRequestStatus}
                  onChange={(e) => setSelectRequestStatus(e.target.value)}
                >
                  <option selected>Choose...</option>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {selectRequestStatus === "rejected" && (
                <>
                  <div className="label-field">
                    <label>Reason of Reject <span className="red-required">* </span></label>
                  </div>
                  <div className="label-field">
                    <input
                      type="text"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    />
                  </div>
                </>
              )}
              <div className="label-field">
                <label>Status <span className="red-required">* </span></label>
              </div>
              <div className="label-field">
                <select
                  value={selectTaskStatus}
                  onChange={(e) => setSelectTaskStatus(e.target.value)}
                >
                  <option selected>Choose...</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="overdue">OverDue</option>
                </select>
              </div>
              <div className="bottom-btn-sec-team">
                <button className="main-btn" onClick={handleCancel}>
                  Cancel
                </button>
                <button
                  className="main-btn"
                  onClick={handleUpadeProject}
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

      {/* ################################# delete pop up $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$?? */}

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
                This action will delete all details about the task,
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

export default SingleUserTaskList;
