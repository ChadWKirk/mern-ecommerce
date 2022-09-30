import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";
import DropDown from "../components/DropDown";
import UploadForm from "../components/UploadForm";

const UploadPage = ({ curUser, loggedIn }) => {
  const [files, setFiles] = useState();

  function removeFile(filename) {
    setFiles(files.filter((file) => file.name !== filename));
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
        <div className="uploadPageTitle">Upload Files</div>
        <div className="uploadFormListContainer">
          <UploadForm
            curUser={curUser}
            files={files}
            setFiles={setFiles}
            removeFile={removeFile}
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
