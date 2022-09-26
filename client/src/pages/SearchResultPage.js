import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";
import DropDown from "../components/DropDown";
import { useParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const SearchResultPage = ({ curUser, loggedIn }) => {
  const { searchQuery } = useParams();
  var searchArr = [];
  var resultsArr = [];
  const [likeButton, setLikeButton] = useState(farHeart);

  function likeFunction() {
    console.log("like");
    setLikeButton(faHeart);
  }
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
      //make everything lower case to allow case insensitive searching
      for (var i = 0; i < searchArr.length; i++) {
        if (
          searchArr[i].tags
            .toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          searchArr[i].public_id
            .toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        ) {
          resultsArr.push(searchArr[i]);
        }
      }
      //use split to get an array split by the /
      //only output the public_id after the last /. last index of array meaning length-1
      //replace all spaces with dashes
      setResultsMap(
        resultsArr.map((element) => {
          let parts = element.public_id.split("/");
          let result = parts[parts.length - 1];
          return (
            <a key={element.asset_id}>
              <img
                src={element.secure_url}
                alt="img"
                className="gallery-img"
              ></img>
              <div className="image-overlay-container">
                <div className="image-overlay-contents-like">
                  <FontAwesomeIcon
                    onClick={likeFunction()}
                    icon={likeButton}
                    className="likeButton"
                  />
                </div>
              </div>
            </a>
          );
        })
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
            <h2>{searchQuery} Royalty-free images</h2>
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
            <DropdownButton
              className="galleryDropDownButton"
              title="Image Type"
            >
              <Dropdown.Item>All types</Dropdown.Item>
              <Dropdown.Item>Photo</Dropdown.Item>
              <Dropdown.Item>Vector</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
        <div className="gallery">{resultsMap}</div>
      </div>
    </div>
  );
};

export default SearchResultPage;
