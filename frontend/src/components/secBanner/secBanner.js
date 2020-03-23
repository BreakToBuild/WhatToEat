import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Container } from "react-bootstrap";
import "./secBanner.css";

function Banner() {
  return (
    <div className="App">
      <div className="row">
        <div className="column">
          <Container></Container>
        </div>
        <div className="column">
          <Container></Container>
        </div>
      </div>
    </div>
  );
}

export default Banner;
