import React from "react";
//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faSpinner,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const ImageItem = ({ image, deleteFile }) => {
  return (
    <li className="imageItem" key={image.name}>
      <FontAwesomeIcon icon={faFileAlt} />
      <div>{image.name}</div>
      <div className="uploadingIcon">
        {image.isUploading && (
          <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
        )}
        {!image.isUploading && (
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => deleteFile(image.name)}
          />
        )}
      </div>
    </li>
  );
};

export default ImageItem;
