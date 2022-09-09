import React from "react";
import { useState, useEffect } from "react";

const NavBar = ({ curUser, setCurUser }) => {
  
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
      <a href="/SignIn">
        <button>Sign In</button>
      </a>
      <a href="/SignUp">
        <button>Sign Up</button>
      </a>
      <a href="/Account">
        <button>Account</button>
      </a>
      <a href="/">
        <button onClick={signOut}>Sign Out</button>
      </a>
      <h4>Signed in as: {curUser}</h4>
    </div>
  );
};

export default NavBar;
