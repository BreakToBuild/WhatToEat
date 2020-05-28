import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Modal } from "react-bootstrap";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import "./login.css";
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

  formHandler = (e, formFields) => {
    e.preventDefault();
    console.log(this);
    axios
      .get("http://127.0.0.1:8000/api/login", formFields)
      .then(function (response) {
        console.log(response);
        //Perform action based on response
      })
      .catch(function (error) {
        console.log(error);
        this.setModalState(false);
        //Perform action based on error
      });
  };

  setModalState = (state) => {
    this.setState({
      show: state,
    });
  };

  render() {
    return (
      <>
        <span
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
          {" "}
          <Modal.Header closeButton>
            <div>
              <h1 className="logText">Registe a sua conta.</h1>
            </div>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  onChange={this.onChange}
                  value={this.state.email}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="passsword"
                  name="password"
                  id="password"
                  onChange={this.onChange}
                  value={this.state.password}
                  required
                />
              </FormGroup>
              <Button>Sign in</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default Login;
