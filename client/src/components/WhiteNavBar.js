import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { BsCartCheck } from "react-icons/bs";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const WhiteNavBar = ({ curUser, loggedIn }) => {
  let soButton;
  let accButton;
  let siButton;
  let suButton;
  let cartButton;
  let uploadButton;

  //go to /search/whateverYouSearchFor when hitting enter or clicking search button
  var navigate = useNavigate();
  let inputValue;

  function onChange(event) {
    inputValue = event.target.value;
    console.log(inputValue);
  }

  function onSubmit() {
    navigate(`/search/${inputValue}`);
  }

  if (loggedIn) {
    accButton = (
      <DropdownButton title={curUser}>
        <Dropdown.Item href={`/Account/${curUser}/Likes`}>Likes</Dropdown.Item>
        <Dropdown.Item href={`/Account/${curUser}/My-Pics`}>
          My Pics
        </Dropdown.Item>
        <Dropdown.Item href={`/Account/${curUser}`}>
          User Settings
        </Dropdown.Item>
      </DropdownButton>
    );
    uploadButton = (
      <a href={`/${curUser}/upload`}>
        <Button>Upload</Button>
      </a>
    );
    soButton = (
      <a href="/">
        <Button onClick={signOut}>Sign Out</Button>
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
        <Button>Sign Up</Button>
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
    <div className="navbar navbar__white">
      <div>
        <a href="/" className="logo" style={{ color: "black" }}>
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
        {uploadButton}
        {soButton}
        {/* {cartButton} */}
      </div>
    </div>
  );
};

export default WhiteNavBar;
