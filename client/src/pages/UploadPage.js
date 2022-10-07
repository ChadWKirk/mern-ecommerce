import React, { useState } from "react";
import WhiteNavBar from "../components/WhiteNavBar";
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
        <WhiteNavBar curUser={curUser} loggedIn={loggedIn} />
      </div>
      <div className="uploadPageContainer">
        <div className="uploadPageTitle">Upload Your Pics</div>
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
