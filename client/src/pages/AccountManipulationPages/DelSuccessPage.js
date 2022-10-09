import React from "react";
import NavBar from "../../components/NavBar";
import Logo from "../../components/Logo";
import SearchBar from "../../components/SearchBar";

const DelSuccessPage = ({ curUser, loggedIn }) => {
  return (
    <div>
      <NavBar curUser={curUser} loggedIn={loggedIn} />
      <h3>User account has been removed.</h3>
    </div>
  );
};

export default DelSuccessPage;
