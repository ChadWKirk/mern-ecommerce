import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";
import DropDown from "../components/DropDown";
import UploadForm from "../components/UploadForm";
import FileList from "../components/FileList";

const UploadPage = ({ curUser, loggedIn }) => {
  const [imagesToUpload, setImagesToUpload] = useState([]);

  function removeImageFromUploadFrontEnd(imageName) {
    setImagesToUpload(
      imagesToUpload.filter((image) => image.name !== imageName)
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
        <div className="uploadPageTitle">Upload Pics</div>
        <div className="uploadFormListContainer">
          <UploadForm
            curUser={curUser}
            imagesToUpload={imagesToUpload}
            setImagesToUpload={setImagesToUpload}
            removeImageFromUploadFrontEnd={removeImageFromUploadFrontEnd}
          />
          <FileList
            imagesToUpload={imagesToUpload}
            removeImageFromUploadFrontEnd={removeImageFromUploadFrontEnd}
          />
          <div>
            All done? Edit in{" "}
            <a href={`/Account/${curUser}/My-Pics`}>My Pics</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
