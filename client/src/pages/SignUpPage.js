import React from "react";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";

const SignUpPage = () => {
  let newUser = { username: "", password: "", signedIn: false }; //blank newUser

  function onChangeName(event) {
    //when name input changes,pass a para to be the event object then assign target.value to name. event parameter is always first parameter passed in a function called by an event.
    newUser.username = event.target.value;
  }

  function onChangePW(event) {
    newUser.password = event.target.value;
  }

  const [form, setForm] = useState({
    username: "",
    password: "",
    signedIn: false,
  });

  async function onSubmit(e) {
    e.preventDefault();
    console.log("submitted");

    setForm(newUser);

    await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newUser),
    }).catch(window.alert("Username already exists. Sign up failed.")); //if sign up fails

    console.log(newUser);
  }

  return (
    <div>
      <h1>Sign Up Page</h1>
      <NavBar />
      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username: </label>
        <input id="username" onChange={onChangeName}></input>
        <label htmlFor="password">Password: </label>
        <input id="password" onChange={onChangePW}></input>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
