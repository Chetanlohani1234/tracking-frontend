import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DataService from "../../services/data.service";
import { ToastContainer, toast } from "react-toastify";
import img from "../../Images/placeholder-img.png";

const UserDeatilList = () => {
  const imgRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const params = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    getUserDetail();
  }, []);

  const getUserDetail = () => {
    setLoading(true);
    DataService.getUserDetailById(params.id)
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
      <div className="inner-sec-userDetail main-sec-dashboard">
        <div className="top-bar-content top-bar-flex">
          <h2>View Employee Detail</h2>
          <Link to={"/view-employee-performace/" + params.id}>
            <button className="main-btn">Check User Performance</button>
          </Link>
        </div>

        <div className="sub-inner-userDetail">
          <div className="left-side-userDetail">
            <div className="profile-image-sec">
              {data?.images ? (
                <img
                  ref={imgRef}
                  src={
                    "https://trackingtime-c5jw.onrender.com" + data?.images?.url
                  }
                  alt="profie image"
                />
              ) : (
                <img src={img} ref={imgRef} alt="profie image" />
              )}
            </div>
            <div className="label-filed">
              <label>User Name</label>
            </div>
            <div className="label-filed">
              <input type="text" value={data?.name} />
            </div>
            <div className="label-filed">
              <label>Email Address</label>
            </div>
            <div className="label-filed">
              <input type="email" value={data?.email} />
            </div>
            <div className="label-filed">
              <label>Phone Number</label>
            </div>
            <div className="label-filed">
              <input type="number" value={data?.phone} />
            </div>
          </div>
          <div className="right-side-userDetail">
            <div className="label-filed">
              <label>TEAM</label>
            </div>
            <div className="label-filed">
              <input type="text" value={data?.team} />
            </div>
            <div className="label-filed">
              <div className="label-filed">
                <label>Position</label>
              </div>
              <div className="label-filed">
                <input type="text" value={data?.position} />
              </div>
              <label>Gender</label>
            </div>
            <div className="label-filed">
              <input type="text" value={data?.gender} />
            </div>
            <div className="label-filed">
              <label>Language</label>
            </div>
            <div className="label-filed">
              <input type="email" value={data?.language} />
            </div>
            <div className="label-filed">
              <label>Status </label>
            </div>
            <div className="label-filed">
              <input type="email" value={data?.status} />
            </div>

            <div className="label-filed">
              <label>Role </label>
            </div>
            <div className="label-filed">
              <input type="email" value={data?.role} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDeatilList;
