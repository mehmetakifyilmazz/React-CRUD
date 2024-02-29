import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button, Container } from "reactstrap";
import alertify from "alertifyjs";

export default class NewProduct extends Component {
  state = {
    categoryId: "",
    productName: "",
    unitPrice: "",
    unitsInStock: "",
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { categoryId, productName, unitPrice, unitsInStock } = this.state;

    if (!categoryId || !productName || !unitPrice || !unitsInStock) {
      alertify.error("Tüm alanları doldurunuz!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/companies");
      const companies = await response.json();

      const isValidCompanyId = companies.some(
        (company) => company.id === categoryId
      );

      if (!isValidCompanyId) {
        alertify.error("Geçersiz CompanyId!");
        return;
      }
      const productResponse = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryId,
          productName,
          unitPrice,
          unitsInStock,
        }),
      });

      if (!productResponse.ok) {
        throw new Error("Ürün oluşturma hatası!");
      }

      alertify.success(" Yeni ürün oluşturuldu sayfayı yenile!", 3);
      this.setState({
        categoryId: "",
        productName: "",
        unitPrice: "",
        unitsInStock: "",
      });
    } catch (error) {
      console.error("İşlem hatası:", error);
      alertify.error("Bir hata oluştu, lütfen tekrar deneyin!");
    }
  };

  render() {
    const { categoryId, productName, unitPrice, unitsInStock } = this.state;
    return (
      <div class="border border-black rounded-2 p-5 ">
        <h3>New Product</h3>
        <Container></Container>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="categoryId">CompanyId</Label>
            <Input
              type="text"
              name="categoryId"
              id="categoryId"
              placeholder="Örnek: Apple için 7f1f giriniz"
              value={categoryId}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="productName">ProductName</Label>
            <Input
              type="text"
              name="productName"
              id="productName"
              placeholder="Enter product name"
              value={productName}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="unitPrice">UnitPrice</Label>
            <Input
              type="text"
              name="unitPrice"
              id="unitPrice"
              placeholder="Enter unit price"
              value={unitPrice}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="unitsInStock">UnitsInStock</Label>
            <Input
              type="text"
              name="unitsInStock"
              id="unitsInStock"
              placeholder="Enter units in stock"
              value={unitsInStock}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button type="submit">Save</Button>
        </Form>
      </div>
    );
  }
}
