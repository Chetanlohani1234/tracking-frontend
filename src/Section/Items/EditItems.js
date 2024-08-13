import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DataService from "../../services/data.service";
import { ToastContainer, toast } from "react-toastify";
import img from "../../Images/placeholder-img.png";
const styles = {
  input: {
    opacity: "0%",
    position: "absolute",
  },
};
const EditItems = () => {
  const inputFileRef = useRef();
  const imgRef = useRef();
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [btnloading, setBtnLoading] = useState(false);

  const [data, setData] = useState({});
  const params = useParams();
  const [name, setName] = useState("");
  const [price,setPrice] = useState("");
  const [description,setDescription] = useState("");
  const [image,setImage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('');
  const [category,setCategory] = useState("");
  const [subCategory,setSubCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [team, setTeam] = useState("");
  const [position, setPosition] = useState("");
  const [gender, setGender] = useState("");
  const [language, setLanguage] = useState("");
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");

  const [address,setAddress] = useState("");

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

  useEffect(() => {
    window.scrollTo(0, 0);
    getItemDetail();
  }, []);

  const getItemDetail = () => {
    setLoading(true);
    DataService.getItemDetailById(params.id)
      .then((data) => {
        setData(data.data.data);
        setName(data.data?.name);
        setPrice(data?.data?.price);
        setDescription(data?.data?.description);
        setSelectedCategory(data?.data?.category);
        setSelectedSubcategory(data?.data?.subcategory);

        //setTeam(data.data.data?.team);
        //setPosition(data.data.data?.position);
        //setGender(data.data.data?.gender);
        //setLanguage(data.data.data?.language);
        //setStatus(data.data.data?.status);
        //setRole(data.data.data?.role);
        
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
  const onFileChangeCapture = (e) => {
    const file = e.target.files[0];
    setFile(e.target.files);
    const reader = new FileReader();
    const url = reader.readAsDataURL(file);
    reader.onloadend = function (theFile) {
      var image = new Image();
      image.src = theFile.target.result;
      imgRef.current.src = image.src;
    };
  };
  const triggerFile = () => {
    inputFileRef.current.click();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Validate required fields
    if (!name) {
      toast.error("Name is required");
      setLoading(false);
      return;
    }
  
    if (!price) {
      toast.error("Price is required");
      setLoading(false);
      return;
    }
  
    if (!description) {
      toast.error("Description is required");
      setLoading(false);
      return;
    }
  
    if (!image) {
      toast.error("Image is required");
      setLoading(false);
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
      await DataService.updateItem(formData);
      toast.success("Updated Added Successfully!!!");
      setTimeout(() => {
        //getAllUser();
        //setAddUserPopUp(false);
        navigate("/all-items")
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
    }
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
      {/* <div className="main-sec-userDetal-sec"> */}
      <div className="inner-sec-userDetail main-sec-dashboard">
        <div className="top-bar-content ">
          <h2>Edit Item</h2>
        </div>

        <div className="sub-inner-userDetail">
          <div className="left-side-userDetail">
            <div className="label-filed">
            <label>
                  Item Name <span className="red-required">* </span>
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Item Name"
                />
            </div>
            <div className="label-filed">
            <label>
                Item Price <span className="red-required">* </span>
                </label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter Item Price"
                />
            </div>

            <div className="label-filed">
              <label>
                    Item Description <span className="red-required"></span>
                </label>
                <textarea
                    required
                    rows={5}
                    cols={60}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter Item Description"
                />
            </div>

            <div className="label-filed">
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

            <div className="label-filed">
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

            <div>
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

          </div>

        </div>
        <div className="bottom-btn-sec">
          <button
            className="main-btn"
            onClick={handleSubmit}
            disabled={btnloading}
          >
            {btnloading ? (
              <span className="spinner-border spinner-border-sm"></span>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default EditItems;
