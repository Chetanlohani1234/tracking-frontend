import React, { useEffect, useState } from "react";
import logo from "../Images/logo.jpg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import DataService from "../services/data.service";
import { ToastContainer, toast } from "react-toastify";


const Sidebar = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();

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
    // getUserDetail();
  }, []);

  // const userId = JSON.parse(localStorage.getItem("userId"));

  // const getUserDetail = () => {
  //   setLoading(true);
  //   DataService.getUserDetailById(userId)
  //     .then((data) => {
  //       setData(data.data.data);
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

  return (
    <>
      <div className="main-sec-sidebar">
        <div className="inner-sec-sidebar">
          <div className="logo-sec">
            {/* <img src={logo} /> */}
            {/* <div className="logo-sec-content">
              <h2 className="text-color-white">Hello, {data?.name}</h2>
              <p className="text-color-white">Welcome back to your dashboard</p>
            </div> */}
          </div>
          <div className="sidebar-item-list">
            <ul>
              <li className="side-bar-item text-color-white">
                <Link className="side-bar-link-color" to="/dashboard">
                  <div
                    className={
                      location.pathname === "/dashboard"
                        ? "active-side-bar"
                        : "side-bar-item-content"
                    }
                  >
                    <i class="fas fa-user-circle"></i>
                    <p>Dasbhoard</p>
                  </div>
                </Link>
              </li>
              <li className="side-bar-item text-color-white">
                <Link className="side-bar-link-color" to="/all-user">
                  <div
                    className={
                      location.pathname === "/all-user"
                        ? "active-side-bar"
                        : "side-bar-item-content"
                    }
                  >
                    <i class="fas fa-users"></i>
                    <p> Users</p>
                  </div>
                </Link>
              </li>

              <li className="side-bar-item text-color-white">
                <Link className="side-bar-link-color" to="/all-items">
                  <div
                    className={
                      location.pathname === "/all-items"
                        ? "active-side-bar"
                        : "side-bar-item-content"
                    }
                  >
                    {/* <i class="fas fa-users"></i> */}
                    <i class="fas fa-box"></i>
                    <p>Items</p>
                  </div>
                </Link>
              </li>

              <li className="side-bar-item text-color-white">
                <Link className="side-bar-link-color" to="/all-suppliers">
                  <div
                    className={
                      location.pathname === "/all-suppliers"
                        ? "active-side-bar"
                        : "side-bar-item-content"
                    }
                  >
                    <i class="fas fa-industry"></i>
                    <p> Suppliers</p>
                  </div>
                </Link>
              </li>

              {/* <li className="side-bar-item text-color-white">
                <Link className="side-bar-link-color" to="/all-order">
                  <div
                    className={
                      location.pathname === "/all-order"
                        ? "active-side-bar"
                        : "side-bar-item-content"
                    }
                  >
  
                    
                    <i class="fab fa-first-order"></i>
                   
                    <p>Order</p>
                  </div>
                </Link>

              </li> */}
              <li className="side-bar-item text-color-white">
                
                {/* <Link className="side-bar-link-color" to="/role-management">
                  <div
                    className={
                      location.pathname === "/role-management"
                        ? "active-side-bar"
                        : "side-bar-item-content"
                    }
                  >
                    <i class="fas fa-network-wired"></i>
                    <p>Role Management</p>
                  </div>
                </Link> */}

              </li>
              
              {/* <li className="side-bar-item text-color-white">
                <Link className="side-bar-link-color" to="/all-leaves">
                  <div
                    className={
                      location.pathname === "/all-leaves"
                        ? "active-side-bar"
                        : "side-bar-item-content"
                    }
                  >
                    <i class="fas fa-tasks"></i>
                    <p>Leave Status</p>
                  </div>
                </Link>
              </li> */}

              {/* <li className="side-bar-item text-color-white">
                <Link className="side-bar-link-color" to="/all-holiday">
                  <div
                    className={
                      location.pathname === "/all-holiday"
                        ? "active-side-bar"
                        : "side-bar-item-content"
                    }
                  >
                    <i class="fas fa-stream"></i>
                    <p>Holiday Schedule</p>
                  </div>
                </Link>
              </li> */}

              {/* <li className="side-bar-item text-color-white">
                <Link className="side-bar-link-color" to="/all-attendence">
                  <div
                    className={
                      location.pathname === "/all-attendence"
                        ? "active-side-bar"
                        : "side-bar-item-content"
                    }
                  >
                    <i class="fas fa-calendar-alt"></i>
                    <p>Attendence</p>
                  </div>
                </Link>
              </li> */}

              {/* <li className="side-bar-item text-color-white">
                <Link className="side-bar-link-color" to="/all-expense">
                  <div
                    className={
                      location.pathname === "/all-expense"
                        ? "active-side-bar"
                        : "side-bar-item-content"
                    }
                  >
                    <i class="fas fa-hand-holding-usd"></i>
                    <p>Expense</p>
                  </div>
                </Link>
              </li> */}

              {/* <li className="side-bar-item text-color-white">
                <Link className="side-bar-link-color" to="/team-management">
                  <div
                    className={
                      location.pathname === "/team-management"
                        ? "active-side-bar"
                        : "side-bar-item-content"
                    }
                  >
                    <i class="fas fa-th"></i>
                    <p> Team Management</p>
                  </div>
                </Link>
              </li> */}

              {/* <li className="side-bar-item text-color-white">
                <Link className="side-bar-link-color" to="/all-Project">
                  <div
                    className={
                      location.pathname === "/all-Project"
                        ? "active-side-bar"
                        : "side-bar-item-content"
                    }
                  >
                  <i class="fas fa-project-diagram"></i>
                  <p>Project</p>
                  </div>
                </Link>
              </li> */}
            
              <li className="side-bar-item text-color-white">
                <Link className="side-bar-link-color" to="/users-tasks">
                  <div
                    className={
                      location.pathname === "/users-tasks"
                        ? "active-side-bar"
                        : "side-bar-item-content"
                    }
                  >
                    <i class="fas fa-flask"></i>
                    <p>Task</p>
                  </div>
                </Link>
              </li>
              {/* <li className="side-bar-item text-color-white">
                <Link className="side-bar-link-color" to="/email-text">
                  <div
                    className={
                      location.pathname === "/email-text"
                        ? "active-side-bar"
                        : "side-bar-item-content"
                    }
                  >
                    <i class="fas fa-mail-bulk"></i>
                    <p>Email/Text</p>
                  </div>
                </Link>
              </li>
              <li className="side-bar-item text-color-white">
                <Link className="side-bar-link-color" to="/all-chat">
                  <div
                    className={
                      location.pathname === "/all-chat"
                        ? "active-side-bar"
                        : "side-bar-item-content"
                    }
                  >
                    <i class="fas fa-comments"></i>
                    <p>All Chat </p>
                  </div>
                </Link>
              </li> */}

              <li className="side-bar-item text-color-white">
                <Link className="side-bar-link-color" to="/category">
                  <div
                    className={
                      location.pathname === "/category"
                        ? "active-side-bar"
                        : "side-bar-item-content"
                    }
                  >
                    <i class="fas fa-tags"></i>
                    <p>Category</p>
                  </div>
                </Link>
              </li>

              <li className="side-bar-item text-color-white">
                <Link className="side-bar-link-color" to="/subcategory">
                  <div
                    className={
                      location.pathname === "/subcategory"
                        ? "active-side-bar"
                        : "side-bar-item-content"
                    }
                  >
                    <i class="fas fa-tags"></i>
                    <p>Sub Category</p>
                  </div>
                </Link>
              </li>

              <li className="side-bar-item text-color-white">
                <Link className="side-bar-link-color" to="/view-Profile">
                  <div
                    className={
                      location.pathname === "/view-Profile"
                        ? "active-side-bar"
                        : "side-bar-item-content"
                    }
                  >
                    <i class="fas fa-address-card"></i>
                    <p>View Profile</p>
                  </div>
                </Link>
              </li>
              {/* <li className="side-bar-item text-color-white">
                <div className="side-bar-item-content" onClick={logout}>
                  <i class="fas fa-sign-out-alt"></i>
                  <p>Log Out</p>
                </div>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
