import SideNav, { NavIcon, NavItem, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import React from "react";
import { FaCookie, FaCookieBite, FaHome } from "react-icons/fa";
import { GiCookingPot, GiCookie } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import Logout from "../forms/logout.jsx";

function Sidnav() {
  return (
    <SideNav expanded style={{ background: "#000000", minHeight: "1400px" }}>
      <NavItem>
        <h3
          style={{
            align: "center",
            padding: "60px 30px 70px",
            color: "white",
          }}
        >
          What To Eat
        </h3>
      </NavItem>
      <SideNav.Nav>
        <NavItem eventKey="home">
          <NavIcon>
            <FaHome style={{ fontSize: "1.75em", color: "white" }} />
          </NavIcon>
          <NavLink to="/home" style={{ color: "white" }}>
            Inicio
          </NavLink>
        </NavItem>

        <NavItem eventKey="Recipes">
          <NavIcon>
            <GiCookingPot style={{ fontSize: "30.5px", color: "white" }} />
          </NavIcon>
          <NavText style={{ color: "white" }}>Receitas</NavText>
        </NavItem>
        <NavItem
          eventKey="allRecipes"
          style={{ padding: "11.1px", color: "white" }}
        >
          <NavIcon>
            <FaCookieBite style={{ fontSize: "15px", color: "white" }} />
          </NavIcon>
          <NavLink to="/recipes" style={{ color: "white" }}>
            Todas as receitas
          </NavLink>
        </NavItem>
        <NavItem eventKey="myRecipes" style={{ padding: "11.1px" }}>
          <NavIcon>
            <FaCookie style={{ fontSize: "15px", color: "white" }} />
          </NavIcon>
          <NavLink to="my-recipes" style={{ color: "white" }}>
            Minhas receitas
          </NavLink>
        </NavItem>
        <NavItem eventKey="myRecipes" style={{ padding: "11.1px" }}>
          <NavIcon>
            <GiCookie style={{ fontSize: "18px", color: "white" }} />
          </NavIcon>
          <NavLink to="followedRecipes" style={{ color: "white" }}>
            Receitas seguidas
          </NavLink>
        </NavItem>
      </SideNav.Nav>
      <Logout />
    </SideNav>
  );
}

export default Sidnav;
