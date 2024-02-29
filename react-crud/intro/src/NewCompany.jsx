import alertify from "alertifyjs";
import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

export default class NewCompany extends Component {
  state = {
    companyName: "",
    legalnumber: "",
    country: "",
    website: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { companyName, legalnumber, country, website } = this.state;

    if (!companyName || !legalnumber || !country || !website) {
      alertify.error("Tüm alanları doldurunuz!");
      return;
    }

    fetch("http://localhost:3000/companies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categoryName: companyName,
        legalnumber,
        country,
        website,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alertify.success(" Yeni şirket oluşturuldu sayfayı yenile!", 3);

        this.setState({
          companyName: "",
          legalnumber: "",
          country: "",
          website: "",
        });
      })
      .catch((error) => {
        console.error("Şirket oluşturma hatası:", error);
      });
  };

  render() {
    const { companyName, legalnumber, country, website } = this.state;

    return (
      <div class="border border-black rounded-2 p-5">
        <h3>New Company</h3>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="companyName">CompanyName</Label>
            <Input
              type="text"
              name="companyName"
              id="companyName"
              placeholder="Enter company name"
              value={companyName}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="legalnumber">LegalNumber</Label>
            <Input
              type="text"
              name="legalnumber"
              id="legalnumber"
              placeholder="Enter legal number"
              value={legalnumber}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="country">Country</Label>
            <Input
              type="text"
              name="country"
              id="country"
              placeholder="Enter country"
              value={country}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="website">Website</Label>
            <Input
              type="text"
              name="website"
              id="website"
              placeholder="Enter website"
              value={website}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button type="submit">Save</Button>
        </Form>
      </div>
    );
  }
}
