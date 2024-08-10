import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DataService from "../../services/data.service";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
const ViewEmployeeDetailList = () => {
  const params = useParams();
  const imgRef = useRef();
  const [users, setUsers] = useState([]);
  const [taskDetails, setTaskDetails] = useState([]);
  const [data, setData] = useState([]);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [adduser, setadduser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTeam, setAllTeam] = useState("");
  const [selectProject, setSelectProject] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [filteredData, setfilteredData] = useState([]);
  const [requestStatus, setRequestStatus] = useState("");
  const [selectedRequestOption, setSelectedRequestOption] = useState("");
  const [reason, setReason] = useState("");
  const [selectStatus, setSelectStatus] = useState("");
  const [editUser, setEditUser] = useState(false);
  const [viewTask, setViewTask] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [task, setTask] = useState([]);
  const [btnloading, setbtnLoading] = useState(false);

  useEffect(() => {
    document.title = "All Users";
    window.scrollTo(0, 0);
    getEmployeeId();
    getProject();
    getTaskDetailById();
  }, []);

  const userId = JSON.parse(localStorage.getItem("User_id"));

  const getEmployeeId = () => {
    DataService.getUserDetailById(params?.id)
      .then((data) => {
        setData(data.data.data);
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

  const getProject = () => {
    DataService.getAllProject()
      .then((data) => {
        setAllTeam(data.data.data);
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

  const getTaskDetailById = () => {
    setLoading(true);
    DataService.getTaskDetailEmployeeById(params.id).then(
      (data) => {
        setTaskDetails(data.data.data);
        setLoading(false);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        toast.error(resMessage, {});
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setbtnLoading(true);
    const data = {
      project: selectProject,
      title: title,
      description: description,
      status: "pending",
      dueDate: date,
    };
    DataService.addTask(data, params.id).then(
      () => {
        toast.success("Task Added Successfully!!!");

        getTaskDetailById();
        setadduser(false);
        setbtnLoading(false);

        setSelectProject("");
        setTitle("");
        setDescription("");
        setDate("");
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.msg) ||
          error.message ||
          error.toString();
        setbtnLoading(false);
        toast.error(resMessage);
      }
    );
  };

  const deleteData = async (userId) => {
    try {
      const response = await DataService.deletetaskByid(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      toast.success(response.data.message, { position: "top-right" });
      getTaskDetailById();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const confirmDelete = (userId) => {
    setDeleteUserId(userId);
  };

  const cancelDelete = () => {
    setDeleteUserId(null);
  };

  const executeDelete = () => {
    if (deleteUserId) {
      deleteData(deleteUserId);
      getTaskDetailById();
      setDeleteUserId(null);
    }
  };

  useEffect(() => {
    filterData();
  }, [selectedStatus, taskDetails]);

  const filterData = () => {
    if (selectedStatus === "All") {
      setfilteredData(taskDetails);
    } else {
      const result = taskDetails.filter(
        (value) => value.status === selectedStatus
      );
      setfilteredData(result);
    }
  };

  const onChangeStatus = (e) => {
    setSelectedStatus(e.target.value);
  };
  const viewHandleUser = (id) => {
    getSingletask(id);
    setViewTask(true);
  };
  const editHandleUser = (id) => {
    setCurrentId(id);
    getSingletask(id);
    setEditUser(true);
  };

  const getSingletask = (id) => {
    DataService.getSingleTaskById(id)
      .then((data) => {
        setTask(data?.data?.data);
        setTitle(data?.data?.data?.title);
        setDescription(data?.data?.data?.description);
        setDate(data?.data?.data?.dueDate);
        setSelectedRequestOption(data?.data?.data?.requestStatus);
        setReason(data?.data?.data?.note);
        setSelectStatus(data?.data?.data?.status);
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

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setbtnLoading(true);
    const data = {
      title: title,
      description: description,
      status: selectStatus,
      dueDate: date,
      requestStatus: selectedRequestOption,
      note: reason,
    };
    DataService.updateSingleTask(currentId, data).then(
      () => {
        toast.success("Task Edit Successfully!!!");

        getTaskDetailById();
        setEditUser(false);
        setbtnLoading(false);
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.msg) ||
          error.message ||
          error.toString();
        toast.error(resMessage);
        setbtnLoading(false);
      }
    );
  };

  return (
    <>
      <div className="main-sec-dashboard">
        <div class="top-bar-content top-bar-flex">
          <h2>Employee Detail </h2>
          <Link to={"/view-employee-performace/" + params?.id}>
            <button className="main-btn">Check Performance</button>
          </Link>
        </div>
        <div className="detail-sec-project team-member-sec ">
          <table class="table ">
            <tbody>
              <tr>
                <td>Name :</td>
                <td>{data?.name}</td>
              </tr>
              <tr>
                <td>Email :</td>
                <td>{data?.email}</td>
              </tr>
              <tr>
                <td>Number :</td>
                <td>{data?.phone}</td>
              </tr>
              <tr>
                <td>Position :</td>
                <td>{data?.position}</td>
              </tr>
              <tr>
                <td>Team :</td>
                {/* <td className="d-flex align-items-center">Team :</td> */}
                <td>{data?.team}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="top-bar-content top-bar-flex add-space">
          <h2>All Task</h2>
          <div className="right-side-btn-user">
            <button className="main-btn" onClick={() => setadduser(true)}>
              {" "}
              Add New Task
            </button>
            <div className="flex_status_two">
              <form class="d-flex align-items-center ms-auto">
                <label className="me-3">Status</label>
                <select value={selectedStatus} onChange={onChangeStatus}>
                  <option selected>All</option>
                  <option value="completed">Complete</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">Ongoing</option>
                  {/* <option value="overdue">OverDue</option> */}
                  {/* <option value="reject">Reject</option>   */}
                </select>
              </form>
            </div>
          </div>
        </div>

        <table className="table ">
          <thead>
            <tr className="senior_div">
              <th>S.No.</th>
              <th>Project Name</th>
              <th>Title</th>
              <th>description</th>
              <th>Status</th>
              <th>End Date</th>
              <th className="action-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            )}
            {filteredData && filteredData.length > 0 ? (
              filteredData
                ?.filter((item) => item?.project)
                .map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item?.project?.name}</td>
                    <td>{item?.title}</td>
                    <td>{item?.description}</td>
                    <td>{item?.status}</td>
                    <td>{moment(item?.dueDate).format("DD-MM-YYYY")}</td>
                    <td className="actionButtons action-end">
                      <div className="action-icon">
                        <i
                          className="fas fa-eye "
                          onClick={() => viewHandleUser(item?._id)}
                        ></i>
                        <i
                          className="fa fa-edit edit-icon"
                          onClick={() => editHandleUser(item?._id)}
                        ></i>
                        <i
                          onClick={() => confirmDelete(item._id)}
                          className="fa fa-trash delete-icon"
                        ></i>
                      </div>
                    </td>
                  </tr>
                ))
            ) : (
              <div className="show-message-sec">
                <p>Not Data Found !!</p>
              </div>
            )}
          </tbody>
        </table>
      </div>

      {/* ################################# Delete task popup ########################################################## */}

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
                This action will delete all details about the employee task,
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
      {/* ################################# Add task popup ########################################################## */}

      {adduser && (
        <div className="main_email_outer">
          <div className="popup_div popUp-task-add">
            <form onSubmit={handleSubmit}>
              <div className="main-sec-add-task">
                <div className="top-bar-popup">
                  <h2>Add Task <span className="red-required">* </span></h2>
                </div>
                <div className="sub-sec-add-task">
                  <div className="left-side-task-sec">
                    <div className="lable-expense">
                      <label>Title <span className="red-required">* </span></label>
                    </div>
                    <div className="expense-input">
                      <input
                        required
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="lable-expense">
                      <label>Description <span className="red-required">* </span></label>
                    </div>
                    <div className="expense-input">
                      <input
                        required
                        type="text"
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="right-side-task-sec">
                    <div className="inner-right-task-sec">
                      <div className="task-label">
                        <label>Select Project <span className="red-required">* </span></label>
                      </div>
                      <div className="label-team-select">
                        <select
                          required
                          value={selectProject}
                          onChange={(e) => setSelectProject(e.target.value)}
                          className="form-select"
                        >
                          <option>Select an option</option>
                          {allTeam && allTeam.length > 0
                            ? allTeam.map((item, i) => (
                                <>
                                  <option value={item?._id}>
                                    {item?.name}
                                  </option>
                                </>
                              ))
                            : ""}
                        </select>
                      </div>

                      <div className="lable-expense">
                        <label>Last Date <span className="red-required">* </span></label>
                      </div>
                      <div className="expense-input">
                        <input
                          required
                          type="date"
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bottom-btn-sec-team">
                <button className="main-btn" onClick={() => setadduser(false)}>
                  Cancel
                </button>
                <button
                  className="main-btn"
                  type="submit"
                  disabled={btnloading}
                >
                  {btnloading ? (
                    <span className="spinner-border spinner-border-sm"></span>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ################################# View task popup ########################################################## */}
      {viewTask && (
        <div className="main_email_outer">
          <div className="popup_div popUp-task-add">
            <div className="main-sec-add-task">
              <div className="top-bar-popup">
                <h2>View Task</h2>
              </div>
              <div className="Edit-sec-task">
                <div className="label-field">
                  <label>Title</label>
                </div>
                <div className="label-field">
                  <input type="text" value={title} />
                </div>
                <div className="label-field">
                  <label>Description</label>
                </div>
                <div className="label-field">
                  <input type="text" value={description} />
                </div>

                <div className="label-field">
                  <label>requestStatus</label>
                </div>
                <div className="label-field">
                  <input type="text" value={selectedRequestOption} />
                </div>

                {selectedRequestOption === "rejected" && (
                  <>
                    <div className="label-field">
                      <label>Reason of Reject</label>
                    </div>
                    <div className="label-field">
                      <input type="text" value={reason} />
                    </div>
                  </>
                )}
                <div className="label-field">
                  <label>Status</label>
                </div>
                <div className="label-field">
                  <input type="text" value={selectStatus} />
                </div>
                {/* <div className="label-field">
                  <select id="options" value={selectStatus}>
                    <option value="">Select an option</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="in-progress">Completed</option>
                    <option value="overdue">OverDue</option>
                  </select>
                </div> */}
                <div className="label-field">
                  <label>Last Date</label>
                </div>
                <div className="label-field">
                  <input type="date" value={date} />
                </div>
              </div>
            </div>
            <div className="bottom-btn-sec-team margin-bottom-popup">
              <button className="main-btn" onClick={() => setViewTask(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ################################# Edit task popup ########################################################## */}
      {editUser && (
        <div className="main_email_outer">
          <div className="popup_div popUp-task-add">
            <div className="main-sec-add-task">
              <div className="top-bar-popup">
                <h2>Edit Task</h2>
              </div>
              <div className="Edit-sec-task">
                <div className="inner-side-task-sec">
                  <div className="inner-right-task-sec">
                    <div className="lable-expense">
                      <label>Title  <span className="red-required">* </span></label>
                    </div>
                    <div className="label-field">
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="lable-expense">
                      <label>Description  <span className="red-required">* </span></label>
                    </div>
                    <div className="label-field">
                      <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className="lable-expense">
                      <label>requestStatus <span className="red-required">* </span></label>
                    </div>
                    <div className="label-field">
                      <select
                        id="options"
                        value={selectedRequestOption}
                        onChange={(e) =>
                          setSelectedRequestOption(e.target.value)
                        }
                      >
                        <option value="">Select an option</option>
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                    {selectedRequestOption === "rejected" && (
                      <>
                        <div className="lable-expense">
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
                    <div className="lable-expense">
                      <label>Status <span className="red-required">* </span></label>
                    </div>
                    <div className="label-field">
                      <select
                        id="options"
                        value={selectStatus}
                        onChange={(e) => setSelectStatus(e.target.value)}
                      >
                        <option value="">Select an option</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="overdue">OverDue</option>
                      </select>
                    </div>
                    <div className="lable-expense">
                      <label>Last Date <span className="red-required">* </span></label>
                    </div>
                    <div className="label-field">
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bottom-btn-sec-team margin-bottom-popup">
              <button className="main-btn" onClick={() => setEditUser(false)}>
                Cancel
              </button>
              <button className="main-btn" onClick={handleEditSubmit}>
                {btnloading ? (
                  <span className="spinner-border spinner-border-sm"></span>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewEmployeeDetailList;
