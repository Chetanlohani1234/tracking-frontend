import React, { useEffect, useState } from 'react';
import DataService from "../../services/data.service";
import { useParams } from "react-router-dom";
import './po.css';

const ViewPo = () => {
    const [purchaseOrder, setPurchaseOrder] = useState(null); // Start with null
    const params = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
        getSupplierDetail();
    }, []);

    const getSupplierDetail = () => {
        DataService.getPoById(params.id)
            .then((response) => {
                setPurchaseOrder(response.data);
            })
            .catch((error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                console.error(resMessage); // Log the error message
            });
    };

    if (!purchaseOrder) {
        return <p>Loading...</p>;
    }

    return (
        <div className="view-po-container">
            <h1 className="view-po-title">Purchase Order Details</h1>
            <table className="view-po-table">
                <thead>
                    <tr>
                        <th>Supplier Information</th>
                        <th>Date</th>
                        <th>Items Detail</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="view-po-supplier-info">
                            <strong>Name:</strong> {purchaseOrder.supplier.name} <br />
                            <strong>Email:</strong> {purchaseOrder.supplier.email}<br />
                            <strong>Phone:</strong> {purchaseOrder.supplier.phoneNo}<br />
                            <strong>Address:</strong> {purchaseOrder.supplier.address}, {purchaseOrder.supplier.city}, {purchaseOrder.supplier.state}, {purchaseOrder.supplier.country}<br />
                            <strong>Beneficiary Name:</strong> {purchaseOrder.supplier.beneficiaryname}<br />
                            <strong>Bank Name:</strong> {purchaseOrder.supplier.bankname}<br />
                            <strong>Account No:</strong> {purchaseOrder.supplier.accountno}<br />
                            <strong>IFSC Code:</strong> {purchaseOrder.supplier.ifsccode}
                        </td>
                        <td className="view-po-date">
                            {new Date(purchaseOrder.date).toLocaleDateString()}
                        </td>
                        <td className="view-po-items-detail">
                            <table className="view-po-items-table">
                                <thead>
                                    <tr>
                                        <th>Item Name</th>
                                        <th>Category</th>
                                        <th>Subcategory</th>
                                        <th>UOM</th>
                                        <th>Unit Price</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Tax %</th>
                                        <th>Tax Amount</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {purchaseOrder.items?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{item.itemId?.category?.category}</td>
                                            <td>{item?.itemId?.subcategory?.category}</td>
                                            <td>{item?.itemId?.uom?.uom}</td>
                                            <td>{item?.unitPrice}</td>
                                            <td>{item?.quantity}</td>
                                            <td>{item?.price}</td>
                                            <td>{item?.taxPercent}</td>
                                            <td>{item?.taxAmount}</td>
                                            <td>{item?.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ViewPo;
