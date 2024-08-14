import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataService from "../../services/data.service";
import { ToastContainer, toast } from "react-toastify";
import './po.css';
import img from "../../Images/placeholder-img.png";

const AllPo = () => {
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
//addPo,getAllPo,getPoById,updatePo,deletePo

  const getAllUser = () => {
    setLoading(true);
    DataService.getAllPo()
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


  const deleteUser = (userId, username) => {
    DataService.deletePo(userId).then(
      () => {
        toast.success(`PO deleted successfully`);
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

  const handleClick = () => {
    navigate("/add-po");
  }
  return (
    <>
      <ToastContainer />
      <div className="main-sec-dashboard">
        <div className="top-bar-content top-bar-flex">
          <h2>All Purchase Order</h2>

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
            <div className="add_user_div" onClick={handleClick}>
              <button type="button" className="main-btn">
                Add New PO
              </button>
            </div>
          </div>
        </div>

        <div className="tabel-height">
          <table className="table  ">
            <thead>
              <tr className="senior_div">
                <th>S.No.</th>
                <th>Supplier Name</th>
                <th>Delivery Date</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>SubCategory</th>
                <th>Status</th>
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
                    <td>{user?.supplier.name}</td>
                    <td>{user?.date}</td>
                    <td>{user?.items[0]?.name}</td>
                    <td>{user?.items[0]?.price}</td>
                    <td>{user?.items[0]?.itemId?.category?.category}</td>
                    <td>{user?.items[0]?.itemId?.subcategory?.category}</td>
                    <td>Pending</td>
                    <td className="actionButtons action-end">
                      <div className="action-icon">
                      <Link to={`/edit-po/${user._id}`}> 
                        <button style={{width:"100px",height:"40px",background:"#FEDC56",color:"#000000"}}>Receive</button>
                      </Link>  
                        <Link
                          className="action-link"
                          to={`/view-po/${user._id}`}
                        >
                          <i class="fas fa-eye"></i>
                        </Link> 
                        <Link
                          className="action-link"
                          to={`/edit-po/${user._id}`}
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

export default AllPo;
