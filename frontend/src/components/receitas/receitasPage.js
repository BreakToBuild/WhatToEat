import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Container } from "react-bootstrap";
import BreadcrumbRec from "../Breadcrumb//breadcrumb";
import TableRec from "../receiptTable/TableRec";
import Sidnav from "../sideNav/Sidenav";

function Treceitas() {
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

export default Treceitas;
