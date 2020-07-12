import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./breadcrums.css";

function BreadCrumbs() {
  return (
    <Breadcrumb style={{ padding: "20px" }}>
      <Breadcrumb.Item>
        <NavLink activeClassName="is-active" to="/home">
          Inicio
        </NavLink>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <NavLink activeClassName="is-active" to="/recipes">
          Receitas
        </NavLink>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <NavLink activeClassName="is-active" to="/my-recipes">
          Minhas receitas
        </NavLink>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default BreadCrumbs;
