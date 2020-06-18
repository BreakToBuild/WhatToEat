import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import BreadcrumbRec from "../components/Breadcrumb/breadcrumb";
import Sidnav from "../components/sideNav/Sidenav";
class Dash extends Component {
  render() {
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
}

export default Dash;
