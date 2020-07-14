import React, { Component } from "react";
import axios from "axios";
import { logout } from "../../constants";
import Cookies from "js-cookie";
import "./login.css";

class Logout extends Component {
  render() {
    const signOutHandle = () => {
      let csrftokenCookie = Cookies.get("csrftoken");

      axios(logout, {
        method: "POST",
        withCredentials: true,
        headers: {
          "X-CSRFToken": csrftokenCookie,
        },
      })
        .then((response) => {
          console.log(response);
          window.location.replace("/");
          Cookies.remove("csrftoken");
        })

        .catch((error) => {
          console.log("ok");
          console.log(error);
        });
    };
    return (
      <>
        <button className="SignOutButton" onClick={signOutHandle}>
          SignOut
        </button>
      </>
    );
  }
}
export default Logout;
