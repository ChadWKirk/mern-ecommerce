import React, { useEffect, useState, useRef } from "react";
import WhiteNavBar from "../../components/WhiteNavBar";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const MyPicsPage = ({ curUser, loggedIn }) => {
  let navigate = useNavigate();

  //image array to display in the HTML
  const [myPicsArr, setMyPicsArr] = useState([]);
  //array to fetch images to
  const [fetchArr, setFetchArr] = useState([]);
  //put mapped over fetchArr in here
  var mapArr;
  //put true or false values in here for individual checkboxes
  var checkboxArr = [];
  //checkbox state
  const [checkboxState, setCheckboxState] = useState(checkboxArr);
  //Editor array for mass delete / mass download
  var massArr = useRef([]);
  //to reset array to see checkbox result
  const [tf, setTf] = useState(false);
  //to do select/deselect all
  var selectAll = useRef(false);

  const [selectAllState, setSelectAllState] = useState(false);

  //values to set editor form fields to
  const [picture, setPicture] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [imageType, setImageType] = useState("");

  //sort and filter values to do get requests
  const [sort, setSort] = useState("most-recent");
  const [filter, setFilter] = useState("all-types");
  //sort and filter values to change the titles of the dropdown menus
  const [sortTitle, setSortTitle] = useState("Most Recent");
  const [filterTitle, setFilterTitle] = useState("All Types");

  //change this state when deleting or downloading
  const [delOrDownFunc, setDelOrDownFunc] = useState(false);

  //get images
  useEffect(() => {
    console.log("run");
    //reset massArr when changing sort/filter
    massArr.current = [];
    displayEditorInfo();

    //reset select all when changing sort/filter
    selectAll.current = false;
    setSelectAllState(false);

    navigate(`/Account/${curUser}/My-Pics/${sort}/${filter}`);

    async function myPicsFetch() {
      await fetch(`http://localhost:5000/${curUser}/${sort}/${filter}`, {
        method: "GET",
        headers: { "Content-type": "application/json" },
      }).then((response) =>
        response.json().then((resJSON) => setFetchArr(resJSON))
      );
    }
    myPicsFetch();
    for (var k = 0; k < fetchArr.length; k++) {
      checkboxArr[k] = false;
    }
    setCheckboxState(checkboxArr);
  }, [sort, filter, delOrDownFunc]);

  function handleCheck(position) {
    var boxes = [...checkboxState];
    for (var t = 0; t < fetchArr.length; t++) {
      if (t === position) {
        boxes[t] = true;
      } else {
        boxes[t] = false;
      }
    }

    setCheckboxState(boxes);
  }

  //handle push / filter massArr when clicking checkbox (for mass download/delete)
  //if it is already in massArr, remove it from massArr. If it is not, push it to massArr.
  //(mimics check / uncheck behavior on screen)
  function handleMassArrCheck(element, index) {
    if (massArr.current.indexOf(element) >= 0) {
      massArr.current = massArr.current.filter((item) => {
        return item !== element;
      });
      console.log("pull");
    } else if (massArr.current.indexOf(element.asset_id) == -1) {
      massArr.current.push(element);
      console.log("push");
    }
    console.log(massArr.current);
  }

  //handle push / filter massArr when clicking label (for mass download/delete)
  //clears massArr and puts only the selected img in the massArr (mimics check/uncheck behavior on screen)
  function handleMassArrLabel(element, index) {
    massArr.current = [];
    massArr.current.push(element);
    console.log(massArr.current);
  }

  //set editor info
  function displayEditorInfo() {
    if (massArr.current.length > 0) {
      document.querySelector("#titleInputID").value = massArr.current[0].title;
      setTitle(massArr.current[0].title);
      document.querySelector("#tagsInputID").value = massArr.current[0].tags;
      setTags(massArr.current[0].tags);
      document.querySelector("#descriptionInputID").value =
        massArr.current[0].description;
      setDescription(massArr.current[0].description);
      document.querySelector("#imageTypeInputID").value =
        massArr.current[0].imageType;
      setImageType(massArr.current[0].imageType);
      document.querySelector("#previewImageForEditor").src =
        massArr.current[0].secure_url.slice(0, 50) +
        "q_60/c_scale,w_600/dpr_auto/" +
        massArr.current[0].secure_url.slice(
          50,
          massArr.current[0].secure_url.lastIndexOf(".")
        ) +
        ".jpg";
    } else {
      document.querySelector("#titleInputID").value = null;
      document.querySelector("#tagsInputID").value = null;
      document.querySelector("#descriptionInputID").value = null;
      document.querySelector("#imageTypeInputID").value = null;
      document.querySelector("#previewImageForEditor").src = null;
    }
  }

  //create inputs
  useEffect(() => {
    mapArr = fetchArr.map((element, index) => {
      // let parts = element.public_id.split("/");  --SPLIT NOT WORKING DUE TO MESSED UP UPLOADS EARLIER. JUST NEED TO DELETE THEM
      // let result = parts[parts.length - 1];
      let assetId = element.asset_id;
      var checkbox;

      if (checkboxState[index]) {
        checkbox = (
          <input
            type="checkbox"
            checked={checkboxState[index]}
            onChange={() => {
              let boxes = [...checkboxState];
              let box = checkboxState[index];
              box = false;
              boxes[index] = box;
              handleMassArrCheck(element, index);
              setCheckboxState(boxes);
              displayEditorInfo();
            }}
            id={`checkbox${index}`}
            className="checkbox"
          />
        );
      } else {
        checkbox = (
          <input
            type="checkbox"
            checked={checkboxState[index]}
            onChange={() => {
              let boxes = [...checkboxState];
              let box = checkboxState[index];
              box = true;
              boxes[index] = box;
              handleMassArrCheck(element, index);
              setCheckboxState(boxes);
              displayEditorInfo();
            }}
            id={`checkbox${index}`}
            className="checkbox"
          />
        );
      }

      return (
        <div
          className={`${
            checkboxState[index] ? "myPicsDiv border" : "myPicsDiv"
          }`}
          key={element.asset_id}
          onClick={(e) => {
            displayEditorInfo();

            // e.currentTarget.classList = "border";
          }}
          // href={`/image/${result.replaceAll(" ", "-")}`}
        >
          {checkbox}
          <label
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleCheck(index);
              handleMassArrLabel(element, index);
            }}
          >
            <img
              src={
                element.secure_url.slice(0, 50) +
                "q_60/c_scale,w_600/dpr_auto/" +
                element.secure_url.slice(
                  50,
                  element.secure_url.lastIndexOf(".")
                ) +
                ".jpg"
              } //how the images come in. uses slice to input quality into url and change everything to jpg
              alt="img"
              className="myPicsGallery-img"
            ></img>
            <p className="myPicsGallery__img-title">{fetchArr[index].title}</p>
          </label>
          <div className="myPicsGallery__imageOverlay-container"></div>
        </div>
      );
    });
    setMyPicsArr(mapArr);
  }, [fetchArr, sort, filter, tf, checkboxState]);

  async function submitForm(e) {
    e.preventDefault();

    massArr.current[0].title = title;
    massArr.current[0].description = description;
    massArr.current[0].tags = tags;
    massArr.current[0].imageType = imageType;
    console.log("submit attempt");
    await fetch(`http://localhost:5000/update/${curUser}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(massArr.current[0]),
    }).then((res) => setDelOrDownFunc(!delOrDownFunc));
  }

  async function deleteImageFromBackEnd() {
    var publicIdArr = [];
    for (var p = 0; p < massArr.current.length + 1; p++) {
      // publicIdArr.push(massArr.current[p].public_id);

      // console.log(publicIdArr);

      //cloudinary admin api for bulk delete. going to use this once site is hosted due
      //to cors stuff with api
      // await fetch(
      //   "https://api.cloudinary.com/v1_1/dtyg4ctfr/resources/image/upload",
      //   { method: "DELETE" }
      // );

      await fetch(`http://localhost:5000/deleteImage/`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ public_id: massArr.current[p].public_id }),
      })
        .then((res) => setDelOrDownFunc(!delOrDownFunc))
        .catch((err) => console.error(err));
    }
  }

  let massButtons;

  const [hoverClassDel, setHoverClassDel] = useState(false);
  const [hoverClassDown, setHoverClassDown] = useState(false);

  if (massArr.current.length > 0) {
    massButtons = (
      <div className="myPicsGallerySortBar-rightContainer">
        <div style={{ position: "relative" }}>
          <FontAwesomeIcon
            icon={faTrash}
            className="massIcon"
            onClick={(e) => deleteImageFromBackEnd(e)}
            onMouseEnter={() => {
              setTimeout(() => {
                setHoverClassDel(true);
              }, 0);
            }}
            onMouseLeave={() => {
              setTimeout(() => {
                setHoverClassDel(false);
              }, 100);
            }}
          />
          <div className={`${hoverClassDel ? "massIconText" : "gone"}`}>
            Delete Selected
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <FontAwesomeIcon
            icon={faDownload}
            className="massIcon"
            onMouseEnter={() => {
              setTimeout(() => {
                setHoverClassDown(true);
              }, 0);
            }}
            onMouseLeave={() => {
              setTimeout(() => {
                setHoverClassDown(false);
              }, 100);
            }}
          />
          <div className={`${hoverClassDown ? "massIconText" : "gone"}`}>
            Download Selected
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ overflow: "hidden" }}>
      <WhiteNavBar curUser={curUser} loggedIn={loggedIn} />
      {/* <DropDown /> */}
      <div className="myPicsGalleryMainContainer">
        <div className="galleryHeadingAndSortContainer">
          <div className="galleryHeading">
            <h2>Your Pics</h2>
            <p>
              {fetchArr.length} images uploaded by {curUser}
              {/* <a href={`"/Account/${curUser}"`}>{curUser}</a> */}
            </p>
          </div>
        </div>
      </div>
      <div className="myPicsGalleryAndEditorContainer">
        <div>
          <div className="myPicsGallerySortBar">
            <div className="myPicsGallerySortBar-leftContainer">
              <input
                type="checkbox"
                checked={selectAllState}
                onClick={() => setSelectAllState(!selectAllState)}
                onChange={() => {
                  let boxes = [...checkboxState];
                  let massCopy = [...massArr.current];
                  console.log(selectAll.current);
                  if (selectAll.current == false) {
                    for (var r = 0; r < fetchArr.length; r++) {
                      boxes[r] = true;
                      massCopy.push(fetchArr[r]);
                    }
                    selectAll.current = true;
                  } else if (selectAll.current == true) {
                    for (var r = 0; r < fetchArr.length; r++) {
                      boxes[r] = false;
                      massCopy = [];
                    }
                    selectAll.current = false;
                    console.log("deselect");
                  }

                  setCheckboxState(boxes);
                  massArr.current = massCopy;
                  // let box = checkboxState[index];
                  // box = false;
                  // boxes[index] = box;
                  // handleMassArrCheck(element, index);

                  // displayEditorInfo();
                }}
                className="checkboxSelectAll"
              />
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
                    setFilter("Photo");
                    setFilterTitle("Photo");
                  }}
                >
                  Photo
                </Dropdown.Item>
                <Dropdown.Item
                  className="galleryDropDownItem"
                  onClick={() => {
                    setFilter("Illustration");
                    setFilterTitle("Illustration");
                  }}
                >
                  Illustration
                </Dropdown.Item>
              </DropdownButton>
            </div>

            {massButtons}
          </div>
          <div className="myPicsGallery">{myPicsArr}</div>
        </div>

        <div className="myPicsGalleryEditorContainer">
          <div
            className={`${massArr.current.length != 1 ? "previewDiv" : "gone"}`}
          >
            <FontAwesomeIcon icon={faEye} className="eyeIcon" />
            <p>Select a single image to edit it here.</p>
          </div>
          <form
            className={`${
              massArr.current.length == 1 ? "editorFormContainer" : "gone"
            }`}
            onSubmit={(e) => submitForm(e)}
          >
            <div>
              <div style={{ fontSize: "0.75rem" }}>
                Title{" "}
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "red",
                    display: "inline",
                  }}
                >
                  *
                </p>
              </div>
              <div>
                <input
                  id="titleInputID"
                  className="editorFormDetailsSubContainerInput"
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              </div>
              <img id="previewImageForEditor" src={""}></img>
              <div className="editorFormDetailsContainer">
                <div className="editorFormDetailsSubContainer">
                  {/* don't allow anything but letters and numbers. no special characters */}
                </div>
                <div className="editorFormDetailsSubContainer">
                  {/* copy how cloudinary lets you add tags. maybe bootstrap */}
                  <div style={{ fontSize: "0.75rem" }}>
                    Tags (Separate with commas. Ex: tag, tags)
                  </div>
                  <div>
                    <input
                      id="tagsInputID"
                      onChange={(e) => setTags(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="editorFormDetailsSubContainer">
                  {/* have max length of 500 characters */}
                  <div style={{ fontSize: "0.75rem" }}>Description</div>
                  <div>
                    <textarea
                      id="descriptionInputID"
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="editorFormDetailsSubContainer">
                  <div style={{ fontSize: "0.75rem" }}>Image type</div>
                  <div>
                    <select
                      id="imageTypeInputID"
                      onChange={(e) => setImageType(e.target.value)}
                    >
                      <option value="Photo">Photo</option>
                      <option value="Illustration">Illustration</option>
                    </select>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.7rem",
                  marginTop: "1.85rem",
                }}
              >
                <button
                  style={{
                    fontSize: "0.85em",
                    backgroundColor: "rgb(250, 250, 250)",
                    padding: "0.25rem",
                    paddingLeft: "0.75rem",
                    paddingRight: "0.75rem",
                    border: "1px solid lightgrey",
                    borderRadius: "2px",
                  }}
                >
                  Submit
                </button>
                <button
                  style={{
                    fontSize: "0.85rem",
                    backgroundColor: "rgb(250, 250, 250)",
                    padding: "0.25rem",
                    paddingLeft: "0.75rem",
                    paddingRight: "0.75rem",
                    border: "1px solid lightgrey",
                    borderRadius: "2px",
                  }}
                >
                  <FontAwesomeIcon icon={faDownload} />
                </button>
                <button
                  type="button"
                  onClick={(e) => deleteImageFromBackEnd(e)}
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{
                      fontSize: "0.8rem",
                      backgroundColor: "rgb(250, 250, 250)",
                      padding: "0.5rem",
                      paddingLeft: "0.87rem",
                      paddingRight: "0.87rem",
                      border: "1px solid lightgrey",
                      borderRadius: "2px",
                      marginTop: "4px",
                    }}
                  />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyPicsPage;
