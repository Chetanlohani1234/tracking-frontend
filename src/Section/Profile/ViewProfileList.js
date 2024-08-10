import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DataService from "../../services/data.service";
import { ToastContainer, toast } from "react-toastify";
import img from "../../Images/placeholder-img.png";
const styles = {
  input: {
    opacity: "0%",
    position: "absolute",
  },
};
const ViewProfileList = () => {
  const imgRef = useRef();
  const inputFileRef = useRef();
  const navigate = useNavigate();
  const params = useParams();
  const [btnloading, setbtnloading] = useState(false);

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [team, setTeam] = useState("");
  const [position, setPosition] = useState("");
  const [gender, setGender] = useState("");
  const [language, setLanguage] = useState("");
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const [employeeId, setEmployyeeId] = useState("");
  const [editProfilePopUp, setEditProfilePopUp] = useState(false);
  const [editPasswordPopUp, setEditPasswordPopUp] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    getUserDetail();
  }, []);
  const userId = JSON.parse(localStorage.getItem("userId"));

  const getUserDetail = () => {
    setLoading(true);
    DataService.getUserDetailById(userId)
      .then((data) => {
        setData(data.data.data);
        setName(data.data.data?.name);
        setEmail(data.data.data?.email);
        setNumber(data.data.data?.phone);
        setTeam(data.data.data?.team);
        setPosition(data.data.data?.position);
        setGender(data.data.data?.gender);
        setLanguage(data.data.data?.language);
        setStatus(data.data.data?.status);
        setRole(data.data.data?.role);
        setFile(data?.data?.data?.images?.url);
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

  //   const handleEditFun = (id) => {
  //     setEmployyeeId(id);
  //     // setEditPop(id);
  //   };

  const triggerFile = () => {
    inputFileRef.current.click();
  };
  const onFileChangeCapture = (e) => {
    const file = e.target.files[0];
    setFile(e.target.files);
    const reader = new FileReader();
    const url = reader.readAsDataURL(file);
    reader.onloadend = function (theFile) {
      var image = new Image();
      image.src = theFile.target.result;
      imgRef.current.src = image.src;
    };
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setbtnloading(true);
    const formData = new FormData();
    if (file && file.length > 0) {
      formData.append("images", file[0]);
    }
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", number);
    DataService.updateUser(userId, formData)
      .then((response) => {
        toast.success("Profile Updated successfully !! ", {});
        getUserDetail();
        setEditProfilePopUp(false);
        setbtnloading(false);
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setbtnloading(false);
      });
  };

  const toggleShowPassword = (passwordType) => {
    if (passwordType === "old") {
      setShowOldPassword(!showOldPassword);
    } else if (passwordType === "new") {
      setShowNewPassword(!showNewPassword);
    } else if (passwordType === "confirm") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleChangePassword = () => {
    if (!oldPassword) {
      toast.error("Old Password is required");
      setLoading(false);
      setbtnloading(false);
      return;
    }
    if (!newPassword) {
      toast.error("New Password is required");
      setLoading(false);
      setbtnloading(false);
      return;
    }
    if (!confirmPassword) {
      toast.error("Confirm Password is required");
      setLoading(false);
      setbtnloading(false);
      return;
    }

    const data = {
      oldPassword,
      newPassword,
      confirmPassword,
    };

    DataService.changePassword(userId, data)
      .then((response) => {
        toast.success(response.data.message, { position: "top-right" });
        getUserDetail();
        setEditPasswordPopUp(false);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <>
      <ToastContainer />
      <div className="inner-sec-userDetail main-sec-dashboard">
        <div className="top-bar-content">
          <h2>View Profile</h2>
        </div>
        {/* <div className="user-img-sec-detail">
          {data?.images ? (
            <img
              src={"https://trackingtime-c5jw.onrender.com" + data?.images?.url}
              alt="profie image"
            />
          ) : (
            <img src={img} alt="profie image" />
          )}
        </div> */}
        <div className="sub-inner-userDetail">
          <div className="left-side-userDetail">
            <div className="profile-image-sec">
              {data?.images ? (
                <img
                  src={
                    "https://trackingtime-c5jw.onrender.com" + data?.images?.url
                  }
                  alt="profie image"
                />
              ) : (
                <img src={img} alt="profie image" />
              )}
            </div>
            <div className="label-filed">
              <label>User Name</label>
            </div>
            <div className="label-filed">
              <input type="text" value={name} />
            </div>
            <div className="label-filed">
              <label>Email Address</label>
            </div>
            <div className="label-filed">
              <input type="email" value={email} />
            </div>
            <div className="label-filed">
              <label>Phone Number</label>
            </div>
            <div className="label-filed">
              <input type="number" value={number} />
            </div>
          </div>
          <div className="right-side-userDetail">
            <div className="label-filed">
              <label>TEAM</label>
            </div>
            <div className="label-filed">
              <input type="text" value={team} />
            </div>
            <div className="label-filed">
              <label>ROLE</label>
            </div>
            <div className="label-filed">
              <input type="text" value={role} />
            </div>
            <div className="label-filed">
              <div className="label-filed">
                <label>Position</label>
              </div>
              <div className="label-filed">
                <input type="text" value={position} />
              </div>
              <label>Gender</label>
            </div>
            <div className="label-filed">
              <input type="text" value={gender} />
            </div>
            <div className="label-filed">
              <label>Language</label>
            </div>
            <div className="label-filed">
              <input type="email" value={language} />
            </div>
            <div className="label-filed">
              <label>Status</label>
            </div>
            <div className="label-filed">
              <input type="text" value={status} />
            </div>
          </div>
        </div>
        <div className="bottom-btn-sec">
          <button
            className="main-btn "
            onClick={() => setEditProfilePopUp(true)}
          >
            Edit Profile
          </button>
          <button
            className="main-btn"
            onClick={() => setEditPasswordPopUp(true)}
          >
            ChangePassword
          </button>
        </div>
      </div>

      {/* ################################################## Edit Profile PopUp ################################## */}
      {editProfilePopUp && (
        <div className="main-sec-popup">
          <div className="inner-sec-popup">
            <div className="top-hedind-sec-popup">
              <h2>Edit Profile</h2>
            </div>
            <div className="label-main-sec">
              <div className="edit-profile-main-sec-pop">
                <div className="left-side-view-profile">
                  <div className="Profile-img-sec" onClick={triggerFile}>
                    {data?.images ? (
                      <img
                        ref={imgRef}
                        src={
                          "https://trackingtime-c5jw.onrender.com" +
                          data?.images?.url
                        }
                        alt="profie image"
                      />
                    ) : (
                      <img ref={imgRef} src={img} alt="profie image" />
                    )}
                  </div>
                  <input
                    type="file"
                    ref={inputFileRef}
                    style={styles.input}
                    accept="image/*"
                    onChangeCapture={onFileChangeCapture}
                  />
                </div>

                <div className="right-side-view-profile">
                  <div className="label-field">
                    <label>Name <span className="red-required">* </span></label>
                  </div>
                  <div className="label-field">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="label-field">
                    <label>Email <span className="red-required">* </span></label>
                  </div>
                  <div className="label-field">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="label-field">
                    <label>Number <span className="red-required">* </span></label>
                  </div>
                  <div className="label-field">
                    <input
                      type="number"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="bottom-pop-btn">
                <button
                  className="main-btn"
                  onClick={() => setEditProfilePopUp(false)}
                >
                  Cancel
                </button>
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
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ################################################## Edit password PopUp ################################## */}

      {editPasswordPopUp && (
        <div className="main-sec-popup">
          <div className="inner-sec-popup">
            <div className="top-hedind-sec-popup">
              <h2>Change Password</h2>
            </div>
            <div className="label-main-sec">
              <div className="label-field">
                <label>Old Password <span className="red-required">* </span></label>
              </div>
              <div className="label-field change-password-input">
                <input
                  type={showOldPassword ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <i
                  className={`fa ${
                    showOldPassword ? "fa-eye-slash" : "fa-eye"
                  } view-icon`}
                  onClick={() => toggleShowPassword("old")}
                  style={{ cursor: "pointer" }}
                ></i>
              </div>

              <div className="label-field">
                <label>New Password <span className="red-required">* </span></label>
              </div>
              <div className="label-field change-password-input">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <i
                  className={`fa ${
                    showNewPassword ? "fa-eye-slash" : "fa-eye"
                  } view-icon`}
                  onClick={() => toggleShowPassword("new")}
                  style={{ cursor: "pointer" }}
                ></i>
              </div>

              <div className="label-field">
                <label>Confirm Password <span className="red-required">* </span></label>
              </div>
              <div className="label-field change-password-input">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <i
                  className={`fa ${
                    showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                  } view-icon`}
                  onClick={() => toggleShowPassword("confirm")}
                  style={{ cursor: "pointer" }}
                ></i>
              </div>

              <div className="bottom-pop-btn">
                <button
                  className="main-btn"
                  onClick={() => setEditPasswordPopUp(false)}
                >
                  Cancel
                </button>
                <button
                  className="main-btn"
                  onClick={handleChangePassword}
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
    </>
  );
};

export default ViewProfileList;
