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
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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
                  {/* <FontAwesomeIcon icon={faTrash} className="deleteButton" /> */}
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
    <div style={{ overflow: "hidden" }}>
      <div className="navContainer">
        <Logo />
        <SearchBar />
        <NavBar curUser={curUser} loggedIn={loggedIn} />
      </div>
      <DropDown />
      <div className="galleryMainContainer">
        <div className="galleryHeadingAndSortContainer">
          <div className="galleryHeading">
            <h2>My Pics</h2>
          </div>
          <div className="gallerySortBar d-flex">
            <DropdownButton className="galleryDropDownButton" title="Sort By">
              <Dropdown.Item className="galleryDropDownItem">
                Most Recent
              </Dropdown.Item>
              <Dropdown.Item>Oldest</Dropdown.Item>
              <Dropdown.Item>A - Z</Dropdown.Item>
              <Dropdown.Item>Z - A</Dropdown.Item>
              <Dropdown.Item>Likes Low-High</Dropdown.Item>
              <Dropdown.Item>Likes High-Low</Dropdown.Item>
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
        <div className="galleryAndEditorContainer">
          <div className="gallery">{picsMapResults}</div>
          <div className="galleryEditorContainer">
            <form className="uploadFormContainer">
              <div>
                <div className="uploadFormMinusButton ">
                  {/* when clicking remove button, clear all data from the form and conditionally un-render the form (revert back to original state) */}
                  <a className="removeUploadIcon">
                    <FontAwesomeIcon
                      className="removeUploadIconSVG"
                      fontSize={76}
                      icon={faTrash}
                    />
                  </a>
                </div>
                <div className="uploadFormDetailsContainer">
                  <div className="uploadFormDetailsSubContainer">
                    {/* don't allow anything but letters and numbers. no special characters */}
                    <div>Title</div>
                    <div>
                      <input
                      // value={title}
                      // onChange={(e) => setTitle(e.target.value)}
                      ></input>
                    </div>
                  </div>
                  <div className="uploadFormDetailsSubContainer">
                    {/* copy how cloudinary lets you add tags. maybe bootstrap */}
                    <div>Tags</div>
                    <div>
                      <input></input>
                    </div>
                  </div>
                  <div className="uploadFormDetailsSubContainer">
                    {/* have max length of 500 characters */}
                    <div>Description</div>
                    <div>
                      <input
                      // value={description}
                      // onChange={(e) => setDescription(e.target.value)}
                      ></input>
                    </div>
                  </div>
                  <div className="uploadFormDetailsSubContainer">
                    {/* when free download box is checked, clear price input and grey it out and set price to "Free Download" */}
                    <div>Price</div>
                    <div>
                      <input
                      // value={price}
                      // onChange={(e) => setPrice(e.target.value)}
                      ></input>
                      <input type="checkbox"></input>
                      <div>free download</div>
                    </div>
                  </div>
                  <div className="uploadFormDetailsSubContainer">
                    <div>Image type</div>
                    <div>
                      <input
                      // value={imageType}
                      // onChange={(e) => setImageType(e.target.value)}
                      ></input>
                    </div>
                  </div>
                </div>
                <button>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPicsPage;
