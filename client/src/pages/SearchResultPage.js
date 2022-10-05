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
  const [liked, setLiked] = useState(false);

  // useEffect(() => {
  //   console.log(resultsMap);
  // }, [liked]);

  function likeFunction(e, key, url) {
    setLiked((liked) => !liked);
    // console.log(key);
    console.log(url);
    // resultsMap[key] = 90;
    console.log(resultsMap[key]);
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
      var count = -1;
      //use split to get an array split by the /
      //only output the public_id after the last /. last index of array meaning length-1
      //replace all spaces with dashes
      setResultsMap(
        resultsArr.map((element, key) => {
          let parts = element.public_id.split("/");
          let result = parts[parts.length - 1];
          count = count + 1;
          return (
            <a key={count}>
              <img
                src={element.secure_url}
                alt="img"
                className="gallery-img"
              ></img>
              <div className="image-overlay-container">
                <div className="image-overlay-contents-like">
                  <FontAwesomeIcon
                    onClick={(e) => likeFunction(e, key)}
                    key={count + 1}
                    icon={liked ? faHeart : farHeart}
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
  }, [liked]);

  return (
    <div>
      <div className="navContainer">
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
