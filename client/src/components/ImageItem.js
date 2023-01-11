import React from "react";
//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faSpinner,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const ImageItem = ({ image, deleteImageFromBackEnd }) => {
  return (
    <li className="imageItem" key={image.name}>
      <img src={image.secure_url} width={100} height={100}></img>
      <div>
        {image.name
          .replace(".jpg", "")
          .replace(".png", "")
          .replace(".jpeg", "")}
      </div>
      <div className="uploadingIcon">
        {image.isUploading && (
          <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
        )}
        {!image.isUploading && (
          <FontAwesomeIcon
            style={{ cursor: "pointer", marginRight: 10 }}
            icon={faTrash}
            fontSize={20}
            onClick={() => deleteImageFromBackEnd(image.name, image.publicId)}
          />
        )}
      </div>
    </li>
  );
};

export default ImageItem;
