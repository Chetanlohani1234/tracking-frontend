import React, { useEffect, useState } from 'react';
import DataService from "../../services/data.service";
import '../PurchaseOrder/po.css';
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AddDGrn = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Extract PO ID from URL if editing an existing PO
  const [items, setItems] = useState([]);
  const [orderItems, setOrderItems] = useState([
    {
      itemId: "",
      name: "",
      uom: "",
      unitPrice: 0,
      quantity: 0,
      pending: 0,
      receive: 0,
      price: 0,
      taxPercent: 0,
      taxAmount: 0,
      total: 0,
    }
  ]);
  const [showTable, setShowTable] = useState(true); // Default table visibility to true
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
  }, []);

  useEffect(() => {
    DataService.getAllItems()
      .then((response) => {
        setItems(response.data || []);
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      });
  }, []);

  const handleItemChangeR = (index, field, value) => {
    const updatedOrderItems = [...orderItems];
    const numericValue = Number(value); // Convert the input value to a number
    
    updatedOrderItems[index][field] = numericValue;
    
    if (field === 'receive') {
      const quantity = updatedOrderItems[index].quantity;
      
      // Calculate pending as quantity - receive
      const newPending = quantity - numericValue;
      updatedOrderItems[index].pending = newPending < 0 ? 0 : newPending;
    }
    
    setOrderItems(updatedOrderItems);
  };

  const handleItemChange = (index, itemId) => {
    const selectedItem = items.find(item => item._id === itemId);
    const updatedOrderItems = [...orderItems];
    if (selectedItem) {
      updatedOrderItems[index] = {
        ...updatedOrderItems[index],
        itemId: selectedItem._id,
        name: selectedItem.name,
        uom: selectedItem.uom.uom,
        unitPrice: selectedItem.price,
        quantity: '',
        pending:'',
        receive:'',
        price: '',
        taxPercent: '',
        taxAmount: '',
        total: ''
      };
    }
    setOrderItems(updatedOrderItems);
  };

  console.log("sdsdsd",orderItems);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedInvoice) {
      toast.error("Invoice is required");
      return;
    }
  
    const data = {
      invoice: selectedInvoice._id, // Invoice ID // PO ID
      items: orderItems.map(item => ({
        itemId: item.itemId,
        name: item.name,
        uom: item.uom,
        unitPrice: parseFloat(item.unitPrice),
        quantity: parseInt(item.quantity),
        pending: parseInt(item.pending),
        receive: parseInt(item.receive),
        price: parseFloat(item.price),
        taxPercent: parseFloat(item.taxPercent),
        taxAmount: parseFloat(item.taxAmount),
        total: parseFloat(item.total)
      }))
    };
  
    console.log("Submitting data:", JSON.stringify(data, null, 2));
  
    try {
        await DataService.directAddGrn(data);
        toast.success("GRN Added Successfully!!!");
      
  
      setTimeout(() => {
        navigate("/direct-grn");
      }, 2000);
  
      // Reset form state
      setSelectedSupplier("");
      setDeliveryDate("");
      setOrderItems([
        {
          itemId: "",
          name: "",
          uom: "",
          unitPrice: 0,
          quantity: 0,
          pending: 0,
          receive: 0,
          price: 0,
          taxPercent: 0,
          taxAmount: 0,
          total: 0,
        }
      ]);
      setShowTable(true); // Keep the table visible after submission
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

  const handleAddItemRow = () => {
    setOrderItems([...orderItems, { itemId: '', name: '', uom: '', unitPrice: '', quantity: '', price: '',taxPercent: '',taxAmount:'',total:'',pending:'',receive:''}]);
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

    updatedOrderItems[index].price = price;
    updatedOrderItems[index].taxAmount = taxAmount;
    updatedOrderItems[index].total = total;

    setOrderItems(updatedOrderItems);
  };

  const handleRemoveItem = (index) => {
    const updatedOrderItems = orderItems.filter((_, i) => i !== index);
    setOrderItems(updatedOrderItems);
    if (updatedOrderItems.length === 0) {
      setShowTable(false);
    }
  };
  console.log("ASdsds",orderItems);

  return (
    <>
      <ToastContainer />
      <div className="po-container">
        <h2 className="po-title">{id ? 'Add GRN' : 'Add GRN'}</h2>

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
          <form className="po-form" onSubmit={handleSubmit}>
            <div className="po-table-container">
              <table className="po-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Name</th>
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
                  {orderItems.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <select
                          value={item.itemId}
                          onChange={(e) => handleItemChange(index, e.target.value)}
                        >
                          <option value="">Select Item</option>
                          {items.map((item) => (
                            <option key={item._id} value={item._id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>{item.name}</td>
                      <td>{item.uom}</td>
                      <td>
                        <input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) =>
                            handleAttributeChange(index, "unitPrice", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleAttributeChange(index, "quantity", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={item.pending}
                          disabled
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={item.receive}
                          onChange={(e) =>
                            handleItemChangeR(index, "receive", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={item.price}
                          disabled
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={item.taxPercent}
                          onChange={(e) =>
                            handleAttributeChange(index, "taxPercent", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={item.taxAmount}
                          disabled
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={item.total}
                          disabled
                        />
                      </td>
                      <td>
                        <button className="po-remove-btn" type="button" onClick={() => handleRemoveItem(index)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              <button style={{width:"100px",height:"50px",background:"#007BFF"}} onClick={handleAddItemRow}>Add New Item</button>

              </table>
            </div>

            <button className="po-submit-btn" type="submit">
              {id ? 'Add GRN' : 'Submit'}
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default AddDGrn;
