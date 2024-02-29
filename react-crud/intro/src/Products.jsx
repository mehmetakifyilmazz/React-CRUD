import React, { Component } from "react";
import {Table,Button,Modal,ModalHeader,ModalBody,Form,FormGroup,Label,Input,} from "reactstrap";

export default class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      updatedProduct: {
        id: 0,
        productName: "",
        unitPrice: 0,
        unitsInStock: 0,
      },
    };
  }

  toggleModal = () => {
    this.setState((prevState) => ({
      isModalOpen: !prevState.isModalOpen,
    }));
  };

  handleDelete = (id) => {
    fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        console.log("Ürün silindi:", id);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Ürün silme hatası:", error);
      });
  };

  handleUpdate = (product) => {
    this.setState({
      isModalOpen: true,
      updatedProduct: {
        id: product.id,
        productName: product.productName,
        unitPrice: product.unitPrice,
        unitsInStock: product.unitsInStock,
      },
    });
  };

  handleUpdateSubmit = () => {
    const { updatedProduct } = this.state;
    const categoryId = this.props.products.find(
      (product) => product.id === updatedProduct.id
    )?.categoryId;

    const updatedProductWithCategory = {
      ...updatedProduct,
      categoryId: categoryId,
    };

    fetch(`http://localhost:3000/products/${updatedProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProductWithCategory),
    })
      .then((response) => response.json())
      .then((updatedProduct) => {
        console.log("Ürün güncellendi:", updatedProduct);
        window.location.reload();
        this.props.onUpdate(updatedProduct);
        this.setState({
          isModalOpen: false,
          updatedProduct: {
            id: 0,
            productName: "",
            unitPrice: 0,
            unitsInStock: 0,
          },
        });
      })
      .catch((error) => {
        console.error("Ürün güncelleme hatası:", error);
      });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      updatedProduct: {
        ...prevState.updatedProduct,
        [name]: value,
      },
    }));
  };

  render() {
    return (
      <div class="border border-black rounded-2 p-5 mb-0">
        <h3>
          {this.props.info.title}-{this.props.currentCategory}
        </h3>
        <Table>
          <thead>
            <tr>
              <th>ProductId</th>
              <th>CompanyId</th>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Units In Stock</th>
              <th>
                <a href="/NewProduct" class="btn btn-success">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
                  </svg>
                  New Product
                </a>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((product) => (
              <tr key={product.id}>
                <th scope="row">{product.id}</th>
                <th>{product.categoryId}</th>
                <th>{product.productName}</th>
                <th>{product.unitPrice}</th>
                <th>{product.unitsInStock}</th>

                <td>
                  <Button
                    color="info"
                    onClick={() => this.handleUpdate(product)}
                  >
                    Update
                  </Button>
                  <Button
                    color="danger"
                    onClick={() => this.handleDelete(product.id)}
                  >
                    Delete
                  </Button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Update Product</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="productName">Product Name</Label>
                <Input
                  type="text"
                  name="productName"
                  id="productName"
                  value={this.state.updatedProduct.productName}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="unitPrice">Unit Price</Label>
                <Input
                  type="number"
                  name="unitPrice"
                  id="unitPrice"
                  value={this.state.updatedProduct.unitPrice}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="unitsInStock">Units In Stock</Label>
                <Input
                  type="number"
                  name="unitsInStock"
                  id="unitsInStock"
                  value={this.state.updatedProduct.unitsInStock}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Button color="success" onClick={this.handleUpdateSubmit}>
                Save
              </Button>{" "}
              <Button color="secondary" onClick={this.toggleModal}>
                Cancel
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
