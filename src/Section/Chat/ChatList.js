import React, { useEffect, useState, useRef } from "react";
import DataService from "../../services/data.service";
import { ToastContainer, toast } from "react-toastify";
import img from "../../Images/placeholder-img.png";
import io from "socket.io-client";

const socket = io("https://trackingtime-c5jw.onrender.com");

const ChatList = () => {
  const userID = JSON.parse(localStorage.getItem("userId"));
  const [allUser, setAllUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messageRef = useRef(null);
  const [allUserPop, setAllUserPop] = useState(false);
  const [users, setUsers] = useState([]);
  const userDetail = JSON.parse(localStorage.getItem("user"));
  const [filteredUser, setFilteredUser] = useState([]);
  const [file, setFile] = useState(null);

  const userName = userDetail.name;

  useEffect(() => {
    socket.emit("user_added", userID);
    getAllUser();
    getChatList();
  }, [userID]);

  useEffect(() => {
    if (selectedUser) {
      DataService.getSingleChat(userID, selectedUser._id)
        .then((data) => {
          setMessages(data?.data.reverse());
        })
        .catch((error) => {
          const errorMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          toast.error(errorMessage, {});
        });
    }
  }, [selectedUser, userID]);

  useEffect(() => {
    const handleMessage = (data) => {
      console.log("Received message via socket:", data);
      if (
        (data.senderId === selectedUser?._id && data.receiverId === userID) ||
        (data.receiverId === selectedUser?._id && data.senderId === userID)
      ) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    };

    socket.on("new_message", handleMessage);

    return () => {
      socket.off("new_message", handleMessage);
    };
  }, [selectedUser, userID]);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const getAllUser = () => {
    DataService.getAllUserChat()
      .then((data) => {
        setUsers(data?.data?.data);
      })
      .catch((error) => {
        const errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(errorMessage, {});
      });
  };

  const getChatList = () => {
    DataService.getChat(userID)
      .then((data) => {
        setAllUser(data?.data);
        setFilteredUser(data?.data);
      })
      .catch((error) => {
        const errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(errorMessage, {});
      });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!selectedUser || !message.trim()) return;
    const data = {
      senderId: userID,
      receiverId: selectedUser._id,
      message: message,
      userId: userID,
    };
    socket.emit("chat_message", data);
    console.log("Sent message via socket:", data);
    setMessages((prevMessages) => [...prevMessages, data]);
    setMessage("");
    getChatList();
  };
  // const sendMessage = async (e) => {
  //   e.preventDefault();
  //   if (!selectedUser || (!message.trim() && !file)) return;
  //   const data = {
  //     senderId: userID,
  //     receiverId: selectedUser._id,
  //     message: message,
  //     userId: userID,
  //   };
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     formData.append("data", JSON.stringify(data));
  //     try {
  //       const response = await DataService.uploadFile(formData);
  //       data.fileUrl = response.data.fileUrl;
  //     } catch (error) {
  //       const errorMessage =
  //         (error.response &&
  //           error.response.data &&
  //           error.response.data.message) ||
  //         error.message ||
  //         error.toString();
  //       toast.error(errorMessage, {});
  //       return;
  //     }
  //   }
  //   socket.emit("chat_message", data);
  //   console.log("Sent message via socket:", data);
  //   setMessages((prevMessages) => [...prevMessages, data]);
  //   setMessage("");
  //   setFile(null);
  //   getChatList();
  // };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const setFilter = (searchName) => {
    const filtered = allUser.filter((user) =>
      user.name.toLowerCase().includes(searchName.toLowerCase())
    );
    setFilteredUser(filtered);
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
                        className="fas fa-users"
                        onClick={() => setAllUserPop(true)}
                      ></i>
                      {/* <i className="fas fa-user-plus"></i> */}
                    </div>
                  </div>
                  <div className="serach-bar-sec-chat">
                    <div className="inner-sec-searchbar-chat">
                      <i className="fas fa-search"></i>
                      <input
                        type="search"
                        placeholder="Search"
                        onChange={(e) => setFilter(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

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
              </div>
            </div>
          </div>

          <div className="right-side-chat">
            <div className="chat-message-sec">
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
                </div>
                <div className="edit-group-icon">
                  <i className="fas fa-ellipsis-v"></i>
                </div>
              </div>
              <div className="chat-box-height">
                <div className="left-side-message">
                  <div className="inner-sec-message-sec-left ">
                    <ul>
                      {messages && messages.length > 0 ? (
                        messages.map(({ message, senderId }, index) => (
                          <div className="message-wrapper" key={index}>
                            <div
                              className={`message-box ${
                                senderId === userID
                                  ? "user-message"
                                  : "other-message"
                              }`}
                            >
                              {message}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="no-messages">
                          No Messages or No Conversation Selected
                        </div>
                      )}
                    </ul>
                    <div ref={messageRef}></div>
                  </div>
                </div>
              </div>
              {selectedUser && (
                <div className="bottom-sec-chat-sec">
                  <form onSubmit={sendMessage}>
                    <div className="inner-sec-bottom-chat">
                      <div className="message-field">
                        <input
                          type="text"
                          placeholder="Type message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                        {/* <input
                          type="file"
                          onChange={(e) => setFile(e.target.files[0])}
                        /> */}
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
      {/* ################################################## all user popup ############################################## */}
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
                      <h2>{user.name}</h2>
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
    </>
  );
};

export default ChatList;
