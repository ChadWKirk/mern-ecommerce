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
  var picsPushArr = [];
  const [myPicsArr, setMyPicsArr] = useState([]);
  var myPicsMap = [];
  const [picsMapResults, setMapResults] = useState();

  const [picture, setPicture] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [price, setPrice] = useState("");
  const [imageType, setImageType] = useState("");

  useEffect(() => {
    async function myPicsFetch() {
      await fetch(`http://localhost:5000/${curUser}/my-pics`, {
        method: "GET",
        headers: { "Content-type": "application/json" },
      }).then((response) =>
        response.json().then((resJSON) => (picsPushArr = resJSON))
      );

      setMyPicsArr(picsPushArr);
      console.log(picsPushArr);

      setMapResults(
        picsPushArr.map((element, index) => {
          // let parts = element.public_id.split("/");  --SPLIT NOT WORKING DUE TO MESSED UP UPLOADS EARLIER. JUST NEED TO DELETE THEM
          // let result = parts[parts.length - 1];
          let assetId = element.asset_id;
          return (
            <a
              key={element.asset_id}
              onClick={(e) => {
                document.querySelector("#titleInputID").value =
                  picsPushArr[index].title;
                document.querySelector("#tagsInputID").value =
                  picsPushArr[index].tags;
                document.querySelector("#descriptionInputID").value =
                  picsPushArr[index].description;
                document.querySelector("#priceInputID").value =
                  picsPushArr[index].price;
                document.querySelector("#imageTypeInputID").value =
                  picsPushArr[index].imageType;
                document.querySelector("#previewImageForEditor").src =
                  picsPushArr[index].secure_url;
                // e.currentTarget.classList.toggle("border");
              }}
              // href={`/image/${result.replaceAll(" ", "-")}`}
            >
              <img
                src={element.secure_url}
                alt="img"
                className="myPicsGallery-img"
              ></img>
              <div className="image-overlay-container"></div>
            </a>
          );
        })
      );
    }
    myPicsFetch();
  }, []);

  async function submitForm(e) {
    e.preventDefault();
    myPicsArr[7].title = title;
    myPicsArr[7].description = description;
    myPicsArr[7].price = price;
    console.log("submit attempt");
    await fetch(`http://localhost:5000/update/${curUser}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(myPicsArr[7]),
    });
  }

  return (
    <div style={{ overflow: "hidden" }}>
      <NavBar curUser={curUser} loggedIn={loggedIn} />
      {/* <DropDown /> */}
      <div className="myPicsGalleryMainContainer">
        <div className="galleryHeadingAndSortContainer">
          <div className="galleryHeading">
            <p>My Pics</p>
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
        <div className="myPicsGalleryAndEditorContainer">
          <div className="myPicsGallery">{picsMapResults}</div>
          <div className="myPicsGalleryEditorContainer">
            <form
              className="editorFormContainer"
              onSubmit={(e) => submitForm(e)}
            >
              <div>
                <img id="previewImageForEditor" alt="idk" src={""}></img>
                <div className="editorFormDetailsContainer">
                  <div className="editorFormDetailsSubContainer">
                    {/* don't allow anything but letters and numbers. no special characters */}
                    <div>Title</div>
                    <div>
                      <input
                        id="titleInputID"
                        onChange={(e) => setTitle(e.target.value)}
                      ></input>
                    </div>
                  </div>
                  <div className="editorFormDetailsSubContainer">
                    {/* copy how cloudinary lets you add tags. maybe bootstrap */}
                    <div>Tags</div>
                    <div>
                      <input id="tagsInputID"></input>
                    </div>
                  </div>
                  <div className="editorFormDetailsSubContainer">
                    {/* have max length of 500 characters */}
                    <div>Description</div>
                    <div>
                      <input
                        id="descriptionInputID"
                        onChange={(e) => setDescription(e.target.value)}
                      ></input>
                    </div>
                  </div>
                  <div className="editorFormDetailsSubContainer">
                    {/* when free download box is checked, clear price input and grey it out and set price to "Free Download" */}
                    <div>Price</div>
                    <div className="editorFormDetailsSubContainer">
                      <input
                        id="priceInputID"
                        onChange={(e) => setPrice(e.target.value)}
                      ></input>
                      <input type="checkbox"></input>
                      <div>free download</div>
                    </div>
                  </div>
                  <div className="editorFormDetailsSubContainer">
                    <div>Image type</div>
                    <div>
                      <input
                        id="imageTypeInputID"
                        onChange={(e) => setImageType(e.target.value)}
                      ></input>
                    </div>
                  </div>
                </div>
                <button>Submit</button>
                <FontAwesomeIcon icon={faTrash} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPicsPage;
