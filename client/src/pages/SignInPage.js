import React from "react";
import NavBar from "../components/NavBar";

const SignInPage = () => {
  return (
    <div>
      <h1>Sign In Page</h1>
      <NavBar />
      <form>
        <label>Username: </label>
        <input></input>
        <label>Password: </label>
        <input></input>
        <button>Sign In</button>
      </form>
    </div>
  );
};

export default SignInPage;
