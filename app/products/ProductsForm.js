// app/products/ProductsForm.js
"use client";

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function ProductsForm(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [validated, setValidated] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    const formData = new FormData(form);

    const product = Object.fromEntries(formData.entries());

    if (!props.product.id) {
      product.createdAt = new Date().toISOString().slice(0, 10);
      product.id = Date.now();
    }

    setValidated(true);

    if (props.product.id) {
      console.log(props.product.id);
      fetch(`/api/products?id=${props.product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...product, id: props.product.id }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response is not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          props.updateProductList();
        })
        .catch((error) => console.error("Error:", error));
    } else {
      fetch(`/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response is not ok");
          }
          return response.json();
        })
        .then((data) => {
          props.updateProductList();
        })
        .catch((error) => console.error("Error:", error));
    }
  }

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-1">
          <Form.Group as={Col} sm="1" controlId="validationCustom01">
            <Form.Label>Sl_No</Form.Label>
            <Form.Control required type="text" name="sl_no" placeholder="Sl_No" defaultValue={props.product.sl_no || ""} />
          </Form.Group>
          <Form.Group as={Col} sm="1" controlId="validationCustom02">
            <Form.Label>Sales_Purchase</Form.Label>
            <Form.Control required type="text" name="sales_purchase" placeholder="Sales" defaultValue={props.product.sales_purchase || ""} />
          </Form.Group>
          <Form.Group as={Col} sm="1" controlId="validationCustom03">
            <Form.Label>Date</Form.Label>
            <Form.Control required type="date" name="date" placeholder="date" defaultValue={props.product.date || ""} />
          </Form.Group>
          <Form.Group as={Col} sm="1" controlId="validationCustom04">
            <Form.Label>Party_Name</Form.Label>
            <Form.Control required type="text" name="party_name" placeholder="Party Name" defaultValue={props.product.party_name || ""} />
          </Form.Group>
          <Form.Group as={Col} md="1" controlId="validationCustom05">
            <Form.Label>Details</Form.Label>
            <Form.Control type="text" name="details" placeholder="Details" defaultValue={props.product.details || ""} />
          </Form.Group>
          <Form.Group as={Col} md="1" controlId="validationCustom05">
            <Form.Label>Weight</Form.Label>
            <Form.Control type="text" name="weight" placeholder="Weight" defaultValue={props.product.weight || ""} />
          </Form.Group>
          <Form.Group as={Col} md="1" controlId="validationCustom05">
            <Form.Label>Manpower</Form.Label>
            <Form.Control type="text" name="manpower" placeholder="Manpower" defaultValue={props.product.manpower || ""} />
          </Form.Group>
          <Form.Group as={Col} md="1" controlId="validationCustom05">
            <Form.Label>Material</Form.Label>
            <Form.Control type="text" name="material" placeholder="Material" defaultValue={props.product.material || ""} />
          </Form.Group>
          <Form.Group as={Col} md="1" controlId="validationCustom05">
            <Form.Label>Freight</Form.Label>
            <Form.Control type="text" name="freight" placeholder="Freight" defaultValue={props.product.freight || ""} />
          </Form.Group>
          <Form.Group as={Col} md="1" controlId="validationCustom05">
            <Form.Label>Maintainance</Form.Label>
            <Form.Control type="text" name="maintainance" placeholder="Maintainance" defaultValue={props.product.maintainance || ""} />
          </Form.Group>
          <Form.Group as={Col} md="1" controlId="validationCustom05">
            <Form.Label>Sales</Form.Label>
            <Form.Control type="text" name="sales" placeholder="Sales" defaultValue={props.product.sales || ""} />
          </Form.Group>
          <Form.Group as={Col} md="1" controlId="validationCustom05">
            <Form.Label>Payment Received</Form.Label>
            <Form.Control type="text" name="payment_received" placeholder="Payment Received" defaultValue={props.product.payment_received || ""} />
          </Form.Group>
          <Form.Group as={Col} md="1" controlId="validationCustom05">
            <Form.Label>Amount Paid</Form.Label>
            <Form.Control type="text" name="amount_paid" placeholder="Amount Paid" defaultValue={props.product.amount_paid || ""} />
          </Form.Group>
          <Form.Group as={Col} md="1" controlId="validationCustom05">
            <Form.Label>Balance</Form.Label>
            <Form.Control type="text" name="balance" placeholder="Balance" defaultValue={props.product.balance || ""}/>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="1" controlId="validationCustom06">
            <Button type="submit" className="btn btn-primary">Submit</Button>
          </Form.Group>
          {props.showButton && (
            <Form.Group as={Col} md="1" controlId="validationCustom06">
              <Button onClick={props.handleAdd} className="btn btn-secondary">Add</Button>
            </Form.Group>
          )}
        </Row>
      </Form>
    </>
  );
}
