import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { withRouter } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      userData: null,
      error: null,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;

    try {
      const response = await fetch("http://localhost:3000/users");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      const user = data.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        localStorage.setItem("username", username);
        alert("Giriş başarılı!");
        this.props.history.push("/");
      } else {
        alert("Kullanıcı adı veya şifre yanlış!");
      }

      localStorage.removeItem("username");
    } catch (error) {
      console.error("There was an error!", error);
      this.setState({
        error: "Bir hata oluştu, lütfen daha sonra tekrar deneyin.",
      });
    }
  };

  render() {
    const { error } = this.state;

    return (
      <div className="border border-black rounded-2 p-5 ">
        <h3>Login</h3>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="username">UserName</Label>
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="Enter username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </FormGroup>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Button type="submit">Login</Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(Login);
