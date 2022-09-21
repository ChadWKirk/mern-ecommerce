import React from "react";
import { FaCameraRetro } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

const SearchBar = () => {
  return (
    <div className="searchContainer">
      <input className="searchBar"></input>
      <Button className="searchButton"><FaCameraRetro  size={26} /></Button>
    </div>
  );
};

export default SearchBar;
