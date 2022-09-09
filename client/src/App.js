import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import MainPage from "./pages/MainPage";
import StorePage from "./pages/StorePage";
import AccountPage from "./pages/AccountPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import SignUpSuccessPage from "./pages/SignUpSuccessPage";
import DelSuccessPage from "./pages/DelSuccessPage";
import NavBar from "./components/NavBar";

function App() {
  async function getCurUser() {
    //every time app renders, get currently signed in user.
    await fetch("http://localhost:5000/curUser", {
      method: "GET",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json()) //gets res from express and parses it into JSON for React
      .then((responseJSON) => console.log(responseJSON));

    //need to get value of promise to set to curUser
  }
  getCurUser();

  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/Store" element={<StorePage />}></Route>
        <Route path="/Account/:username" element={<AccountPage />}></Route>
        <Route path="/SignIn" element={<SignInPage />}></Route>
        <Route path="/SignUp" element={<SignUpPage />}></Route>
        <Route
          path="/SignUp/:username/Success"
          element={<SignUpSuccessPage />}
        ></Route>
        <Route path="/delSuccess" element={<DelSuccessPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
