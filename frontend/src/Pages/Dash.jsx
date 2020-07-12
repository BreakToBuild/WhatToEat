import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Sidnav from "../components/sideNav/Sidenav";
import "./index.css";
import BreadCrumbs from "../components/Breadcrumb/breadcrumb.jsx";

function Dash() {
  return (
    <div>
      <div>
        <Sidnav></Sidnav>
      </div>
      <div className="main">
        <BreadCrumbs />
      </div>
    </div>
  );
}

export default Dash;
