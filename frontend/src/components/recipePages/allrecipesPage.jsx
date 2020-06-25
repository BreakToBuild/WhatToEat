import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Container } from "react-bootstrap";
import TableRec from "../RecipeTable/TableRec";
import Sidnav from "../sideNav/Sidenav";
import BreadCrumbs from "..//Breadcrumb/breadcrumb.jsx";

function AllRecipes(props) {
  return (
    <div>
      <div>
        <Sidnav></Sidnav>
      </div>
      <div className="main">
        <BreadCrumbs />
        <Container>
          <TableRec></TableRec>
        </Container>
      </div>
    </div>
  );
}

export default AllRecipes;
