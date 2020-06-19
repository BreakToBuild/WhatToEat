import SideNav, { NavIcon, NavItem, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import React from "react";
import { FaCookie, FaCookieBite, FaHome } from "react-icons/fa";
import { GiCookingPot } from "react-icons/gi";
import { NavLink } from "react-router-dom";

function Sidnav() {
  return (
    <SideNav expanded="true" style={{ background: "#000000" }}>
      <SideNav.Toggle />
      <SideNav.Nav>
        <NavItem eventKey="home">
          <NavIcon>
            <FaHome style={{ fontSize: "1.75em" }} />
          </NavIcon>
          <NavLink to="/inicio" style={{ color: "white" }}>
            Home
          </NavLink>
        </NavItem>

        <NavItem eventKey="receitas">
          <NavIcon>
            <GiCookingPot style={{ fontSize: "1.75em" }} />
          </NavIcon>
          <NavText>Receitas</NavText>
        </NavItem>
        <NavItem eventKey="todas" style={{ padding: "11.1px" }}>
          <NavIcon>
            <FaCookieBite style={{ fontSize: "11.1px" }} />
          </NavIcon>
          <NavLink to="/inicio/All" style={{ color: "white" }}>
            Todas as receitas
          </NavLink>
        </NavItem>
        <NavItem eventKey="minhas" style={{ padding: "11.1px" }}>
          <NavIcon>
            <FaCookie style={{ fontSize: "11.1px" }} />
          </NavIcon>
          <NavLink to="/inicio/receitas" style={{ color: "white" }}>
            Minhas receitas
          </NavLink>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );
}

export default Sidnav;
