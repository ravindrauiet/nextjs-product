"use client";

import React, { useEffect, useState } from "react";
import ProductsForm from "./ProductsForm";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [editedProduct, setEditedProduct] = useState(null);
  const [showButton, setShowButton] = useState(false);

  function fetchProduct() {
    fetch("/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data); // Log the fetched data
        // Ensure data is an array before sorting
        if (Array.isArray(data)) {
          const sortedProducts = data.sort((a, b) => b.sl_no - a.sl_no);
          setProducts(sortedProducts);
        } else {
          console.error("Error: Expected an array of products");
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error.message);
      });
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  function deleteProduct(id) {
    fetch(`/api/products?id=${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        fetchProduct();
      })
      .catch((error) => console.error("Error:", error));
  }

  function handleEdit(product) {
    console.log(product);
    setEditedProduct(product);
    setShowButton(true);
  }

  function handleAdd() {
    setEditedProduct(null);
    setShowButton(false);
    window.location.reload();
  }

  return (
    <>
      <button onClick={() => window.location.reload()} type="button" className="btn btn-outline-primary me-2 mt-4">
        Refresh
      </button>

      {editedProduct !== null ? (
        <ProductsForm products={products} product={editedProduct} updateProductList={fetchProduct} handleAdd={handleAdd} showButton={showButton} />
      ) : (
        <ProductsForm products={products} product={products} updateProductList={fetchProduct} />
      )}

      <h2 className="text-center mb-3 mt-3">List of Products</h2>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Sl_No</th>
            <th>Sales_Purchase</th>
            <th>Date</th>
            <th>Party_Name</th>
            <th>Details</th>
            <th>Weight</th>
            <th>Manpower</th>
            <th>Material</th>
            <th>Freight</th>
            <th>Maintainance</th>
            <th>Sales</th>
            <th>Payment_Received</th>
            <th>Amount_Paid</th>
            <th>Balance</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.sl_no}</td>
              <td>{product.sales_purchase}</td>
              <td>{product.date}</td>
              <td>{product.party_name}</td>
              <td>{product.details}</td>
              <td>{product.weight}</td>
              <td>{product.manpower}</td>
              <td>{product.material}</td>
              <td>{product.freight}</td>
              <td>{product.maintainance}</td>
              <td>{product.sales}</td>
              <td>{product.payment_received}</td>
              <td>{product.amount_paid}</td>
              <td>{product.balance}</td>
              <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                <button onClick={() => handleEdit(product)} className="btn btn-primary btn-sm me-2">Edit</button>
                <button onClick={() => deleteProduct(product.id)} className="btn btn-danger btn-sm me-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
