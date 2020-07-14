import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Modal } from "react-bootstrap";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { login, checkauth } from "../../constants";
import Cookies from "js-cookie";

import "./login.css";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      errorMessage: "",
      formFields: {
        email: "",
        password: "",
      },
    };
  }

  inputChangeHandler = (e) => {
    let formFields = { ...this.state.formFields };
    formFields[e.target.name] = e.target.value;
    this.setState({
      errorMessage: "",
      formFields,
    }); //
  };
  formHandler = (e, formFields) => {
    e.preventDefault();
    axios(login, {
      method: "post",
      data: formFields,
      withCredentials: true,
    })
      .then((response) => {
        let csrftokenCookie = Cookies.get("csrftoken");
        console.log(response);
        axios(checkauth, {
          method: "GET",
          withCredentials: true,
          headers: {
            "X-CSRFToken": csrftokenCookie,
          },
        }).then((response) => {
          window.location.replace("/home");
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ errorMessage: "Ocorreu um erro, tente novamente" });
      });
  };

  setModalState = (state) => {
    this.setState({
      errorMessage: "",
      show: state,
      formFields: {
        email: "",
        password: "",
      },
    });
  };

  render() {
    return (
      <>
        <span
          style={{ padding: "20px", cursor: "pointer" }}
          data-cy="Login"
          onClick={(e) => {
            this.setModalState(true);
          }}
        >
          Login
        </span>
        <Modal
          show={this.state.show}
          onHide={() => this.setModalState(false)}
          centered
        >
          <Modal.Header closeButton>
            <div>
              <h1 className="logText">Entre na sua conta</h1>
            </div>
          </Modal.Header>
          <Modal.Body>
            <Form
              method="POST"
              onSubmit={(e) => this.formHandler(e, this.state.formFields)}
            >
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
              <Button color="success">Entrar</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default Login;
