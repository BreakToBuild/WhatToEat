import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import AllRecipes from "./components/recipePages/allrecipesPage";
import MainPage from "./Pages";
import NotFound from "./Pages/404";
import Dash from "./Pages/Dash";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/404" component={NotFound} />
      <PrivateRoute exact path="/home" component={Dash} />
      <PrivateRoute exact path="/home/allRecipes" component={AllRecipes} />
    </Switch>
  );
}

export default App;
