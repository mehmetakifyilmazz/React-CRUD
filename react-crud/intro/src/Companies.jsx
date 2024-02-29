import React, { Component } from "react";
import {Table,Button,Modal,ModalHeader,ModalBody,Form, FormGroup,Label,Input} from "reactstrap";

export default class Companies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      isModalOpen: false,
      selectedCompany: {
        id: "",
        categoryName: "",
        legalnumber: "",
        country: "",
        website: "",
      },
    };
  }

  componentDidMount() {
    this.getCategories();
  }

  getCategories = () => {
    fetch("http://localhost:3000/companies")
      .then((response) => response.json())
      .then((data) => this.setState({ categories: data }));
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      isModalOpen: !prevState.isModalOpen,
    }));
  };

  handleDelete = (id) => {
    fetch(`http://localhost:3000/companies/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        console.log("Şirket silindi:", id);
        this.getCategories();
      })
      .catch((error) => {
        console.error("Şirket silme hatası:", error);
      });
  };

  handleUpdate = (company) => {
    this.setState({
      selectedCompany: {
        id: company.id,
        categoryName: company.categoryName,
        legalnumber: company.legalnumber,
        country: company.country,
        website: company.website,
      },
    });
    this.toggleModal();
  };

  handleUpdateSubmit = () => {
    const { id, categoryName, legalnumber, country, website } =
      this.state.selectedCompany;
    const updatedCompany = { categoryName, legalnumber, country, website };

    fetch(`http://localhost:3000/companies/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCompany),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Şirket güncellendi:", data);
        this.getCategories();
        this.toggleModal();
      })
      .catch((error) => {
        console.error("Şirket güncelleme hatası:", error);
      });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      selectedCompany: {
        ...prevState.selectedCompany,
        [name]: value,
      },
    }));
  };

  render() {
    return (
      <div className="border border-black rounded-2 p-5 ">
        <h3>Companies</h3>
        <Table>
          <thead>
            <tr>
              <th>CompanyId</th>
              <th>Company Name</th>
              <th>Company Legal Number</th>
              <th>Incorporation Country</th>
              <th>Website</th>
              <th>
                <a href="/NewCompany" className="btn btn-success">
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
                  New Company
                </a>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.categories.map((category) => (
              <tr key={category.id}>
                <th>{category.id}</th>
                <th>{category.categoryName}</th>
                <th>{category.legalnumber}</th>
                <th>{category.country}</th>
                <th>{category.website}</th>
                <td>
                  <Button
                    color="info"
                    onClick={() => this.handleUpdate(category)}
                  >
                    Update
                  </Button>
                  <Button
                    color="danger"
                    onClick={() => this.handleDelete(category.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Update Company</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="categoryName">Company Name</Label>
                <Input
                  type="text"
                  name="categoryName"
                  id="categoryName"
                  value={this.state.selectedCompany.categoryName}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="legalnumber">Company Legal Number</Label>
                <Input
                  type="text"
                  name="legalnumber"
                  id="legalnumber"
                  value={this.state.selectedCompany.legalnumber}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="country">Incorporation Country</Label>
                <Input
                  type="text"
                  name="country"
                  id="country"
                  value={this.state.selectedCompany.country}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="website">Website</Label>
                <Input
                  type="text"
                  name="website"
                  id="website"
                  value={this.state.selectedCompany.website}
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
