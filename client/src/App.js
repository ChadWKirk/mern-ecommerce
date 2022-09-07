import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import StorePage from "./pages/StorePage";
import AccountPage from "./pages/AccountPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import SignUpSuccessPage from "./pages/SignUpSuccessPage";
import DelSuccessPage from "./pages/DelSuccessPage";

function App() {
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
