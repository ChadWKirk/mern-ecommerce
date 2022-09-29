import { React, useState } from "react";
//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const UploadForm = ({ curUser, files, setFiles, removeFile }) => {
  //cloudinary preset and file for formData
  var CLOUDINARY_UPLOAD_PRESET = "qpexpq57";

  //when form is submitted
  async function onSubmit(e) {
    e.preventDefault();
    console.log("submit attempt");

    // if (!picture) {
    //   alert("no pic");
    // } else {
    //to send in fetch
    var formData = new FormData();
    // formData.append("file", picture);
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
    // uploadToMongoBody.title = title;
    uploadToMongoBody.description = "";
    uploadToMongoBody.price = "$0.00";
    uploadToMongoBody.imageType = "photo";

    //send to mongoDB
    await fetch("http://localhost:5000/upload", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(uploadToMongoBody),
    });
  }
  // }

  async function uploadHandler(e) {
    console.log(e.target.files);

    for (var i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      file.isUploading = true;
      setFiles([...files, file]);

      //to send in fetch
      const formData = new FormData();
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
      uploadToMongoBody.title = file.name;
      uploadToMongoBody.description = "";
      uploadToMongoBody.price = "$0.00";
      uploadToMongoBody.imageType = "photo";

      //send to mongoDB
      await fetch("http://localhost:5000/upload", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(uploadToMongoBody),
      })
        .then((res) => {
          file.isUploading = false;
          setFiles([...files, file]);
        })
        .catch((err) => {
          console.error(err);
          removeFile(file.name);
        });
    }
  }

  return (
    <div>
      <form
        onSubmit={(e) => onSubmit(e)}
        onChange={(e) => uploadHandler(e)}
        className="uploadForm"
      >
        <div style={{ position: "absolute", top: -30, left: -7, fontSize: 16 }}>
          Upload
        </div>
        <div className="uploadFormContents">
          <input type="file" multiple />
          <button className="addUploadButton">
            <FontAwesomeIcon style={{ color: "white" }} icon={faPlus} />
            <div style={{ color: "white" }}>Upload</div>
          </button>
          <div style={{ opacity: 0.4, fontWeight: 400 }}>Drag n' Drop</div>
          <div className="uploadFormCaption">
            <p>Supported Files: JPEG, JPG, PNG</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
