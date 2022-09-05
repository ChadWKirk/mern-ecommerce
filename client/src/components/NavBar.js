import React from "react";
import { useState, useEffect } from "react";

const NavBar = () => {
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
    </div>
  );
};

export default NavBar;
