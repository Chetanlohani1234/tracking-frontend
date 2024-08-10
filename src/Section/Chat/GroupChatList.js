import React, { useEffect, useState, useRef } from "react";
import DataService from "../../services/data.service";
import { ToastContainer, toast } from "react-toastify";
import img from "../../Images/placeholder-img.png";
import io from "socket.io-client";

// const socket = io("http://localhost:3000");
const socket = io("https://trackingtime-c5jw.onrender.com");
const styles = {
  input: {
    opacity: "0%",
    position: "absolute",
  },
};

const GroupChatList = () => {
  const userID = JSON.parse(localStorage.getItem("userId"));
  const userDetails = JSON.parse(localStorage.getItem("user"));
  const userDetail = JSON.parse(localStorage.getItem("user"));
  const senderName = userDetails.name;
  const fileInputRef = useRef(null);

  const [allUser, setAllUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [groupMessages, setGroupMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messageRef = useRef(null);
  const [allUserPop, setAllUserPop] = useState(false);
  const [groupPopup, setGroupPopup] = useState(false);
  const [addGroupPopup, setAddGroupPopup] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [group, setGroup] = useState([]);

  const [filteredUser, setFilteredUser] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [file, setFile] = useState(null);
  const inputFileRef = useRef();
  const imgRef = useRef();
  const [allChat, setAllChat] = useState([]);
  const [GroupChatPop, setGroupChatPopup] = useState(false);
  const [SingleChatPop, setSingleChatPopup] = useState(true);
  const [filteredRoom, setFilteredRoom] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [singleUserChatPop, setSingleUserChatPop] = useState(false);
  const [editGroupPop, setEditGroupPop] = useState(false);
  const [showMemberList, setShowMemberList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [groupDetails, setGroupDetails] = useState([]);


  const userName = userDetail.name;
  useEffect(() => {
    socket.emit("user_added", userID);

    getAllUser();
    getAllGroup();
    getChatList();

    socket.on("new_private_message", handleNewPrivateMessage);
    socket.on("new_group_message", handleNewGroupMessage);

    return () => {
      socket.off("new_private_message", handleNewPrivateMessage);
      socket.off("new_group_message", handleNewGroupMessage);
    };
  }, [userID, socket]);

  const handleNewPrivateMessage = (data) => {
    console.log("Received private message via socket:", data);
    if (data.senderId !== userID) {
      setMessages((prevMessages) => [...prevMessages, data]);
    }
  };

  const handleNewGroupMessage = (data) => {
    console.log("Received group message via socket:", data);
    if (data.senderId !== userID) {
      setGroupMessages((prevMessages) => [...prevMessages, data]);
    }
  };

  useEffect(() => {
    if (selectedUser) {
      DataService.getSingleChat(userID, selectedUser._id)
        .then((data) => {
          setMessages(data?.data.reverse());
        })
        .catch(handleError);
    } else {
      setMessages([]);
    }

    if (selectedGroup) {
      socket.emit("join_room", selectedGroup._id);
      DataService.getGroupMessages(selectedGroup._id)
        .then((data) => {
          setGroupMessages(data?.data.reverse());
        })
        .catch(handleError);
    }

    return () => {
      if (selectedGroup) {
        socket.emit("leave_room", selectedGroup._id);
      }
    };
  }, [selectedUser, selectedGroup, userID, socket]);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, groupMessages]);

  const getAllUser = () => {
    DataService.getAllUserChat()
      .then((data) => {
        setUsers(data?.data?.data);
      })
      .catch(handleError);
  };

  const getAllGroup = () => {
    DataService.getAllGroup()
      .then((data) => {
        setGroup(data?.data?.data);
      })
      .catch(handleError);
  };

  const getChatList = () => {
    DataService.getChat(userID)
      .then((data) => {
        setAllUser(data?.data);
        const rooms = data?.data?.rooms;
        const users = data?.data?.users;
        setFilteredUser(users);
        setFilteredRoom(rooms);
      })
      .catch(handleError);
  };
  const sendMessage = async (e) => {
    e.preventDefault();

    if (!message && !selectedFile) {
      toast.error("Please enter a message or select a file to send.");
      return;
    }

    let file = null;
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      file = {
        filename: selectedFile.name,
        data: formData,
        type: selectedFile.type,
      };
    }

    const data = {
      senderId: userID,
      message: message,
      file: file,
    };

    if (selectedUser) {
      data.receiverId = selectedUser._id;
      socket.emit("private_chat_message", data);
      console.log("Sending private message", data);
    } else if (selectedGroup) {
      data.roomId = selectedGroup._id;
      data.senderName = senderName;
      socket.emit("group_chat_message", data);
      console.log("Sending group message", data);
    }

    // Clear the input fields
    setMessage("");
    setSelectedFile(null);
    fileInputRef.current.value = null;

    // Call the API to get the latest messages
    if (selectedUser) {
      DataService.getSingleChat(userID, selectedUser._id)
        .then((data) => {
          setMessages(data?.data.reverse());
        })
        .catch(handleError);
    } else if (selectedGroup) {
      DataService.getGroupMessages(selectedGroup._id)
        .then((data) => {
          setGroupMessages(data?.data.reverse());
        })
        .catch(handleError);
    }

    getChatList();
  };
  // const sendMessage = async (e) => {
  //   e.preventDefault();

  //   if (!message && !selectedFile) {
  //     toast.error("Please enter a message or select a file to send.");
  //     return;
  //   }

  //   let file = null;
  //   if (selectedFile) {
  //     const formData = new FormData();
  //     formData.append("file", selectedFile);

  //     file = {
  //       filename: selectedFile.name,
  //       data: formData,
  //       type: selectedFile.type,
  //       // url: URL.createObjectURL(selectedFile),
  //     };
  //   }

  //   const data = {
  //     senderId: userID,
  //     message: message,
  //     file: file,
  //   };

  //   if (selectedUser) {
  //     data.receiverId = selectedUser._id;
  //     socket.emit("private_chat_message", data);
  //     console.log("Sending private message", data);
  //     setMessages((prevMessages) => [...prevMessages, data]);
  //   } else if (selectedGroup) {
  //     data.roomId = selectedGroup._id;
  //     data.senderName = senderName;
  //     socket.emit("group_chat_message", data);
  //     console.log("Sending group message", data);
  //     setGroupMessages((prevMessages) => [...prevMessages, data]);
  //   }

  //   setMessage("");
  //   setSelectedFile(null);
  //   fileInputRef.current.value = null;

  //   getChatList();
  // };

  const handleCancelFile = () => {
    setSelectedFile(null);
    fileInputRef.current.value = null;
  };

  const handleError = (error) => {
    console.error("Error:", error);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setSelectedGroup(null);
  };

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setSelectedUser(null);
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
    reader.onloadend = function () {
      imgRef.current.src = reader.result;
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const triggerFile = () => {
    inputFileRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBtnLoading(true);

    if (!groupName) {
      toast.error("Group Name is required");
      setBtnLoading(false);
      return;
    }

    if (!selectedOptions || selectedOptions.length === 0) {
      toast.error("Select at least one member");
      setBtnLoading(false);
      return;
    }
    const members = [...selectedOptions, userID];
    const data = {
      name: groupName,
      members: members,
    };

    DataService.addGroup(data)
      .then((response) => {
        toast.success("Group Created Successfully!");
        setBtnLoading(false);
        setAddGroupPopup(false);
        getAllGroup();
        getChatList();
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Failed to create group");
        setBtnLoading(false);
      });
  };

  const openSingleChat = () => {
    setSingleChatPopup(true);
    setGroupChatPopup(false);
  };
  const openGroupChat = () => {
    setGroupChatPopup(true);
    setSingleChatPopup(false);
  };
  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);

      const fileReader = new FileReader();
      fileReader.onload = () => {
        setFilePreview(fileReader.result);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const handleAddGroupMember = (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const data = {
      groupId: selectedGroup?._id,
      memberId: selectedOptions,
    };

    DataService.addGroupMember(data)
      .then((response) => {
        toast.success("Member added Successfully!");
        setBtnLoading(false);
        getGroupByids(selectedGroup?._id);
        setShowMemberList(false);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Failed to create group");
        setBtnLoading(false);
      });
  };

  const handleEditGroup = (id) => {
    setEditGroupPop(true);
    getGroupByids(id);
  };

  const getGroupByids = (id) => {
    setLoading(true);
    DataService.getGroupById(id)
      .then((data) => {
        setGroupDetails(data?.data?.data);
        setGroupName(data?.data?.data?.name);
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

  const toggleMemberList = () => {
    setShowMemberList(!showMemberList);
  };

  const handleRemoveGroupMember = (memberId) => {
    removeGroupMember(selectedGroup?._id, memberId);
  };
  const removeGroupMember = (groupId, memberId) => {
    const data = {
      groupId: groupId,
      memberId: memberId,
    };

    DataService.removeGroupMember(data)
      .then((response) => {
        toast.success("Member Removed Successfully!");
        getGroupByids(selectedGroup?._id);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Failed to remove member");
      });
  };
  const deleteGroupById = () => {
    DataService.deleteGroup(selectedGroup?._id).then(
      () => {
        toast.success(`Group deleted successfully`);
        setEditGroupPop(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
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
      <div className="chat-sec-padding">
        <div className="main-sec-chat">
          <div className="left-side-chat">
            <div className="side-bar-chat">
              <div className="chat-list-sec">
                <div className="main-sec-top-bar-chat-sidebar">
                  <div className="top-bar-chat-sidebar">
                    <div className="inner-sec-sidebar-sec inner-top-chat-sec">
                      <div className="img-sec-top-bar">
                        <img src={img} alt="User" />
                      </div>
                      <div className="user-name-sec">
                        <h6>{userName}</h6>
                      </div>
                    </div>
                    <div className="chat-icon-top">
                      <i
                        className="fas fa-user-plus single-user-list"
                        onClick={() => setAllUserPop(true)}
                      ></i>
                      {/* <i
                        className="fas fa-users"
                        onClick={() => setGroupPopup(true)}
                      ></i> */}
                      <i
                        class="fas fa-users-cog"
                        onClick={() => setAddGroupPopup(true)}
                      ></i>
                    </div>
                  </div>
                  <div className="serach-bar-sec-chat">
                    <div className="inner-sec-searchbar-chat">
                      <i className="fas fa-search"></i>
                      <input
                        type="search"
                        placeholder="Search"
                        // onChange={(e) => setFilter(e.target.value)}
                      />
                    </div>
                    <div className="selcet-chat-icon">
                      <i
                        className="fas fa-user-tie"
                        onClick={openSingleChat}
                      ></i>
                      <i className="fas fa-users" onClick={openGroupChat}></i>
                    </div>
                  </div>
                </div>
                {SingleChatPop && (
                  <div className="main-sec-inner-siderbar-sec">
                    {filteredUser && filteredUser.length > 0 ? (
                      filteredUser.map((user, index) => (
                        <div
                          className="inner-sec-sidebar-sec"
                          key={index}
                          onClick={() => handleUserClick(user)}
                        >
                          <div className="image-user-sec">
                            <img src={img} alt="User" />
                          </div>
                          <div className="user-name-sec">
                            <h6> {user?.name}</h6>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-lg font-semibold mt-24">
                        No Conversations
                      </div>
                    )}
                  </div>
                )}
                {GroupChatPop && (
                  <div className="main-sec-inner-siderbar-sec">
                    {filteredRoom && filteredRoom.length > 0 ? (
                      filteredRoom.map((user, index) => (
                        <div
                          className="inner-sec-sidebar-sec"
                          key={index}
                          onClick={() => handleGroupClick(user)}
                        >
                          <div className="image-user-sec">
                            <img src={img} alt="User" />
                          </div>
                          <div className="user-name-sec">
                            <h6> {user?.name}</h6>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-lg font-semibold mt-24">
                        No Conversations
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="right-side-chat">
            <div className="chat-message-sec">
              {(selectedUser || selectedGroup) && (
                <div className="right-side-box-chat">
                  <div className="top-bar-chat-box">
                    {selectedUser && (
                      <>
                        <div className="top-box-chat-img">
                          <img src={img} alt="User" />
                        </div>
                        <h4>{selectedUser.name}</h4>
                      </>
                    )}
                    {selectedGroup && (
                      <>
                        <div className="top-box-chat-img">
                          <img src={img} alt="User" />
                        </div>
                        <h4>{selectedGroup.name}</h4>
                      </>
                    )}
                  </div>
                  {/* {selectedUser && (
                    <div className="edit-group-icon">
                      <i
                        className="fas fa-ellipsis-v"
                        // onClick={()=>{hangleSingleChatId(selectedUser?._id)}}
                      ></i>
                    </div>
                  )} */}
                  {selectedGroup && (
                    <div className="edit-group-icon">
                      <i
                        className="fas fa-ellipsis-v"
                        onClick={() => handleEditGroup(selectedGroup?._id)}
                      ></i>
                    </div>
                  )}
                </div>
              )}
              <div className="chat-box-height">
                <div className="left-side-message">
                  <div className="inner-sec-message-sec-left">
                    <ul>
                      {selectedUser ? (
                        messages && messages.length > 0 ? (
                          messages.map(
                            (
                              { message, senderId, senderName, file },
                              index
                            ) => (
                              <div className="message-wrapper" key={index}>
                                <div
                                  className={`message-box ${
                                    senderId === userID
                                      ? "user-message"
                                      : "other-message"
                                  }`}
                                >
                                  <div className="message-content">
                                    {message}
                                    {file && file.url && (
                                      <div className="file-content">
                                        {file.type &&
                                        file.type.startsWith("image/") ? (
                                          <img
                                            src={`https://trackingtime-c5jw.onrender.com${file.url}`}
                                            alt={file.filename}
                                            style={{
                                              maxWidth: "100%",
                                              height: "auto",
                                            }}
                                          />
                                        ) : file.type === "application/pdf" ? (
                                          <embed
                                            src={`https://trackingtime-c5jw.onrender.com${file.url}`}
                                            width="100%"
                                            height="500px"
                                            type="application/pdf"
                                          />
                                        ) : (
                                          <a
                                            href={`https://trackingtime-c5jw.onrender.com${file.url}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            {file.filename}
                                          </a>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                  <div className="sender-name">
                                    {senderName}
                                  </div>
                                </div>
                              </div>
                            )
                          )
                        ) : (
                          <div className="no-messages">
                            No Messages Here. You Can Start a New Chat Here.
                          </div>
                        )
                      ) : selectedGroup ? (
                        groupMessages && groupMessages.length > 0 ? (
                          groupMessages.map(
                            (
                              { message, senderId, senderName, file },
                              index
                            ) => (
                              <div className="message-wrapper" key={index}>
                                <div
                                  className={`message-box ${
                                    senderId === userID
                                      ? "user-message"
                                      : "other-message"
                                  }`}
                                >
                                  <div className="message-content">
                                    {message}
                                    {file && file.url && (
                                      <div className="file-content">
                                        {file.type &&
                                        file.type.startsWith("image/") ? (
                                          <img
                                            src={`https://trackingtime-c5jw.onrender.com${file.url}`}
                                            alt={file.filename}
                                            style={{
                                              maxWidth: "100%",
                                              height: "auto",
                                            }}
                                          />
                                        ) : file.type === "application/pdf" ? (
                                          <embed
                                            src={`https://trackingtime-c5jw.onrender.com${file.url}`}
                                            width="100%"
                                            height="500px"
                                            type="application/pdf"
                                          />
                                        ) : (
                                          <a
                                            href={`https://trackingtime-c5jw.onrender.com${file.url}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            {file.filename}
                                          </a>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                  <div className="sender-name">
                                    {senderName}
                                  </div>
                                </div>
                              </div>
                            )
                          )
                        ) : (
                          <div className="no-messages">
                            No Messages Here. You Can Start a New Chat Here.
                          </div>
                        )
                      ) : (
                        <div className="no-messages">
                          No Messages or No Conversation Selected
                        </div>
                      )}
                    </ul>

                    {/* <ul>
                      {selectedUser ? (
                        messages && messages.length > 0 ? (
                          messages.map(
                            (
                              { message, senderId, senderName, file },
                              index
                            ) => (
                              <div className="message-wrapper" key={index}>
                                <div
                                  className={`message-box ${
                                    senderId === userID
                                      ? "user-message"
                                      : "other-message"
                                  }`}
                                >
                                  <div className="message-content">
                                    {message}
                                    {file && (
                                      <div className="file-content">
                                        <a
                                          href={file.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          {file.filename}
                                        </a>
                                      </div>
                                    )}
                                  </div>
                                  <div className="sender-name">
                                    {senderName}
                                  </div>
                                </div>
                              </div>
                            )
                          )
                        ) : (
                          <div className="no-messages">
                            No Messages Here. You Can Start a New Chat Here.
                          </div>
                        )
                      ) : selectedGroup ? (
                        groupMessages && groupMessages.length > 0 ? (
                          groupMessages.map(
                            (
                              { message, senderId, senderName, file },
                              index
                            ) => (
                              <div className="message-wrapper" key={index}>
                                <div
                                  className={`message-box ${
                                    senderId === userID
                                      ? "user-message"
                                      : "other-message"
                                  }`}
                                >
                                  <div className="message-content">
                                    {message}
                                    {file && (
                                      <div className="file-content">
                                        <a
                                          href={file.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          {file.filename}
                                        </a>
                                      </div>
                                    )}
                                  </div>
                                  <div className="sender-name">
                                    {senderName}
                                  </div>
                                </div>
                              </div>
                            )
                          )
                        ) : (
                          <div className="no-messages">
                            No Messages Here. You Can Start a New Chat Here.
                          </div>
                        )
                      ) : (
                        <div className="no-messages">
                          No Messages or No Conversation Selected
                        </div>
                      )}
                    </ul> */}
                    <div ref={messageRef}></div>
                  </div>
                </div>
              </div>

              {(selectedUser || selectedGroup) && (
                <div className="bottom-sec-chat-sec">
                  <form onSubmit={sendMessage}>
                    <div className="inner-sec-bottom-chat">
                      <div className="add-file-icon" onClick={handleIconClick}>
                        <i className="fas fa-plus"></i>
                      </div>
                      {selectedFile && (
                        <div className="file-preview file-selected-sec">
                          <img src={filePreview} alt="File Preview" />
                          <div className="cancel-file-selected-sec">
                            <i
                              className="fas fa-times"
                              onClick={handleCancelFile}
                            ></i>
                          </div>
                        </div>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                      <div className="message-field">
                        <input
                          type="text"
                          placeholder="Type message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </div>
                      <button className="send-message-btn" type="submit">
                        <i className="fas fa-paper-plane"></i>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {allUserPop && (
        <div className="main-sec-popup">
          <div className="inner-sec-popup">
            <div className="top-hedind-sec-popup">
              <h2>Selected User</h2>
            </div>
            <div className="add-group-sec-popup all-user-sec-pop">
              {users && users.length > 0 ? (
                users
                  .filter(
                    (user) => user.status === "active" && user._id !== userID
                  )
                  .map((user) => (
                    <div
                      key={user._id}
                      className="user-name-sec"
                      onClick={() => {
                        handleUserClick(user);
                        setAllUserPop(false);
                      }}
                    >
                      <h2>
                        {user.name} ({user?.position})
                      </h2>
                    </div>
                  ))
              ) : (
                <div className="text-center text-lg font-semibold mt-24">
                  No Conversations
                </div>
              )}
            </div>
            <div className="bottom-pop-btn">
              <button className="main-btn" onClick={() => setAllUserPop(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* {groupPopup && (
        <div className="main-sec-popup">
          <div className="inner-sec-popup">
            <div className="top-hedind-sec-popup">
              <h2>Selected Group</h2>
            </div>
            <div className="add-group-sec-popup all-user-sec-pop">
              {group && group.length > 0 ? (
                group
                  .filter((group) => group.members.includes(userID))
                  .map((group) => (
                    <div
                      key={group._id}
                      className="user-name-sec"
                      onClick={() => {
                        handleGroupClick(group);
                        setGroupPopup(false);
                      }}
                    >
                      <h2>{group.name}</h2>
                    </div>
                  ))
              ) : (
                <div className="text-center text-lg font-semibold mt-24">
                  No groups found
                </div>
              )}
            </div>
            <div className="bottom-pop-btn">
              <button className="main-btn" onClick={() => setGroupPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )} */}
      {/* ####################### add group popup ################################## */}
      {addGroupPopup && (
        <div className="main-sec-popup">
          <div className="inner-sec-popup">
            <div className="top-hedind-sec-popup">
              <h2>Create Group</h2>
            </div>
            <div className="Add-group-main-sec-pop">
              {/* <div className="left-side-add-group-sec-pop">
               <h4 className="f-700">Thumbnail</h4>
                <div className="chat-group-image" onClick={triggerFile}>
                  <img src={img} ref={imgRef} alt="" />
                </div>
                <p className="text-center">
                  Set the Group image. Only .png, .jpg and *.jpeg image files
                  are accepted
                </p>
                <input
                  type="file"
                  ref={inputFileRef}
                  style={styles.input}
                  accept="image/*"
                  onChangeCapture={onFileChangeCapture}
                />
              </div> */}
              <div className="right-side-add-group-sec-pop">
                <div className="label-field">
                  <label>
                    Group Name <span className="red-required">* </span>
                  </label>
                  <div lang="label-field">
                    <input
                      type="text"
                      placeholder="add group name"
                      onChange={(e) => setGroupName(e.target.value)}
                    />
                  </div>
                  <div className="lebel-select-name">
                    <label>
                      Select Team Leader{" "}
                      <span className="red-required">* </span>
                    </label>
                  </div>
                  <select
                    multiple
                    required
                    onChange={handleSelectChange}
                    value={selectedOptions}
                    className="form-select"
                    style={{ minHeight: "150px" }}
                  >
                    <option>Select an option</option>
                    {users && users.length > 0
                      ? users
                          .filter(
                            (user) =>
                              user.status === "active" && user?._id !== userID
                          )
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
              <button
                className="main-btn"
                onClick={handleSubmit}
                disabled={btnLoading}
              >
                {" "}
                {btnLoading ? (
                  <span className="spinner-border spinner-border-sm"></span>
                ) : (
                  "Save"
                )}
              </button>
              <button
                className="main-btn"
                onClick={() => setAddGroupPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {editGroupPop && (
        <div className="main-sec-popup">
          <div className="inner-sec-popup">
            <div className="top-hedind-sec-popup">
              <h2>Edit Group</h2>
            </div>
            <div className="edit-group-popup">
              <div className="left-sec-edit-group-popup"></div>
              <div className="right-sec-edit-group-popup">
                <div className="label-filed">
                  <label>
                    Group Name <span className="red-required">* </span>
                  </label>
                </div>
                <div className="label-filed">
                  <input
                    type="text"
                    placeholder="group name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                  />
                </div>
                <div className="add-group-member-sec">
                  <i
                    className="fas fa-plus add-member-icon"
                    onClick={toggleMemberList}
                  ></i>
                  <label onClick={toggleMemberList}>Add New Member</label>
                </div>
                {showMemberList && (
                  <div className="member-list-sec">
                    <select
                      multiple
                      required
                      onChange={handleSelectChange}
                      value={selectedOptions}
                      className="form-select"
                      style={{ minHeight: "150px" }}
                    >
                      <option>Select an option</option>
                      {users && users.length > 0
                        ? users
                            .filter(
                              (user) =>
                                user.status === "active" &&
                                !groupDetails.members.some(
                                  (member) => member._id === user._id
                                )
                            )
                            .map((item, i) => (
                              <option key={item?._id} value={item?._id}>
                                {item?.name} ({item?.position})
                              </option>
                            ))
                        : ""}
                    </select>
                    <div className="form-text multiple-Tl-text">
                      You Can Select Multiple TL by Ctrl+Click
                    </div>
                  </div>
                )}

                <div className="all-member-group-sec">
                  <p>Group Members</p>
                  <div>
                    {loading && (
                      <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    )}
                  </div>
                  {groupDetails?.members?.map((member, index) => (
                    <div key={index} className="inner-all-member-group-sec">
                      <p>{member?.name}</p>
                      <button
                        onClick={() => handleRemoveGroupMember(member._id)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <div className="delete-group-sec">
                  <label onClick={deleteGroupById}>
                    <i class="fas fa-trash delete-group-icon"></i>Delete Group
                  </label>
                </div>
              </div>
            </div>

            <div className="bottom-pop-btn">
              <button
                className="main-btn"
                onClick={handleAddGroupMember}
                disabled={btnLoading}
              >
                {btnLoading ? (
                  <span className="spinner-border spinner-border-sm"></span>
                ) : (
                  "Save"
                )}
              </button>
              <button
                className="main-btn"
                onClick={() => setEditGroupPop(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GroupChatList;
