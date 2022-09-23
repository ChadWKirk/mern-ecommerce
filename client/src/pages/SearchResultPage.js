import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";
import DropDown from "../components/DropDown";
import { useParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const SearchResultPage = ({ curUser, loggedIn }) => {
  const { searchQuery } = useParams();
  var searchArr = [];
  var resultsArr = [];
  const [resultsMap, setResultsMap] = useState();

  useEffect(() => {
    async function searchFetch() {
      await fetch(`http://localhost:5000/search/${searchQuery}`, {
        method: "GET",
        headers: { "Content-type": "application/json" },
      }).then((response) =>
        response
          .json()
          .then((resJSON) => JSON.stringify(resJSON))
          .then((stringJSON) => JSON.parse(stringJSON))
          .then((parsedJSON) => (searchArr = parsedJSON))
      );

      for (var i = 0; i < searchArr.length; i++) {
        if (
          searchArr[i].tags.includes(searchQuery) ||
          searchArr[i].public_id.includes(searchQuery)
        ) {
          resultsArr.push(searchArr[i]);
        }
      }

      setResultsMap(
        resultsArr.map((element) => (
          <img
            key={element.public_id}
            src={element.secure_url}
            width={250}
            height={250}
            alt="img"
          ></img>
        ))
      );
    }
    searchFetch();
  }, []);

  return (
    <div>
      <div className="navContainer">
        <Logo />
        <SearchBar />
        <NavBar curUser={curUser} loggedIn={loggedIn} />
      </div>
      <DropDown />
      <div className="galleryContainer">
        <div className="galleryHeadingAndSortContainer">
          <div className="galleryHeading">
            <h1>{searchQuery} Royalty-free images</h1>
          </div>
          <div className="gallerySortBar d-flex">
            <DropdownButton className="galleryDropDownButton" title="Sort By">
              <Dropdown.Item className="galleryDropDownItem">
                Popular
              </Dropdown.Item>
              <Dropdown.Item>Ratings Low-High</Dropdown.Item>
              <Dropdown.Item>Ratings High-Low</Dropdown.Item>
              <Dropdown.Item>Price Low-High</Dropdown.Item>
              <Dropdown.Item>Price High-Low</Dropdown.Item>
            </DropdownButton>
            <DropdownButton className="dropDownButton" title="Image Type">
              <Dropdown.Item>All types</Dropdown.Item>
              <Dropdown.Item>Photo</Dropdown.Item>
              <Dropdown.Item>Vector</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
        <div className="galleryContainer">{resultsMap}</div>
      </div>
    </div>
  );
};

export default SearchResultPage;
