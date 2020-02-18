import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Navbar, Nav } from 'react-bootstrap';
import Header from './components/header/header';
import Content from './components/contentMain/content';
import Login from './components/forms/login';
import Banner from './components/secBanner/secBanner';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar className="bg" bg="light" variant="light" sticky="top">
          <Navbar.Brand href="/">WhatToEat</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link href="/"><Login></Login></Nav.Link>
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

      </div>
    );
  }
}

export default App;
