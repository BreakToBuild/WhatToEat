import React from "react";
import { Container } from "react-bootstrap";
import Content from "../components/contentMain/content";
import Footer from "../components/footer/footer";
import Login from "../components/forms/login";
import Register from "../components/forms/signUp";
//components
import Header from "../components/header/header";
import Banner from "../components/secBanner/secBanner";

const MainPage = () => {
  return (
    <div className="App">
      <Container>
        <Login></Login>
      </Container>
      <Container>
        <Register></Register>
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
};

export default MainPage;
