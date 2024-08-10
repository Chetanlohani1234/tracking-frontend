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
const EditSubCategory = () => {
  const inputFileRef = useRef();
  const imgRef = useRef();
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [btnloading, setBtnLoading] = useState(false);

  const [data, setData] = useState({});
  const params = useParams();
  const [name, setName] = useState("");
  const [sCategory,setSCategory] = useState();

  const [address,setAddress] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('');
  const [category,setCategory] = useState("");
  //const [categories,setCategories] = useState("");

  useEffect(() => {
    // Fetch categories when the component mounts
    DataService.getCategory(0) // Pass the appropriate type value here
      .then((response) => {
        const data = response.data;
        setCategory(data?.data || []);
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
    getUserDetail();
  }, []);

  const getUserDetail = () => {
    setLoading(true);
    DataService.getCategoryById(params.id)
      .then((data) => {
        setData(data.data.data);
        setName(data.data.data?.category);
        setSelectedCategory(data.data.data?.parentId?._id);

        
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
  //console.log("fdsfsdfd",categories)
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

  const handleChange = (e) => {
    //setSelectedCategory(e.target.value);
    const categoryId = e.target.value;
    setSelectedCategory(categoryId); 
    // Handle category selection logic here if needed
  };
  console.log("wqwq",selectedCategory)
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    //setbtnloading(true);

    
    if (!name) {
      toast.error("SubCategory is required");
      setLoading(false);
      //setbtnloading(false);
      return;
    }



    const data = {
      category: name,
      type: 1,
      parentId: selectedCategory,
    };

    DataService.updateCategory(params.id,data).then(
      () => {
        toast.success("SubCategory Updated Successfully!!!");
        setTimeout(() => {
            navigate("/subcategory")
          //getAllUser();
          //setAddUserPopUp(false);
          //setbtnloading(false);
        }, 1000);
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
        //setbtnloading(false);
        toast.error(resMessage);
      }
    );
  };

  return (
    <>
      <ToastContainer />
      {/* <div className="main-sec-userDetal-sec"> */}
      <div className="inner-sec-userDetail main-sec-dashboard">
        <div className="top-bar-content ">
          <h2>Edit SubCategory</h2>
        </div>

        <div className="sub-inner-userDetail">
          <div className="left-side-userDetail">
            <div className="label-filed">
              <label>Category <span className="red-required">* </span></label>
            </div>
            <div className="label-filed">
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
              <label>SubCategory <span className="red-required">* </span></label>
            </div>
            <div className="label-filed">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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

export default EditSubCategory;
