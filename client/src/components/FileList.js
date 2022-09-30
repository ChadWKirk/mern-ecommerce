import React from "react";
import ImageItem from "./ImageItem";

const FileList = ({ imagesToUpload, removeImageFromUpload }) => {
  async function deleteFileHandler(imageName) {
    await fetch(`http://localhost:5000/deleteImage/${imageName}`)
      .then((res) => removeImageFromUpload(imageName))
      .catch((err) => console.error(err));
  }
  return (
    <ul className="fileList">
      {imagesToUpload?.map((image) => (
        <ImageItem
          key={image.name}
          image={image}
          deleteFile={deleteFileHandler}
        />
      ))}
    </ul>
  );
};

export default FileList;
