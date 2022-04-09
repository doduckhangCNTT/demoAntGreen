import axios from "axios";
import React from "react";

const Logout = () => {
  const logout = () => {
    <div onclick={logoutUser()}>Sign out</div>;
  };

  const logoutUser = async () => {
    await axios.get("/user/logout");
    localStorage.clear();
    window.location.href = "/";
  };
  return <div>{logout()}</div>;
};

export default Logout;
