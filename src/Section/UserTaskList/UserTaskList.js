import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataService from "../../services/data.service";
import { ToastContainer, toast } from "react-toastify";
import img from "../../Images/placeholder-img.png";
import moment from "moment";

const UserTaskList = () => {
  const imgRef = useRef();
  const [data, setData] = useState([]);
  const [allTl, setAllTl] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addUserPopUp, setAddUserPopUp] = useState(false);
  const [editProjectPopUp, setEditProjectPopUp] = useState(false);
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [name, setName] = useState("");
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");
  const [description, setDescription] = useState("");
  const [teamPerformance, setTeamPerformance] = useState("");
  const [projectId, setProjectId] = useState("");
  const [selectChangeStatus, setSelectChangeStatus] = useState("");
  const [btnloading, setbtnloading] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  const userId = JSON.parse(localStorage.getItem("userId"));

  useEffect(() => {
    window.scrollTo(0, 0);
    getProject();
    getAllTL();
  }, []);

  const getProject = () => {
    setLoading(true);
    DataService.getAllProject()
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
  const getAllTL = () => {
    DataService.getAllTeamLeader()
      .then((data) => {
        setAllTl(data.data.data);
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

  const handleSelectChange = (event) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(selectedValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setbtnloading(true);
    const data = {
      name: name,
      startTime: startDay,
      endTime: endDay,
      description: description,
      TLId: selectedOptions,
      status: "Pending",
      score: teamPerformance,
    };

    DataService.addProject(data).then(
      () => {
        toast.success("Project Added Successfully!!!");
        getProject();
        setAddUserPopUp(false);
        setbtnloading(false);
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.msg) ||
          error.message ||
          error.toString();
        setLoading(false);
        setbtnloading(false);
        toast.error(resMessage);
      }
    );
  };

  const deleteProject = (item) => {
    setLoading(true);
    DataService.deleteProject(item).then(
      () => {
        toast.success("Project deleted successfully", {
          position: "top-right",
        });
        setLoading(false);
        getProject();
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.msg) ||
          error.message ||
          error.toString();

        setLoading(false);
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
    DataService.getSinglePojectById(id)
      .then((data) => {
        const formatDate = (dateString) => {
          const date = new Date(dateString);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          return `${year}-${month}-${day}`;
        };
        // setData(data.data.data);
        const projectData = data.data.data;
        setName(data.data.data?.name);
        setStartDay(formatDate(data?.data?.data?.startTime));
        setEndDay(formatDate(data?.data?.data?.endTime));
        setDescription(data?.data?.data?.description);
        setTeamPerformance(projectData?.score);
        setSelectChangeStatus(projectData?.status);

        if (projectData?.TLId) {
          const selectedTLs = projectData.TLId.map((tl) => tl._id);
          setSelectedOptions(selectedTLs);
        }
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
    setLoading(true);
    const data = {};
    data.name = name;
    data.startTime = startDay;
    data.endTime = endDay;
    data.description = description;
    data.TLId = selectedOptions;
    data.score = teamPerformance;
    data.status = selectChangeStatus;

    DataService.updatePrjectById(data, projectId).then(
      () => {
        toast.success("Project Updated Successfully!!!");
        getProject();
        setEditProjectPopUp(false);
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.msg) ||
          error.message ||
          error.toString();
        setLoading(false);
        toast.error(resMessage, {});
      }
    );
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
                <th>S.No.</th>
                <th>Project Name</th>
                <th> Start Time</th>
                <th>End Time</th>
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
                data.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{moment(item?.startTime)?.format("DD-MM-YYYY")}</td>
                    <td>{moment(item?.endTime)?.format("DD-MM-YYYY")}</td>
                    <td>{item?.status}</td>
                    <td className="actionButtons action-end">
                      <div className="action-icon">
                        <Link to={"/view-project/" + item?._id}>
                          <i className="fas fa-eye"></i>
                        </Link>
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
                  <div className="left-side-add-fom">
                    <div className="label-field">
                      <div className="lebel-select-name">
                        <label>Select Member</label>
                      </div>
                      <select
                        required
                        onChange={handleSelectChange}
                        value={selectedOptions}
                        className="form-select"
                      >
                        <option>Select an option</option>
                        {allTl && allTl.length > 0
                          ? allTl
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
                  </div>
                  <div className="right-side-add-form">
                    <div className="label-field">
                      <label>Prject Name</label>
                    </div>
                    <div className="label-field">
                      <input
                        required
                        type="text"
                        placeholder="add project name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="label-field">
                      <label>Start date</label>
                    </div>
                    <div className="label-field">
                      <input
                        required
                        type="date"
                        value={startDay}
                        onChange={(e) => setStartDay(e.target.value)}
                      />
                    </div>
                    <div className="label-field">
                      <label>End date</label>
                    </div>
                    <div className="label-field">
                      <input
                        required
                        type="date"
                        value={endDay}
                        onChange={(e) => setEndDay(e.target.value)}
                      />
                    </div>

                    <div className="label-field">
                      <label>Description</label>
                    </div>
                    <div className="label-field">
                      <textarea
                        required
                        placeholder="add description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>
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
              <h2>Edit Project</h2>
            </div>
            <div className="add-project-popUP">
              <div className="add-project-form">
                <div className="left-side-add-fom">
                  <div className="label-field">
                    <div className="lebel-select-name">
                      <label>Select Team Leader</label>
                    </div>
                    <select
                      multiple
                      required
                      onChange={handleSelectChange}
                      value={selectedOptions}
                      className="form-select"
                      style={{ minHeight: "150px" }}
                    >
                      <option>Select an option</option>
                      {allTl && allTl.length > 0
                        ? allTl
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
                    <div className="form-text multiple-Tl-text">
                      You Can Select Multiple TL by Ctrl+Click
                    </div>
                  </div>

                  <div className="select-performace-count">
                    <label>Select Team Performance </label>
                    <div className="inner-sec-team-performance">
                      <div className="radio-flex">
                        <div className="inner-radio-sec">
                          <input
                            type="radio"
                            id="age1"
                            name="age"
                            value={5}
                            checked={teamPerformance === 5}
                            onChange={(e) =>
                              setTeamPerformance(Number(e.target.value))
                            }
                          />
                          <label htmlFor="age1"> 5% /day</label>
                        </div>
                        <div className="inner-radio-sec">
                          <input
                            type="radio"
                            id="age2"
                            name="age"
                            value={10}
                            checked={teamPerformance === 10}
                            onChange={(e) =>
                              setTeamPerformance(Number(e.target.value))
                            }
                          />
                          <label htmlFor="age2">10% /day</label>
                        </div>
                        <div className="inner-radio-sec">
                          <input
                            type="radio"
                            id="age3"
                            name="age"
                            value={15}
                            checked={teamPerformance === 15}
                            onChange={(e) =>
                              setTeamPerformance(Number(e.target.value))
                            }
                          />
                          <label htmlFor="age3">15% /day</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="label-field-status">
                    <div className="label-field">
                      <label>Change Status</label>
                    </div>
                    <div className="label-field">
                      <select
                        value={selectChangeStatus}
                        onChange={(e) => setSelectChangeStatus(e.target.value)}
                      >
                        <option value="">Select an option</option>
                        <option value="Pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="right-side-add-form">
                  <div className="label-field">
                    <label>Prject Name</label>
                  </div>
                  <div className="label-field">
                    <input
                      required
                      type="text"
                      placeholder="add project name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="label-field">
                    <label>Start date</label>
                  </div>
                  <div className="label-field">
                    <input
                      required
                      type="date"
                      value={startDay}
                      onChange={(e) => setStartDay(e.target.value)}
                    />
                  </div>
                  <div className="label-field">
                    <label>End date</label>
                  </div>
                  <div className="label-field">
                    <input
                      required
                      type="date"
                      value={endDay}
                      onChange={(e) => setEndDay(e.target.value)}
                    />
                  </div>

                  <div className="label-field">
                    <label>Description</label>
                  </div>
                  <div className="label-field">
                    <textarea
                      required
                      placeholder="add description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="bottom-btn-sec-popup">
                <div className="add-user-popup-btn">
                  <button
                    type="button"
                    className="main-btn margin-btn"
                    onClick={() => setEditProjectPopUp(false)}
                  >
                    Cancel
                  </button>
                </div>
                <div className="add-user-popup-btn">
                  <button
                    type="button"
                    className="main-btn margin-btn"
                    onClick={handleUpadeProject}
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    Save
                  </button>
                </div>
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
                This action will delete all details about the Project,
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

export default UserTaskList;
