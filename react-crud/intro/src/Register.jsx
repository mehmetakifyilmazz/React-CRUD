import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import alertify from "alertifyjs";
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { username, email, password } = this.state;

    if (!username || !email || !password) {
      alertify.error("Tüm alanları doldurunuz!");
      return;
    }

    const newUser = {
      username,
      email,
      password,
    };

    this.addNewUser(newUser);

    this.setState({
      username: "",
      email: "",
      password: "",
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  addNewUser(newUser) {
    fetch(`http://localhost:3000/users?username=${newUser.username}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error, status = " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          alertify.error("Bu kullanıcı adı zaten kullanılıyor!");
          return;
        }

        fetch(`http://localhost:3000/users?email=${newUser.email}`, {
          method: "GET",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("HTTP error, status = " + response.status);
            }
            return response.json();
          })
          .then((data) => {
            if (data.length > 0) {
              alertify.error("Bu e-posta zaten kullanılıyor!");
              return;
            }

            fetch("http://localhost:3000/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newUser),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("HTTP error, status = " + response.status);
                }
                return response.json();
              })
              .then((data) => {
                alertify.success("Kayıt Başarılı", 3);
              })
              .catch((error) => {
                console.error("Fetch hatası:", error);
              });
          })
          .catch((error) => {
            console.error("Fetch hatası:", error);
          });
      })
      .catch((error) => {
        console.error("Fetch hatası:", error);
      });
  }

  render() {
    return (
      <div class="border border-black rounded-2 p-5">
        <h3>Register</h3>
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
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              value={this.state.email}
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
          <Button type="submit">Register</Button>
        </Form>
      </div>
    );
  }
}
