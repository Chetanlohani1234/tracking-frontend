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
const EditUserList = () => {
  const inputFileRef = useRef();
  const imgRef = useRef();
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [btnloading, setBtnLoading] = useState(false);

  const [data, setData] = useState({});
  const params = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [team, setTeam] = useState("");
  const [position, setPosition] = useState("");
  const [gender, setGender] = useState("");
  const [language, setLanguage] = useState("");
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");

  const [address,setAddress] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    getUserDetail();
  }, []);

  const getUserDetail = () => {
    setLoading(true);
    DataService.getUserDetailById(params.id)
      .then((data) => {
        setData(data.data.data);
        setFile(data?.data?.data?.images?.url);
        setName(data.data.data?.name);
        setEmail(data.data.data?.email);
        setNumber(data.data.data?.phoneNo);
        setAddress(data.data.data?.address);
        //setTeam(data.data.data?.team);
        //setPosition(data.data.data?.position);
        //setGender(data.data.data?.gender);
        //setLanguage(data.data.data?.language);
        //setStatus(data.data.data?.status);
        //setRole(data.data.data?.role);
        
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
  const triggerFile = () => {
    inputFileRef.current.click();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setBtnLoading(true);
    const formData = new FormData();

    // if (file && file.length > 0) {
    //   formData.append("images", file[0]);
    // }

    formData.append("name", name);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("phoneNo", number);


    DataService.updateUser(params.id, formData)
      .then(() => {
        toast.success("User Updated Successfully!!!");
        setBtnLoading(false);
        setTimeout(() => {
          //navigate("/all-user");
        }, 2000);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setBtnLoading(false);
      });
  };

  return (
    <>
      <ToastContainer />
      {/* <div className="main-sec-userDetal-sec"> */}
      <div className="inner-sec-userDetail main-sec-dashboard">
        <div className="top-bar-content ">
          <h2>Edit Detail</h2>
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
                  onClick={triggerFile}
                />
              ) : (
                <img
                  src={img}
                  ref={imgRef}
                  alt="profie image"
                  onClick={triggerFile}
                />
              )}
              <input
                type="file"
                ref={inputFileRef}
                style={styles.input}
                accept="image/*"
                onChangeCapture={onFileChangeCapture}
              />
            </div>
            <div className="label-filed">
              <label>User Name <span className="red-required">* </span></label>
            </div>
            <div className="label-filed">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="label-filed">
              <label>Email Address <span className="red-required">* </span></label>
            </div>
            <div className="label-filed">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="label-filed">
              <label>Phone Number <span className="red-required">* </span></label>
            </div>
            <div className="label-filed">
              <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="right-side-userDetail">
            <div className="label-filed">
              <label>Address <span className="red-required">* </span></label>
            </div>
            <div className="label-filed">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>


          </div>
        </div>
        <div className="bottom-btn-sec">
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
      {/* </div> */}
    </>
  );
};

export default EditUserList;
