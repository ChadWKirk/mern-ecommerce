import { React, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = ({ curUser, loggedIn }) => {
  let soButton;
  let accButton;
  let siButton;
  let suButton;
  let uploadButton;

  //go to /search/whateverYouSearchFor when hitting enter or clicking search button
  var navigate = useNavigate();
  let inputValue;

  function onChange(event) {
    inputValue = event.target.value;
    console.log(inputValue);
  }

  function onSubmit() {
    navigate(`/search/${inputValue}/most-recent/all-types`);
  }

  const [isVisibleClass, setIsVisibleClass] = useState("gone");

  function setVisibleClassFunc() {
    if (isVisibleClass == "gone") {
      setIsVisibleClass("");
    } else {
      setIsVisibleClass("gone");
    }
  }

  const [hoverClass, setHoverClass] = useState(false);

  if (loggedIn) {
    accButton = (
      <div
        className="navbarDropCont"
        onMouseEnter={() =>
          setTimeout(() => {
            setHoverClass(!hoverClass);
          }, 200)
        }
        onMouseLeave={() =>
          setTimeout(() => {
            setHoverClass(!hoverClass);
          }, 200)
        }
      >
        <button
          className="navbarDropButton"
          onClick={() => setVisibleClassFunc()}
        >
          {curUser}
          <FontAwesomeIcon
            icon={faChevronDown}
            fontSize={10}
            style={{ marginLeft: "7px", marginBottom: "6px" }}
          />
        </button>
        <div className={hoverClass ? `navbarULCont` : `navbarULCont gone`}>
          <ul className="navbarUL">
            <li>
              <a href={`/Account/${curUser}/Likes/most-recent/all-types`}>
                Likes
              </a>
            </li>
            <li>
              <a href={`/Account/${curUser}/My-Pics/most-recent/all-types`}>
                My Pics
              </a>
            </li>
            <li>
              <a href={`/Account/${curUser}`}>User Settings</a>
            </li>
          </ul>
        </div>
      </div>
    );
    uploadButton = (
      <a href={`/${curUser}/upload`}>
        <button className="navbarClickThisButton">Upload</button>
      </a>
    );
    soButton = (
      <a href="/">
        <button className="navbarButton" onClick={signOut}>
          Sign Out
        </button>
      </a>
    );

    siButton = null;
    suButton = null;
  } else {
    accButton = null;
    soButton = null;
    siButton = (
      <a href="/SignIn" style={{ color: "black" }}>
        Sign In
      </a>
    );
    suButton = (
      <a href="/SignUp">
        <button className="navbarButton">Sign Up</button>
      </a>
    );
  }

  async function signOut() {
    await fetch("http://localhost:5000/SignOut", {
      method: "POST",
      headers: { "Content-type": "application/json" },
    });
  }

  return (
    <div className="navbar navbar__darken">
      <div>
        <a href="/" className="logo">
          <h1>PicPocket</h1>
        </a>
      </div>
      <form className="search__container" onSubmit={onSubmit}>
        <input
          className="search__bar"
          placeholder="Search for free photos"
          onChange={onChange}
        ></input>
        <button className="search__button" type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search__icon" />
        </button>
      </form>
      <div className="navbar__buttons">
        {siButton}
        {suButton}
        {accButton}

        {soButton}
        {uploadButton}
        {/* {cartButton} */}
      </div>
    </div>
  );
};

export default NavBar;
