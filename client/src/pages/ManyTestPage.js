import { React, useState } from "react";
import ManyTestForms from "../components/ManyTestForms";

const ManyTestPage = () => {
  const [manyTestForms, setMany] = useState([1, 2, 3]);

  function onRemove(e) {
    e.preventDefault();
    console.log("remove " + e.target.attributes[0].value);

    setMany(
      manyTestForms.filter(
        (form, index) => index != e.target.attributes[0].value
      )
    );
  }
  return (
    <div>
      <ManyTestForms manyForms={manyTestForms} onClick={(e) => onRemove(e)} />
    </div>
  );
};

export default ManyTestPage;
