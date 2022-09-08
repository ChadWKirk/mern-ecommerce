import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const SignInPage = () => {
  let navigate = useNavigate();

  const [congrats, setCongrats] = useState();

  const [form, setForm] = useState({
    username: "",
    password: "",
    signedIn: false,
  });

  let newUser = {
    username: form.username,
    password: form.password,
    signedIn: false,
  }; //blank newUser

  function onChangeName(event) {
    //when name input changes,pass a para to be the event object then assign target.value to name. event parameter is always first parameter passed in a function called by an event.
    newUser.username = event.target.value;
  }

  function onChangePW(event) {
    newUser.password = event.target.value;
  }

  async function onSubmit(e) {
    e.preventDefault();
    console.log("submitted");

    setForm(newUser);

    if (newUser.username.length === 0) {
      window.alert("Name is blank. Sign in failed.");
    } else if (newUser.password.length === 0) {
      window.alert("Password is blank. Sign in failed.");
    } else {
      console.log("ok");
      await fetch("http://localhost:5000/SignIn", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newUser),
      })
        .then(() => {
          navigate("/");
        })
        .catch(() => {
          window.alert("Account does not exist. Sign in failed.");
        }); //if sign in fails
    }
  }

  return (
    <div>
      <h1>Sign In Page</h1>
      <NavBar />
      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username: </label>
        <input id="username" onChange={onChangeName}></input>
        <label htmlFor="password">Password: </label>
        <input id="password" onChange={onChangePW}></input>
        <button type="submit">Sign In</button>
      </form>
      {congrats}
    </div>
  );
};

export default SignInPage;
