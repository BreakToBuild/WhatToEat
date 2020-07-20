import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import FollowedRecipesTable from "../RecipeTable/FollowedRecipes";
import Sidnav from "../sideNav/Sidenav";
import BreadCrumbs from "..//Breadcrumb/breadcrumb.jsx";

const FollowedRecipes = () => {
  return (
    <div>
      <div>
        <Sidnav></Sidnav>
      </div>
      <div className="main">
        <BreadCrumbs />

        <div className="container-fluid">
          <FollowedRecipesTable />
        </div>
      </div>
    </div>
  );
};

export default FollowedRecipes;
