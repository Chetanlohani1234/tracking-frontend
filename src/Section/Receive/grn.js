import React, { useEffect, useState } from 'react';
import DataService from "../../services/data.service";
import '../PurchaseOrder/po.css';
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const GRN = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Extract PO ID from URL if editing an existing PO
  const [items, setItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [supplier, setSupplier] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState("");

  useEffect(() => {
    DataService.getAllInward()
      .then((response) => {
        setInvoices(response.data || []);
      })
      .catch((error) => {
        console.error('Error fetching invoices:', error);
      });
  }, []);

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
      DataService.getPoById(id)
        .then((response) => {
          const po = response.data;
          setSelectedSupplier(po.supplier._id);
          setDeliveryDate(po.date);
          setOrderItems(po.items.map(item => ({
            itemId: item.itemId._id,
            name: item.name,
            uom: item.itemId.uom.uom,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            pending: item.pending,
            receive: '',
            price: item.price,
            taxPercent: item.taxPercent,
            taxAmount: item.taxAmount,
            total: item.total
          })));
          setShowTable(true); // Show the table if PO exists
        })
        .catch((error) => {
          console.error('Error fetching PO details:', error);
        });
    }
  }, [id]);

  const handleRemoveItem = (index) => {
    const updatedOrderItems = orderItems.filter((_, i) => i !== index);
    setOrderItems(updatedOrderItems);
    if (updatedOrderItems.length === 0) {
      setShowTable(false);
    }
  };

  console.log("sdfsd",orderItems);

  // const handleItemChange = (index, field, value) => {
  //   const updatedOrderItems = [...orderItems];
  //   updatedOrderItems[index][field] = value;

  //   if (field === 'receive') {
  //     if(updatedOrderItems[index].pending === 0)
  //     {
  //       const pending = updatedOrderItems[index].quantity - value;
  //       updatedOrderItems[index].pending = pending < 0 ? 0 : pending;

  //     }
  //     else(updatedOrderItems[index].pending>0)
  //     {
  //       const pending = updatedOrderItems[index].pending - value;
  //       updatedOrderItems[index].pending = pending < 0 ? 0 : pending;
  //     }

  //   }

  //   setOrderItems(updatedOrderItems);
  // };

  const handleItemChange = (index, field, value) => {
    const updatedOrderItems = [...orderItems];
    const numericValue = Number(value); // Convert the input value to a number
  
    updatedOrderItems[index][field] = numericValue;
  
    if (field === 'receive') {
      if (updatedOrderItems[index].pending === 0) {
        updatedOrderItems[index].pending = updatedOrderItems[index].quantity - numericValue;
      } else {
        const newPending = updatedOrderItems[index].pending - numericValue + (updatedOrderItems[index].lastReceive || 0);
        updatedOrderItems[index].pending = newPending < 0 ? 0 : newPending;
      }
      
      // Store the last receive value to adjust the pending correctly
      updatedOrderItems[index].lastReceive = numericValue;
    }
  
    setOrderItems(updatedOrderItems);
  };
  
  
  
  




  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedInvoice) {
      toast.error("Invoice is required");
      return;
    }
  
    // Format data to match the backend's expected format
    const data = {
      invoice: selectedInvoice._id, // Invoice ID
      poId: id, // PO ID
      items: orderItems.map(item => ({
        itemId: item.itemId,        // Ensure this is a string or ObjectId, matching backend schema
        name: item.name,           // Ensure this field is expected
        uom: item.uom,             // Ensure this field is expected
        unitPrice: parseFloat(item.unitPrice), // Convert to number if needed
        quantity: parseInt(item.quantity),    // Convert to number if needed
        pending: parseInt(item.pending),      // Convert to number if needed
        receive: parseInt(item.receive),      // Convert to number if needed
        price: parseFloat(item.price),        // Convert to number if needed
        taxPercent: parseFloat(item.taxPercent), // Convert to number if needed
        taxAmount: parseFloat(item.taxAmount),   // Convert to number if needed
        total: parseFloat(item.total)           // Convert to number if needed
      }))
    };
  
    // Log data to verify structure
    console.log("Submitting data:", JSON.stringify(data, null, 2));
  
    try {
      if (id) {
        // Update existing GRN
        await DataService.addGrn(id, data);
        toast.success("GRN Added Successfully!!!");
      } else {
        // Handle new GRN creation if needed
        // await DataService.createGrn(data);
      }
  
      setTimeout(() => {
        navigate("/all-po");
      }, 2000);
  
      // Reset form state
      setSelectedSupplier("");
      setDeliveryDate("");
      setOrderItems([]);
      setShowTable(false); // Hide the table after submission
    } catch (error) {
      const resMessage =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(resMessage);
    }
  };
  
  

  const handleInvoiceChange = (e) => {
    const invoiceId = e.target.value;
    const invoice = invoices.find(inv => inv._id === invoiceId);
    setSelectedInvoice(invoice || {});
  };

  return (
    <>
      <ToastContainer />
      <div className="po-container">
        <h2 className="po-title">{id ? 'Receive GRN' : 'Purchase Order Form'}</h2>

        <div className="po-label-input-flex">
          <label>
            Invoice Number <span className="po-required">*</span>
          </label>
          <select value={selectedInvoice._id || ''} onChange={handleInvoiceChange}>
            <option value="">Select Invoice</option>
            {invoices.map((invoice) => (
              <option key={invoice._id} value={invoice._id}>
                {invoice.invoiceNumber}
              </option>
            ))}
          </select>
        </div>

        {selectedInvoice && (
          <div>
            <h2>Invoice Details</h2>
            <p><strong>Invoice ID:</strong> {selectedInvoice._id}</p>
            <p><strong>Invoice Number:</strong> {selectedInvoice.invoiceNumber}</p>
            <p><strong>Supplier Name:</strong> {selectedInvoice.supplier?.name}</p>
            <p><strong>Invoice Date:</strong> {selectedInvoice.date}</p>
            <p><strong>Vehicle Number:</strong> {selectedInvoice.vehicleNumber}</p>
          </div>
        )}

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
                  <th>Pending</th>
                  <th>Receive</th>
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
                        onChange={(e) => handleItemChange(index, 'itemId', e.target.value)}
                      >
                        <option value="">Select Item</option>
                        {items.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>{orderItem.uom}</td>
                    <td>{orderItem.unitPrice}</td>
                    <td>{orderItem.quantity}</td>
                    <td>{orderItem.pending}</td>
                    <td>
                      <input
                        type="number"
                        value={orderItem.receive || ''}
                        onChange={(e) => handleItemChange(index, 'receive', e.target.value)}
                        min="0"
                      />
                    </td>
                    <td>{orderItem.price}</td>
                    <td>{orderItem.taxPercent}</td>
                    <td>{orderItem.taxAmount}</td>
                    <td>{orderItem.total}</td>
                    <td>
                      <button className="po-remove-btn" onClick={() => handleRemoveItem(index)}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="po-btn-container">
          <button className="po-submit-btn" onClick={handleSubmit}>
            {id ? 'Submit' : 'Add PO'}
          </button>
        </div>
      </div>
    </>
  );
};

export default GRN;


