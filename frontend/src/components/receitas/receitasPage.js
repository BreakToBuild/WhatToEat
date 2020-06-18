import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { Container } from "react-bootstrap";
import BreadcrumbRec from "../Breadcrumb//breadcrumb";
import TableRec from "../receiptTable/TableRec";
import Sidnav from "../sideNav/Sidenav";
class Treceitas extends Component {
  render() {
    return (
      <div>
        <div>
          <Sidnav></Sidnav>
        </div>
        <div className="main">
          <BreadcrumbRec></BreadcrumbRec>
          <Container>
            <TableRec></TableRec>
          </Container>
        </div>
      </div>
    );
  }
}

export default Treceitas;
