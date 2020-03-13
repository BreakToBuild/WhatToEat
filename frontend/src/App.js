import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import "./App.css";
import Content from "./components/contentMain/content";
import Footer from "./components/footer/footer";
import Login from "./components/forms/login";
import Header from "./components/header/header";
import Banner from "./components/secBanner/secBanner";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar className="bg" bg="light" variant="light" sticky="top">
          <Navbar.Brand href="">WhatToEat</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Button className="button">
                <Login></Login>
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
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
