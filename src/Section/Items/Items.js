import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataService from "../../services/data.service";
import { ToastContainer, toast } from "react-toastify";
import img from "../../Images/placeholder-img.png";

const Items = () => {
  const imgRef = useRef();
  const [allusers, setAllUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [addUserPopUp, setAddUserPopUp] = useState(false);
  const [btnloading, setbtnloading] = useState(false);
  const [name, setName] = useState("");
  const [price,setPrice] = useState("");
  const [description,setDescription] = useState("");
  const [image,setImage] = useState("");


  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const [filteredUser, setFilteredUser] = useState([]);
  const [userName, setUserName] = useState("");

  const [selectedCategory, setSelectedCategory] = useState('');
  const [category,setCategory] = useState("");
  const [subCategory,setSubCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  
  useEffect(() => {
    // Fetch categories when the component mounts
    DataService.getCategory(1) // Pass the appropriate type value here
      .then((response) => {
        //const data = response.data.parentId._id;
        //setCategory(data?.data || []);
        const subcategory = response.data.data;
        const categories = response.data.data.map(item => item.parentId); // Extract parentId from each item
        setCategory(categories || []);
        setSubCategory(subcategory || []);
        setLoading(false);
      })
      .catch((error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        //setError(resMessage);
      });
  }, []);

  const userId = JSON.parse(localStorage.getItem("userId"));

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllUser();
  }, []);

  const getAllUser = () => {
    setLoading(true);
    DataService.getAllItems()
      .then((data) => {
        setAllUser(data.data.data);
        setFilteredUser(data.data);
        setImage(data.data.image);
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

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setbtnloading(true);
  
    // Validate required fields
    if (!name) {
      toast.error("Name is required");
      setLoading(false);
      setbtnloading(false);
      return;
    }
  
    if (!price) {
      toast.error("Price is required");
      setLoading(false);
      setbtnloading(false);
      return;
    }
  
    if (!description) {
      toast.error("Description is required");
      setLoading(false);
      setbtnloading(false);
      return;
    }
  
    if (!image) {
      toast.error("Image is required");
      setLoading(false);
      setbtnloading(false);
      return;
    }
  
    // Create FormData object
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', selectedCategory);
    formData.append('subcategory', selectedSubcategory);
    formData.append('image', image);
  
    try {
      await DataService.addItem(formData);
      toast.success("Item Added Successfully!!!");
      setTimeout(() => {
        getAllUser();
        setAddUserPopUp(false);
      }, 2000);
      // Clear form fields
      setName("");
      setPrice("");
      setDescription("");
      setSelectedCategory("");
      setSelectedSubcategory("");
      setImage(null); // Reset image
    } catch (error) {
      const resMessage =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(resMessage);
    } finally {
      setLoading(false);
      setbtnloading(false);
    }
  };

  const deleteUser = (userId, username) => {
    DataService.deleteItem(userId).then(
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

  const handleChange = (e) => {
    //setSelectedCategory(e.target.value);
    const categoryId = e.target.value;
    setSelectedCategory(categoryId); 
    // Handle category selection logic here if needed

        // Filter subcategories based on selected category
        if (categoryId) {
          const filteredSubcategories = subCategory.filter(cat => cat.parentId._id === categoryId);
          setSubcategories(filteredSubcategories);
        } else {
          setSubcategories([]);
        }
  };

  return (
    <>
      <ToastContainer />
      <div className="main-sec-dashboard">
        <div className="top-bar-content top-bar-flex">
          <h2>All Items</h2>

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
                Add New Item
              </button>
            </div>
          </div>
        </div>

        <div className="tabel-height">
          <table className="table  ">
            <thead>
              <tr className="senior_div">
                <th>S.No.</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Category</th>
                <th>SubCategory</th>
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
                    <td>
                      <div className="users_img_get">
                        <div className="img_div">
                          {user?.image ? (
                            <img
                              src={
                                "https://tracking-backend-ull9.onrender.com" +
                                user?.image?.url
                              }
                              ref={imgRef}
                              alt="user"
                            />
                          ) : (
                            <img src={img} alt="default" />
                          )}
                        </div>
                        {user.name}
                      </div>
                    </td>
                    <td>{user?.price}</td>
                    <td>{user?.description}</td>
                    <td>{user?.category?.category}</td>
                    <td>{user?.subcategory?.category}</td>
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
                          to={`/edit-items/${user._id}`}
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
              <h2>Add Item</h2>
            </div>
            <div className="label-input-sec-popup">
                <div className="label-input-flex-popup">
                <label>
                    Item Name <span className="red-required">* </span>
                </label>
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Item Name"
                />
                </div>
                <div className="label-input-flex-popup">
                <label>
                    Item Price <span className="red-required">* </span>
                </label>
                <input
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter Item Price"
                />
                </div>
                <div className="label-input-flex-popup">
                <label>
                    Item Description <span className="red-required"></span>
                </label>
                <textarea
                    required
                    rows={5}
                    cols={60}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter Item Description"
                />
                </div>
                <div className="label-input-flex-popup">
                <label>
                    Item Category <span className="red-required">* </span>
                </label>
                <select 
                    
                    value={selectedCategory} 
                    onChange={handleChange}
                    //onChange={(e) => setSelectedCategory(e.target.value)}
                >
                        <option value="">Select Category</option>
                      {category && category.map((categories) => (
                        <option key={categories._id} value={categories._id}>
                          {categories.category}
                        </option>
                      ))}
                </select>
                </div>
                <div className="label-input-flex-popup">
                <label>
                    Item Subcategory <span className="red-required"></span>
                </label>
                <select
                  value={selectedSubcategory} 
                   onChange={(e) => setSelectedSubcategory(e.target.value)}
            >
              <option value="">Select Subcategory</option>
              {subcategories && subcategories.map((subcat) => (
                <option key={subcat._id} value={subcat._id}>
                  {subcat.category}
                </option>
              ))}
              </select>
                </div>
                <div className="label-input-flex-popup">
                <label>
                    Image Upload <span className="red-required">* </span>
                </label>
                <input
                    type="file"
                    //accept="image/*"
                    //onChange={(e) => setImage(e.target.value)}
                    onChange={(e) => setImage(e.target.files[0])}
                />
                </div>


                {/* <input type="file" onChange={(e) => setImage(e.target.files[0])} /> */}
 
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
                      "Add Item"
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

export default Items;
