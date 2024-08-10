import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import DataService from "../../services/data.service";
import { ToastContainer, toast } from "react-toastify";
import img from "../../Images/placeholder-img.png";
import moment from "moment";

const ViewProjectList = () => {
  const params = useParams();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [allTeam, setAllTeam] = useState([]);
  const [data, setData] = useState("");
  const [allTL, setAllTL] = useState("");
  const [user, setUser] = useState("");
  const [popUp, setPopUp] = useState(false);
  const [addMemberPopUp, setAddMemberPopUp] = useState(false);
  const [addTeamTask, setAddTeamTask] = useState(false);
  const [editTeamtask, setEditTeamtask] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingTeam, setLoadingTeam] = useState(false);
  const [team, setTeam] = useState("");
  const [teamInfo, setTeamInfo] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedMemberOptions, setSelectedMemberOptions] = useState([]);
  const [selectTeam, setSelectTeam] = useState("");
  const [selectTeamTask, setSelectTeamTask] = useState("");
  const [teamTitle, setTeamTitle] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [date, setDate] = useState("");
  const [selectTL, setSelectTL] = useState("");
  const [tasks, setTasks] = useState([]);
  const [teamId, setTeamId] = useState(null);
  const [selectTeamStatus, setSelectTeamStatus] = useState("");
  const [deleteTeamId, setdeleteTeamId] = useState(null);
  const [deleteMember, setDeleteMember] = useState(null);
  const [deleteTeamPop, setDeleteTeamPop] = useState(null);
  const [selectRequestStatus, setSelectRequestStatus] = useState("");
  const [reason, setReason] = useState("");
  const [btnloading, setbtnloading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    getProject();
    getAllEmployee();
    getTeam();
    getAllTL();
  }, []);

  const userId = JSON.parse(localStorage.getItem("userId"));

  const getProject = () => {
    setLoadingTeam(true);
    DataService.getSinglePojectById(params.id)
      .then((data) => {
        setData(data.data.data);
        setTeamInfo(data?.data?.data?.teamId);
        setLoadingTeam(false);
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(resMessage, {});
        setLoadingTeam(false);
      });
  };
  const getAllTL = () => {
    DataService.getAllTeamLeader()
      .then((data) => {
        setAllTL(data.data.data);
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(resMessage, {});
      });
  };
  const getAllEmployee = () => {
    DataService.getAllUserONly()
      .then((data) => {
        setUser(data.data.data);
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

  const getTeam = () => {
    DataService.getAllTeamByProjectId(params.id)
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
        toast.error(resMessage, {});
      });
  };

  useEffect(() => {
    if (!Array.isArray(teamInfo) || teamInfo.length === 0) {
      return;
    }
    setSelectedTeam(teamInfo[0]);
    setSelectTeamTask(teamInfo[0]?._id);
    setSelectTeam(teamInfo[0]?._id);
  }, [teamInfo]);

  useEffect(() => {
    if (selectedTeam) {
      getTeamTaskById(selectedTeam._id);
    }
  }, [selectedTeam]);

  const handleSelectChange = (event) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(selectedValues);
  };

  const handleSelectAddMember = (event) => {
    const selectedMemberValues = Array.from(event.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setSelectedMemberOptions(selectedMemberValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setbtnloading(true);
    const data = {
      name: team,
      members: selectedOptions,
      TLId: selectTL,
    };
    DataService.addTeam(data, params.id, userId).then(
      () => {
        toast.success("Team Added Successfully!!!");
        getProject();
        getTeam();
        setPopUp(false);
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

  const handleAddMemSubmit = (e) => {
    e.preventDefault();
    setbtnloading(true);
    const data = {
      members: selectedMemberOptions,
      teamId: selectTeam,
    };
    DataService.addNewMember(data).then(
      () => {
        toast.success("New Member Added Successfully!!!");
        setTimeout(() => {
          getProject();
          setAddMemberPopUp(false);
          setbtnloading(false);
        }, 2000);
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.msg) ||
          error.message ||
          error.toString();
        toast.error(resMessage);
        setbtnloading(false);
      }
    );
  };
  const handleAddTeamTaskSubmit = (e) => {
    e.preventDefault();
    setbtnloading(true);

    const data = {
      teamId: selectTeamTask,
      title: teamTitle,
      description: teamDescription,
      dueDate: date,
    };

    DataService.addTeamTask(data).then(
      () => {
        toast.success("Team Task Added Successfully!!!");
        getTeamTaskById(selectTeamTask);
        setAddTeamTask(false);
        setSelectTeamTask("");
        setTeamTitle("");
        setTeamDescription("");
        setDate("");
        setbtnloading(false);
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.msg) ||
          error.message ||
          error.toString();
        toast.error(resMessage);
        setbtnloading(false);
      }
    );
  };

  // const handleAddTeamTaskSubmit = (e) => {
  //   e.preventDefault();
  //   setbtnloading(true);
  //   const data = {
  //     teamId: selectTeamTask,
  //     title: teamTitle,
  //     description: teamDescription,
  //     dueDate: date,
  //   };
  //   DataService.addTeamTask(data).then(
  //     () => {
  //       toast.success("Team Task Added Successfully!!!");
  //       setTimeout(() => {
  //         // getProject();
  //         getTeamTaskById(selectTeamTask);
  //         setAddTeamTask(false);
  //       }, 2000);
  //       setSelectTeamTask("");
  //       setTeamTitle("");
  //       setDate("");
  //       setbtnloading(false);
  //     },
  //     (error) => {
  //       const resMessage =
  //         (error.response && error.response.data && error.response.data.msg) ||
  //         error.message ||
  //         error.toString();
  //       toast.error(resMessage);
  //       setbtnloading(false);
  //     }
  //   );
  // };

  const getTeamTaskById = (teamId) => {
    setLoading(true);
    DataService.getTeamTaskById(teamId)
      .then((data) => {
        setTasks(data.data.data);
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

  const handleTeamSelect = (team) => {
    setSelectTeamTask(team?._id);
    setSelectedTeam(team);
    getTeamTaskById(team?._id);
    setSelectTeam(team?._id);
  };

  const handleEditTeamTask = (id) => {
    setTeamId(id);
    getTeamIdById(id);
    setEditTeamtask(true);
  };

  const getTeamIdById = (id) => {
    setLoading(true);
    DataService.getTeamSingleTaskById(id)
      .then((data) => {
        setTeamTitle(data?.data?.data?.title);
        setTeamDescription(data?.data?.data?.description);
        setDate(data?.data?.data?.dueDate);
        setSelectTeamStatus(data?.data?.data?.status);
        setSelectRequestStatus(data?.data?.data?.requestStatus);
        setReason(data?.data?.data?.note);
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

  const deleteTeamTask = (item) => {
    DataService.deletTeamTask(item).then(
      () => {
        toast.success("Team Task deleted successfully!", {});
        // getProject();
        getTeamTaskById(selectTeamTask);
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.msg) ||
          error.message ||
          error.toString();
      }
    );
  };
  const confirmDelete = (userId) => {
    setdeleteTeamId(userId);
  };

  const cancelDelete = () => {
    setdeleteTeamId(null);
  };

  const executeDelete = () => {
    if (deleteTeamId) {
      deleteTeamTask(deleteTeamId);
      setdeleteTeamId(null);
    }
  };

  const updateTeamTaskSubmit = (e) => {
    e.preventDefault();
    setbtnloading(true);
    const data = {
      title: teamTitle,
      description: teamDescription,
      dueDate: date,
      status: selectTeamStatus,
      requestStatus: selectRequestStatus,
      note: reason,
    };
    DataService.updateTeamTask(teamId, data).then(
      () => {
        toast.success("Team Task Edited Successfully!!!");
        // getProject();
        getTeamTaskById(selectTeamTask);
        setEditTeamtask(false);
        setTeamTitle("");
        setDate("");
        setbtnloading(false);
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.msg) ||
          error.message ||
          error.toString();
        toast.error(resMessage);
        setbtnloading(false);
      }
    );
  };

  const confirmDeleteTeam = (teamId) => {
    setDeleteTeamPop({ teamId });
  };

  const cancelDeleteTeam = () => {
    setDeleteTeamPop(null);
  };

  const executeDeleteTeam = () => {
    if (deleteTeamPop) {
      deleteTeam(deleteTeamPop);
      setDeleteTeamPop(null);
    }
  };

  const deleteTeam = ({ teamId }) => {
    DataService.deleteTeam(teamId).then(
      () => {
        toast.success("Team  deleted successfully!", {});
        getProject();
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
  const confirmDeleteMember = (teamId, memberId) => {
    setDeleteMember({ teamId, memberId });
  };

  const cancelDeleteMember = () => {
    setDeleteMember(null);
  };

  const executeDeleteMember = () => {
    if (deleteMember) {
      deleteTeamMember(deleteMember);
      setDeleteMember(null);
    }
  };

  const deleteTeamMember = ({ teamId, memberId }) => {
    DataService.deleteMember(teamId, memberId).then(
      () => {
        toast.success("Team Member deleted successfully!", {});
        getProject();
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

  return (
    <>
      <ToastContainer />
      <div className="main-sec-dashboard">
        <div class="top-bar-content top-bar-flex">
          <h2>Project Detail </h2>
          <button className="main-btn" onClick={() => setPopUp(true)}>
            Add Team
          </button>
        </div>
        <div className="view-team-main-sec">
          <div className="">
            <div className="inner-sec-view-team">
              <div className="detail-sec-project team-member-sec ">
                <table class="table ">
                  <tbody>
                    {loadingTeam && (
                      <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    )}
                    <tr>
                      <td className="d-flex align-items-center">Name :</td>
                      <td>{data?.name}</td>
                    </tr>
                    <tr>
                      <td className="d-flex align-items-center">TL Name :</td>
                      <td>
                        {data.TLId && data.TLId.length > 0
                          ? data.TLId.map((tl, index) => (
                              <span key={tl._id}>
                                {tl.name}
                                {index < data.TLId.length - 1 && ", "}
                              </span>
                            ))
                          : "No TLs"}
                      </td>
                    </tr>
                    <tr>
                      <td className="d-flex align-items-center">
                        start Date :
                      </td>
                      <td>{moment(data?.startTime).format("DD/MM/YYYY")}</td>
                    </tr>
                    <tr>
                      <td className="d-flex align-items-center">End Date :</td>
                      <td>{moment(data?.endTime).format("DD/MM/YYYY")}</td>
                    </tr>
                    <tr>
                      <td className="d-flex align-items-center">
                        Description :
                      </td>
                      <td>{data?.description}</td>
                    </tr>
                    <tr>
                      <td className="d-flex align-items-center">status :</td>
                      <td>{data?.status}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="team-member-sec">
                <h2 className="sub-heading-sec">Your Teams</h2>
                {loadingTeam && (
                  <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                )}{" "}
                <div className="team-select-sec">
                  {/* {teamInfo &&
                    teamInfo.length > 0 &&
                    teamInfo?.map((team) => (
                      <>
                        <div className="team-btn">
                          <button
                            key={team._id}
                            onClick={() => handleTeamSelect(team)}
                            className={
                              selectedTeam && selectedTeam._id === team._id
                                ? "selected"
                                : ""
                            }
                          >
                            {team.name}
                          </button>
                          <div className="delete-team-icon">
                            <i
                              onClick={() => confirmDeleteTeam(team._id)}
                              className="fas fa-times-circle delete-icon "
                            ></i>
                          </div>
                        </div>
                      </>
                    ))} */}
                  {teamInfo && teamInfo.length > 0 ? (
                    teamInfo.map((team) => (
                      <div key={team._id} className="team-btn">
                        <button
                          onClick={() => handleTeamSelect(team)}
                          className={
                            selectedTeam && selectedTeam._id === team._id
                              ? "selected"
                              : ""
                          }
                        >
                          {team.name}
                        </button>
                        <div className="delete-team-icon">
                          <i
                            onClick={() => confirmDeleteTeam(team._id)}
                            className="fas fa-times-circle delete-icon"
                          ></i>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No teams found</p>
                  )}
                </div>
                <div className="add-team-task-sec">
                  <div className="inner-sec-team-task">
                    <h2 className="sub-heading-sec">Team Tasks Details</h2>
                    <button className="main-btn" onClick={setAddTeamTask}>
                      Add Task
                    </button>
                  </div>

                  <table class="table">
                    <thead>
                      <tr class="senior_div">
                        <th>Title</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th className="action-end">Action</th>
                      </tr>
                    </thead>
                    {loading && (
                      <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    )}
                    <tbody>
                      {tasks && tasks.length > 0 ? (
                        tasks.map((task) => (
                          <tr key={task._id}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{moment(task.dueDate).format("DD/MM/YYYY")}</td>
                            <td>{task.status}</td>
                            <td className="action-end">
                              <div className="action-icon">
                                <i
                                  className="fas fa-edit edit-icon "
                                  onClick={() => handleEditTeamTask(task?._id)}
                                ></i>
                                <i
                                  onClick={() => confirmDelete(task?._id)}
                                  className="fas fa-trash-alt delete-icon "
                                ></i>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6">No tasks found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="add-team-memmer-sec">
                  <h2 className="sub-heading-sec">Team Members</h2>
                  <button
                    className="main-btn"
                    onClick={(e) => setAddMemberPopUp(true)}
                  >
                    Add New Member
                  </button>
                </div>
                <div className="inner-sec-team-member-sec">
                  {/* {selectedTeam?.members?.map((member) => (
                    <div className="member-detail" key={member._id}>
                      <Link to={"/view-employee-detail/" + member?._id}>
                        <div className="left-side-image-sec">
                          {member.images && member.images.url ? (
                            <img
                              src={
                                "https://trackingtime-c5jw.onrender.com" +
                                member.images.url
                              }
                              className="product-img"
                              alt="image"
                            />
                          ) : (
                            <img
                              src={img}
                              className="product-img"
                              alt="fallback image"
                            />
                          )}
                        </div>

                        <div className="right-side-content-sec">
                          <div className="member-content">
                            <h3>Name : {member.name}</h3>
                            <h3>Position : {member.position}</h3>
                          </div>
                        </div>
                      </Link>
                      <div className="delte-icon-sec">
                        <i
                          onClick={() =>
                            confirmDeleteMember(selectedTeam._id, member._id)
                          }
                          className="fas fa-times-circle delete-icon "
                        ></i>
                      </div>
                    </div>
                  ))} */}
                  {selectedTeam?.members?.length ? (
                    selectedTeam.members.map((member) => (
                      <div className="member-detail" key={member._id}>
                        <Link to={`/view-employee-detail/${member?._id}`}>
                          <div className="left-side-image-sec">
                            {member.images && member.images.url ? (
                              <img
                                src={`https://trackingtime-c5jw.onrender.com${member.images.url}`}
                                className="product-img"
                                alt="image"
                              />
                            ) : (
                              <img
                                src={img}
                                className="product-img"
                                alt="fallback image"
                              />
                            )}
                          </div>

                          <div className="right-side-content-sec">
                            <div className="member-content">
                              <h3>Name : {member.name}</h3>
                              <h3>Position : {member.position}</h3>
                            </div>
                          </div>
                        </Link>
                        <div className="delete-icon-sec">
                          <i
                            onClick={() =>
                              confirmDeleteMember(selectedTeam._id, member._id)
                            }
                            className="fas fa-times-circle delete-icon"
                          ></i>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No members found.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ############################# add team Pop ##################################################### */}
        {popUp && (
          <div className="add-team-main-sec">
            <div className="inner-sec-add-team">
              <form onSubmit={handleSubmit}>
                <div className="top-hedind-sec-popup">
                  <h2>Add Team</h2>
                </div>
                <div className="all-field-team11">
                  <div className="label-field">
                    <label>
                      Team Name <span className="red-required">* </span>
                    </label>
                  </div>
                  <div className="label-field">
                    <input
                      required
                      type="text"
                      placeholder="Team Name"
                      value={team}
                      onChange={(e) => setTeam(e.target.value)}
                    ></input>
                  </div>
                  <div className="label-field">
                    <label>
                      Select TL <span className="red-required">* </span>
                    </label>
                  </div>
                  <div className="label-field">
                    <select
                      value={selectTL}
                      onChange={(e) => setSelectTL(e.target.value)}
                    >
                      <option>Select an option</option>
                      {allTL && allTL.length > 0
                        ? allTL
                            ?.filter((item) => item?.status === "active")
                            ?.map((item, i) => (
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
                    <label>
                      Select Team Member{" "}
                      <span className="red-required">* </span>
                    </label>
                  </div>
                  <div className="label-field">
                    <select
                      multiple
                      required
                      onChange={handleSelectChange}
                      value={selectedOptions}
                      className="form-select"
                      style={{ minHeight: "150px" }}
                    >
                      <option>Select an option</option>
                      {user && user.length > 0
                        ? user
                            .filter((item) => item.status === "active")
                            .map((item, i) => (
                              <option key={i} value={item._id}>
                                {item.name} ({item.position})
                              </option>
                            ))
                        : ""}
                    </select>
                    <div className="form-text">
                      You Can Select Multiple Tags by Ctrl+Click
                    </div>
                  </div>
                </div>
                <div className="bottom-btn-sec-team">
                  <button className="main-btn" onClick={() => setPopUp(false)}>
                    Cancel
                  </button>
                  <button
                    className="main-btn"
                    disabled={btnloading}
                    type="submit"
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

        {/* ###################################### add memberpopUp ###################################################### */}
        {addMemberPopUp && (
          <div className="add-team-main-sec">
            <div className="inner-sec-add-team">
              <div className="top-hedind-sec-popup">
                <h2>Add Team Members</h2>
              </div>

              <div className="all-field-team11">
                <form onSubmit={handleAddMemSubmit}>
                  <div className="label-field">
                    <label>
                      Select Team <span className="red-required">* </span>
                    </label>
                  </div>
                  <div className="label-field">
                    <select
                      required
                      value={selectTeam}
                      onChange={(e) => setSelectTeam(e.target.value)}
                      className="form-select"
                    >
                      <option>Select an option</option>
                      {allTeam && allTeam.length > 0
                        ? allTeam.map((item, i) => (
                            <>
                              <option value={item?._id}>{item?.name}</option>
                            </>
                          ))
                        : ""}
                    </select>
                  </div>
                  <div className="label-field">
                    <label>
                      Select Team Member{" "}
                      <span className="red-required">* </span>
                    </label>
                  </div>
                  <div className="label-field">
                    <select
                      multiple
                      required
                      onChange={handleSelectAddMember}
                      value={selectedMemberOptions}
                      className="form-select"
                      style={{ minHeight: "150px" }}
                    >
                      <option>Select an option</option>
                      {user && user.length > 0 ? (
                        user.filter(
                          (item) =>
                            item.status === "active" &&
                            !selectedTeam?.members?.some(
                              (member) => member?._id === item?._id
                            )
                        ).length > 0 ? (
                          user
                            .filter(
                              (item) =>
                                item.status === "active" &&
                                !selectedTeam?.members?.some(
                                  (member) => member?._id === item?._id
                                )
                            )
                            .map((item, i) => (
                              <option key={item?._id} value={item?._id}>
                                {item?.name} ({item?.position})
                              </option>
                            ))
                        ) : (
                          <option disabled>You have Selected All Member</option>
                        )
                      ) : (
                        <option disabled>No Member Found</option>
                      )}
                    </select>

                    {/* <select
                      multiple
                      required
                      onChange={handleSelectAddMember}
                      value={selectedMemberOptions}
                      className="form-select"
                      style={{ minHeight: "150px" }}
                    >
                      <option>Select an option</option>
                      {user && user.length > 0
                        ? user
                            ?.filter(
                              (item) =>
                                item.status === "active" &&
                                !selectedTeam?.members?.some(
                                  (member) => member?._id === item?._id
                                )
                            )
                            .map((item, i) => (
                              <>
                                <option value={item?._id}>
                                  {item?.name} ({item?.position})
                                </option>
                              </>
                            ))
                        : " No Member Found"}
                    </select> */}
                    <div className="form-text">
                      You Can Select Multiple Tags by Ctrl+Click
                    </div>
                  </div>
                  <div className="bottom-btn-sec-team margin-top">
                    <button
                      className="main-btn"
                      onClick={() => setAddMemberPopUp(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="main-btn"
                      disabled={btnloading}
                      type="submit"
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
          </div>
        )}
        {/* ################################################# add team task popUP ################################################# */}
        {addTeamTask && (
          <div className="add-team-main-sec">
            <div className="inner-sec-add-team">
              <div className="top-hedind-sec-popup">
                <h2>Add Team Task</h2>
              </div>
              <div className="all-field-team11">
                <form onSubmit={handleAddTeamTaskSubmit}>
                  <div className="label-field">
                    <label>
                      Select Team <span className="red-required">* </span>
                    </label>
                  </div>
                  <div className="label-field">
                    <select
                      required
                      value={selectTeamTask}
                      onChange={(e) => setSelectTeamTask(e.target.value)}
                      className="form-select"
                    >
                      <option>Select an option</option>
                      {allTeam && allTeam.length > 0
                        ? allTeam.map((item, i) => (
                            <>
                              <option value={item?._id}>{item?.name}</option>
                            </>
                          ))
                        : ""}
                    </select>
                  </div>
                  <div className="label-field">
                    <label>
                      Title <span className="red-required">* </span>
                    </label>
                  </div>
                  <div className="label-field">
                    <input
                      required
                      type="text"
                      onChange={(e) => setTeamTitle(e.target.value)}
                      placeholder="Title"
                    />
                  </div>
                  <div className="label-field">
                    <label>
                      Description <span className="red-required">* </span>
                    </label>
                  </div>
                  <div className="label-field">
                    <input
                      required
                      type="text"
                      onChange={(e) => setTeamDescription(e.target.value)}
                      placeholder="Description"
                    />
                  </div>
                  <div className="label-field">
                    <label>
                      Date <span className="red-required">* </span>
                    </label>
                  </div>
                  <div className="label-field">
                    <input
                      required
                      type="date"
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <div className="bottom-btn-sec-team">
                    <button
                      className="main-btn"
                      onClick={() => setAddTeamTask(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="main-btn"
                      disabled={btnloading}
                      type="submit"
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
          </div>
        )}
        {/* ########################################## edit team task popup ################################################# */}
        {editTeamtask && (
          <div className="add-team-main-sec">
            <div className="inner-sec-add-team">
              <div className="top-hedind-sec-popup">
                <h2>Edit Team Task</h2>
              </div>
              <div className="all-field-team11">
                <div className="label-field">
                  <label>
                    Title <span className="red-required">* </span>
                  </label>
                </div>
                <div className="label-field">
                  <input
                    type="text"
                    value={teamTitle}
                    onChange={(e) => setTeamTitle(e.target.value)}
                    placeholder="Title"
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
                    value={teamDescription}
                    onChange={(e) => setTeamDescription(e.target.value)}
                    placeholder="Description"
                  />
                </div>
                <div className="label-field">
                  <label>
                    Date <span className="red-required">* </span>
                  </label>
                </div>
                <div className="label-field">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <div className="label-field">
                  <label>
                    Request Status <span className="red-required">* </span>
                  </label>
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
                      <label>
                        Reason of Reject{" "}
                        <span className="red-required">* </span>
                      </label>
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
                  <label>
                    Status <span className="red-required">* </span>
                  </label>
                </div>
                <div className="label-field">
                  <select
                    value={selectTeamStatus}
                    onChange={(e) => setSelectTeamStatus(e.target.value)}
                  >
                    <option selected>Choose...</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="overdue">OverDue</option>
                  </select>
                </div>
                <div className="bottom-btn-sec-team">
                  <button
                    className="main-btn"
                    onClick={() => setEditTeamtask(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="main-btn"
                    onClick={updateTeamTaskSubmit}
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
        {/* ############################## delete Team PopUp %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */}
        {deleteTeamPop && (
          <div className="main_email_outer">
            <div className="delete_div_a">
              <div className="delete_div">
                <i
                  id="exclamation_sign"
                  className="fas fa-exclamation-triangle"
                ></i>
                <h3>Are you sure?</h3>
                <p>
                  This action will delete all details about the Team ,
                  <br />
                  You won’t be able to revert this!
                </p>
                <div className="button_div">
                  <button
                    onClick={executeDeleteTeam}
                    type="button"
                    className="btn btn-danger"
                  >
                    Yes, delete it
                  </button>
                  <button
                    onClick={cancelDeleteTeam}
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

        {/* #################################### delete team task     #################################### */}

        {deleteTeamId && (
          <div className="main_email_outer">
            <div className="delete_div_a">
              <div className="delete_div">
                <i
                  id="exclamation_sign"
                  className="fas fa-exclamation-triangle"
                ></i>
                <h3>Are you sure?</h3>
                <p>
                  This action will delete all details about the Team Task,
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

        {/* #################################### delete memberpopup     #################################### */}

        {deleteMember && (
          <div className="main_email_outer">
            <div className="delete_div_a">
              <div className="delete_div">
                <i
                  id="exclamation_sign"
                  className="fas fa-exclamation-triangle"
                ></i>
                <h3>Are you sure?</h3>
                <p>
                  This action will delete all details about the Team Member,
                  <br />
                  You won’t be able to revert this!
                </p>
                <div className="button_div">
                  <button
                    onClick={executeDeleteMember}
                    type="button"
                    className="btn btn-danger"
                  >
                    Yes, delete it
                  </button>
                  <button
                    onClick={cancelDeleteMember}
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

export default ViewProjectList;
