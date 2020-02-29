import React from 'react';
import './header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Jumbotron} from 'react-bootstrap';

function Header() {
  return (
    <div className="App">
            <Jumbotron className="bg-img">
                <h1>
                 Saiba sempre o que cozinhar
                </h1>
                <p className="parag">
                  e como cozinhar
                </p>
            </Jumbotron>
    </div>
  );
}

export default Header;
