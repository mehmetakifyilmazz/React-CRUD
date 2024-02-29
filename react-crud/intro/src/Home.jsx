import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    fetch("http://localhost:3000/companies")
      .then((response) => response.json())
      .then((data) => this.setState({ categories: data }));
  }

  render() {
    const lastThreeCategories = this.state.categories.slice(-3);
    console.log(lastThreeCategories);

    return (
      <div className="card border border-black rounded-2 p-4 ">
        <div className="card-body">
          <h1 className="card-title text-center">WELCOME</h1>
          <h3 className="card-title text-center">
            "THERE ARE <span>{this.state.categories.length}</span> OF COMPANIES
            IN THE SYSTEM"
          </h3>

          <h2>Lastly added companies:</h2>
          <br />
          <ul class="list-group list-group-horizontal">
            {lastThreeCategories.map((category) => (
              <li
                class="list-group-item list-group-item-dark"
                key={category.id}
              >
                {category.categoryName}
              </li>
            ))}
          </ul>
          <br />
          <Link to="/Companies" className="btn btn-primary">
            Go Companies
          </Link>
        </div>
      </div>
    );
  }
}
