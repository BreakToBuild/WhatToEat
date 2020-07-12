import React, { Component } from "react";
import axios from "axios";
import { logout } from "../../constants";

class SignOut extends Component {
  render() {
    const signOutHandle = () => {
      axios(logout, {
        method: "POST",
        withCredentials: true,
      })
        .then((response) => {
          console.log(response);
          window.location.replace("/");
        })

        .catch((error) => {
          console.log("ok");
          console.log(error);
        });
    };
    return (
      <>
        <span onClick={signOutHandle}>SignOut</span>
      </>
    );
  }
}
export default SignOut;
