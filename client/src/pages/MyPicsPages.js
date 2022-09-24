import React from "react";
import NavBar from "../components/NavBar";
import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";
import DropDown from "../components/DropDown";
import CloudinaryUploadWidget from "../components/CloudinaryUploadWidget";

const MyPicsPage = ({ curUser, loggedIn }) => {
  return (
    <div>
      <div className="navContainer">
        <Logo />
        <SearchBar />
        <NavBar curUser={curUser} loggedIn={loggedIn} />
      </div>
      <DropDown />
      <h1>My Pics</h1>
      <CloudinaryUploadWidget />
    </div>
  );
};

export default MyPicsPage;
