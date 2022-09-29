import { React } from "react";

const ManyTestForm = ({ idx, onClick }) => {
  return (
    <div>
      <h1>Form</h1>
      <button onClick={() => console.log("like " + idx)}>Like</button>
      <a onClick={onClick}>
        <button idx={idx}>Delete</button>
      </a>
    </div>
  );
};

export default ManyTestForm;
