import React, { useEffect,useState } from 'react';
import DataService from "../../services/data.service";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import './inward.css'; // Import your CSS file

const AddInward = () => {
  const navigate = useNavigate();

  const [supplier, setSupplier] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState("");
 
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
  
    if (!vehicleNumber) {
      toast.error("Vehicle Number is required");
      return;
    }
  
    // Create FormData object
     const data = {
      supplier:selectedSupplier,
      date:deliveryDate,
      vehicleNumber:vehicleNumber,
    }
  
    try {
      await DataService.addInward(data);
      toast.success("Inward Added Successfully!!!");
      setTimeout(() => {
        navigate("/all-inward")
      }, 2000);
      // Clear form fields
      setSupplier("");
      setDeliveryDate("");
      setVehicleNumber("");
    } catch (error) {
      const resMessage =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(resMessage);
    } finally {

    }
  };

  const handleChangeSupplier = (e) => {
    setSelectedSupplier(e.target.value);
  };
  console.log("sdsd",selectedSupplier);

  return (
  <>
    <ToastContainer />
    <div className="form-container">
      <h2>Purchase Order Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
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

        <div className="form-group">
          <label htmlFor="deliveryDate">
            Delivery Date <span className="required">*</span>
          </label>
          <input
            type="date"
            id="deliveryDate"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="vehicleNumber">
            Vehicle Number <span className="required">*</span>
          </label>
          <input
            type="text"
            id="vehicleNumber"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            placeholder="Enter vehicle number"
            required
          />
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  </>
  );
};

export default AddInward;
