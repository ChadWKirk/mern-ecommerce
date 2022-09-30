import React from "react";
import ImageItem from "./ImageItem";

const FileList = ({ imagesToUpload, removeImageFromUploadFrontEnd }) => {
  async function deleteImageFromBackEnd(imageName, publicId) {
    await fetch(`http://localhost:5000/deleteImage/`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ public_id: publicId }),
    })
      .then((res) => removeImageFromUploadFrontEnd(imageName))
      .catch((err) => console.error(err));
  }

  return (
    <ul className="fileList">
      {imagesToUpload?.map((image) => (
        <ImageItem
          key={Math.random(100)}
          image={image}
          deleteImageFromBackEnd={deleteImageFromBackEnd}
        />
      ))}
    </ul>
  );
};

export default FileList;
