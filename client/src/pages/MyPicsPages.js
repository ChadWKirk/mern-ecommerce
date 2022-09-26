import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";
import DropDown from "../components/DropDown";
import { useParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const MyPicsPage = ({ curUser, loggedIn }) => {
  const { searchQuery } = useParams();
  var searchArr = [];
  var resultsArr = [];
  const [resultsMap, setResultsMap] = useState();

  useEffect(() => {
    async function myPicsFetch() {
      await fetch(`http://localhost:5000/${curUser}/my-pics`, {
        method: "GET",
        headers: { "Content-type": "application/json" },
      }).then((response) =>
        response.json().then((resJSON) => console.log(resJSON))
      );
    }
    myPicsFetch();
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
            <h2>My Pics</h2>
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

export default MyPicsPage;
