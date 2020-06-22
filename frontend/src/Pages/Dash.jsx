import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import BreadcrumbRec from "../components/Breadcrumb/breadcrumb";
import Sidnav from "../components/sideNav/Sidenav";

function Dash() {
  return (
    <div>
      <div>
        <Sidnav></Sidnav>
      </div>
      <div className="main">
        <BreadcrumbRec></BreadcrumbRec>
      </div>
    </div>
  );
}

export default Dash;
