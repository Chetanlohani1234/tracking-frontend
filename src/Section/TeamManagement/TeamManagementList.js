import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DataService from "../../services/data.service";
import { ToastContainer, toast } from "react-toastify";

const TeamManagementList = () => {
  const params = useParams();
  const [allProject, setAllProject] = useState([]);
  const [data, setData] = useState([]);
  const [singleTeam, setSingleTeam] = useState([]);
  const [team, setTeam] = useState("");
  const [loading, setLoading] = useState(false);
  const [editPopUP, setEditPopUp] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState("");
  const [selectProject, setSelectProject] = useState("");
  const [allUser, setAllUser] = useState([]);
  const [deleteTeamId, setdeleteTeamId] = useState(null);
  const [btnloading, setBtnLoading] = useState(false);
  const [addTeamPopUp, setAddTeamPopUp] = useState(false);
  const [selectTL, setSelectTL] = useState("");
  const [allTL, setAllTL] = useState("");
  const [user, setUser] = useState("");

  const navigate = useNavigate();

  const userId = JSON.parse(localStorage.getItem("userId"));

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllTeams();
    getAllUser();
    getProject();
    getAllTL();
  }, []);

  const getProject = () => {
    setLoading(true);
    DataService.getAllProject()
      .then((data) => {
        setAllProject(data.data.data);
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
  const getAllTeams = () => {
    setLoading(true);
    DataService.getAllTeam()
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

  const getAllUser = () => {
    setLoading(true);
    DataService.getAllUserONly()
      .then((data) => {
        setAllUser(data.data.data);
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
    getTeamById(id);
    setEditPopUp(true);
  };
  const getTeamById = (id) => {
    DataService.getTeamById(id).then((data) => {
      setSingleTeam(data.data.data);
      const projectData = data?.data?.data;
      setTeam(data?.data?.data?.name);
      if (projectData?.members) {
        const selectedTLs = projectData.members.map((tl) => tl._id);
        setSelectedOptions(selectedTLs);
      }
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
    setBtnLoading(true);
    const data = {};
    data.name = team;
    data.members = selectedOptions;
    DataService.updateTeamById(data, currentItemId).then(
      () => {
        toast.success("Team Updated Successfully!!!");
        getAllTeams();
        setEditPopUp(false);
        setBtnLoading(false);
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.msg) ||
          error.message ||
          error.toString();
        setBtnLoading(false);
        toast.error(resMessage, {});
      }
    );
  };
  const deleteTeam = (item) => {
    DataService.deleteTeam(item).then(
      () => {
        toast.success("Team  deleted successfully!");
        getAllTeams();
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
      deleteTeam(deleteTeamId);
      setdeleteTeamId(null);
    }
  };

  const handleAddTeamSubmit = (e) => {
    e.preventDefault();
    setBtnLoading(true);
    const data = {
      name: team,
      members: selectedOptions,
      TLId: selectTL,
      projectId: selectProject,
    };
    DataService.addNewTeam(data).then(
      () => {
        toast.success("Team Added Successfully!!!");
        getAllTeams();
        setAddTeamPopUp(false);
        setBtnLoading(false);
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.msg) ||
          error.message ||
          error.toString();
        setBtnLoading(false);
        toast.error(resMessage);
      }
    );
  };
  return (
    <>
      <div className="main-sec-dashboard">
        <div className="top-bar-content top-bar-flex">
          <h2>Team Management</h2>
          <button className="main-btn" onClick={() => setAddTeamPopUp(true)}>
            Create Team
          </button>
        </div>

        <table className="table ">
          <thead>
            <tr className="senior_div">
              <th>S.No.</th>
              <th>Team Name</th>
              <th> Project Name</th>
              <th> TL Name </th>
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
                  <td>{item?.name}</td>
                  <td>{item?.projectId?.name}</td>
                  <td>{item?.TLId?.name}</td>
                  <td className="actionButtons action-end">
                    <div className="action-icon">
                      <Link to={"/view-team/" + item?._id}>
                        <i class="fas fa-eye"></i>
                      </Link>
                      <Link to={"/edit-team/" + item?._id}>
                        <i
                          class="far fa-edit edit-icon"
                          // onClick={() => handleEditClick(item?._id)}
                        ></i>
                      </Link>
                      <i
                        onClick={() => confirmDelete(item?._id)}
                        className="fas fa-trash-alt delete-icon "
                      ></i>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* ################################ add team pop up ############################################ */}

        {addTeamPopUp && (
          <div className="add-team-main-sec">
            <div className="inner-sec-add-team">
              <form onSubmit={handleAddTeamSubmit}>
                <div className="top-hedind-sec-popup">
                  <h2>Create New Team</h2>
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
                      Select Project <span className="red-required">* </span>
                    </label>
                  </div>
                  <div className="label-field">
                    <select
                      value={selectProject}
                      onChange={(e) => setSelectProject(e.target.value)}
                    >
                      <option>Select an option</option>
                      {allProject && allProject.length > 0
                        ? allProject.map((item, i) => (
                            <>
                              <option value={item?._id}>{item?.name}</option>
                            </>
                          ))
                        : ""}
                    </select>
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
                      {allUser && allUser.length > 0
                        ? allUser
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
                  <button
                    className="main-btn"
                    onClick={() => setAddTeamPopUp(false)}
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
        )}

        {/* #################################################### edit PopUp Team ##################################################### */}

        {editPopUP && (
          <div className="main-sec-popup">
            <div className="inner-sec-popup">
              <div className="top-hedind-sec-popup">
                <h2>Edit Team</h2>
              </div>

              <div className="edit-leave-popup">
                <div className="top-sec-heading-team-pop top-bar-flex">
                  <h5>Team Details</h5>
                  <button className="main-btn">Add Member</button>
                </div>
                <div className="label-field">
                  <label>
                    Team Name <span className="red-required">* </span>
                  </label>
                </div>
                <div className="label-field">
                  <input
                    type="text"
                    placeholder="Team Name"
                    value={team}
                    onChange={(e) => setTeam(e.target.value)}
                  ></input>
                </div>
                <div className="label-field">
                  <label>
                    Select Team Member <span className="red-required">* </span>
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
                  <div className="form-text">
                    You Can Select Multiple Tags by Ctrl+Click
                  </div>
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
                  This action will delete all details about the Team ,
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

export default TeamManagementList;
