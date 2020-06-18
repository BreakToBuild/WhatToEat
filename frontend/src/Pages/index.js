import React from "react";
import { Container, Nav } from "react-bootstrap";
import Content from "../components/contentMain/content";
import Footer from "../components/footer/footer";
import Login from "../components/forms/login";
import Register from "../components/forms/signUp";
import Header from "../components/header/header";
import Banner from "../components/secBanner/secBanner";
import "./index";
class MainPage extends React.Component {
  render() {
    return (
      <div className="App">
        <Container>
          <Nav className="justify-content-end">
            <Nav.Item>
              <div class="item">
                <Login></Login>
              </div>
            </Nav.Item>
            <Nav.Item>
              <div class="item">
                <Register></Register>
              </div>
            </Nav.Item>
          </Nav>
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

export default MainPage;
