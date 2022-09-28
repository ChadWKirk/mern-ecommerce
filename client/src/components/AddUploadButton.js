import React from "react";
//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus as farSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";

const AddUploadButton = ({ onClick }) => {
  return (
    <div onClick={onClick} key={9} className="addUploadIconContainer">
      <a className="addUploadIcon">
        <FontAwesomeIcon font-size={76} icon={farSquarePlus} />
      </a>
    </div>
  );
};

export default AddUploadButton;
