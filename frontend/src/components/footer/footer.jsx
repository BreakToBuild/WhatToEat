import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "./footer.css";

function Footer() {
  return (
    <div className="App">
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="item">
              <FaFacebook />
            </div>
            <div className="item">
              <FaTwitter />
            </div>
            <div className="item">
              <FaInstagram />
            </div>
          </div>
          <div>
            <p>Copyright © BreakToBuild 2020. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
