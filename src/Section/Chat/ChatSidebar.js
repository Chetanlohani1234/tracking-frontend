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
const ChatSideBar = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [addGroup, setAddGroup] = useState(false);
  const navigate = useNavigate();
  const [allUser, setAllUser] = useState();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [file, setFile] = useState(null);

  const inputFileRef = useRef();
  const imgRef = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllUser();
  }, []);

  const userId = JSON.parse(localStorage.getItem("userId"));

  const getAllUser = () => {
    setLoading(true);
    DataService.getAllUsers()
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
  const handleSelectChange = (event) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(selectedValues);
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
  return (
    <>
      <div className="side-bar-chat">
        <div className="chat-list-sec">
          <div className="main-sec-top-bar-chat-sidebar">
            <div className="top-bar-chat-sidebar">
              <div className="inner-sec-sidebar-sec inner-top-chat-sec">
                <div className="img-sec-top-bar">
                  <img src={img} />
                </div>
                <div className="user-name-sec">
                  <h6>deep badwal</h6>
                </div>
              </div>
              <div className="chat-icon-top">
                {/* <i class="fas fa-bell"></i> */}
                {/* <i class="fas fa-plus" onClick={() => setAddGroup(true)}></i> */}
                <i class="fas fa-users" onClick={() => setAddGroup(true)}></i>
              </div>
            </div>
            <div className="serach-bar-sec-chat">
              <div className="inner-sec-searchbar-chat">
                <i class="fas fa-search"></i>
                <input type="search" placeholder="Search" />
              </div>
            </div>
          </div>
          <div className="main-sec-inner-siderbar-sec">
            <div className="inner-sec-sidebar-sec">
              <div className="image-user-sec">
                <img src={img} />
              </div>
              <div className="user-name-sec">
                <h6>deep badwal</h6>
                <p>last message</p>
              </div>
            </div>
          </div>
        </div>

        {/* ############################################### add group PopUp ######################################################################## */}
        {addGroup && (
          <div className="main-sec-popup">
            <div className="inner-sec-popup">
              <div className="top-hedind-sec-popup">
                <h2>Create Group</h2>
              </div>
              <div className="add-group-sec-popUp">
                <div className="left-side-add-group">
                  <h4 className="f-700">Thumbnail</h4>
                  <div className="chat-group-image" onClick={triggerFile}>
                    <img src={img} ref={imgRef} alt="" />
                  </div>
                  <p className="text-center">Set the Group thumbnail image.</p>
                  <input
                    type="file"
                    ref={inputFileRef}
                    style={styles.input}
                    onChangeCapture={onFileChangeCapture}
                  />
                </div>

                <div className="right-side-add-group">
                  <div className="label-field">
                    <label>Group Name</label>
                  </div>
                  <div className="label-field">
                    <input
                      type="text"
                      // value={name}
                      // onChange={(e) => setName(e.target.value)}
                      placeholder="Group Name"
                    />
                  </div>
                  <div className="label-field">
                    <label>Add Member</label>
                  </div>
                  <div className="label-field">
                    <select
                      multiple
                      required
                      onChange={handleSelectChange}
                      value={selectedOptions}
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
                    <div className="form-text multiple-Tl-text">
                      You Can Select Multiple TL by Ctrl+Click
                    </div>
                  </div>
                </div>
              </div>
              <div className="bottom-pop-btn">
                <button className="main-btn">
                  {/* <button className="main-btn" onClick={handleAddSubmit}> */}
                  Save
                </button>
                <button className="main-btn" onClick={() => setAddGroup(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatSideBar;
