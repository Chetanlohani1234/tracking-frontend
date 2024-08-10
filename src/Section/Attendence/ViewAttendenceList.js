import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DataService from "../../services/data.service";
import { ToastContainer, toast } from "react-toastify";
import img from "../../Images/placeholder-img.png";

const ViewAttendenceList = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    getAttendence();
  }, []);

  const getAttendence = () => {
    setLoading(true);
    DataService.getSingleAttendenceById(params.id)
      .then((data) => {
        setData(data.data.data);
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

  return (
    <>
      <div className="main-sec-dashboard">
        <div className="top-bar-content">
          <h2>View Employee Attendence</h2>
        </div>
        <div className="main-sec-view-attendence">
          <div className="inner-sec-view-attendence">
            <div className="box-view-attendence">
              <div className="inner-box-view-attendence">
                <div className="left-inner-box-view">
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={
                      "https://trackingtime-c5jw.onrender.com" +
                      data[0]?.employeeId?.images?.url
                    }
                    className="product-img"
                    alt="image"
                  />
                </div>
                <div className="right-inner-box-view">
                  <p className="text-blue">{data[0]?.employeeId?.name}</p>
                  <p>{data[0]?.employeeId?.position}</p>
                </div>
              </div>
            </div>
            <div className="box-view-attendence">
              <div className="inner-box-view-attendence">
                <div className="left-inner-box-view">
                  <i class="fas fa-hand-paper"></i>
                </div>
                <div className="right-inner-box-view">
                  <p className="text-blue">Employee ID</p>
                  <p>{data[0]?.employeeId?._id}</p>
                </div>
              </div>
            </div>
            <div className="box-view-attendence">
              <div className="inner-box-view-attendence">
                <div className="left-inner-box-view">
                  <i class="fas fa-building"></i>
                </div>
                <div className="right-inner-box-view">
                  <p className="text-blue">Department</p>
                  <p>{data[0]?.employeeId?.team}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main-sec-view-attendence">
          <div className="inner-sec-view-attendence">
            <div className="box-inner-view-attendence">
              <div className="inner-box-view-attendence box-align">
                <div className="sub-inner-box-view">
                  <i class="far fa-user"></i>
                  <p className="p-space">08 : 00</p>
                  <p className="p-space">Average working hours</p>
                </div>
              </div>
            </div>
            <div className="box-inner-view-attendence">
              <div className="inner-box-view-attendence box-align">
                <div className="sub-inner-box-view">
                  <i class="far fa-clock"></i>
                  <p className="p-space">10 : 30 AM</p>
                  <p className="p-space">Average in Time</p>
                </div>
              </div>
            </div>
            <div className="box-inner-view-attendence">
              <div className="inner-box-view-attendence box-align">
                <div className="sub-inner-box-view">
                  <i class="fas fa-pause"></i>
                  <p className="p-space">07 : 30 PM</p>
                  <p className="p-space">Average out Time</p>
                </div>
              </div>
            </div>
            <div className="box-inner-view-attendence">
              <div className="inner-box-view-attendence box-align">
                <div className="sub-inner-box-view">
                  <i class="fas fa-hourglass-half"></i>
                  <p className="p-space">01 : 00</p>
                  <p className="p-space">Average break Time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main-tabel-view-attendence">
          <table className="table ">
            <thead>
              <tr className="senior_div">
                <th>S.No.</th>
                <th>DATE</th>
                <th>CHECK IN </th>
                <th>CHECK OUT </th>
                <th className="action-end"> Status</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              )}
              {data && data.length > 0 ? (
                data.map((item, i) =>
                  item.attendanceRecords &&
                  item.attendanceRecords.length > 0 ? (
                    item.attendanceRecords.map((item, index) => (
                      <tr>
                        <td>{index + 1}</td>

                        <td>{new Date(item?.intime).toLocaleDateString()}</td>
                        <td>{new Date(item?.intime).toLocaleTimeString()}</td>
                        <td>
                          {item?.outtime
                            ? new Date(item?.outtime).toLocaleTimeString()
                            : "N/A"}
                        </td>
                        <td className="action-end">
                          <button
                            type="button"
                            className={
                              item.status === "present" ? "present" : "danger"
                            }
                          >
                            {item?.status}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr key={i}>
                      <td colSpan="4">No attendance records available</td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td colSpan="4">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ViewAttendenceList;
