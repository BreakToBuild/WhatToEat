import React from "react";
import { Breadcrumb } from "react-bootstrap";
import "../Breadcrumb/breadcrums.css";

const BreadcrumbRec = () => {
  return (
    <div>
      <Breadcrumb className="padding">
        <Breadcrumb.Item href="/inicio">Inicio</Breadcrumb.Item>
        <Breadcrumb.Item href="/inicio/All">Todas as receitas</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbRec;
