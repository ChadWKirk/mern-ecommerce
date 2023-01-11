import { React, useEffect, useState } from "react";
//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const UploadForm = ({
  curUser,
  imagesToUpload,
  setImagesToUpload,
  removeImageFromUpload,
}) => {
  //cloudinary preset and file for formData
  var CLOUDINARY_UPLOAD_PRESET = "qpexpq57";
  var targetFilesArray = [];

  async function uploadHandler(e) {
    e.preventDefault();

    for (var i = 0; i < e.target.files.length; i++) {
      const image = e.target.files[i];
      image.isUploading = true;
      targetFilesArray.push(image);
      setImagesToUpload((imagesToUpload) => [...imagesToUpload, image]);
      console.log(targetFilesArray + " target files");

      //to send in fetch
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("folder", "picpocket");

      var uploadToMongoBody;

      //send post request to cloudinary api upload endpoint url (have to use admin API
      //from cloudinary for multi upload)
      await fetch("https://api.cloudinary.com/v1_1/dtyg4ctfr/upload", {
        method: "POST",
        body: formData,
      })
        .then((result) =>
          result.json().then((resJSON) => (uploadToMongoBody = resJSON))
        )
        .catch((err) => {
          console.log(err);
        });

      //add fields to fetch response to get ready to send to MongoDB
      uploadToMongoBody.likes = 0;
      uploadToMongoBody.likedBy = [];
      uploadToMongoBody.uploadedBy = curUser;
      uploadToMongoBody.title = image.name
        .replace(".jpg", "")
        .replace(".png", "")
        .replace(".jpeg", "");
      uploadToMongoBody.description = "";
      uploadToMongoBody.price = "$0.00";
      uploadToMongoBody.imageType = "Photo";

      //send to mongoDB
      fetch("http://localhost:5000/upload", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(uploadToMongoBody),
      })
        .then((res) => {
          image.isUploading = false;
          image.secure_url = uploadToMongoBody.secure_url;
          image.publicId = uploadToMongoBody.public_id;
          image.assetId = uploadToMongoBody.asset_id;
          setImagesToUpload((imagesToUpload) => [...imagesToUpload]);
          console.log(imagesToUpload);
        })
        .catch((err) => {
          console.error(err);
          removeImageFromUpload(image.name);
        });
    }
  }

  return (
    <div>
      <form className="uploadForm">
        <div style={{ position: "absolute", top: -30, left: -7, fontSize: 16 }}>
          Upload
        </div>
        <div className="uploadFormContents">
          <input type="file" multiple onChange={(e) => uploadHandler(e)} />
          <div className="uploadFormInputButtonAndCaptions">
            <button className="addUploadButton">
              <FontAwesomeIcon
                fontSize={24}
                style={{ color: "white" }}
                icon={faPlus}
              />
              <div style={{ color: "white", fontSize: 28 }}>Upload</div>
            </button>
            <div className="uploadFormCaption">
              Supported Files: JPEG, JPG, PNG
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
