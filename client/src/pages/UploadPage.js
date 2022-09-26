import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import NavBar from "../components/NavBar";
import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";
import DropDown from "../components/DropDown";
import {
  IoMdAddCircle,
  IoIosRemoveCircle,
  IoMdRemoveCircleOutline,
} from "react-icons/io";

const UploadPage = ({ curUser, loggedIn }) => {
  var CLOUDINARY_UPLOAD_PRESET = "qpexpq57";
  var file;
  var newPic = { likes: 0, imageType: "", uploadedBy: curUser };

  const uploadFormListArray = [
    <div key={9}>
      <a className="addUploadIcon">
        <IoMdAddCircle size={76} onClick={addUpload} />
      </a>
    </div>,
  ];

  const [uploadFormList, setUploadFormList] = useState(uploadFormListArray);

  function onChangePic(e) {
    file = e.target.files[0];
    // console.log(file);
  }
  var newTitle;
  function onChangeTitle(e) {
    e.preventDefault();
    newTitle = e.target.value;
  }
  var newDescription;
  function onChangeDescription(e) {
    e.preventDefault();
    newDescription = e.target.value;
  }
  var newPrice;
  function onChangePrice(e) {
    e.preventDefault();
    newPrice = e.target.value;
  }

  let uploadForm = (
    <div key={Math.random(100)}>
      <form onSubmit={onSubmit}>
        <div className="uploadFormContainer">
          <div className="uploadFormMinusButton">
            {/* when clicking remove button, clear all data from the form and conditionally un-render the form (revert back to original state) */}
            <a className="removeUploadIcon">
              <IoIosRemoveCircle size={76} onClick={removeUpload} />
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

  async function onSubmit(e) {
    e.preventDefault();

    var formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", "picpocket");

    var uploadToMongoBody;

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
    uploadToMongoBody.likes = 0;
    uploadToMongoBody.uploadedBy = curUser;
    uploadToMongoBody.title = newTitle;
    uploadToMongoBody.description = newDescription;
    uploadToMongoBody.price = newPrice;
    await fetch("http://localhost:5000/upload", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(uploadToMongoBody),
    });
  }

  function addUpload() {
    console.log("add");
    console.log(uploadFormListArray);
    uploadFormListArray.unshift(uploadForm);
    setUploadFormList([...uploadFormListArray]);
    console.log(uploadFormListArray);
  }

  function removeUpload() {
    console.log("remove");
    //use splice and index of to find index of one to remove
    setUploadFormList(
      <div>
        <a className="addUploadIcon">
          <IoMdAddCircle size={76} onClick={addUpload} />
        </a>
      </div>
    );
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
        {/* when clicking plus button, conditionally render upload form and make new one to the right */}

        {/* when submitting form, get curUser value and send it as uploadedBy property of image */}
        <div className="uploadFormListContainer">{uploadFormList}</div>
      </div>
    </div>
  );
};

export default UploadPage;
