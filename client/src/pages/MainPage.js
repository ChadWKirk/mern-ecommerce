import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import MainPageNavBar from "../components/MainPageNavBar";
import DropDown from "../components/DropDown";
import Carousel2 from "../components/Carousel";

const MainPage = ({ curUser, loggedIn }) => {
  return (
    <div>
      <MainPageNavBar curUser={curUser} loggedIn={loggedIn} />
      <DropDown />
      <Carousel2 />
      <div>
        Sign up now!
        <a href="/SignUp">
          <Button>Sign Up</Button>
        </a>
      </div>
    </div>
  );
};

export default MainPage;
