import React, { useState, useEffect, useRef } from "react";
import NavBar from "../components/NavBar";
import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";

const MainPage = ({ curUser, loggedIn }) => {
  return (
    <div>
      <Logo />
      <SearchBar />
      <NavBar curUser={curUser} loggedIn={loggedIn} />
    </div>
  );
};

export default MainPage;
