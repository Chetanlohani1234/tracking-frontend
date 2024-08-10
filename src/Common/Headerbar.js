import React, { useEffect, useState } from "react";
import logo from "../Images/logo2.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import DataService from "../services/data.service";
import { ToastContainer, toast } from "react-toastify";

const HeaderBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState([]);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [chatNotificationPopup, setChatNotificationPopup] = useState(false);
  const [allNotification, setAllNotification] = useState([]);
  const [chatNotification, setChatNotification] = useState([]);
  const [notificationId, setNotificationId] = useState("");

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("Role");
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    //getUserDetail();
    getChatNotification();
    //getNotification();
  }, []);
  const userId = JSON.parse(localStorage.getItem("userId"));

  // const getUserDetail = () => {
  //   DataService.getUserDetailById(userId)
  //     .then((data) => {
  //       setUser(data.data.data);
  //     })
  //     .catch((error) => {
  //       const resMessage =
  //         (error.response &&
  //           error.response.data &&
  //           error.response.data.message) ||
  //         error.message ||
  //         error.toString();
  //       toast.error(resMessage, {});
  //     });
  // };

  const getNotification = () => {
    DataService.getNotiFication()
      .then((response) => {
        const notifications = response.data.data;
        const reversedNotifications = notifications.reverse();
        setAllNotification(reversedNotifications);
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(resMessage, {});
      });
  };
  const getChatNotification = () => {
    DataService.getChatNotiFication(userId)
      .then((response) => {
        const Chatnotifications = response.data.data;
        const reversedNotifications = Chatnotifications.reverse();
        setChatNotification(reversedNotifications);
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        // toast.error(resMessage, {});
      });
  };

  const handleIconChatClick = () => {
    setChatNotificationPopup((prevState) => !prevState);
    setShowNotificationPopup(false);
  };
  const hasUnreadChatNotifications = chatNotification.some(
    (notification) => !notification.isRead
  );
  const handleIconClick = () => {
    setShowNotificationPopup((prevState) => !prevState);
    setChatNotificationPopup(false);
  };
  const hasUnreadNotifications = allNotification.some(
    (notification) => !notification.isRead
  );
  const deleteChatNotification = (item) => {
    deleteNotiFication(item);
  };
  const deleteNotiFication = (item) => {
    DataService.deleteNotification(item).then(
      () => {
        toast.success(`Notification deleted successfully`);
        //getNotification();
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
  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (!notificationId) {
      return;
    }
    const updateData = {
      isRead: true,
    };
    DataService.updateNotification(updateData, notificationId)
      .then(() => {
        getChatNotification();
      })
      .catch((error) => {
        const errorMessage =
          (error.response && error.response.data && error.response.data.msg) ||
          error.message ||
          error.toString();
        toast.error(errorMessage, {});
      });
  };
  const handleFunChat = (id) => {
    setNotificationId(id);
    handleSubmit();
  };

  return (
    <>
      <div className="main-header-sec">
        <div className="inner-sec-header">
          <div className="logo-sec-header">
            <img src={logo} />
          </div>
          <div className="header-content">
            <p className="color-white">Welcome, {user?.name}</p>
            {/* <div className="chat-pop-sec-header " onClick={handleIconChatClick}>
              <i class="fab fa-rocketchat color-white margin-icon-header"></i>

              {hasUnreadChatNotifications && (
                <div className="dot-icon">
                  <i className="fas fa-circle"></i>
                </div>
              )}
            </div> */}
            {chatNotificationPopup && (
              <div className="popup-notifiction">
                <div className="dashboard-notification-top-bar">
                  <h3>Recent Messages</h3>
                </div>
                {chatNotification && chatNotification.length > 0 ? (
                  chatNotification.slice(0, 5).map((item) => (
                    <div className="padding-sec-notification">
                      <div className="bottom-line" key={item._id}>
                        <div
                          className="notification-pointer"
                          style={{
                            fontWeight: item.isRead ? "normal" : "bold",
                          }}
                          onClick={() => handleFunChat(item._id)}
                        >
                          <p>
                            <i class="fas fa-comment-dots chat-icon-notification"></i>
                            {item?.senderId?.name} : {item?.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="not-found-message">
                    <p>No notifications found.</p>
                  </div>
                )}
              </div>
            )}
            {/* <div
              className="notification-pop-sec-header"
              onClick={handleIconClick}
            >
              <i class="fas fa-bell color-white margin-icon-header"></i>
              {hasUnreadNotifications && (
                <div className="dot-icon">
                  <i className="fas fa-circle"></i>
                </div>
              )}
            </div> */}
            {showNotificationPopup && (
              <div className="popup-notifiction notification-sec-right">
                <div className="dashboard-notification-top-bar">
                  <h3>Recent Notifications</h3>
                </div>
                {allNotification && allNotification.length > 0 ? (
                  allNotification.slice(0, 5).map((item) => (
                    <div className="padding-sec-notification">
                      <div className="bottom-line" key={item._id}>
                        <div className="notification-delete-sec">
                          <div className="left-side-noti-delete-esec">
                            <i class="fas fa-bell"></i>
                            <p>{item?.message}</p>
                          </div>
                          <div className="right-side-noti-delete-esec">
                            <i
                              class="fas fa-trash delete-icon"
                              onClick={() => deleteChatNotification(item?._id)}
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="not-found-message">
                    <p>No notifications found.</p>
                  </div>
                )}
              </div>
            )}
            <i
              class="fas fa-power-off color-white margin-icon-header"
              onClick={logout}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderBar;
