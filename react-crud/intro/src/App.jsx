import React, { Component } from "react";
import Navi from "./Navi";
import CompanyList from "./CompanyList";
import { Row, Col } from "reactstrap";
import { Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";
import Register from "./Register";
import NewProduct from "./NewProduct";
import Login from "./Login";
import NewCompany from "./NewCompany";
import Companies from "./Companies";
import Products from "./Products";
import Home from "./Home";

export default class App extends Component {
  state = { currentCategory: "", products: [] };
  componentDidMount() {
    this.getProducts();
  }

  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id);
  };

  getProducts = (categoryId) => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };

  updateProduct = (updatedProduct) => {
    const updatedProducts = this.state.products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    this.setState({ products: updatedProducts });
  };

  render() {
    let productInfo = { title: "Products" };
    let categoryInfo = { title: "Companies" };

    return (
      <div>
        <Navi />

        <Row>
          <Switch>
            <Route exact path="/" component={Home} />

            <Route path="/Products">
              <div className="row">
                <Col xs="3">
                  <CompanyList
                    currentCategory={this.state.currentCategory}
                    changeCategory={this.changeCategory}
                    info={categoryInfo}
                  />
                </Col>
                <Col xs="9">
                  <Products
                    products={this.state.products}
                    currentCategory={this.state.currentCategory}
                    info={productInfo}
                  />
                </Col>
              </div>
            </Route>

            <Route path="/NewProduct">
              <div className="row">
                <Col xs="3">
                  <CompanyList
                    currentCategory={this.state.currentCategory}
                    changeCategory={this.changeCategory}
                    info={categoryInfo}
                  />
                </Col>
                <Col xs="9">
                  <NewProduct />
                </Col>
              </div>
            </Route>

            <Route path="/Register" component={Register} />
            <Route path="/Login" component={Login} />
            <Route path="/Companies" component={Companies} />
            <Route path="/NewCompany" component={NewCompany} />
            <Route component={NotFound} />
          </Switch>
        </Row>
      </div>
    );
  }
}
