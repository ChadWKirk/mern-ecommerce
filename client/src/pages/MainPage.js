import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";

const MainPage = ({ curUser, loggedIn, del, setDel }) => {
  let delBanner;
  useEffect(() => {
    // on refresh, set del to 0
    console.log(del + " is del value");

    if (del == 1) {
      delBanner = <h3>User account has been removed.</h3>;
    }
  });

  return (
    <div>
      <h1>Main Page</h1>
      <NavBar curUser={curUser} loggedIn={loggedIn} />
      {delBanner}
    </div>
  );
};

export default MainPage;
