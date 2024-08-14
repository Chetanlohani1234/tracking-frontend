import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataService from "../../services/data.service";
import { ToastContainer, toast } from "react-toastify";
import '../../../src/App.css';
import img from "../../Images/placeholder-img.png";

const AllSuppliers = () => {
  const imgRef = useRef();
  const [allusers, setAllUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [addUserPopUp, setAddUserPopUp] = useState(false);
  const [btnloading, setbtnloading] = useState(false);
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [bname, setBName] = useState("");
  const [bankName, setBankName] = useState("");
  const [account, setAccount] = useState("");
  const [code, setCode] = useState("");

  const [role, setRole] = useState("");
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const [filteredUser, setFilteredUser] = useState([]);
  const [userName, setUserName] = useState("");

  const userId = JSON.parse(localStorage.getItem("userId"));

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllUser();
  }, []);

  const getAllUser = () => {
    setLoading(true);
    DataService.getAllSupplier()
      .then((data) => {
        setAllUser(data.data.data);
        setFilteredUser(data.data);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setbtnloading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) {
      toast.error("Name is required");
      setLoading(false);
      setbtnloading(false);
      return;
    }

   
    const data = {
      name: name,
      email: email,
      phoneNo: mobileNo,
      address: address,
      country: country,
      state: state,
      city: city,
      beneficiaryname: bname,
      bankname: bankName,
      accountno: account,
      ifsccode: code
    };

    DataService.addSupplier(data, userId).then(
      () => {
        toast.success("Supplier Added Successfully!!!");
        setTimeout(() => {
          getAllUser();
          setAddUserPopUp(false);
          setbtnloading(false);
        }, 2000);
        setName("");
        setEmail("");
        setMobileNo("");
        setAddress("");
        setCode("");
        setCountry("");
        setState("");
        setCity("");
        setBName("");
        setBankName("");
        setAccount("");

      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        setbtnloading(false);
        toast.error(resMessage);
      }
    );
  };
  const deleteUser = (userId, username) => {
    DataService.deleteSupplier(userId).then(
      () => {
        toast.success(`${username} deleted successfully`);
        getAllUser();
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

  const confirmDelete = (userId, username) => {
    setDeleteUserId({ userId, username });
  };

  const cancelDelete = () => {
    setDeleteUserId(null);
  };

  const executeDelete = () => {
    if (deleteUserId) {
      deleteUser(deleteUserId.userId, deleteUserId.username);
      setDeleteUserId(null);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await DataService.searchAdmin(searchText);
      setAllUser(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const setFilter = (searchName) => {
    const filtered = allusers.filter((user) =>
      user.name.toLowerCase().includes(searchName.toLowerCase())
    );
    setFilteredUser(filtered);
  };
  return (
    <>
      <ToastContainer />
      <div className="main-sec-dashboard">
        <div className="top-bar-content top-bar-flex">
          <h2>All Supplier</h2>

          <div className="right-side-btn-user">
            <div className="serach_box">
              <input
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setFilter(e.target.value)}
              />
              {/* {searchText && (
                <button className="main-btn serach-btn" type="submit">
                  Search
                </button>
              )} */}
            </div>
            <div className="add_user_div" onClick={() => setAddUserPopUp(true)}>
              <button type="button" className="main-btn">
                Add New Supplier
              </button>
            </div>
          </div>
        </div>

        <div className="tabel-height">
          <table className="table  ">
            <thead>
              <tr className="senior_div">
                <th>S.No.</th>
                <th>Name</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Country</th>
                <th>State</th>
                <th>City</th>
                <th>Beneficiary Name</th>
                <th>Bank Name</th>
                <th>Account Number</th>
                <th>IFSC Code</th>
                <th className="action-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              )}
              {filteredUser &&
                filteredUser.length > 0 &&
                filteredUser.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user?.name}</td>
                    <td>{user?.email}</td>
                    <td>{user?.phoneNo}</td>
                    <td>{user?.address}</td>
                    <td>{user?.country}</td>
                    <td>{user?.state}</td>
                    <td>{user?.city}</td>
                    <td>{user?.beneficiaryname}</td>
                    <td>{user?.bankname}</td>
                    <td>{user?.accountno}</td>
                    <td>{user?.ifsccode}</td>
                    <td className="actionButtons action-end">
                      <div className="action-icon">
                        <Link
                          className="action-link"
                          to={`/edit-supplier/${user._id}`}
                        >
                          <i
                            id="edit_icon"
                            className="fa fa-edit edit-icon"
                          ></i>
                        </Link>
                        <i
                          onClick={() => confirmDelete(user._id, user?.name)}
                          class="fas fa-trash delete-icon"
                        ></i>
                        {/* <i
                          onClick={() => confirmDelete(user._id)}
                          id="delete_icon"
                          className="fa fa-trash"
                        ></i> */}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {addUserPopUp && (
        <div className="main-sec-popup">
          <div className="inner-sec-popup">
            <div className="top-hedind-sec-popup">
              <h2>Add Supplier</h2>
            </div>
            <div className="label-input-sec-popup">
              <div className="label-input-flex-popup">
                <label>
                  Name <span className="red-required">* </span>
                </label>
                <input
                  type="text"
                  //value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Supplier Name"
                />
              </div>
              <div className="label-input-flex-popup">
                <label>
                  Email <span className="red-required">* </span>
                </label>
                <input
                  type="email"
                  // value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Supplier Email"
                />
              </div>
              <div className="label-input-flex-popup">
                <label>
                  Mobile No <span className="red-required">* </span>
                </label>
                <input
                  type="number"
                  // value={password}
                  onChange={(e) => setMobileNo(e.target.value)}
                  placeholder="Enter Supplier Mobile"
                />
              </div>

              <div className="label-input-flex-popup">
                <label>
                  Address <span className="red-required">* </span>
                </label>
                <textarea
                  required
                  rows={5}
                  cols={60}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter Supplier Address"
                />
              </div>

              <div className="label-input-flex-popup">
                <label>
                  Country <span className="red-required">* </span>
                </label>
                <input
                  type="text"
                  // value={password}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Enter Supplier Country"
                />
              </div>

              <div className="label-input-flex-popup">
                <label>
                  State <span className="red-required">* </span>
                </label>
                <input
                  type="text"
                  // value={password}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="Enter Supplier State"
                />
              </div>

              <div className="label-input-flex-popup">
                <label>
                  City <span className="red-required">* </span>
                </label>
                <input
                  type="text"
                  // value={password}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter Supplier City"
                />
              </div>
              <h1>Bank Details</h1>

              <div className="label-input-flex-popup">
                <label>
                  Name <span className="red-required">* </span>
                </label>
                <input
                  type="text"
                  // value={password}
                  onChange={(e) => setBName(e.target.value)}
                  placeholder="Enter Beneficiary Name"
                />
              </div>
              
              <div className="label-input-flex-popup">
                <label>
                  Bank Name <span className="red-required">* </span>
                </label>
                <input
                  type="text"
                  // value={password}
                  onChange={(e) => setBankName(e.target.value)}
                  placeholder="Enter Bank Name"
                />
              </div>

              <div className="label-input-flex-popup">
                <label>
                  Account No. <span className="red-required">* </span>
                </label>
                <input
                  type="text"
                  // value={password}
                  onChange={(e) => setAccount(e.target.value)}
                  placeholder="Enter Account Number"
                />
              </div>

              <div className="label-input-flex-popup">
                <label>
                  IFSC Code <span className="red-required">* </span>
                </label>
                <input
                  type="text"
                  // value={password}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter IFSC Code"
                />
              </div>
              {/* <div className="label-input-flex-popup">
                <label>Role <span className="red-required">* </span></label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option selected>Choose...</option>
                  <option value="HR">HR</option>
                  <option value="TL">TL</option>
                  <option value="User">User</option>
                </select>
              </div> */}
              <div className="bottom-btn-sec-popup">
                <div className="add-user-popup-btn">
                  <button
                    type="button"
                    className="main-btn margin-btn"
                    onClick={() => setAddUserPopUp(false)}
                  >
                    Cancel
                  </button>
                </div>
                <div className="add-user-popup-btn">
                  <button
                    type="button"
                    className="main-btn margin-btn"
                    onClick={handleSubmit}
                    disabled={btnloading}
                  >
                    {btnloading ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      "Add Supplier"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {deleteUserId && (
        <div className="main_email_outer">
          <div className="delete_div_a">
            <div className="delete_div">
              <i
                id="exclamation_sign"
                className="fas fa-exclamation-triangle"
              ></i>
              <h3>Are you sure?</h3>
              <p>
                This action will delete all details about the employee,
                <br />
                You won’t be able to revert this!
              </p>
              <div className="button_div">
                <button
                  onClick={executeDelete}
                  type="button"
                  className="btn btn-danger"
                >
                  Yes, delete it
                </button>
                <button
                  onClick={cancelDelete}
                  type="button"
                  className="btn btn-outline-danger"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllSuppliers;
