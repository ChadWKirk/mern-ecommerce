import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import DropDown from "../components/DropDown";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const LikesPage = ({ curUser, loggedIn }) => {
  var likesArr = [];
  var resultsArr = [];
  const [resultsMap, setResultsMap] = useState();

  useEffect(() => {
    async function searchFetch() {
      await fetch(`http://localhost:5000/${curUser}/likes`, {
        method: "GET",
        headers: { "Content-type": "application/json" },
      }).then((response) =>
        response
          .json()
          .then((resJSON) => JSON.stringify(resJSON))
          .then((stringJSON) => JSON.parse(stringJSON))
          .then((parsedJSON) => (likesArr = parsedJSON))
      );
      console.log(likesArr);
      // //make everything lower case to allow case insensitive searching
      // for (var i = 0; i < likesArr.length; i++) {
      //   if (
      //     likesArr[i].tags
      //       .toString()
      //       .toLowerCase()
      //       .includes(searchQuery.toLowerCase()) ||
      //     likesArr[i].public_id
      //       .toString()
      //       .toLowerCase()
      //       .includes(searchQuery.toLowerCase())
      //   ) {
      //     resultsArr.push(likesArr[i]);
      //   }
      // }
      //use split to get an array split by the /
      //only output the public_id after the last /. last index of array meaning length-1
      //replace all spaces with dashes
      setResultsMap(
        likesArr.map((element, index) => {
          let parts = element.public_id.split("/");
          let result = parts[parts.length - 1];

          return (
            <div key={index} className="mainPage__randomGallery-div">
              <a href={`/image/${result.replaceAll(" ", "-")}`}>
                <img
                  src={element.secure_url}
                  className="mainPage__randomGallery-img"
                ></img>
              </a>
            </div>
          );
        })
      );
    }
    searchFetch();
  }, []);

  return (
    <div>
      <NavBar curUser={curUser} loggedIn={loggedIn} />
      {/* <DropDown /> */}
      <div className="galleryContainer">
        <div className="galleryHeadingAndSortContainer">
          <div className="galleryHeading">
            <h2>Your Likes</h2>
            <p>x images and x videos liked by curUser link</p>
          </div>
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
          <DropdownButton className="galleryDropDownButton" title="Image Type">
            <Dropdown.Item>All types</Dropdown.Item>
            <Dropdown.Item>Photo</Dropdown.Item>
            <Dropdown.Item>Vector</Dropdown.Item>
          </DropdownButton>
        </div>
        <div
          className="mainPage__randomGallery-gallery"
          style={{ marginLeft: "1rem", marginRight: "1rem" }}
        >
          {resultsMap}
        </div>
      </div>
    </div>
  );
};

export default LikesPage;
