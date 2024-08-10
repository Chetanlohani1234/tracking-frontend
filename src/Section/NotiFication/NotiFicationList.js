import React, { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import DataService from "../../services/data.service";

const AllNotificationList = () => {
  const editorRef = useRef(null);
  const [data, setData] = useState([]);
  const [notificationId, setNotificationId] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    //getNotification();
  }, []);

  const getNotification = () => {
    setLoading(true);
    DataService.getNotiFication()
      .then((response) => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        const errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        toast.error(errorMessage, {});
      });
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
        //getNotification();
      })
      .catch((error) => {
        const errorMessage =
          (error.response && error.response.data && error.response.data.msg) ||
          error.message ||
          error.toString();
        toast.error(errorMessage, {});
      });
  };

  const handleFun = (id) => {
    setNotificationId(id);
    handleSubmit();
  };

  const deleteChatNotification = (item) => {
    deleteNotiFication(item);
  };
  const deleteNotiFication = (item) => {
    DataService.deleteNotification(item).then(
      () => {
        toast.success(`Notification deleted successfully`);
        //getNotification();
        setLoading(false);
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
      <ToastContainer />
      <div className="main-sec-dashboard">
        <div className="top-bar-content">
          <h2>All Notifications</h2>
        </div>
        <div class="main-notification-tabel">
          <table className="table">
            <thead>
              <tr className="senior_div">
                <th>S.No.</th>
                <th>Message</th>
                <th className="action-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              )}

              {data.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div
                      className="notification-pointer"
                      style={{ fontWeight: item.isRead ? "normal" : "bold" }}
                      onClick={() => handleFun(item._id)}
                    >
                      {item.message}
                    </div>
                  </td>
                  <td className="action-end">
                    <i
                      class="fas fa-trash delete-icon"
                      onClick={() => deleteChatNotification(item?._id)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllNotificationList;
