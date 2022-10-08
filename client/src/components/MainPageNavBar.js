import { React, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { BsCartCheck } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const MainPageNavBar = ({ curUser, loggedIn }) => {
  let soButton;
  let accButton;
  let siButton;
  let suButton;
  let cartButton;
  let uploadButton;

  const [isVisibleClass, setIsVisibleClass] = useState("gone");

  function setVisibleClassFunc() {
    if (isVisibleClass == "gone") {
      setIsVisibleClass("");
    } else {
      setIsVisibleClass("gone");
    }
  }

  if (loggedIn) {
    accButton = (
      <div className="navbarDropCont">
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
        <div className={`navbarULCont`}>
          <ul className="navbarUL">
            <li>
              <a href={`/Account/${curUser}/Likes`}>Likes</a>
            </li>
            <li>
              <a href={`/Account/${curUser}/My-Pics`}>My Pics</a>
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
    cartButton = (
      <a href="/Cart">
        <Button className="navbar__cartBtn">
          <BsCartCheck size={36} className="navbar__cartIcon" />
          <div>Cart</div>
        </Button>
      </a>
    );
    siButton = null;
    suButton = null;
  } else {
    accButton = null;
    soButton = null;
    cartButton = null;
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
    <div className="navbar">
      <div>
        <a href="/" className="logo">
          <h1 className="logo__color-white">PicPocket</h1>
        </a>
      </div>
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

export default MainPageNavBar;
