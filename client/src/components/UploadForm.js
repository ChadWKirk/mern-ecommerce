import { React, useState } from "react";
//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";

const UploadForm = ({ id, onClick, num, curUser, onMultiPic, pic }) => {
  //cloudinary preset and file for formData
  var CLOUDINARY_UPLOAD_PRESET = "qpexpq57";
  // var file;

  const [picture, setPicture] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [price, setPrice] = useState("");
  const [imageType, setImageType] = useState("");

  //when form is submitted
  async function onSubmit(e) {
    e.preventDefault();
    console.log("submit attempt");

    if (!title) {
      alert("no title");
    } else if (!price) {
      alert("no price");
    } else if (!picture) {
      alert("no pic");
    } else if (!imageType) {
      alert("no image type");
    } else {
      //to send in fetch
      var formData = new FormData();
      formData.append("file", picture);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("folder", "picpocket");

      var uploadToMongoBody;

      //send post request to cloudinary api upload endpoint url
      await fetch("https://api.cloudinary.com/v1_1/dtyg4ctfr/upload", {
        method: "POST",
        body: formData,
      })
        .then((result) =>
          result
            .json()
            .then(
              (resJSON) => (
                (uploadToMongoBody = resJSON), console.log(uploadToMongoBody)
              )
            )
        )
        .catch((err) => {
          console.log(err);
        });

      //add fields to fetch response to get ready to send to MongoDB
      uploadToMongoBody.likes = 0;
      uploadToMongoBody.uploadedBy = curUser;
      uploadToMongoBody.title = title;
      uploadToMongoBody.description = description;
      uploadToMongoBody.price = price;
      uploadToMongoBody.imageType = imageType;

      //send to mongoDB
      await fetch("http://localhost:5000/upload", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(uploadToMongoBody),
      });
    }
  }

  return (
    <div className="uploadForm" key={id}>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="uploadFormContainer">
          <div className="uploadFormMinusButton ">
            {/* when clicking remove button, clear all data from the form and conditionally un-render the form (revert back to original state) */}
            <a onClick={onClick} className="removeUploadIcon" num={num}>
              <FontAwesomeIcon
                className="removeUploadIconSVG"
                fontSize={76}
                icon={faCircleMinus}
              />
            </a>
          </div>
          <div className="uploadFormInput">
            {/* only take image files and only certain types of image files */}
            <input
              type="file"
              onChange={onMultiPic}
              value={pic ? pic : null}
              multiple
            ></input>
          </div>
          <div className="uploadFormDetailsContainer">
            <div className="uploadFormDetailsSubContainer">
              {/* don't allow anything but letters and numbers. no special characters */}
              <div>Title</div>
              <div>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="uploadFormDetailsSubContainer">
              {/* copy how cloudinary lets you add tags. maybe bootstrap */}
              <div>Tags</div>
              <div>
                <input></input>
              </div>
            </div>
            <div className="uploadFormDetailsSubContainer">
              {/* have max length of 500 characters */}
              <div>Description</div>
              <div>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="uploadFormDetailsSubContainer">
              {/* when free download box is checked, clear price input and grey it out and set price to "Free Download" */}
              <div>Price</div>
              <div>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
                <input type="checkbox"></input>
                <div>free download</div>
              </div>
            </div>
            <div className="uploadFormDetailsSubContainer">
              <div>Image type</div>
              <div>
                <input
                  value={imageType}
                  onChange={(e) => setImageType(e.target.value)}
                ></input>
              </div>
            </div>
          </div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
