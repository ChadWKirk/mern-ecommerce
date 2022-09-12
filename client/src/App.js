import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import MainPage from "./pages/MainPage";
import StorePage from "./pages/StorePage";
import AccountPage from "./pages/AccountPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import SignUpSuccessPage from "./pages/SignUpSuccessPage";

function App() {
  const [del, setDel] = useState(); //on refresh, set del to null to remove acc removed banner
  const [curUser, setCurUser] = useState();
  const [loggedIn, setLoggedIn] = useState();

  //loading app useState to only return html after getCurUser finishes
  //to avoid having no curUser for signed in as: for a split second when app loads
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function getCurUser() {
      //every time app renders, get currently signed in user.
      await fetch("http://localhost:5000/curUser", {
        method: "GET",
        headers: { "Content-type": "application/json" },
      })
        .then((response) => response.json()) //gets res from express and parses it into JSON for React
        .then((responseJSON) => {
          console.log(responseJSON + " responseJSON");
          if (responseJSON == "none") {
            console.log("none");
            setLoggedIn(false);
            setLoading(false); //now that curUser and loggedIn are set, load app's HTML
            console.log(loggedIn + " false");
          } else {
            setCurUser(responseJSON);
            setLoggedIn(true);
            setLoading(false);
          }
          // })
          // .then(() => {
          //   if (curUser !== "") {
          //     // setLoading(false); //now that curUser and loggedIn are set, load app's HTML
          //     console.log(loggedIn + " true");
          //     console.log(curUser + " curUser");
          //   } else {
          //     setLoggedIn(false);
          //     // setLoading(false); //now that curUser and loggedIn are set, load app's HTML
          //     console.log(loggedIn + " false");
          //   }
        });
    }

    getCurUser();
  });

  if (isLoading) {
    return null;
  } else {
    return (
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <MainPage
                curUser={curUser}
                del={del}
                setDel={setDel}
                loggedIn={loggedIn}
              />
            }
          ></Route>
          <Route
            path="/Store"
            element={<StorePage curUser={curUser} loggedIn={loggedIn} />}
          ></Route>
          <Route
            path={`/Account/${curUser}`}
            element={
              <AccountPage
                curUser={curUser}
                del={del}
                setDel={setDel}
                loggedIn={loggedIn}
              />
            }
          ></Route>
          <Route
            path="/SignIn"
            element={<SignInPage curUser={curUser} loggedIn={loggedIn} />}
          ></Route>
          <Route
            path="/SignUp"
            element={<SignUpPage curUser={curUser} loggedIn={loggedIn} />}
          ></Route>
          <Route
            path="/SignUp/:username/Success"
            element={<SignUpSuccessPage />}
          ></Route>
        </Routes>
      </div>
    );
  }
}
export default App;
