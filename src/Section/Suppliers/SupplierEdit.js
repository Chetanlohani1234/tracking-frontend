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
const SupplierEdit = () => {
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
  const [country,setCountry] = useState("");

  const [state,setState] = useState("");
  const [city,setCity] = useState("");
  const [bName,setBName] = useState("");
  const [bankName,setBankName] = useState("");
  const [accNumber,setAccNumber] = useState("");
  const [code,setCode] = useState("");

  const [number, setNumber] = useState("");
  const [address,setAddress] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    getSupplierDetail();
  }, []);

  const getSupplierDetail = () => {
    setLoading(true);
    DataService.getSupplierDetailById(params.id)
      .then((data) => {
        setData(data.data.data);
        setName(data.data?.name);
        setEmail(data?.data?.email);
        setNumber(data?.data?.phoneNo);
        setAddress(data?.data?.address);
        setCountry(data?.data?.country);
        setState(data?.data?.state);
        setCity(data?.data?.city);
        setBName(data?.data?.beneficiaryname);
        setBankName(data?.data?.bankname);
        setAccNumber(data?.data?.accountno);
        setCode(data?.data?.ifsccode);


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
    //setbtnloading(true);


    const data = {
      name: name,
      email: email,
      phoneNo: number,
      address:address
    };

    DataService.updateUser(params.id,data).then(
      () => {
        toast.success("User Updated Successfully!!!");
        setTimeout(() => {
            navigate("/all-user")
          //getAllUser();
          //setAddUserPopUp(false);
          //setbtnloading(false);
        }, 1000);
        setName("");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        //setbtnloading(false);
        toast.error(resMessage);
      }
    );
  };

  return (
    <>
      <ToastContainer />
      {/* <div className="main-sec-userDetal-sec"> */}
      <div className="inner-sec-userDetail main-sec-dashboard">
        <div className="top-bar-content ">
          <h2>Edit User</h2>
        </div>

        <div className="sub-inner-userDetail">
          <div className="left-side-userDetail">
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

            <div className="label-filed">
              <label>Country <span className="red-required">* </span></label>
            </div>
            <div className="label-filed">
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <div className="label-filed">
              <label>State <span className="red-required">* </span></label>
            </div>
            <div className="label-filed">
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>

            <div className="label-filed">
              <label>City <span className="red-required">* </span></label>
            </div>
            <div className="label-filed">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="label-filed">
              <label>Beneficiary Name <span className="red-required">* </span></label>
            </div>
            <div className="label-filed">
              <input
                type="text"
                value={bName}
                onChange={(e) => setBName(e.target.value)}
              />
            </div>

            <div className="label-filed">
              <label>Bank Name <span className="red-required">* </span></label>
            </div>
            <div className="label-filed">
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
            </div>

            <div className="label-filed">
              <label>Account Number <span className="red-required">* </span></label>
            </div>
            <div className="label-filed">
              <input
                type="text"
                value={accNumber}
                onChange={(e) => setAccNumber(e.target.value)}
              />
            </div>

            <div className="label-filed">
              <label>Code <span className="red-required">* </span></label>
            </div>
            <div className="label-filed">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
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

export default SupplierEdit;
