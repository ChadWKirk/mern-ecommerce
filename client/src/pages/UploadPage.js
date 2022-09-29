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
  //array of pics (to use for multi select input)
  const [picsArr, setPicsArr] = useState([]);

  const [count, setCount] = useState(0);
  //array of upload forms with Add button at the end to add or remove upload forms to

  const [uploadForms, setUploadForms] = useState([]);

  //when you click the plus icon
  function addUpload() {
    setCount((count) => count + 1);
    setUploadForms((uploadForms) => [...uploadForms, 0]);
  }

  function onMultiPic(e) {
    //for loop to inject picsArr with each file instead of FileList
    var newArr = [];
    for (var i = 0; i < e.target.files.length; i++) {
      newArr.push({ pic: e.target.files[i].name });
      console.log(e.target.files[i].name);
    }
    setUploadForms((uploadForms) => [...uploadForms, ...newArr]);
  }

  //when you click the minus icon
  function removeUpload(e) {
    var newArr = uploadForms.filter(
      (uploadForm) => uploadForm.idx != e.target.attributes[1].value
    );
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
            onMultiPic={(e) => onMultiPic(e)}
          />
          <AddUploadButton onClick={addUpload} />
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
