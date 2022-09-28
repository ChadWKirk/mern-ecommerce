import { React, useState } from "react";
import UploadForm from "./UploadForm";

const UploadForms = ({ uploadForms, onClick, curUser }) => {
  return (
    <>
      {uploadForms.map((uploadForm) => (
        <UploadForm
          curUser={curUser}
          key={uploadForm.idx}
          num={uploadForm.idx}
          onClick={onClick}
        />
      ))}
    </>
  );
};

export default UploadForms;
