import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCameraRetro } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

const SearchBar = () => {
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

  return (
    <div>
      <form className="searchContainer" onSubmit={onSubmit}>
        <input className="searchBar" onChange={onChange}></input>
        <Button className="searchButton" type="submit">
          <FaCameraRetro size={26} className="searchIcon" />
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
