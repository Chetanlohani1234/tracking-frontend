import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataService from "../../services/data.service";
import { ToastContainer, toast } from "react-toastify";
import img from "../../Images/placeholder-img.png";
const Category = () => {
  const imgRef = useRef();
  const [allusers, setAllUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [addUserPopUp, setAddUserPopUp] = useState(false);
  const [btnloading, setbtnloading] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
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
    DataService.getCategory(0) // Pass the appropriate type value here
      .then((response) => {
        const data = response.data; // Extract data from response
        setAllUser(data?.data || []);
        setName(data?.data?.category || []);
        setFilteredUser(data?.data || []);
        setLoading(false);
      })
      .catch((error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        //setError(resMessage);
        toast.error(resMessage); // Ensure toast is correctly configured to show error messages
      });
  };





  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setbtnloading(true);

    
    if (!name) {
      toast.error("Category is required");
      setLoading(false);
      setbtnloading(false);
      return;
    }



    const data = {
      category: name,
      type: 0,
      parentId: null,
    };

    DataService.addCategory(data, userId).then(
      () => {
        toast.success("Category Added Successfully!!!");
        setTimeout(() => {
          getAllUser();
          setAddUserPopUp(false);
          setbtnloading(false);
        }, 2000);
        setName("");
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
  const deleteCategory = (userId, username) => {
    DataService.deleteCategory(userId).then(
      () => {
        toast.success(`Category deleted successfully`);
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
      deleteCategory(deleteUserId.userId, deleteUserId.username);
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
          <h2>All Category</h2>

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
                Add New Category
              </button>
            </div>
          </div>
        </div>

        <div className="tabel-height">
          <table className="table  ">
            <thead>
              <tr className="senior_div">
                <th>S.No.</th>
                <th>Category</th>
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
                    <td>{user?.category}</td>
                    <td className="actionButtons action-end">
                      <div className="action-icon">
                        {/* <Link
                          className="action-link"
                          to={`/user-detail/${user._id}`}
                        >
                          <i class="fas fa-eye"></i>
                        </Link> */}
                        <Link
                          className="action-link"
                          to={`/edit-category/${user._id}`}
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
              <h2>Add Category</h2>
            </div>
            <div className="label-input-sec-popup">
              <div className="label-input-flex-popup">
                <label>
                  Category <span className="red-required">* </span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Category Name"
                />
              </div>

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
                      "Add Category"
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

export default Category;
