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
        <div>
            <h1>Purchase Orders</h1>
            <table>
                <thead>
                    <tr>
                        <th>Supplier Information</th>
                        <th>Date</th>
                        <th>Items Detail</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={purchaseOrder._id}>
                        <td>
                            {purchaseOrder.supplier.name} <br />
                            {purchaseOrder.supplier.email}<br />
                            {purchaseOrder.supplier.phoneNo}<br />
                            {purchaseOrder.supplier.address}<br />
                            {purchaseOrder.supplier.country}<br />
                            {purchaseOrder.supplier.state}<br />
                            {purchaseOrder.supplier.city}<br />
                            {purchaseOrder.supplier.beneficiaryname}<br />
                            {purchaseOrder.supplier.bankname}<br />
                            {purchaseOrder.supplier.accountno}<br />
                            {purchaseOrder.supplier.ifsccode}
                        </td>
                        <td>{new Date(purchaseOrder.date).toLocaleDateString()}</td>
                        <td>
                            <ul>
                                {purchaseOrder.Items.map(item => (
                                    <li key={item._id}>
                                        {item.name} - {item.price} <br />
                                        Category: {item.category.category} <br />
                                        Subcategory: {item.subcategory.category} <br />
                                    </li>
                                ))}
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ViewPo;
