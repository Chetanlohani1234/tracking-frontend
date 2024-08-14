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
const UOMEdit = () => {
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
    DataService.getUomById(params.id)
      .then((data) => {
        setData(data.data.data);
        setName(data.data.data?.uom);

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

    
    if (!name) {
      toast.error("UOM is required");
      setLoading(false);
      //setbtnloading(false);
      return;
    }



    const data = {
      uom: name
    };

    DataService.updateUom(params.id,data).then(
      () => {
        toast.success("UOM Updated Successfully!!!");
        setTimeout(() => {
            navigate("/uom")
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
          <h2>Edit Unit Of Measurement</h2>
        </div>

        <div className="sub-inner-userDetail">
          <div className="left-side-userDetail">
            <div className="label-filed">
              <label>UOM <span className="red-required">* </span></label>
            </div>
            <div className="label-filed">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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

export default UOMEdit;
