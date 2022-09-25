import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import NavBar from "../components/NavBar";
import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";
import DropDown from "../components/DropDown";
import Carousel2 from "../components/Carousel";

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
      <div className="brochureContainer">
        <div className="brochItemContainer">
          <div className="brochItemTitleContainer">
            <div>There Was An Idea...</div>
            <div>icon</div>
          </div>
          <div className="brochItemPContainer">
            <div>
              There was an idea to make it so that people all over the world
              could share their story...
            </div>
            <div>
              PicPocket is an image sharing platform that allows our community
              to download and upload their own images for free!
            </div>
          </div>
        </div>
        <div className="brochItemContainer">
          <div className="brochItemTitleContainer">
            <div>Did Someone Say Cheese?</div>
            <div>icon</div>
          </div>
          <div className="brochItemPContainer">
            <div>
              PicPocket allows users to set a fee to be apart of their story.
              Ranging from free to $20. Make some of that cheese back after
              buying that nice DSLR! Payments include PayPal and Stripe.
            </div>
          </div>
        </div>
        <div className="brochItemContainer">
          <div className="brochItemTitleContainer">
            <div>Ready To Share Your Story?</div>
            <div>icon</div>
          </div>
          <div className="brochItemPContainer">
            <div>
              Sign up now!
              <a href="/SignUp">
                <Button>Sign Up</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
