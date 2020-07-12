import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Modal } from "react-bootstrap";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { signup } from "../../constants";
import "./login.css";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      errorMessage: "",
      formFields: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      },
    };
  }

  inputChangeHandler = (e) => {
    let formFields = { ...this.state.formFields };
    formFields[e.target.name] = e.target.value;
    this.setState({
      formFields,
      errorMessage: "",
    });
  };

  formHandler = (e, formFields) => {
    e.preventDefault();
    axios(signup, {
      method: "post",
      data: formFields,
      withCredentials: true,
    })
      .then((response) => {
        console.log(response);
        window.location.replace("/");
      })
      .catch((error) => {
        console.log(error);
        this.setState({ errorMessage: "Ocorreu um erro, tente novamente" });
      });
  };

  setModalState = (state) => {
    this.setState({
      show: state,
      errorMessage: "",
      formFields: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      },
    });
  };

  render() {
    return (
      <>
        <span
          style={{ cursor: "pointer" }}
          data-cy="registar"
          onClick={(e) => {
            this.setModalState(true);
          }}
        >
          Registar
        </span>
        <Modal
          show={this.state.show}
          onHide={() => this.setModalState(false)}
          centered
        >
          <Modal.Header closeButton>
            <div>
              <h1 className="logText">Registe a sua conta.</h1>
            </div>
          </Modal.Header>
          <Modal.Body>
            <Form
              method="POST"
              onSubmit={(e) => this.formHandler(e, this.state.formFields)}
            >
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="first_name">Primeiro nome</Label>
                    <Input
                      type="text"
                      name="first_name"
                      id="first_name"
                      onChange={(e) => this.inputChangeHandler(e)}
                      value={this.state.formFields.first_name}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="last_name">Ultimo nome</Label>
                    <Input
                      onChange={(e) => this.inputChangeHandler(e)}
                      value={this.state.formFields.last_name}
                      type="text"
                      name="last_name"
                      id="last_name"
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => this.inputChangeHandler(e)}
                  value={this.state.formFields.email}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => this.inputChangeHandler(e)}
                  value={this.state.formFields.password}
                  required
                />
              </FormGroup>
              <p className="error-message">{this.state.errorMessage}</p>
              <Button color="success" type="submit">
                Registar
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default Register;
