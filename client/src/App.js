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
  const [curUser, setCurUser] = useState();

  async function getCurUser() {
    //every time app renders, get currently signed in user.
    await fetch("http://localhost:5000/curUser", {
      method: "GET",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json()) //gets res from express and parses it into JSON for React
      .then((responseJSON) => {
        console.log(responseJSON);
        setCurUser(responseJSON);
      });

    //need to get value of promise to set to curUser
  }
  getCurUser();

  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage curUser={curUser} />}></Route>
        <Route path="/Store" element={<StorePage curUser={curUser} />}></Route>
        <Route
          path={`/Account/${curUser}`}
          element={<AccountPage curUser={curUser} />}
        ></Route>
        <Route
          path="/SignIn"
          element={<SignInPage curUser={curUser} />}
        ></Route>
        <Route
          path="/SignUp"
          element={<SignUpPage curUser={curUser} />}
        ></Route>
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
