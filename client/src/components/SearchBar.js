import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

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
    </div>
  );
};

export default SearchBar;
