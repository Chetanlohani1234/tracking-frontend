import React, { useEffect, useState } from 'react';
import DataService from "../../services/data.service";
import './po.css';
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const EditPO = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Extract PO ID from URL if editing an existing PO
  const [items, setItems] = useState([]);
  const [orderItems, setOrderItems] = useState([{ itemId: '', name: '', uom: '', unitPrice: '', quantity: '', price: '', taxPercent: '', taxAmount: '', total: '' }]);
  const [showTable, setShowTable] = useState(true);
  const [supplier, setSupplier] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  useEffect(() => {
    DataService.getAllSupplier()
      .then((response) => {
        setSupplier(response.data || []);
      })
      .catch((error) => {
        console.error('Error fetching suppliers:', error);
      });

    DataService.getAllItems()
      .then((response) => {
        setItems(response.data || []);
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      });

    if (id) {
      // Fetch the existing PO details if ID is present
      DataService.getPoById(id)
        .then((response) => {
          const po = response.data;
          setSelectedSupplier(po.supplier._id); // Get the supplier's ID
          setDeliveryDate(po.date);
          setOrderItems(po.items.map(item => ({
            itemId: item.itemId._id, // Extract itemId from item
            name: item.name,
            uom: item.itemId.uom.uom, // Extract UOM from itemId.uom
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            price: item.price,
            taxPercent: item.taxPercent,
            taxAmount: item.taxAmount,
            total: item.total
          })));
        })
        .catch((error) => {
          console.error('Error fetching PO details:', error);
        });
    }
  }, [id]);

  console.log("dfsdfsd",orderItems);

  const handleChangeSupplier = (e) => {
    setSelectedSupplier(e.target.value);
  };

  const handleItemChange = (index, itemId) => {
    const selectedItem = items.find(item => item._id === itemId);
    const updatedOrderItems = [...orderItems];
    if (selectedItem) {
      updatedOrderItems[index] = {
        ...updatedOrderItems[index],
        itemId: selectedItem._id,
        name: selectedItem.name,
        uom: selectedItem.uom.uom, // Set UOM from the selected item
        unitPrice: selectedItem.price,
        quantity: '',
        price: '',
        taxPercent: '',
        taxAmount: '',
        total: ''
      };
    }
    setOrderItems(updatedOrderItems);
  };


  const handleAddItemRow = () => {
    setOrderItems([...orderItems, { itemId: '', name: '', uom: '', unitPrice: '', quantity: '', price: '', taxPercent: '', taxAmount: '', total: '' }]);
    setShowTable(true);
  };

  const handleAttributeChange = (index, field, value) => {
    const updatedOrderItems = [...orderItems];
    updatedOrderItems[index][field] = value;
    setOrderItems(updatedOrderItems);
    if (field === 'unitPrice' || field === 'quantity' || field === 'taxPercent') {
      calculateValues(index);
    }
  };

  const calculateValues = (index) => {
    const updatedOrderItems = [...orderItems];
    const item = updatedOrderItems[index];
    const unitPrice = parseFloat(item.unitPrice) || 0;
    const quantity = parseFloat(item.quantity) || 0;
    const taxPercent = parseFloat(item.taxPercent) || 0;

    const price = unitPrice * quantity;
    const taxAmount = (price * taxPercent) / 100;
    const total = price + taxAmount;

    updatedOrderItems[index].price = price.toFixed(2);
    updatedOrderItems[index].taxAmount = taxAmount.toFixed(2);
    updatedOrderItems[index].total = total.toFixed(2);

    setOrderItems(updatedOrderItems);
  };

  const handleRemoveItem = (index) => {
    const updatedOrderItems = orderItems.filter((_, i) => i !== index);
    setOrderItems(updatedOrderItems);
    if (updatedOrderItems.length === 0) {
      setShowTable(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSupplier) {
      toast.error("Supplier is required");
      return;
    }

    if (!deliveryDate) {
      toast.error("Date is required");
      return;
    }

    const data = {
      supplier: selectedSupplier,
      date: deliveryDate,
      items: orderItems,
    };

    try {
      if (id) {
        // Update existing PO
        await DataService.updatePo(id, data);
        toast.success("PO Updated Successfully!!!");
      } else {
        // Add new PO
        await DataService.addPo(data);
        toast.success("PO Added Successfully!!!");
      }
      setTimeout(() => {
        navigate("/all-po");
      }, 2000);
      setSelectedSupplier("");
      setDeliveryDate("");
      setOrderItems([{ itemId: '', name: '', uom: '', unitPrice: '', quantity: '', price: '', taxPercent: '', taxAmount: '', total: '' }]);
    } catch (error) {
      const resMessage =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(resMessage);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="po-container">
        <h2 className="po-title">{id ? 'Update Purchase Order' : 'Purchase Order Form'}</h2>

        <div className="po-label-input-flex">
          <label>
            Supplier <span className="po-required">*</span>
          </label>
          <select
            value={selectedSupplier}
            onChange={handleChangeSupplier}
          >
            <option value="">Select Supplier</option>
            {supplier && supplier.map((sup) => (
              <option key={sup._id} value={sup._id}>
                {sup?.name}
              </option>
            ))}
          </select>
        </div>

        <div className="po-label-input-flex">
          <label style={{ marginRight: '10%' }}>
            Expected Delivery Date <span className="po-required">*</span>
          </label>
          <input
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            placeholder="Select Delivery Date"
          />
        </div>

        <div className="po-label-input-flex">
          <label>
            Add New Item <span className="po-required">*</span>
          </label>
          {/* Button removed, as a row is always displayed */}
        </div>

        {showTable && (
          <div className="po-table-container">
            <h3>Order Items:</h3>
            <table className="po-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>UOM</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Tax %</th>
                  <th>Tax Amount</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orderItems.map((orderItem, index) => (
                  <tr key={index}>
                    <td>
                      <select
                        value={orderItem.itemId || ''}
                        onChange={(e) => handleItemChange(index, e.target.value)}
                      >
                        <option value="">Select Item</option>
                        {items && items.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item?.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>{orderItem.uom}</td>
                    <td>
                      <input
                        type="number"
                        value={orderItem.unitPrice}
                        onChange={(e) => handleAttributeChange(index, 'unitPrice', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={orderItem.quantity}
                        onChange={(e) => handleAttributeChange(index, 'quantity', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={orderItem.price}
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={orderItem.taxPercent}
                        onChange={(e) => handleAttributeChange(index, 'taxPercent', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={orderItem.taxAmount}
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={orderItem.total}
                        readOnly
                      />
                    </td>
                    <td>
                      <button className="po-remove-btn" onClick={() => handleRemoveItem(index)}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <button style={{width:"100px",height:"50px",background:"#007BFF"}} onClick={handleAddItemRow}>Add New Item</button>
            </table>
          </div>
        )}

        <div className="po-btn-container">
          <button className="po-submit-btn" onClick={handleSubmit}>
            {id ? 'Update PO' : 'Add PO'}
          </button>
        </div>
      </div>
    </>
  );
};

export default EditPO;
