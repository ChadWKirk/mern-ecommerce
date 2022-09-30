import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";
import DropDown from "../components/DropDown";
import UploadForm from "../components/UploadForm";
import FileList from "../components/FileList";

const UploadPage = ({ curUser, loggedIn }) => {
  const [imagesToUpload, setImagesToUpload] = useState([]);

  function removeImageFromUpload(imageName) {
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
            removeImageFromUpload={removeImageFromUpload}
          />
          <FileList
            imagesToUpload={imagesToUpload}
            removeImageFromUpload={removeImageFromUpload}
          />
          <div>
            All done!{" "}
            <a href={`/Account/${curUser}/My-Pics`}>
              Click here to go to My Pics
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
