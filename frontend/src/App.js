import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import MainPage from "./Pages";
import NotFound from "./Pages/404";
import Dash from "./Pages/Dash";
class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/404" component={NotFound} />
        <Route path="/inicio" component={Dash} />
      </Switch>
    );
  }
}

export default App;
