import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Jumbotron } from "react-bootstrap";
import "./secBanner.css";

function Banner() {
  return (
    <div className="App">
      <Jumbotron className="bckimg">
        <h1 className="textscd">
          Crie a sua conta e começe já a utilizar a What to Eat
        </h1>
      </Jumbotron>
    </div>
  );
}

export default Banner;
