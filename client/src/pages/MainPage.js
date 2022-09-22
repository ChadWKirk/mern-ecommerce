import React, { useState, useEffect, useRef } from "react";
import NavBar from "../components/NavBar";
import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";
import DropDown from "../components/DropDown";
import Carousel2 from "../components/Carousel";
import RandomForYou from "../components/RandomForYou";

const MainPage = ({ curUser, loggedIn }) => {
  return (
    <div>
      <div className="navContainer">
        <Logo />
        <SearchBar />
        <NavBar curUser={curUser} loggedIn={loggedIn} />
      </div>
      <DropDown />
      <Carousel2 />
      <RandomForYou />
    </div>
  );
};

export default MainPage;
