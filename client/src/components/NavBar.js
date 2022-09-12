import React from "react";
import { useState, useEffect } from "react";

const NavBar = ({ curUser, loggedIn }) => {
  let soButton;
  let accButton;
  let siButton;
  let suButton;
  if (loggedIn) {
    accButton = (
      <a href={`/Account/${curUser}`}>
        <button>Account</button>
      </a>
    );
    soButton = (
      <a href="/">
        <button onClick={signOut}>Sign Out</button>
      </a>
    );
    siButton = null;
    suButton = null;
  } else {
    accButton = null;
    soButton = null;
    siButton = (
      <a href="/SignIn">
        <button>Sign In</button>
      </a>
    );
    suButton = (
      <a href="/SignUp">
        <button>Sign Up</button>
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
    <div>
      <a href="/">
        <button>Home</button>
      </a>
      <a href="/Store">
        <button>Store</button>
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
