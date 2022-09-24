import React, { useEffect } from "react";

const CloudinaryUploadWidget = ({ curUser }) => {
  useEffect(() => {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dtyg4ctfr",
        uploadPreset: "qpexpq57",
        sources: ["local"],
        folder: "PicPocket",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
        }
      }
    );
    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
  });
  return (
    <button id="upload_widget" className="cloudinary-button">
      Upload
    </button>
  );
};
export default CloudinaryUploadWidget;
