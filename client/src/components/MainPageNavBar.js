import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { BsCartCheck } from "react-icons/bs";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const MainPageNavBar = ({ curUser, loggedIn }) => {
  let soButton;
  let accButton;
  let siButton;
  let suButton;
  let cartButton;
  let uploadButton;

  if (loggedIn) {
    accButton = (
      <DropdownButton title={curUser}>
        <Dropdown.Item href={`/Account/${curUser}/Likes`}>Likes</Dropdown.Item>
        <Dropdown.Item href={`/Account/${curUser}/My-Pics`}>
          My Pics
        </Dropdown.Item>
        <Dropdown.Item href={`/Account/${curUser}`}>
          User Settings
        </Dropdown.Item>
      </DropdownButton>
    );
    uploadButton = (
      <a href={`/${curUser}/upload`}>
        <Button>Upload</Button>
      </a>
    );
    soButton = (
      <a href="/">
        <Button onClick={signOut}>Sign Out</Button>
      </a>
    );
    cartButton = (
      <a href="/Cart">
        <Button className="navbar__cartBtn">
          <BsCartCheck size={36} className="navbar__cartIcon" />
          <div>Cart</div>
        </Button>
      </a>
    );
    siButton = null;
    suButton = null;
  } else {
    accButton = null;
    soButton = null;
    cartButton = null;
    siButton = <a href="/SignIn">Sign In</a>;
    suButton = (
      <a href="/SignUp">
        <Button>Sign Up</Button>
      </a>
    );
  }

  async function signOut() {
    await fetch("http://localhost:5000/SignOut", {
      method: "POST",
      headers: { "Content-type": "application/json" },
    });
  }

  return (
    <div className="navbar">
      <div>
        <a href="/" className="logo">
          <h1 className="logo__color-white">PicPocket</h1>
        </a>
      </div>
      <div className="navbar__buttons">
        {siButton}
        {suButton}
        {accButton}
        {uploadButton}
        {soButton}
        {cartButton}
      </div>
    </div>
  );
};

export default MainPageNavBar;
