import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DataService from "../../services/data.service";
import img from "../../Images/placeholder-img.png";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";

const EditTeamList = () => {
  const [data, setData] = useState("");
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [teamId, setTeamId] = useState("");

  const [addMemberPopUp, setAddMemberPopUp] = useState(false);
  const [btnloading, setbtnloading] = useState(false);
  const [selectedMemberOptions, setSelectedMemberOptions] = useState([]);
  const [deleteMember, setDeleteMember] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    getTeam();
    getAllEmployee();
  }, []);

  const getTeam = () => {
    setLoading(true);
    DataService.getTeamById(params.id)
      .then((response) => {
        setData(response.data.data);
        setTeamId(response.data.data?._id);
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

  const getAllEmployee = () => {
    DataService.getAllUserONly()
      .then((response) => {
        setUser(response.data.data);
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

  const handleAddMemSubmit = (e) => {
    e.preventDefault();
    setbtnloading(true);
    const data = {
      members: selectedMemberOptions,
      teamId: teamId,
    };
    DataService.addNewMember(data).then(
      () => {
        toast.success("New Member Added Successfully!!!");
        setTimeout(() => {
          getTeam();
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

  const handleSelectAddMember = (event) => {
    const selectedMemberValues = Array.from(event.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setSelectedMemberOptions(selectedMemberValues);
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
        getTeam();
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

  // Get the IDs of members already in the team
  const teamMemberIds = data.members?.map((member) => member._id) || [];

  // Filter users who are not in the team
  const availableUsers = user.filter(
    (item) => item.status === "active" && !teamMemberIds.includes(item._id)
  );

  return (
    <>
      <div className="main-sec-dashboard">
        <div className="top-bar-content top-bar-flex">
          <h2>Team Detail</h2>
        </div>
        <div className="view-team-main-sec">
          <div className="">
            <div className="inner-sec-view-team">
              <div className="detail-sec-project team-member-sec ">
                <table className="table ">
                  <tbody>
                    {loading && (
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    )}
                    <tr>
                      <td className="d-flex align-items-center">Team Name :</td>
                      <td>{data?.name}</td>
                    </tr>
                    <tr>
                      <td className="d-flex align-items-center">
                        Project Name :
                      </td>
                      <td>{data?.projectId?.name}</td>
                    </tr>
                    <tr>
                      <td className="d-flex align-items-center">TL Name :</td>
                      <td>{data?.projectId?.TLId[0]?.name}</td>
                    </tr>
                    <tr>
                      <td className="d-flex align-items-center">Start Date:</td>
                      <td>
                        {data?.projectId?.startTime
                          ? moment(data.projectId.startTime).format(
                              "DD-MM-YYYY "
                            )
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td className="d-flex align-items-center">End Date :</td>

                      <td>
                        {data?.projectId?.startTime
                          ? moment(data.projectId.endTime).format("DD-MM-YYYY ")
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td className="d-flex align-items-center">Status :</td>

                      <td>{data?.projectId?.status} </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="team-member-sec ">
                <div className="top-bar-flex">
                  <h2 class="sub-heading-sec">Team Members</h2>
                  <button
                    className="main-btn"
                    onClick={(e) => setAddMemberPopUp(true)}
                  >
                    Add New Member
                  </button>
                </div>
                <div className="inner-sec-team-member-sec margin-top team-box-add-member">
                  {loading && (
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  )}
                  {data?.members?.map((member) => (
                    <div className="member-detail" key={member._id}>
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
                      <div className="cross-icon-sec">
                        <i
                          onClick={() =>
                            confirmDeleteMember(teamId, member._id)
                          }
                          className="fas fa-times-circle delete-icon "
                        ></i>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                    Select Team Member <span className="red-required">* </span>
                  </label>
                </div>
                <select
                  multiple
                  required
                  onChange={handleSelectAddMember}
                  value={selectedMemberOptions}
                  className="form-select"
                  style={{ minHeight: "150px" }}
                >
                  <option>Select an option</option>
                  {availableUsers.length > 0 ? (
                    availableUsers.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.name} ({item.position})
                      </option>
                    ))
                  ) : (
                    <option disabled>You have Selected All Member</option>
                  )}
                </select>
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
    </>
  );
};

export default EditTeamList;
