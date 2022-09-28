import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import NavBar from "../components/NavBar";
import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";
import DropDown from "../components/DropDown";
//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus as farSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";

const UploadPage = ({ curUser, loggedIn }) => {
  //cloudinary preset and file for formData
  var CLOUDINARY_UPLOAD_PRESET = "qpexpq57";
  var file;
  const [count, setCount] = useState(-1);
  //array of upload forms with Add button at the end to add or remove upload forms to
  const uploadFormListArray = [
    <div onClick={addUpload} key={9} className="addUploadIconContainer">
      <a className="addUploadIcon">
        <FontAwesomeIcon font-size={76} icon={farSquarePlus} />
      </a>
    </div>,
  ];

  //this is what gets rendered in the HTML
  const [uploadFormList, setUploadFormList] = useState(uploadFormListArray);

  //when pic is chosen
  function onChangePic(e) {
    file = e.target.files[0];
  }

  //when title input is changed
  var newTitle;
  function onChangeTitle(e) {
    e.preventDefault();
    newTitle = e.target.value;
  }

  //when description input is changed
  var newDescription;
  function onChangeDescription(e) {
    e.preventDefault();
    newDescription = e.target.value;
  }

  //when price input is changed
  var newPrice;
  function onChangePrice(e) {
    e.preventDefault();
    newPrice = e.target.value;
  }

  //upload form template
  let uploadForm = (
    <div key={Math.random(100)} formcount={count} className="uploadForm">
      <form onSubmit={onSubmit}>
        <div className="uploadFormContainer">
          <div className="uploadFormMinusButton ">
            {/* when clicking remove button, clear all data from the form and conditionally un-render the form (revert back to original state) */}
            <a className="removeUploadIcon">
              <FontAwesomeIcon
                onClick={(e) => removeUpload(e)}
                key={uploadFormListArray.length}
                font-size={76}
                icon={faCircleMinus}
              />
            </a>
          </div>
          <div className="uploadFormInput">
            {/* only take image files and only certain types of image files */}
            <input type="file" onChange={onChangePic}></input>
          </div>
          <div className="uploadFormDetailsContainer">
            <div className="uploadFormDetailsSubContainer">
              {/* don't allow anything but letters and numbers. no special characters */}
              <div>Title</div>
              <div>
                <input onChange={onChangeTitle}></input>
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
                <input onChange={onChangeDescription}></input>
              </div>
            </div>
            <div className="uploadFormDetailsSubContainer">
              {/* when free download box is checked, clear price input and grey it out and set price to "Free Download" */}
              <div>Price</div>
              <div>
                <input onChange={onChangePrice}></input>
                <input type="checkbox"></input>
                <div>free download</div>
              </div>
            </div>
            <div className="uploadFormDetailsSubContainer">
              <div>Image type</div>
              <div>
                <input></input>
              </div>
            </div>
          </div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );

  //when form is submitted
  async function onSubmit(e) {
    e.preventDefault();

    //to send in fetch
    var formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", "picpocket");

    var uploadToMongoBody;

    //send post request to cloudinary api upload endpoint url
    await fetch("https://api.cloudinary.com/v1_1/dtyg4ctfr/upload", {
      method: "POST",
      body: formData,
    })
      .then((result) =>
        result
          .json()
          .then(
            (resJSON) => (
              (uploadToMongoBody = resJSON), console.log(uploadToMongoBody)
            )
          )
      )
      .catch((err) => {
        console.log(err);
      });

    //add fields to fetch response to get ready to send to MongoDB
    uploadToMongoBody.likes = 0;
    uploadToMongoBody.uploadedBy = curUser;
    uploadToMongoBody.title = newTitle;
    uploadToMongoBody.description = newDescription;
    uploadToMongoBody.price = newPrice;

    //send to mongoDB
    await fetch("http://localhost:5000/upload", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(uploadToMongoBody),
    });
  }

  //when you click the plus icon
  function addUpload() {
    // uploadFormListArray.unshift(uploadForm);

    // setUploadFormList([...uploadFormListArray]);
    setCount(count, count + 1);
    console.log(uploadFormListArray);
    console.log(count);
  }

  //when you click the minus icon
  function removeUpload(e) {
    console.log(uploadFormListArray);
    delete uploadFormListArray[2]; //need to get index from click
    setUploadFormList([...uploadFormListArray]);
  }

  return (
    <div>
      <div className="navContainer">
        <Logo />
        <SearchBar />
        <NavBar curUser={curUser} loggedIn={loggedIn} />
      </div>
      <DropDown />
      <div className="uploadPageContainer">
        <div className="uploadPageTitle">Upload</div>
        <div className="uploadFormListContainer">{uploadFormList}</div>
      </div>
    </div>
  );
};

export default UploadPage;
