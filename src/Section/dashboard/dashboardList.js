import React, { useEffect, useState } from "react";
import DataService from "../../services/data.service";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const DashboardList = () => {
  const [data, setData] = useState([]);
  const [allProject, setAllProject] = useState([]);
  const [allNotification, setAllNotification] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [chatNotificationPopup, setChatNotificationPopup] = useState(false);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [chatNotification, setChatNotification] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  const [activeUser, setActiveUsers] = useState(0);
  const [inactiveUser, setInactiveUser] = useState(0);
  const [notificationId, setNotificationId] = useState("");

  const userId = JSON.parse(localStorage.getItem("userId"));

  useEffect(() => {
    window.scrollTo(0, 0);
    //getAllUser();
    //getLeave();
    //getAllExpense();
    //getNotification();
    //getProject();
    // getChatNotification();
  }, []);

  // const getAllUser = () => {
  //   setLoading(true);
  //   DataService.getAllUsers()
  //     .then((data) => {
  //       setUsers(data.data.data);
  //       setActiveUsers(data.data.activeUser);
  //       setTotalUser(data.data.totalUser);
  //       setInactiveUser(data.data.inactiveUser);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       const resMessage =
  //         (error.response &&
  //           error.response.data &&
  //           error.response.data.message) ||
  //         error.message ||
  //         error.toString();
  //       setLoading(false);
  //       toast.error(resMessage, {});
  //     });
  // };

  // const getLeave = () => {
  //   setLoading(true);
  //   DataService.getAllLeave()
  //     .then((data) => {
  //       const leaveAll = data?.data?.data;
  //       setData(leaveAll?.reverse());
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       const resMessage =
  //         (error.response &&
  //           error.response.data &&
  //           error.response.data.message) ||
  //         error.message ||
  //         error.toString();
  //       setLoading(false);
  //       // toast.error(resMessage, {});
  //     });
  // };

  // const getProject = () => {
  //   setLoading(true);
  //   DataService.getAllProject()
  //     .then((data) => {
  //       const projectAll = data?.data?.data;
  //       setAllProject(projectAll?.reverse());
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       const resMessage =
  //         (error.response &&
  //           error.response.data &&
  //           error.response.data.message) ||
  //         error.message ||
  //         error.toString();
  //       setLoading(false);
  //       toast.error(resMessage, {});
  //     });
  // };

  // const getAllExpense = () => {
  //   setLoading(true);
  //   DataService.getAllExpense()
  //     .then((data) => {
  //       const expensesAll = data?.data?.data;
  //       setAllExpenses(expensesAll.reverse());
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       const resMessage =
  //         (error.response &&
  //           error.response.data &&
  //           error.response.data.message) ||
  //         error.message ||
  //         error.toString();
  //       setLoading(false);
  //       toast.error(resMessage, {});
  //     });
  // };
  // const handleIconClick = () => {
  //   setShowNotificationPopup((prevState) => !prevState);
  //   setChatNotificationPopup(false);
  // };

  // const getNotification = () => {
  //   setLoading(true);
  //   DataService.getNotiFication()
  //     .then((response) => {
  //       const notifications = response.data.data;
  //       const reversedNotifications = notifications.reverse();
  //       setAllNotification(reversedNotifications);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       const resMessage =
  //         (error.response &&
  //           error.response.data &&
  //           error.response.data.message) ||
  //         error.message ||
  //         error.toString();
  //       setLoading(false);
  //       toast.error(resMessage, {});
  //     });
  // };

  // const hasUnreadNotifications = allNotification.some(
  //   (notification) => !notification.isRead
  // );

  // const getChatNotification = () => {
  //   setLoading(true);
  //   DataService.getChatNotiFication(userId)
  //     .then((response) => {
  //       const Chatnotifications = response.data.data;
  //       const reversedNotifications = Chatnotifications.reverse();
  //       setChatNotification(reversedNotifications);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       const resMessage =
  //         (error.response &&
  //           error.response.data &&
  //           error.response.data.message) ||
  //         error.message ||
  //         error.toString();
  //       setLoading(false);
  //       // toast.error(resMessage, {});
  //     });
  // };
  // const handleIconChatClick = () => {
  //   setChatNotificationPopup((prevState) => !prevState);
  //   setShowNotificationPopup(false);
  // };
  // const hasUnreadChatNotifications = chatNotification.some(
  //   (notification) => !notification.isRead
  // );

  // const deleteChatNotification = (item) => {
  //   deleteNotiFication(item);
  // };
  // const deleteNotiFication = (item) => {
  //   DataService.deleteNotification(item).then(
  //     () => {
  //       toast.success(`Notification deleted successfully`);
  //       getNotification();
  //       setLoading(false);
  //     },
  //     (error) => {
  //       const resMessage =
  //         (error.response && error.response.data && error.response.data.msg) ||
  //         error.message ||
  //         error.toString();
  //       toast.error(resMessage, {});
  //     }
  //   );
  // };

  // const handleSubmit = (e) => {
  //   if (e) {
  //     e.preventDefault();
  //   }
  //   if (!notificationId) {
  //     return;
  //   }
  //   const updateData = {
  //     isRead: true,
  //   };
  //   DataService.updateNotification(updateData, notificationId)
  //     .then(() => {
  //       getChatNotification();
  //     })
  //     .catch((error) => {
  //       const errorMessage =
  //         (error.response && error.response.data && error.response.data.msg) ||
  //         error.message ||
  //         error.toString();
  //       toast.error(errorMessage, {});
  //     });
  // };
  // const handleFunChat = (id) => {
  //   setNotificationId(id);
  //   handleSubmit();
  // };
  return (
    <>
      <ToastContainer />
      <div className="main-sec-dashboard">
        <div className="inner-sec-dashboard">
          <div className="top-bar-content top-bar-flex">
            <h2>Dasbhoard</h2>
            {/* <div className="dashboard-top-icon ">
              <div className="notofication-sec-icon">
                <i class="fab fa-rocketchat" onClick={handleIconChatClick}></i>

                {hasUnreadChatNotifications && (
                  <div className="dot-icon">
                    <i className="fas fa-circle"></i>
                  </div>
                )}
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
              </div>
              <div className="notofication-sec-icon">
                <i onClick={handleIconClick} class="fas fa-bell"></i>
                {hasUnreadNotifications && (
                  <div className="dot-icon">
                    <i className="fas fa-circle"></i>
                  </div>
                )}
                {showNotificationPopup && (
                  <div className="popup-notifiction">
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
                                  onClick={() =>
                                    deleteChatNotification(item?._id)
                                  }
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
              </div>
            </div> */}
          </div>
        </div>
        <div className="flex-box-item">
          <div className="inner-flex-box-item">
            <div className="dashboard-box-flex box-1-color">
              <h2>My Subscription Valid</h2>
              <h2>$14</h2>
              <div className="dashboard-box-content">
                <p>12-21-13325</p>
                <i class="fas fa-store"></i>
              </div>
              <p></p>
            </div>
            <div className="dashboard-box-flex box-2-color">
              <h2>All User</h2>
              <h2>{totalUser}</h2>
              <div className="dashboard-box-content">
                <p>Total User</p>
                <i class="fas fa-users"></i>
              </div>
              <p></p>
            </div>
            <div className="dashboard-box-flex box-1-color">
              {/* <div className="dashboard-box-flex box-3-color"> */}
              <h2>ALl Supplier</h2>
              <h2>{activeUser}</h2>
              <div className="dashboard-box-content">
                <p>All Supplier</p>
                <i class="fas fa-user-check"></i>
              </div>
              <p></p>
            </div>
            <div className="dashboard-box-flex box-2-color">
              <h2>Inactive User</h2>
              <h2>{inactiveUser}</h2>

              <div className="dashboard-box-content">
                <p>Total Inactive User</p>
                <i class="fas fa-user-times"></i>
              </div>
              <p></p>
            </div>
          </div>
        </div>
        {/* <div className="leave-status-sec-dashboard">
          <div className="left-side-leave-dashboard">
            <div className="border-shadow-common">
              <h2 className="heading-2-color">Recent Leaves</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <div class="spinner-border" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  )}
                  {data &&
                    data.length > 0 &&
                    data?.slice(0, 5)?.map((user, index) => (
                      <tr key={user._id}>
                        <td>
                          <div className="users_img_get">{user.name}</div>
                        </td>
                        <td>
                          {user?.startDate
                            ? moment(user.startDate).format("DD/MM/YYYY")
                            : "N/A"}
                        </td>
                        <td>
                          {user?.endDate
                            ? moment(user.endDate).format("DD/MM/YYYY")
                            : "N/A"}
                        </td>
                        <td>{user?.status}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="expenses-sec-dashboard border-shadow-common ">
              <h2 className="heading-2-color">Recent Projects</h2>
              <table className="table ">
                <thead>
                  <tr className="senior_div">
                    <th>Name</th>
                    <th>Description</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {loading && (
                    <div class="spinner-border" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  )}
                  {allProject &&
                    allProject.length > 0 &&
                    allProject?.slice(0, 5)?.map((item, index) => (
                      <tr key={item._id}>
                        <td>{item?.name}</td>
                        <td>
                          {item?.description
                            ?.split(" ")
                            ?.slice(0, 5)
                            ?.join(" ")}
                        </td>
                        <td>{item?.status}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="rigth-side-leave-dashboard">
            <div className="notification-sec-dashboard border-shadow-common ">
              <div className="top-bar-flex">
                <h2 className="heading-2-color">Notifications</h2>
                <Link to={"/all-notifications"}>
                  <p>Show All</p>
                </Link>
              </div>
              <table className="table ">
                <thead>
                  <tr className="senior_div">
                    <th>Message</th>
                  </tr>
                </thead>

                <tbody>
                  {loading && (
                    <div class="spinner-border" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  )}
                  {allNotification &&
                    allNotification.length > 0 &&
                    allNotification?.slice(0, 5)?.map((item, index) => (
                      <tr key={item._id}>
                        <td>{item?.message}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="notification-sec-dashboard border-shadow-common">
              <h2 className="heading-2-color">Recent Expenses</h2>
              <table className="table">
                <thead>
                  <tr className="senior_div">
                    <th>S.No.</th>
                    <th>Title</th>
                    <th>Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {loading && (
                    <div class="spinner-border" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  )}
                  {allExpenses &&
                    allExpenses.length > 0 &&
                    allExpenses?.slice(0, 5)?.map((item, index) => (
                      <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>{item?.description}</td>
                        <td>{item?.amount}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default DashboardList;
