import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Logo from "../components/Logo";

const SignUpPage = ({ curUser, loggedIn }) => {
  let navigate = useNavigate();

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
      window.alert("Name is blank. Sign up failed.");
    } else if (newUser.password.length === 0) {
      window.alert("Password is blank. Sign up failed.");
    } else {
      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newUser),
      })
        .then((response) => {
          if (response.status === 500) {
            //if already signed in
            let yesOrNo = window.confirm(
              `This will sign you out of your account, ${curUser}. Are you sure you want to continue signing up as ${newUser.username}?`
            );
            console.log(yesOrNo);
            if (yesOrNo) {
              console.log("yes");
              fetch("http://localhost:5000/users", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                  username: newUser.username,
                  password: newUser.password,
                  signedIn: false,
                  try: "2",
                }),
              }).then(() => {
                navigate(`/SignUp/${newUser.username}/Success`);
              });
            } else {
              console.log("no");
            }
          } else if (response.ok) {
            //if user is new
            navigate(`/SignUp/${newUser.username}/Success`);
          }
        })
        .catch(() => {
          window.alert("Username already exists. Sign up failed.");
        }); //if sign up fails

      console.log(newUser);
    }
  }

  return (
    <div>
      <Logo />
      <NavBar curUser={curUser} loggedIn={loggedIn} />
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
