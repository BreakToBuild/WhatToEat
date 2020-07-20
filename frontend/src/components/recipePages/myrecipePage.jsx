import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import MyTableRec from "../RecipeTable/MyTableRec";
import Sidnav from "../sideNav/Sidenav";
import BreadCrumbs from "..//Breadcrumb/breadcrumb.jsx";
import AddRecipesForm from "../recipePages/addrecipe.jsx";

const MyRecipes = () => {
  return (
    <div>
      <div>
        <Sidnav></Sidnav>
      </div>
      <div className="main">
        <BreadCrumbs />

        <div className="container-fluid">
          <MyTableRec />
        </div>

        <div className="flex-large" style={{ padding: "15px" }}>
          <div>
            <AddRecipesForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRecipes;
