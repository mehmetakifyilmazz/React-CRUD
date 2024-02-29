import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default class CompanyList extends Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    this.getCategories();
  }

  getCategories = () => {
    fetch("http://localhost:3000/companies")
      .then((response) => response.json())
      .then((data) => this.setState({ categories: data }));
  };

  render() {
    return (
      <div class="border border-black rounded-2 p-1 mb-2 ">
        <ul class="list-group">
          <h2>
            <Link
              class="link-dark link-offset-3 link-underline-opacity-25 link-underline-opacity-100 "
              to="/Companies"
            >
              {" "}
              {this.props.info.title}
            </Link>{" "}
          </h2>
          {this.state.categories.map((category) => (
            <li
              class="list-group-item list-group-item-action list-group-item-dark h5"
              active={
                category.categoryName === this.props.currentCategory
                  ? true
                  : false
              }
              onClick={() => this.props.changeCategory(category)}
              key={category.id}
            >
              {category.categoryName}-{category.id}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
