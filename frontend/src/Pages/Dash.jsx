import React from "react";
import Sidnav from "../components/sideNav/Sidenav";
import "./index.css";
import BreadCrumbs from "../components/Breadcrumb/breadcrumb.jsx";
import Fullcalendar from "../components/scheduler/Fullcalendar.jsx";
function Dash() {
  return (
    <div>
      <div>
        <Sidnav></Sidnav>
      </div>
      <div className="main">
        <BreadCrumbs />
      </div>

      <div className="scheduler">
        <div>
          <Fullcalendar />
        </div>
      </div>
    </div>
  );
}

export default Dash;
