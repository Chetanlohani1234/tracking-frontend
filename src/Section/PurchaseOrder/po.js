import React, { useEffect, useState } from 'react';
import DataService from "../../services/data.service"; // Update the path to your data service
import './po.css'; // Import CSS file
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const PO = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]); // List of all items
  const [categories, setCategories] = useState([]); // List of all categories
  const [subcategories, setSubcategories] = useState([]); // List of all subcategories
  const [orderItems, setOrderItems] = useState([]); // List of items added to the PO with attributes
  const [showTable, setShowTable] = useState(false); // Controls the visibility of the table
  const [supplier, setSupplier] = useState([]); // List of suppliers
  const [selectedSupplier, setSelectedSupplier] = useState(""); // Currently selected supplier
  const [deliveryDate, setDeliveryDate] = useState("");

  useEffect(() => {
    // Fetch suppliers when the component mounts
    DataService.getAllSupplier()
      .then((response) => {
        setSupplier(response.data || []);
      })
      .catch((error) => {
        console.error('Error fetching suppliers:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch items when the component mounts
    DataService.getAllItems()
      .then((response) => {
        setItems(response.data || []);
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      });
  }, []);

  const handleChangeSupplier = (e) => {
    setSelectedSupplier(e.target.value);
  };

  const handleItemChange = (index, itemId) => {
    const selectedItem = items.find(item => item._id === itemId);
    const updatedOrderItems = [...orderItems];
    if (selectedItem) {
      updatedOrderItems[index] = {
        ...selectedItem,
        quantity: updatedOrderItems[index]?.quantity || '',
        size: updatedOrderItems[index]?.size || ''
      };
    }
    setOrderItems(updatedOrderItems);
  };

  const handleAttributeChange = (index, field, value) => {
    const updatedOrderItems = [...orderItems];
    updatedOrderItems[index][field] = value;
    setOrderItems(updatedOrderItems);
  };

  const handleRemoveItem = (index) => {
    const updatedOrderItems = orderItems.filter((_, i) => i !== index);
    setOrderItems(updatedOrderItems);
    if (updatedOrderItems.length === 0) {
      setShowTable(false); // Hide table if no items are left
    }
  };

  const handleAddItemRow = () => {
    setOrderItems([...orderItems, { _id: '', name: '', price: '', category: {}, subcategory: {}}]);
    setShowTable(true);
  };

  console.log("sdsd",orderItems);



  const handleSubmit = async (e) => {
    e.preventDefault();
 
  
    // Validate required fields
    if (!selectedSupplier) {
      toast.error("Supplier is required");
      return;
    }
  
    if (!deliveryDate) {
      toast.error("Date is required");
      return;
    }
  
    if (!items) {
      toast.error("Items Number is required");
      return;
    }

    const itemIds = orderItems.map(item => item._id);

  
    // Create FormData object
     const data = {
      supplier:selectedSupplier,
      date:deliveryDate,
      Items:itemIds,
    }
  
    try {
      await DataService.addPo(data);
      toast.success("PO Added Successfully!!!");
      setTimeout(() => {
        navigate("/all-po")
      }, 2000);
      // Clear form fields
      setSupplier("");
      setDeliveryDate("");
      setItems("");
    } catch (error) {
      const resMessage =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(resMessage);
    } finally {

    }
  };

  return (
    <>
     <ToastContainer />
    <div>
      <h2>Purchase Order Form</h2>

      <div className="label-input-flex-popup">
        <label>
          Supplier <span className="red-required">* </span>
        </label>
        <select
          value={selectedSupplier}
          onChange={handleChangeSupplier}
        >
          <option value="">Select Supplier</option>
          {supplier && supplier.map((sup) => (
            <option key={sup._id} value={sup._id}>
              {sup.name}
            </option>
          ))}
        </select>
      </div>

      <div className="label-input-flex-popup">
        <label style={{marginRight:'10%'}}>
          Expected Delivery Date <span className="red-required">* </span>
        </label>
        <input
          type="date"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
          placeholder="Select Delivery Date"
        />
      </div>

      <div className="label-input-flex-popup">
        <label>
          Add New Item <span className="red-required">* </span>
        </label>
        <button onClick={handleAddItemRow}>Add New Row</button>
      </div>

      {showTable && (
        <div>
          <h3>Order Items:</h3>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Category</th>
                <th>SubCategory</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((orderItem, index) => (
                <tr key={index}>
                  <td>
                    <select
                      value={orderItem._id || ''}
                      onChange={(e) => handleItemChange(index, e.target.value)}
                    >
                      <option value="">Select Item</option>
                      {items && items.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>{orderItem.price || 'N/A'}</td>
                  <td>{orderItem.category?.category || 'N/A'}</td>
                  <td>{orderItem.subcategory?.category || 'N/A'}</td>

                  <td>
                    <button className='remove' onClick={() => handleRemoveItem(index)}>Remove</button>
                  </td>
                </tr>   
              ))}
              <button className='add-new' onClick={handleAddItemRow}>Add New Item</button>
            </tbody>
          </table>
        </div>
      )}

      <div className="form-footer">
        <button onClick={handleSubmit}>Submit PO</button>
      </div>
    </div>
    </>
  );
};

export default PO;
