import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import AllRecipes from "./components/recipePages/allrecipesPage";
import MainPage from "./Pages";
import NotFound from "./Pages/404";
import MyRecipes from "./components/recipePages/myrecipePage";
import Dash from "./Pages/Dash";
import history from "./history";
import FollowedRecipes from "./components/recipePages/followedRecipes";
function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/404" component={NotFound} />
        <PrivateRoute exact path="/home" component={Dash} />
        <PrivateRoute exact path="/recipes" component={AllRecipes} />
        <PrivateRoute exact path="/my-recipes" component={MyRecipes} />
        <PrivateRoute
          exact
          path="/followedRecipes"
          component={FollowedRecipes}
        />
      </Switch>
    </Router>
  );
}

export default App;
