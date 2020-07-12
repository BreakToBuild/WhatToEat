import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Jumbotron } from "react-bootstrap";
import "./header.css";

function Header() {
  return (
    <div className="App">
      <Jumbotron className="bg-img">
        <h1 className="Principal">Saiba sempre o que cozinhar</h1>
        <p className="parag">e como cozinhar</p>
      </Jumbotron>
    </div>
  );
}

export default Header;
