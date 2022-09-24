import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { BsCartCheck } from "react-icons/bs";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const NavBar = ({ curUser, loggedIn }) => {
  let soButton;
  let accButton;
  let siButton;
  let suButton;
  let cartButton;
  if (loggedIn) {
    accButton = (
      <DropdownButton className="accDropDownButton" title={curUser}>
        <Dropdown.Item href={`/Account/${curUser}/Likes`}>Likes</Dropdown.Item>
        <Dropdown.Item href={`/Account/${curUser}/My-Pics`}>
          My Pics
        </Dropdown.Item>
        <Dropdown.Item href={`/Account/${curUser}`}>
          User Settings
        </Dropdown.Item>
      </DropdownButton>
    );
    soButton = (
      <a href="/">
        <Button onClick={signOut}>Sign Out</Button>
      </a>
    );
    cartButton = (
      <a href="/Cart">
        <Button className="cartButton">
          <BsCartCheck size={36} className="cartIcon" />
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
    siButton = (
      <a href="/SignIn">
        <Button>Sign In</Button>
      </a>
    );
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
    <div className="navBarContainer">
      {siButton}
      {suButton}
      {accButton}
      {soButton}
      {cartButton}
    </div>
  );
};

export default NavBar;
