import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import DataService from "../../services/data.service";
import img from "../../Images/placeholder-img.png";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";

const ViewTeamList = () => {
  const [data, setData] = useState("");
  const params = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    getTeam();
  }, []);

  const getTeam = () => {
    setLoading(true);
    DataService.getTeamById(params.id)
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

  return (
    <>
      <div className="main-sec-dashboard">
        <div className="top-bar-content top-bar-flex">
          <h2>Team Detail</h2>
          <Link to={"/view-team-performace/" + params.id}>
            <button className="main-btn">Check Team Performance</button>
          </Link>
        </div>
        <div className="view-team-main-sec">
          <div className="">
            <div className="inner-sec-view-team">
              <div className="detail-sec-project team-member-sec ">
                <table class="table ">
                  <tbody>
                    {loading && (
                      <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
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
                    {/* <tr>
                      <td className="d-flex align-items-center">
                        start Date :
                      </td>
                      <td>
                        {moment(data?.projectId?.startTime).format(
                          "DD/MM/YYYY"
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="d-flex align-items-center">End Date :</td>
                      <td>
                        {moment(data?.projectId?.endTime).format("DD/MM/YYYY")}
                      </td>
                    </tr> */}
                    {/* <tr>
                        <td className="d-flex align-items-center">status :</td>
                        <td>{data?.projectId?.status}</td>
                      </tr> */}
                  </tbody>
                </table>
              </div>

              <div className="team-member-sec">
                <h2 className="sub-heading-sec">Team Members</h2>
                <div className="inner-sec-team-member-sec">
                  {loading && (
                    <div class="spinner-border" role="status">
                      <span class="sr-only">Loading...</span>
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
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewTeamList;
