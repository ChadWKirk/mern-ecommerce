import React from "react";
import NavBar from "../components/NavBar";

const DelSuccessPage = ({ curUser, loggedIn }) => {
  return (
    <div>
      <h1>Main Page</h1>
      <NavBar curUser={curUser} loggedIn={loggedIn} />
      <h3>User account has been removed.</h3>
    </div>
  );
};

export default DelSuccessPage;
