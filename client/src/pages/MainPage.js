import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import MainPageNavBar from "../components/MainPageNavBar";
import DropDown from "../components/DropDown";
import Carousel2 from "../components/Carousel";

const MainPage = ({ curUser, loggedIn }) => {
  return (
    <div>
      <div className="mainPage__bg">
        <MainPageNavBar curUser={curUser} loggedIn={loggedIn} />
        {/* <DropDown /> */}
        <Carousel2 />
      </div>
      <div className="mainPage__randomGallery-container">
        <h1>Free Stock Photos</h1>
        <div>ok</div>
        <div>ok</div>
        <div>ok</div>
      </div>
    </div>
  );
};

export default MainPage;
