import React, { useEffect, useState } from "react";
import WhiteNavBar from "../../components/WhiteNavBar";
import Logo from "../../components/Logo";
import SearchBar from "../../components/SearchBar";
import DropDown from "../../components/DropDown";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const MyPicsPage = ({ curUser, loggedIn }) => {
  let navigate = useNavigate();

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

  const [sort, setSort] = useState("most-recent");
  const [filter, setFilter] = useState("all-types");

  const [sortTitle, setSortTitle] = useState("Most Recent");
  const [filterTitle, setFilterTitle] = useState("All Types");

  function navToSortAndFilter() {
    navigate(`/Account/${curUser}/My-Pics/${sort}/${filter}`);
  }

  useEffect(() => {
    navigate(`/Account/${curUser}/My-Pics/${sort}/${filter}`);

    async function myPicsFetch() {
      await fetch(`http://localhost:5000/${curUser}/${sort}/${filter}`, {
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
                document.querySelector("#imageTypeInputID").value =
                  picsPushArr[index].imageType;
                document.querySelector("#previewImageForEditor").src =
                  picsPushArr[index].secure_url;
                // e.currentTarget.classList.toggle("border");
              }}
              // href={`/image/${result.replaceAll(" ", "-")}`}
            >
              <input
                type="checkbox"
                id={`checkbox${index}`}
                className="checkbox"
              />
              <label for={`checkbox${index}`} style={{ cursor: "pointer" }}>
                <img
                  src={element.secure_url}
                  alt="img"
                  className="myPicsGallery-img"
                ></img>
                <p className="myPicsGallery__img-title">
                  {picsPushArr[index].title}
                </p>
              </label>
              <div className="myPicsGallery__imageOverlay-container"></div>
            </a>
          );
        })
      );
    }
    myPicsFetch();
  }, [sort, filter]);

  async function submitForm(e) {
    e.preventDefault();
    // myPicsArr[7].title = title;
    // myPicsArr[7].description = description;
    // myPicsArr[7].price = price;
    // console.log("submit attempt");
    // await fetch(`http://localhost:5000/update/${curUser}`, {
    //   method: "PUT",
    //   headers: { "Content-type": "application/json" },
    //   body: JSON.stringify(myPicsArr[7]),
    // });
  }

  return (
    <div style={{ overflow: "hidden" }}>
      <WhiteNavBar curUser={curUser} loggedIn={loggedIn} />
      {/* <DropDown /> */}
      <div className="myPicsGalleryMainContainer">
        <div className="galleryHeadingAndSortContainer">
          <div className="galleryHeading">
            <h2>Your Pics</h2>
            <p>x images and x videos uploaded by curUser link</p>
          </div>
        </div>
      </div>
      <div className="myPicsGalleryAndEditorContainer">
        <div>
          <div className="myPicsGallerySortBar d-flex">
            <DropdownButton
              className="galleryDropDownButton"
              title={`${sortTitle}`}
            >
              <Dropdown.Item
                className="galleryDropDownItem"
                onClick={() => {
                  setSort("most-recent");
                  setSortTitle("Most Recent");
                }}
              >
                Most Recent
              </Dropdown.Item>
              <Dropdown.Item
                className="galleryDropDownItem"
                onClick={() => {
                  setSort("oldest");
                  setSortTitle("Oldest");
                }}
              >
                Oldest
              </Dropdown.Item>
              <Dropdown.Item
                className="galleryDropDownItem"
                onClick={() => {
                  setSort("aToz");
                  setSortTitle("A - Z");
                }}
              >
                A - Z
              </Dropdown.Item>
              <Dropdown.Item
                className="galleryDropDownItem"
                onClick={() => {
                  setSort("zToa");
                  setSortTitle("Z - A");
                }}
              >
                Z - A
              </Dropdown.Item>
              <Dropdown.Item
                className="galleryDropDownItem"
                onClick={() => {
                  setSort("leastLikes");
                  setSortTitle("Least Popular");
                }}
              >
                Least Popular
              </Dropdown.Item>
              <Dropdown.Item
                className="galleryDropDownItem"
                onClick={() => {
                  setSort("mostLikes");
                  setSortTitle("Popular");
                }}
              >
                Popular
              </Dropdown.Item>
            </DropdownButton>
            <DropdownButton
              className="galleryDropDownButton"
              title={`${filterTitle}`}
            >
              <Dropdown.Item
                className="galleryDropDownItem"
                onClick={() => {
                  setFilter("all-types");
                  setFilterTitle("All Types");
                }}
              >
                All types
              </Dropdown.Item>
              <Dropdown.Item
                className="galleryDropDownItem"
                onClick={() => {
                  setFilter("photo");
                  setFilterTitle("Photo");
                }}
              >
                Photo
              </Dropdown.Item>
              <Dropdown.Item
                className="galleryDropDownItem"
                onClick={() => {
                  setFilter("illustration");
                  setFilterTitle("Illustration");
                }}
              >
                Illustration
              </Dropdown.Item>
            </DropdownButton>
          </div>
          <div className="myPicsGallery">{picsMapResults}</div>
        </div>

        <div className="myPicsGalleryEditorContainer">
          <form className="editorFormContainer" onSubmit={(e) => submitForm(e)}>
            <div>
              <img id="previewImageForEditor" src={""}></img>
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
  );
};

export default MyPicsPage;
