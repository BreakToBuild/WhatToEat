import React from 'react';
import './secBanner.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Jumbotron} from 'react-bootstrap';

function Banner() {
  return (
    <div className="App">
            <Jumbotron className="secBg-img">
                <h1>
                 Mantenha as suas receitas guardadas
                </h1>
                <p className="phara">
                  e organizadas
                </p>
            </Jumbotron>
    </div>
  );
}

export default Banner;
