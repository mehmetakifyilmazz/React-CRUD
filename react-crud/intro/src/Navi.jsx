import React from "react";

export default class Navi extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Companies">
                    Companies
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Products">
                    Products
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="/NewCompany">
                    NewCompany
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/NewProduct">
                    NewProduct
                  </a>
                </li>
              </ul>
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/Login">
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Register">
                    Register
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <br></br>
      </div>
    );
  }
}
