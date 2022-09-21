import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

const NavBar = ({ curUser, loggedIn }) => {
  let soButton;
  let accButton;
  let siButton;
  let suButton;
  if (loggedIn) {
    accButton = (
      <a href={`/Account/${curUser}`}>
        <Button>Account</Button>
      </a>
    );
    soButton = (
      <a href="/">
        <Button onClick={signOut}>Sign Out</Button>
      </a>
    );
    siButton = null;
    suButton = null;
  } else {
    accButton = null;
    soButton = null;
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
    <div className="navContainer navBar">
      <a href="/">
        <Button>Home</Button>
      </a>
      <a href="/Store">
        <Button>Store</Button>
      </a>
      {siButton}
      {suButton}
      {accButton}
      {soButton}
      <h4>Signed in as: {curUser}</h4>
    </div>
  );
};

export default NavBar;
