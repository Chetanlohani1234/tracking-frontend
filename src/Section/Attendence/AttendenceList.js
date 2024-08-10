import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DataService from "../../services/data.service";
import { ToastContainer, toast } from "react-toastify";

const AttendenceList = () => {
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
    DataService.getAllAttendence()
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
          <h2>All Attendence</h2>
        </div>

        <table className="table ">
          <thead>
            <tr className="senior_div">
              <th>S.No.</th>
              <th>Name</th>
              <th> E-MAIL</th>
              <th> TEAM</th>
              <th className="action-end">DETAIL</th>
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
              data.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="users_img_get">
                      {item?.employeeId?.name}
                    </div>
                  </td>
                  <td>{item?.employeeId?.email}</td>
                  <td>{item?.employeeId?.team}</td>
                  <td className="actionButtons action-end">
                    <div className="action-icon">
                      <Link to={"/view-attendence/"+item?.employeeId?._id}>
                        <i class="fas fa-eye"></i>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AttendenceList;
