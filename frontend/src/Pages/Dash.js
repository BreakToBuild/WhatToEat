import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { logout } from "../constants/";
class Dash extends Component {
  formHandler = (e, formFields) => {
    e.preventDefault();
    console.log(this);

    axios(logout, {
      method: "post",
      withCredentials: true,
    })
      .then(function (response) {
        console.log(response);
        console.log("Logout feito com sucesso");
        window.location = "/";
      })
      .catch(function (error) {
        console.log(error);
        window.location = "/inicio";
        //Perform action based on error
      });
  };
  render() {
    return (
      <Container>
        <h1>Bem vindo </h1>
      </Container>
    );
  }
}

export default Dash;
