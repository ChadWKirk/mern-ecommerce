import { React } from "react";
import ManyTestForm from "./ManyTestForm";

const ManyTestForms = ({ manyForms, onClick }) => {
  return (
    <>
      {manyForms.map((form, idx) => (
        <ManyTestForm key={idx} idx={idx} onClick={onClick} />
      ))}
    </>
  );
};

export default ManyTestForms;
