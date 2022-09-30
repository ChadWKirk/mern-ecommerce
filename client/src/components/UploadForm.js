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

  useEffect(() => {
    console.log(imagesToUpload);
  }, [imagesToUpload]);

  async function uploadHandler(e) {
    var targetFilesArray = [];

    for (var i = 0; i < e.target.files.length; i++) {
      const image = e.target.files[i];
      image.isUploading = true;
      targetFilesArray.push(image);
      console.log(targetFilesArray + " target files");
      setImagesToUpload(targetFilesArray);

      //to send in fetch
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("folder", "picpocket");

      var uploadToMongoBody;

      //send post request to cloudinary api upload endpoint url
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
      uploadToMongoBody.uploadedBy = curUser;
      uploadToMongoBody.title = image.name;
      uploadToMongoBody.description = "";
      uploadToMongoBody.price = "$0.00";
      uploadToMongoBody.imageType = "photo";

      //send to mongoDB
      fetch("http://localhost:5000/upload", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(uploadToMongoBody),
      })
        .then((res) => {
          image.isUploading = false;
          image.secure_url = uploadToMongoBody.secure_url;
          setImagesToUpload((imagesToUpload) => [...imagesToUpload, image]);
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
          <input
            type="file"
            multiple
            onChange={(e) => uploadHandler(e)}
            onDrop={(e) => uploadHandler(e)}
          />
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
