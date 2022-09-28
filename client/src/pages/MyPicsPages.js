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
import { faTrashCan as farTrashCan } from "@fortawesome/free-regular-svg-icons";

const MyPicsPage = ({ curUser, loggedIn }) => {
  var myPicsArr;
  var myPicsMap = [];
  const [picsMapResults, setMapResults] = useState();

  useEffect(() => {
    async function myPicsFetch() {
      await fetch(`http://localhost:5000/${curUser}/my-pics`, {
        method: "GET",
        headers: { "Content-type": "application/json" },
      }).then((response) =>
        response.json().then((resJSON) => (myPicsArr = resJSON))
      );

      console.log(myPicsArr);

      setMapResults(
        myPicsArr.map((element) => {
          // let parts = element.public_id.split("/");  --SPLIT NOT WORKING DUE TO MESSED UP UPLOADS EARLIER. JUST NEED TO DELETE THEM
          // let result = parts[parts.length - 1];
          return (
            <a
              key={element.asset_id}
              // href={`/image/${result.replaceAll(" ", "-")}`}
            >
              <img
                src={element.secure_url}
                alt="img"
                className="gallery-img"
              ></img>
              <div className="image-overlay-container">
                <div className="image-overlay-contents-delete">
                  <FontAwesomeIcon
                    icon={farTrashCan}
                    className="deleteButton"
                  />
                </div>
              </div>
            </a>
          );
        })
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
        <div className="gallery">{picsMapResults}</div>
      </div>
    </div>
  );
};

export default MyPicsPage;
