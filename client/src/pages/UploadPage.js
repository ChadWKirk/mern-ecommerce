import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import NavBar from "../components/NavBar";
import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";
import DropDown from "../components/DropDown";
import UploadForm from "../components/UploadForm";
import UploadForms from "../components/UploadForms";
import AddUploadButton from "../components/AddUploadButton";

const UploadPage = ({ curUser, loggedIn }) => {
  //cloudinary preset and file for formData
  var CLOUDINARY_UPLOAD_PRESET = "qpexpq57";
  var file;
  const [count, setCount] = useState(0);
  //array of upload forms with Add button at the end to add or remove upload forms to
  var uploadFormListArray = [];

  const [uploadForms, setUploadForms] = useState([]);

  //when form is submitted
  // async function onSubmit(e) {
  //   e.preventDefault();
  //   console.log("submit");

  //   //to send in fetch
  //   var formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  //   formData.append("folder", "picpocket");

  //   var uploadToMongoBody;

  //   //send post request to cloudinary api upload endpoint url
  //   await fetch("https://api.cloudinary.com/v1_1/dtyg4ctfr/upload", {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((result) =>
  //       result
  //         .json()
  //         .then(
  //           (resJSON) => (
  //             (uploadToMongoBody = resJSON), console.log(uploadToMongoBody)
  //           )
  //         )
  //     )
  //     .catch((err) => {
  //       console.log(err);
  //     });

  //   //add fields to fetch response to get ready to send to MongoDB
  //   uploadToMongoBody.likes = 0;
  //   uploadToMongoBody.uploadedBy = curUser;
  //   uploadToMongoBody.title = UploadForm.title;
  //   uploadToMongoBody.description = UploadForm.description;
  //   uploadToMongoBody.price = UploadForm.price;

  //   //send to mongoDB
  //   await fetch("http://localhost:5000/upload", {
  //     method: "POST",
  //     headers: { "Content-type": "application/json" },
  //     body: JSON.stringify(uploadToMongoBody),
  //   });
  // }

  //when you click the plus icon
  function addUpload() {
    setCount((count) => count + 1);
    setUploadForms((uploadForms) => [...uploadForms, { idx: count }]);
  }

  //when you click the minus icon
  function removeUpload(e) {
    // console.log(e.target.attributes[1].value);
    console.log(uploadForms);
    var newArr = uploadForms.filter(
      (uploadForm) => uploadForm.idx != e.target.attributes[1].value
    );
    console.log(newArr);
    setUploadForms(newArr);
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
        <div className="uploadFormListContainer">
          <UploadForms
            curUser={curUser}
            // onSubmit={(e) => onSubmit(e)}
            uploadForms={uploadForms}
            onClick={(e) => removeUpload(e)}
          />
          <AddUploadButton onClick={addUpload} />
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
