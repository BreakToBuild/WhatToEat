import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import "./App.css";
import Content from "./components/contentMain/content";
import Footer from "./components/footer/footer";
import Login from "./components/forms/login";
import Register from "./components/forms/signUp";
import Header from "./components/header/header";
import Banner from "./components/secBanner/secBanner";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <Router>
            <div>
              <nav className="navbar navbar-expand-lg navbar-light ">
                <ul className="navbar-nav mr-auto">
                  <li>
                    <Link to={"/"} className="nav-link">
                      {" "}
                      Inicio{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to={"/login"} className="nav-link">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to={"/signup"} className="nav-link">
                      Registo
                    </Link>
                  </li>
                </ul>
              </nav>
              <hr />
              <Switch>
                <Route exact path="/" />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Register} />
              </Switch>
            </div>
          </Router>
        </Container>
        <Header></Header>
        <div>
          <Content></Content>
        </div>
        <div>
          <Banner></Banner>
        </div>
        <div>
          <Footer></Footer>
        </div>
      </div>
    );
  }
}

export default App;
