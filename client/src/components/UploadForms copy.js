import { React } from "react";
import UploadForm from "./UploadForm";

const UploadForms = ({ uploadForms, onClick, onMultiPic, curUser }) => {
  return (
    <>
      {uploadForms.map((uploadForm, index) => (
        <UploadForm
          curUser={curUser}
          key={index}
          pic={uploadForm.pic}
          onClick={onClick}
          onMultiPic={onMultiPic}
        />
      ))}
    </>
  );
};

export default UploadForms;
